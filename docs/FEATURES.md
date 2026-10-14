# Heartline — Feature Specifications

> **🔒 Product definition — fixed.** This document defines *what* Heartline is and does. Implementation tasks must not
> change, add or remove product behavior. If something here looks wrong, unclear or technically impractical, the agent
> raises it as a question during planning — only the product owner changes this file.

Detailed behavior, edge cases, and UI notes for every feature.

---

## Feature: Heart Raise (MVP)

**Description:** The core feature. A partner shares a feeling with their partner.

**Behavior:**
- A couple can have **up to 3 open Hearts at a time, in total across both partners**
  (e.g. 3 + 0, or 2 + 1, not 3 each). "Open" means anything that hasn't reached We're Good yet.
- Either partner can open a Heart while under the limit, including while another Heart is open
- When the couple has 3 open Hearts, the "Open a Heart" CTA is disabled with a gentle note
  ("3 Hearts are open. Let's give these some love first.") and the open Hearts are shown above it
- Feeling tags are fixed (not customizable in MVP)
- Note is optional — a Heart can be opened with just a feeling tag
- Partner can see the full note immediately — it is not hidden

**Feeling Tags:**
- Ignored — `AppColors.feelingIgnored`
- Overwhelmed — `AppColors.feelingOverwhelmed`
- Unheard — `AppColors.feelingUnheard`
- Lonely — `AppColors.feelingLonely`
- Anxious — `AppColors.feelingAnxious`
- Hurt — `AppColors.feelingHurt`

(Values in `DESIGN_SYSTEM.md`.)

**Notifications triggered:**
- On raise: `heart_opened` to partner

---

## Feature: Hug (MVP)

**Description:** The first response action — signals "I see you" before words.

**Behavior:**
- Hug must be sent before the message thread unlocks
- Only the receiving partner (not the raiser) sees the Hug button
- The raiser sees "Waiting for your hug..." state in their Resolution Space
- Only one Hug per Heart — cannot hug again after it's sent
- Hug is permanent — cannot be undone

**Notifications triggered:**
- On hug: `hug_received` to the Heart raiser

---

## Feature: Resolution Space (MVP)

**Description:** A private message thread created for each Heart.

**Behavior:**
- Thread is created the moment the Heart is raised (but is empty)
- Thread is only interactable after the Hug is sent
- Messages are stored in `heart_messages` table
- Realtime via Supabase broadcast channel `heart:{heartId}:messages`
- No media attachments in MVP (Phase 3)
- No message editing or deletion
- Thread is read-only after both partners say We're Good
- AI suggestion appears once, after the Hug is sent, for the hugging partner only

---

## Feature: We're Good (MVP)

**Description:** Two-sided. One partner says "We're Good", the other says it back, and only then is the Heart done.

**Behavior:**
- Available once the Hug has been sent
- Either partner can say "We're Good" first
- The other partner sees "{name} says you're good — are you?" and can say it back or choose "Not yet"
- "Not yet" leaves the request pending. Nothing is reset, and the first partner keeps seeing "Waiting for {name}..."
- The partner who said it first cannot complete it alone
- If the other partner hasn't said it back within 24h, send them one gentle reminder notification
- Once both have said it, the Heart moves to the Memory Jar (internal status `resolved`)
- Celebration screen shown to both partners (Lottie animation)
- Cannot be undone after both confirm

---

## Feature: Memory Jar (MVP)

**Description:** Archive of all resolved Hearts.

**Behavior:**
- All resolved Hearts stored permanently (free tier: 30 days, Plus: unlimited)
- Sorted by resolved date, newest first
- Each entry shows: feeling tag, resolve date, note snippet, thread message count
- Full thread is readable in detail view (read-only)
- Search by feeling tag or date range (Phase 2)
- Export Memory Jar as PDF (Phase 3)

---

## Feature: Daily Mood Check-in (MVP)

**Description:** Once-a-day mood submission, visible to partner in realtime.

**Behavior:**
- One submission per user per **local** calendar day (enforced by DB unique constraint on the user's local date)
- Check-in card on home screen resets at the user's local midnight. All times are stored in UTC and shown in local time
- Mood is visible to partner immediately via Realtime
- If user hasn't checked in by 8PM local time, a gentle push notification nudge is sent
- Partner's mood is shown on home screen — emoji + label + time of submission
- Mood history available in a simple calendar view (Phase 2)

---

## Feature: Love Language Profile (MVP)

**Description:** Each partner sets their love language, visible to the other.

**Behavior:**
- 5 options: Words of Affirmation, Acts of Service, Receiving Gifts, Quality Time, Physical Touch
- Set during onboarding (skippable) or in Profile settings
- Both partners' love languages shown on the home screen
- Love language is used by the AI suggestion feature (Phase 2)
- Can be changed at any time in settings

---

## Feature: Couple Linking (MVP)

**Description:** The mechanism to connect two users into a couple.

**Behavior:**
- Person A creates account → generates a 6-char invite code
- Code expires after 72 hours — can be regenerated
- Person B enters code or uses deep link → linked
- Once linked, both see each other's profiles and the shared space
- Cannot link more than one partner (one active couple per user)
- Unlinking ("dissolving" a couple) requires both partners to confirm — all data preserved

---

## Feature: Appreciation Drops (Phase 2)

**Description:** Send a spontaneous appreciation note to your partner.

**Behavior:**
- No limit on how many you can send
- Recipient gets push notification
- Shown in a "Gratitude Wall" — infinite scroll, both partners can see all drops
- Drops cannot be deleted (intentional — it's a permanent record of appreciation)
- Can react to a drop with a heart

---

## Feature: Weekly Pulse (Phase 2)

**Description:** 3 AI-generated questions every Sunday to reflect together.

**Behavior:**
- Questions sent at 9AM Sunday (user's local time, scheduled in UTC)
- Both partners answer independently before seeing each other's answers
- Answers revealed simultaneously when both have submitted
  OR after 48 hours, whichever comes first
- Questions are AI-generated and rotate weekly (no repeats within 8 weeks)
- Pulse history preserved in the app

---

## Feature: Conflict Cool-down Timer (Phase 2)

**Description:** A 30-minute pause button in the Resolution Space.

**Behavior:**
- Either partner can tap "I need 30 minutes" at any point in Resolution Space
- Thread is frozen (no new messages) for 30 minutes
- Both partners see a countdown timer
- AI sends each partner a personalized calming prompt
- After 30 minutes: thread unlocks, both get a gentle "Ready to continue?" notification
- Can only be activated once per Heart (prevents avoidance pattern)

---

## Feature: Us Time Planner (Phase 2)

**Description:** A shared date/event planner inside the app.

**Behavior:**
- Either partner can add a plan
- Title, optional description, date/time, optional location
- Both partners can see all plans in a simple list view
- Reminder notification 1 hour before the planned time
- After the planned time: "How was your Us Time?" prompt (optional)
- AI can suggest date ideas when no plans exist (Phase 2)

---

## Feature: Shared Bucket List (Phase 3)

**Description:** A running list of things the couple wants to do together.

**Behavior:**
- Either partner can add items
- Both can check off items
- Checked items show a completion date and a small celebration
- Cannot permanently delete items — only archive them

---

## Feature: Milestone Tracker (Phase 3)

**Description:** Track and celebrate relationship milestones.

**Behavior:**
- Default milestone: "First linked" date (auto-added when couple links)
- Can add custom milestones: First Date, Moved In, Engagement, etc.
- Recurring milestones (anniversaries) send a notification every year
- Non-recurring milestones (one-time events) notify once
- Milestone screen shows a timeline view
