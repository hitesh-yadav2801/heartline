# Heartline — User Flows

> **🔒 Product definition — fixed.** This document defines *what* Heartline is and does. Implementation tasks must not
> change, add or remove product behavior. If something here looks wrong, unclear or technically impractical, the agent
> raises it as a question during planning — only the product owner changes this file.

All core user journeys documented as numbered steps.
These flows are the source of truth for UI/UX decisions.

---

## Flow 1 — Onboarding + Couple Linking

### New User (Person A — Creates the couple)

1. App opens → Splash screen (Heartline logo, 1.5s)
2. Onboarding carousel (3 slides: concept, safety, connection) — can skip
3. "Get Started" → Auth screen
4. Sign up with email or Google
5. Set up profile: display name, avatar (optional)
6. Set love language (5 options with descriptions) — can skip, set later
7. "Create your space" → Couple code generated (6-character alphanumeric)
8. Share screen: invite partner via link or code
9. Waiting screen: "Waiting for {name}..." with a gentle animation
10. Partner joins → both see a "You're linked! 💛" celebration screen
11. Home screen

### New User (Person B — Joins via invite)

1. Taps invite link → App opens (or App Store if not installed)
2. Splash screen
3. Short onboarding (1 slide: what Heartline is)
4. Sign up with email or Google
5. Set up profile: display name, avatar (optional)
6. Set love language — can skip
7. Code auto-filled from deep link, or manual entry
8. "Join {name}'s space" → confirm
9. Both see celebration screen
10. Home screen

---

## Flow 2 — Opening a Heart

1. User taps "Open a Heart" (prominent CTA on home screen)
   - If the couple already has 3 open Hearts (shared total), the CTA is disabled with:
     "3 Hearts are open. Let's give these some love first."
2. Feeling Tag screen: 6 feeling options displayed as large tappable cards
   - Ignored / Overwhelmed / Unheard / Lonely / Anxious / Hurt
   - Only one selectable at a time
3. "Next" → Note screen (optional)
   - Soft prompt: "Want to say anything? (optional)"
   - Textarea, max 500 chars
   - Character counter shown below 100 chars remaining
4. "Send" → confirmation: "Opening your heart to {partner name}..."
5. Floating hearts animation (800ms)
6. Confirmation screen: "Your heart is open 💗 {partner name} will see this."
7. Returns to home screen — Heart now visible in "Open Hearts" section

**Partner receives:**
- Push notification: "{name} opened their heart to you"
- Home screen updates: partner's open Heart appears

---

## Flow 3 — Responding to a Heart (Hug + Resolution Space)

### Partner's perspective (Person B)

1. Receives push notification → taps → opens Resolution Space
   OR sees Heart on home screen → taps → opens Resolution Space
2. Resolution Space screen shows:
   - Feeling tag prominently displayed
   - Note (if any)
   - Large pulsing Hug button below
   - "Send a hug first" label
3. Partner taps Hug button
   - Haptic feedback (medium impact)
   - Button morphs to "Hugged 🤍" state
   - Person A gets "hug received" notification
4. Message thread appears below Hug confirmation
5. AI suggestion chip appears (lavender): "Tap to use a suggestion" (can dismiss)
6. Partner types message and sends
7. Both can now exchange messages in this thread

### Person A's perspective (after hug)

1. Receives "hug received" notification
2. Opens Resolution Space → sees Hug confirmed at top
3. Can read partner's message and reply
4. Thread continues until one of them taps "We're Good"

---

## Flow 4 — Closing a Heart (We're Good)

We're Good is two-sided: one partner says it, the other says it back.

1. Either partner taps "We're Good" (pinned at bottom of Resolution Space, available after the Hug)
2. Bottom sheet: "Are you both feeling better?"
   "Both of you need to say it. This Heart will go into your Memory Jar."
   - "Yes, we're good 💚" / "Not yet"
3. If they tap "Yes": they see "Waiting for {partner name} to say it back..."
4. Partner sees a prompt at the top of their Resolution Space: "{name} says you're good — are you?"
   - "We're good 💚" → step 5
   - "Not yet" → the prompt is dismissed for now. The request stays pending, and the conversation continues
   - No reply in 24h → one gentle reminder notification
5. Both have said it → Celebration screen:
   - Confetti animation (Lottie)
   - "💚 You two worked it out."
   - "This Heart is going into your Memory Jar."
6. Heart moves to Memory Jar
7. Both return to home screen

---

## Flow 5 — Daily Mood Check-in

### Submitting a mood

1. Home screen shows "How are you feeling today?" card (if not yet submitted)
2. User taps card → Mood screen
3. 5 mood options displayed as large emoji + label
   - 😄 Joyful / 😌 Calm / 😰 Anxious / 😔 Sad / 😤 Overwhelmed
4. User taps mood → selected state (scale up, glow)
5. Optional: short note field appears below (max 200 chars) — skippable
6. "Share with {partner name}" button
7. Submit → gentle animation → returns to home screen
8. Home screen "check-in" card is replaced by mood summary

### Partner sees the mood

- Home screen: partner's mood displayed in their profile section
- Mood emoji + label, updated in realtime via Supabase Realtime channel
- If mood is low (Sad/Anxious/Overwhelmed): gentle prompt shown to user:
  "Consider reaching out 💗"

---

## Flow 6 — Viewing Memory Jar

1. User taps "Memory Jar" in bottom nav or home screen
2. Memory Jar screen: chronological list of resolved Hearts
3. Each entry shows:
   - Feeling tag (color-coded)
   - We're Good date
   - Snippet of the note
4. User taps a Heart → Detail view:
   - Full note
   - Full Resolution Space message thread (read-only)
   - "We're Good" timestamp
   - Optional: "Add a photo to this memory" (Phase 3)
5. Scroll back through shared history

---

## Flow 7 — Appreciation Drop (Phase 2)

1. User taps "+" in Appreciation section or uses quick action
2. Text field: "What are you appreciating right now?"
3. Max 500 chars — shown with character count
4. "Drop it 💌" button
5. Recipient gets push notification
6. Drop appears in Gratitude Wall for both partners

---

## Flow 8 — Weekly Pulse (Phase 2)

1. Sunday 9AM: both partners get push notification
2. Tap → Pulse screen: 3 questions shown one at a time (card swipe)
3. User types response to each (max 300 chars each)
4. "Share responses" — both partners' answers revealed simultaneously
5. Both can react (heart) to each other's responses
6. Pulse archived in Pulse History

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Partner not yet linked | Cannot raise a Heart — show "Invite your partner" CTA |
| Heart left open for 72h with no Hug | Gentle reminder notification to partner |
| Both partners raise a Heart simultaneously | Both visible on home screen, handled independently, as long as the couple total stays ≤ 3 open |
| Couple already has 3 open Hearts | "Open a Heart" disabled with a gentle note. If two raises race for the last slot, the second gets a gentle "3 Hearts are open" message |
| Partner who said We're Good taps it again | No-op. They keep seeing "Waiting for {name}..." |
| App killed during Hug animation | Resume state from Supabase on reopen |
| Mood already submitted today | Check-in card replaced with today's mood display |
| Partner in different timezone | All times stored in UTC. Each partner sees times in their own local time. Mood day and 8PM nudge use each partner's own local time |
