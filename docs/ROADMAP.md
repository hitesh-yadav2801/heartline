# Heartline — Roadmap

---

## How to Use This Roadmap

- Work happens **one task at a time, in order.** Each task (`HRT-xxx`) gets its own branch, plan, build, and manual test
  (workflow in `AGENT_EXECUTE.md`, branching in `GIT_GUIDE.md`).
- A task is **Done** only after manual testing passes and the branch is merged. Then the next task starts.
- Week numbers are targets, not deadlines. Order matters more than dates.
- Scope for each task comes from `FEATURES.md`, `USER_FLOWS.md`, and `HEARTLINE_UI_UX_SPEC.md`.
  The rows below are summaries, not specs.
- If a task turns out too big during planning, the agent proposes splitting it (e.g. `HRT-009a`, `HRT-009b`).

**Status legend:** ⬜ Not started · 🔄 In progress · ✅ Done

---

## Build Approach

**The complete app UI is built first, then the functionality.**

- **Part A — App UI:** every screen for every phase is built in Flutter against mock datasources
  (`USE_MOCKS=true`). The result is a fully clickable app.
- **Part B — Functionality:** backend, Supabase, Firebase, realtime, and AI are wired in, feature by feature.
  Only datasources change. Domain and presentation code stay as they are (see the clean architecture in `FLUTTER_GUIDE.md`).
- Product phases (MVP / Phase 2 / Phase 3 in `PRD.md`) still decide **what ships when**.
  Phase 2/3 screens stay behind feature flags until their functionality lands.

**Design source:** `HEARTLINE_UI_UX_SPEC.md` v1.1 + the approved Figma Make mocks (`design/figma-mock/`).

---

## Design Track (product owner, parallel to Weeks 1–4)

These screens need designs in the UI/UX spec and Figma **before** their UI task starts.
They are designs for features already in `FEATURES.md`. No new features.

- [ ] MVP: Onboarding, Auth, Profile setup, Couple create/join, Waiting, Linked celebration
- [ ] MVP: We're Good two-sided sheets, Memory Jar detail, Love Language screen, Home 3-Heart limit state, notification toast
- [ ] Phase 2: Weekly Pulse, cool-down timer, Us Time create + "How was your Us Time?", AI date ideas
- [ ] Phase 3: Bucket List, Milestones, Memory Jar photos, Mood history, weekly summary, palette picker, PDF export, referral
- [ ] Monetization: paywall screens, Heartline Plus in Settings

---

## Part A — Complete App UI (Weeks 1–7) · mock data, no backend

| ID | Task | Branch | Week | Status |
|----|------|--------|------|--------|
| HRT-000 | **Repository setup** — monorepo folders, docs moved into `docs/`, `AGENTS.md`, README, `.gitignore`, PR template, `main` branch protected | `chore/repo-setup` | 1 | ⬜ |
| HRT-001 | **Project scaffold** — Flutter app in `app/`, clean-arch folders, tokens, fonts, single theme, GoRouter + nav shell, background | `feature/project-scaffold` | 1 | ⬜ |
| HRT-002 | **Shared components** — buttons, inputs, cards, glass card, chips, filter chips, avatars, pulse dots, shimmer, section label, empty state, bottom sheet, top bar | `feature/shared-components` | 1 | ⬜ |
| HRT-003 | **Mock data layer** — `AppConfig` + `USE_MOCKS`, DI composition root, domain entities + repository contracts + mock datasources for all features, Elena & Mira fixtures | `feature/mock-data-layer` | 1 | ⬜ |
| HRT-004 | **Splash + Onboarding UI** — splash, 3-slide onboarding, Person B variant | `feature/onboarding-ui` | 2 | ⬜ |
| HRT-005 | **Auth + Profile setup UI** — auth, profile creation, love language setup | `feature/auth-profile-ui` | 2 | ⬜ |
| HRT-006 | **Couple linking UI** — create code + share, join with code, waiting, linked celebration | `feature/couple-linking-ui` | 2 | ⬜ |
| HRT-007 | **Home UI** — couple header, partner mood, open Hearts, 3-Heart limit state, quick actions | `feature/home-ui` | 3 | ⬜ |
| HRT-008 | **Open a Heart UI** — feeling selection, note, Heart Sent + burst | `feature/heart-raise-ui` | 3 | ⬜ |
| HRT-009 | **Resolution Space UI** — top card, Hug button + heartbeat/ripple, messages, AI suggestion chip, Heart card states | `feature/resolution-space-ui` | 3 | ⬜ |
| HRT-010 | **We're Good UI** — two-sided flow (say it / waiting / say it back) + celebration | `feature/were-good-ui` | 3 | ⬜ |
| HRT-011 | **Memory Jar UI** — Hearts tab list, filters, detail (locket expand) | `feature/memory-jar-ui` | 4 | ⬜ |
| HRT-012 | **Mood check-in UI** — mood picker, note, submitted state | `feature/mood-ui` | 4 | ⬜ |
| HRT-013 | **Profile & Settings UI** — profile, partner card, Love Language screen, settings groups, disconnect | `feature/profile-settings-ui` | 4 | ⬜ |
| HRT-014 | **App states UI** — empty/loading/error states for MVP screens, in-app notification toast | `feature/app-states-ui` | 4 | ⬜ |
| HRT-015 | **Appreciation UI** — compose, Gratitude Wall, reactions, unread dot | `feature/appreciation-ui` | 5 | ⬜ |
| HRT-016 | **Weekly Pulse UI** — cards, waiting, reveal, reactions, history | `feature/pulse-ui` | 5 | ⬜ |
| HRT-017 | **Cool-down UI** — timer inside Resolution Space + calming prompt card | `feature/cooldown-ui` | 5 | ⬜ |
| HRT-018 | **Us Time UI** — plan list, create plan, AI date ideas, "How was your Us Time?" | `feature/us-time-ui` | 5 | ⬜ |
| HRT-019 | **Bucket List + Milestones UI** | `feature/bucket-milestones-ui` | 6 | ⬜ |
| HRT-020 | **Phase 3 extras UI** — Memory Jar photos, mood history, weekly summary, palette picker, PDF export entry, referral | `feature/phase3-extras-ui` | 6 | ⬜ |
| HRT-021 | **Paywall UI** — Heartline Plus paywall (sheet + full screen), subscription state in Settings | `feature/paywall-ui` | 6 | ⬜ |
| HRT-022 | **UI polish & freeze** — animation pass (spec §04), haptics, transitions, app icon, native splash, accessibility, full walkthrough | `chore/ui-polish` | 7 | ⬜ |

**Milestone:** complete clickable app on mock data → **UI freeze** (end of Week 7).

---

## Part B — Functionality (Weeks 8–22)

### MVP

| ID | Task | Branch | Week | Status |
|----|------|--------|------|--------|
| HRT-023 | **Database design & setup** — finalize the FULL schema from all feature specs (`DATABASE_SCHEMA.md` is the starting reference), migrations, RLS, triggers, realtime, seed | `feature/database-setup` | 8 | ⬜ |
| HRT-024 | **Backend scaffold** — Express + TS strict, Zod, middleware, response helpers, config, Dockerfile, health route, CI | `feature/backend-scaffold` | 8 | ⬜ |
| HRT-025 | **Firebase setup** — project, `flutterfire configure`, FCM Android + iOS, Admin SDK in backend | `feature/firebase-setup` | 8 | ⬜ |
| HRT-026 | **Auth + Profile** — Supabase Auth (email + Google), token refresh, profile + love language, FCM token + UTC offset sync | `feature/auth-profile` | 8 | ⬜ |
| HRT-027 | **Couple linking** — create/regenerate code, join, deep links (`heartline://`), waiting → linked in realtime | `feature/couple-linking` | 9 | ⬜ |
| HRT-028 | **Open a Heart + Hug** — raise (3-open limit), Hug, notifications, 72h Hug reminder | `feature/heart-hug` | 10 | ⬜ |
| HRT-029 | **Resolution Space** — messages API, realtime sync, read-only after We're Good | `feature/resolution-space` | 11 | ⬜ |
| HRT-030 | **We're Good + Memory Jar** — two-sided endpoints, 24h reminder, Memory Jar real data | `feature/were-good-memory-jar` | 11 | ⬜ |
| HRT-031 | **Mood + Home** — mood submit/today (local day), partner mood realtime, 8PM nudge, Home on real data | `feature/mood-home` | 12 | ⬜ |
| HRT-032 | **MVP hardening + beta** — notification handling (foreground toast, deep links), Hive offline Memory Jar, test pass, TestFlight + internal Android | `chore/mvp-beta` | 12 | ⬜ |

**Milestones:** MVP internal build (Week 11) · MVP beta (Week 12)

### Phase 2

| ID | Task | Branch | Week | Status |
|----|------|--------|------|--------|
| HRT-033 | **Appreciation Drops** — send, Gratitude Wall, reactions, notifications | `feature/appreciation` | 13 | ⬜ |
| HRT-034 | **Weekly Pulse** — Sunday 9AM local job, AI questions + fallback, answers, reveal, history | `feature/pulse` | 14 | ⬜ |
| HRT-035 | **AI features** — response suggestion, cool-down + calming prompt, date ideas, fallbacks, usage log | `feature/ai-features` | 15 | ⬜ |
| HRT-036 | **Us Time Planner** — plans, 1h reminder, "How was it?" prompt, AI ideas integration | `feature/us-time` | 16 | ⬜ |

### Monetization & Launch

| ID | Task | Branch | Week | Status |
|----|------|--------|------|--------|
| HRT-037 | **Heartline Plus** — RevenueCat, free-tier limits, paywall wiring | `feature/subscription` | 17 | ⬜ |
| HRT-038 | **Launch** — regression, store listings, App Store + Play Store submission | `chore/launch` | 18 | ⬜ |

### Phase 3

| ID | Task | Branch | Week | Status |
|----|------|--------|------|--------|
| HRT-039 | **Shared Bucket List** | `feature/bucket-list` | 19 | ⬜ |
| HRT-040 | **Milestone Tracker** (recurring + one-time notifications) | `feature/milestones` | 19 | ⬜ |
| HRT-041 | **Memory Jar photos** (Supabase Storage) | `feature/memory-jar-photos` | 20 | ⬜ |
| HRT-042 | **Mood history + weekly relationship summary** | `feature/mood-history-summary` | 20 | ⬜ |
| HRT-043 | **Couple palette customization** | `feature/couple-palette` | 21 | ⬜ |
| HRT-044 | **Memory Jar PDF export** | `feature/memory-jar-export` | 21 | ⬜ |
| HRT-045 | **Referral system** | `feature/referral` | 22 | ⬜ |

---

## Milestone Summary

| Milestone | Target |
|-----------|--------|
| Complete app UI — clickable, mock data (UI freeze) | Week 7 |
| MVP Internal Build | Week 11 |
| MVP Beta (TestFlight) | Week 12 |
| Phase 2 Feature Complete | Week 16 |
| App Store Launch | Week 18 |
| Phase 3 Feature Complete | Week 22 |
