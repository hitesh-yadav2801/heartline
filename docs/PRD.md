# Heartline — Product Requirements Document

> **🔒 Product definition — fixed.** This document defines *what* Heartline is and does. Implementation tasks must not
> change, add or remove product behavior. If something here looks wrong, unclear or technically impractical, the agent
> raises it as a question during planning — only the product owner changes this file.

**Version:** 1.0
**Status:** Active
**Last updated:** April 2026

---

## 1. Problem Statement

Couples consistently report that small unspoken frustrations — not dramatic conflicts —
are what erode relationships over time. Most people struggle to bring up minor issues
because they fear overreacting, starting a fight, or being dismissed.

Existing tools fail this use case:
- Messaging apps (WhatsApp, iMessage) mix relationship communication with everything else
- Therapy apps feel clinical and heavy for everyday moments
- Journaling apps are solo, not shared
- No tool exists that makes it feel safe and romantic to say "something is bothering me"

---

## 2. Goals

- Give couples a dedicated, private space for emotional communication
- Make it feel safe and easy to share a feeling before it becomes a resentment
- Build daily connection rituals that keep couples close proactively
- Use AI to gently guide couples toward constructive communication

---

## 3. Non-Goals

- This is not a general messaging app — no replacing WhatsApp
- This is not a therapy platform — no licensed professional involvement
- This is not a social platform — no public profiles, no sharing outside the couple
- This is not a habit tracker with streaks and gamification pressure

---

## 4. User Personas

### Priya, 27 — The Feeler
Feels things deeply but struggles to bring them up without it becoming a big conversation.
Wants a low-pressure way to say "hey, this bothered me" without it turning into a fight.

### Arjun, 29 — The Reactor
Responds defensively when confronted directly. Needs a moment to process before responding.
Would benefit from a system that gives him time and context before he has to reply.

### Mei, 24 — The Romantic
Loves small gestures. Wants daily rituals with her partner — not just issue resolution.
Would engage heavily with appreciation drops, mood check-ins, and date planning.

---

## 5. MVP Scope (Phase 1)

### Must Have
- [ ] Couple onboarding — invite partner via link/code
- [ ] Open a Heart — share a feeling with a tag and optional note (up to 3 open per couple)
- [ ] Hug response — partner acknowledges before typing
- [ ] Resolution Space — private thread per Heart
- [ ] We're Good — two-sided (one says it, the other says it back), then a celebration
- [ ] Memory Jar — view all resolved Hearts
- [ ] Daily Mood Check-in — simple mood picker, visible to partner
- [ ] Push notifications — Heart opened, Hug received, message in Resolution Space
- [ ] Love Language Profile — set and view each other's love language

### Out of MVP
- Appreciation Drops (Phase 2)
- Weekly Pulse (Phase 2)
- Us Time Planner (Phase 2)
- Bucket List (Phase 3)
- AI response suggestions (Phase 2)
- Conflict Cool-down Timer (Phase 2)
- Milestone Tracker (Phase 3)

---

## 6. Phase 2 Scope

- Appreciation Drops + Gratitude Wall
- Weekly Pulse (Sunday check-in questions)
- Conflict Cool-down Timer
- AI-powered response suggestions in Resolution Space
- AI-generated date ideas in Us Time Planner
- Us Time Planner (basic)

---

## 7. Phase 3 Scope

- Shared Bucket List
- Milestone Tracker (anniversary, custom milestones)
- Relationship health insights (weekly summary)
- Theme/skin customization for the couple's space
- Memory Jar media (add photos to resolved Hearts)

---

## 8. Success Metrics

| Metric | Target (3 months post-launch) |
|--------|-------------------------------|
| D7 retention | > 45% |
| D30 retention | > 25% |
| Hearts opened per couple per week | > 2 |
| Mood check-in completion rate | > 60% daily |
| Avg time to first Hug after Heart opened | < 2 hours |
| Couple activation rate (both partners onboarded) | > 70% |

---

## 9. User Flows Summary

Full flows documented in `docs/USER_FLOWS.md`.

Core flows:
1. Onboarding + Couple Linking
2. Opening a Heart
3. Responding to a Heart (Hug + Resolution Space)
4. Closing a Heart (We're Good)
5. Daily Mood Check-in
6. Viewing Memory Jar

---

## 10. Constraints

- App must work on low-bandwidth connections (India, Southeast Asia target market)
- All data is private to the couple — zero third-party data sharing
- App must respect system Do Not Disturb for notifications
- No ads, ever — monetization is subscription only
- Offline support for viewing Memory Jar and past moods

---

## 11. Monetization

- Free tier: Up to 3 open Hearts at a time (shared total per couple), basic mood check-in, Memory Jar (last 30 days)
- Heartline Plus (subscription): Unlimited Hearts, full Memory Jar, AI features,
  Us Time Planner, Appreciation Drops, Pulse
- Price target: ₹199/month or $2.99/month per couple (not per person)
