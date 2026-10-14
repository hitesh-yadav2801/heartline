# Heartline — Database Schema

> **📐 Reference design — not final.** This document was derived from the feature specifications to guide
> implementation. It is **not** a complete or final database schema. During implementation, the full database schema is designed and
> finalized in task HRT-023 (and refined per feature after that). Once migrations exist, `supabase/migrations/` is the source of truth: tables/fields/routes may be added, renamed, split or reshaped if that serves the feature better.
> **Rules:** (1) the product behavior in `FEATURES.md` / `USER_FLOWS.md` must not change; (2) every deviation is proposed
> in the task plan and confirmed before building; (3) this doc is updated in the same branch so it always matches the code.

**Database:** Supabase (PostgreSQL)
**RLS:** Enabled on all tables, no exceptions

---

## Time Rules (read first)

- **Every timestamp is stored in UTC** (`timestamptz`; Postgres stores it as UTC).
- The API always returns ISO8601 UTC strings (`...Z`). The Flutter client converts to the
  device's local time for display (`DateTime.parse(x).toLocal()`).
- Each profile stores `utc_offset_minutes`, refreshed from the device on every app launch.
  The backend uses it only for **user-local scheduling and day boundaries**:
  - the 8PM mood nudge
  - the Sunday 9AM Pulse
  - the "one mood per day" boundary (local midnight)
- The only `date` columns that are not UTC instants are calendar days:
  `moods.recorded_at` (the user's local date), `pulse_*.week_start`, and `milestones.milestone_date`.
  These hold no time and no zone.

---

## Status Flows

### Heart status
```
open ──(partner sends Hug)──▶ hugged ──(first message)──▶ in_resolution ──(both say We're Good)──▶ resolved
```
- `resolved` is internal naming. The UI never shows the word "resolve" (see PRODUCT.md).
- The "We're Good" request can be made once the Heart is `hugged` or `in_resolution`.

### We're Good (two-sided)
1. Partner X taps "We're Good". This sets `resolve_requested_by = X` and `resolve_requested_at = now()`.
   The status does not change.
2. Partner Y (must be the *other* partner) says it back. This sets `status = 'resolved'` and `resolved_at = now()`.
3. If Y taps "Not yet", nothing is written. The request stays pending.
4. If Y hasn't confirmed within 24h, a gentle reminder is sent to Y (once, de-duplicated via `notifications_log`).

### Open Heart limit
- A couple can have **at most 3 open Hearts at a time, in total across both partners.**
  Examples: 3 + 0, 2 + 1. Not 3 each.
- "Open" means any status other than `resolved`.
- This is enforced in the backend service and also by a DB trigger, so concurrent raises can't exceed it.

---

## Tables

### `users`
Managed by Supabase Auth. Extended via `profiles`.

---

### `profiles`
One row per user. Holds extended user data beyond Supabase Auth.

```sql
create table profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  display_name        text not null,
  avatar_url          text,
  love_language       text check (love_language in (
                        'words_of_affirmation',
                        'acts_of_service',
                        'receiving_gifts',
                        'quality_time',
                        'physical_touch'
                      )),
  fcm_token           text,
  utc_offset_minutes  smallint not null default 0
                      check (utc_offset_minutes between -720 and 840),  -- e.g. IST = 330
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
```

**RLS:** A user can read and write only their own row.
A partner can read (not write) their partner's row if linked.

---

### `couples`
Links two users into a couple. One row per couple.

```sql
create table couples (
  id                    uuid primary key default gen_random_uuid(),
  user_a_id             uuid not null references profiles(id),   -- creator
  user_b_id             uuid references profiles(id),            -- null until partner joins
  invite_code           text unique not null,                    -- 6-char alphanumeric
  invite_expires_at     timestamptz not null,                    -- created_at + 72h; regenerated on request
  linked_at             timestamptz,
  status                text not null default 'pending'
                        check (status in ('pending', 'active', 'dissolved')),
  dissolve_requested_by uuid references profiles(id),            -- two-sided disconnect
  dissolve_requested_at timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint no_self_couple check (user_b_id is null or user_a_id != user_b_id),
  constraint active_has_both check (status = 'pending' or user_b_id is not null)
);

-- A user can be in at most one pending/active couple
create unique index one_live_couple_a on couples (user_a_id) where status in ('pending', 'active');
create unique index one_live_couple_b on couples (user_b_id) where status in ('pending', 'active');
```

**RLS:** Both partners can read their couple row. Only user_a can regenerate the invite code.
Joining (setting `user_b_id`) is done by the backend with the service role.

---

### `hearts`
The core table. One row for every Heart a partner opens.

```sql
create table hearts (
  id                    uuid primary key default gen_random_uuid(),
  couple_id             uuid not null references couples(id),
  raised_by             uuid not null references profiles(id),
  feeling_tag           text not null check (feeling_tag in (
                          'ignored', 'overwhelmed', 'unheard',
                          'lonely', 'anxious', 'hurt'
                        )),
  note                  text check (char_length(note) <= 500),
  status                text not null default 'open' check (status in (
                          'open',           -- opened, no Hug yet
                          'hugged',         -- partner sent Hug
                          'in_resolution',  -- at least one message exchanged
                          'resolved'        -- both partners said We're Good
                        )),
  hugged_at             timestamptz,
  resolve_requested_by  uuid references profiles(id),  -- who said "We're Good" first
  resolve_requested_at  timestamptz,
  resolved_at           timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index hearts_couple_status_idx on hearts (couple_id, status);
create index hearts_couple_resolved_idx on hearts (couple_id, resolved_at desc);
```

**Open Heart limit trigger** (a safety net behind the service check):
```sql
create or replace function enforce_open_heart_limit()
returns trigger as $$
begin
  perform 1 from couples where id = new.couple_id for update;  -- serialize per couple
  if (select count(*) from hearts
      where couple_id = new.couple_id and status <> 'resolved') >= 3 then
    raise exception 'HEART_LIMIT_REACHED';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger hearts_open_limit
  before insert on hearts
  for each row execute function enforce_open_heart_limit();
```

**RLS:** Both partners in the couple can read and write hearts for their `couple_id`.

---

### `heart_messages`
Messages inside a Resolution Space.

```sql
create table heart_messages (
  id               uuid primary key default gen_random_uuid(),
  heart_id         uuid not null references hearts(id) on delete cascade,
  sender_id        uuid not null references profiles(id),
  content          text not null check (char_length(content) <= 1000),
  is_ai_suggestion boolean not null default false,  -- true if sender used the AI suggestion
  created_at       timestamptz not null default now()
);

create index heart_messages_heart_idx on heart_messages (heart_id, created_at);
```

**RLS:** Both partners in the heart's couple can read and insert. No update or delete.

---

### `heart_cooldowns` *(Phase 2)*
The Conflict Cool-down Timer. Limited to one per Heart.

```sql
create table heart_cooldowns (
  id              uuid primary key default gen_random_uuid(),
  heart_id        uuid not null unique references hearts(id) on delete cascade,  -- once per Heart
  started_by      uuid not null references profiles(id),
  started_at      timestamptz not null default now(),
  ends_at         timestamptz not null,           -- started_at + 30 minutes
  raiser_prompt   text,                           -- AI or fallback prompt shown to the raiser
  partner_prompt  text,                           -- AI or fallback prompt shown to the partner
  ended_notified  boolean not null default false  -- "Ready to continue?" sent
);
```

The thread is frozen while `now() < ends_at`. The backend rejects new messages with `COOLDOWN_ACTIVE`.

**RLS:** Both partners in the heart's couple can read. Insert happens via the backend only.

---

### `moods`
Daily mood check-in. One per user per local day.

```sql
create table moods (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(id),
  couple_id    uuid not null references couples(id),
  mood         text not null check (mood in (
                 'joyful', 'calm', 'anxious', 'sad', 'overwhelmed'
               )),
  note         text check (char_length(note) <= 200),
  recorded_at  date not null,   -- user's LOCAL calendar date, computed by backend
                                --   (now() at UTC + profiles.utc_offset_minutes)::date
  created_at   timestamptz not null default now(),
  unique (user_id, recorded_at)
);
```

**RLS:** A user can insert and update their own mood. Their partner can read it.

---

### `appreciation_drops` *(Phase 2)*
Appreciation Drops sent between partners.

```sql
create table appreciation_drops (
  id          uuid primary key default gen_random_uuid(),
  couple_id   uuid not null references couples(id),
  sender_id   uuid not null references profiles(id),
  content     text not null check (char_length(content) <= 500),
  is_read     boolean not null default false,
  is_hearted  boolean not null default false,  -- recipient's heart reaction
  hearted_at  timestamptz,
  created_at  timestamptz not null default now()
);
```

**RLS:** Both partners can read. Only the sender can insert. Only the recipient can update `is_read` and `is_hearted`.
No deletes.

---

### `us_time_plans` *(Phase 2)*
Planned Us Time.

```sql
create table us_time_plans (
  id           uuid primary key default gen_random_uuid(),
  couple_id    uuid not null references couples(id),
  created_by   uuid not null references profiles(id),
  title        text not null,
  description  text,
  planned_at   timestamptz not null,   -- UTC instant
  location     text,
  status       text not null default 'planned' check (status in ('planned', 'done', 'cancelled')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
```

**RLS:** Both partners can read and write.

---

### `pulse_questions` *(Phase 2)*
The 3 questions generated for a couple each week (AI or fallback bank).

```sql
create table pulse_questions (
  id           uuid primary key default gen_random_uuid(),
  couple_id    uuid not null references couples(id),
  week_start   date not null,              -- Monday of that week
  questions    jsonb not null,             -- [{ "key": "favorite_moment", "question": "..." }, x3]
  source       text not null check (source in ('ai', 'fallback')),
  revealed_at  timestamptz,                -- set when both answered OR 48h passed
  created_at   timestamptz not null default now(),
  unique (couple_id, week_start)
);
```

The 8-week no-repeat rule is checked by reading the `questions[*].key` values from this couple's last 8 rows.

**RLS:** Both partners can read. Insert and update happen via the backend only.

---

### `pulse_responses` *(Phase 2)*
Weekly Pulse answers.

```sql
create table pulse_responses (
  id                 uuid primary key default gen_random_uuid(),
  couple_id          uuid not null references couples(id),
  user_id            uuid not null references profiles(id),
  week_start         date not null,
  question_key       text not null,
  response           text not null check (char_length(response) <= 300),
  hearted_by_partner boolean not null default false,  -- partner's heart reaction
  created_at         timestamptz not null default now(),
  unique (user_id, week_start, question_key)
);
```

**RLS:** Both partners can insert their own answers. A partner's answers become readable only once
`pulse_questions.revealed_at` is set.

---

### `bucket_list_items` *(Phase 3)*
Shared couple bucket list.

```sql
create table bucket_list_items (
  id           uuid primary key default gen_random_uuid(),
  couple_id    uuid not null references couples(id),
  added_by     uuid not null references profiles(id),
  title        text not null,
  description  text,
  is_done      boolean not null default false,
  done_at      timestamptz,
  is_archived  boolean not null default false,  -- items are archived, never deleted
  created_at   timestamptz not null default now()
);
```

**RLS:** Both partners can read and write. No deletes.

---

### `milestones` *(Phase 3)*
Anniversary and custom couple milestones.

```sql
create table milestones (
  id              uuid primary key default gen_random_uuid(),
  couple_id       uuid not null references couples(id),
  title           text not null,
  milestone_date  date not null,
  is_recurring    boolean not null default true,
  created_at      timestamptz not null default now()
);
```

**RLS:** Both partners can read and write.

---

### `notifications_log`
Tracks sent notifications to prevent duplicates (including reminders).

```sql
create table notifications_log (
  id            uuid primary key default gen_random_uuid(),
  recipient_id  uuid not null references profiles(id),
  type          text not null,   -- see NOTIFICATIONS.md for the full list
  reference_id  uuid,            -- heart, message, plan, etc.
  sent_at       timestamptz not null default now()
);

create index notifications_log_dedupe_idx on notifications_log (recipient_id, type, reference_id);
```

**RLS:** A user can only read their own notification log.

---

### `ai_usage_log`
Monitoring for every AI call. **This table never stores prompt or response content.**

```sql
create table ai_usage_log (
  id             uuid primary key default gen_random_uuid(),
  feature        text not null check (feature in (
                   'suggest_response', 'date_ideas', 'pulse_questions', 'cooldown_prompt'
                 )),
  couple_id      uuid references couples(id),
  user_id        uuid references profiles(id),   -- null for cron-generated calls
  model          text not null,
  input_tokens   integer,
  output_tokens  integer,
  latency_ms     integer,
  success        boolean not null,
  used_fallback  boolean not null default false,
  error_code     text,
  created_at     timestamptz not null default now()
);
```

**RLS:** No client access. Backend (service role) only.

---

## `updated_at` Trigger

Apply it to every table that has an `updated_at` column.

```sql
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- e.g.
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
```

---

## Realtime Channels

| Channel | Event | Subscribers |
|---------|-------|-------------|
| `couple:{couple_id}:hearts` | INSERT, UPDATE on hearts (includes the We're Good request) | Both partners |
| `couple:{couple_id}:moods` | INSERT on moods | Both partners |
| `heart:{heart_id}:messages` | INSERT on heart_messages | Both partners |
| `heart:{heart_id}:cooldown` | INSERT on heart_cooldowns *(Phase 2)* | Both partners |
| `couple:{couple_id}:appreciations` | INSERT on appreciation_drops *(Phase 2)* | Recipient only |

---

## Key Relationships

```
auth.users
  └── profiles (1:1)
        └── couples (user_a_id / user_b_id)
              ├── hearts (1:N)
              │     ├── heart_messages (1:N)
              │     └── heart_cooldowns (1:1)
              ├── moods (1:N)
              ├── appreciation_drops (1:N)
              ├── us_time_plans (1:N)
              ├── pulse_questions (1:N, one per week)
              ├── pulse_responses (1:N)
              ├── bucket_list_items (1:N)
              └── milestones (1:N)

notifications_log, ai_usage_log — standalone logs
```

---

## Helper Function

```sql
-- Returns the active couple_id for the current authenticated user
create or replace function get_my_couple_id()
returns uuid as $$
  select id from couples
  where (user_a_id = auth.uid() or user_b_id = auth.uid())
  and status = 'active'
  limit 1;
$$ language sql security definer stable;
```

Use this in RLS policies to avoid repeating the join.
