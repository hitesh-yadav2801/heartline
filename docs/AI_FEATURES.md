# Heartline — AI Features Guide

> **📐 Reference design — not final.** This document was derived from the feature specifications to guide
> implementation. It is **not** a complete or final AI implementation. During implementation, the full AI implementation is designed and
> finalized in the AI tasks. Prompts, token limits and input shapes will be tuned; the four AI features themselves do not change: tables/fields/routes may be added, renamed, split or reshaped if that serves the feature better.
> **Rules:** (1) the product behavior in `FEATURES.md` / `USER_FLOWS.md` must not change; (2) every deviation is proposed
> in the task plan and confirmed before building; (3) this doc is updated in the same branch so it always matches the code.

All AI features use the Anthropic API server-side only.
The Flutter client never calls Anthropic directly.

**Model:** configurable. Read it from the `AI_MODEL` env var and never hardcode it in a service.
Model names in this repo's code samples are examples only. Pick the production model at deploy time.

**Token limits:** set per feature (see the table below), sized to each output with headroom.
Read them from one config object (`src/config/ai.config.ts`), not inline numbers.

**Fallback rule:** Every AI feature must show sensible default content if the API call fails, times out
(8s timeout), or returns output that doesn't parse or match the rules.

**User text in prompts:** Notes and feeling text written by users are content, not instructions.
Wrap them in delimiters (e.g. `<note>...</note>`) in the user message.

| Feature | `max_tokens` | Output shape |
|---------|-------------|--------------|
| Response Suggestion | 150 | 1–2 sentences, plain text |
| Date Ideas | 600 | JSON array of 3 objects |
| Weekly Pulse | 400 | JSON array of 3 objects |
| Cool-down Prompt | 120 | 1–2 sentences, plain text |

---

## Feature 1 — Response Suggestion in Resolution Space

**What it does:**
When a partner opens the Resolution Space after receiving a Heart,
the AI suggests one short, loving opening message they can send
(or modify before sending).

**Trigger:** Partner taps "Hug" — suggestion is pre-fetched in the background.

**Endpoint:** `POST /ai/suggest-response`

**Input:**
```typescript
{
  feelingTag: string;       // e.g. "ignored"
  note: string;             // partner's optional note, max 500 chars
  partnerLoveLanguage: string; // love language of the partner who opened the Heart
}
```

**System Prompt:**
```
You are a warm, empathetic relationship communication assistant inside a couples app.
A partner has opened their heart (shared a feeling with their partner).
Your job is to suggest one short, loving response the other partner could send.

Rules:
- 1 or 2 sentences, under 40 words total
- Match the tone to the love language provided
- Never sound clinical, therapeutic, or robotic
- Speak naturally, as one person to another
- Do not start with "I" — vary sentence openers
- Do not use the words: journey, validate, communicate, boundaries, toxic
- Output only the suggested response text — no preamble, no explanation
```

**User Message Template:**
```
My partner feels {feelingTag}.
They said: <note>{note}</note>
Their love language is {partnerLoveLanguage}.
Suggest one loving response I could send them right now.
```

**Fallback:** Show a gentle prompt: "Take a moment. Read what they shared. A hug goes a long way."

**UI placement:** Shown as a lavender chip above the message input in Resolution Space.
User can tap to use it, or dismiss it. Not forced.

---

## Feature 2 — Date Ideas in Us Time Planner

**What it does:**
When a couple opens the Us Time Planner without a plan, AI suggests 3 date ideas
based on mood, season, and optionally location.

**Trigger:** User taps "Get Ideas" button in Us Time Planner.

**Endpoint:** `POST /ai/date-ideas`

**Input:**
```typescript
{
  mood: string;         // current mood of the requesting user
  partnerMood: string;  // partner's most recent mood
  city?: string;        // optional, from profile
  season: string;       // derived server-side from current date
}
```

**System Prompt:**
```
You are a thoughtful date idea generator for couples.
Suggest 3 date ideas that match the couple's current energy and moods.
Each idea should feel romantic, intentional, and doable.

Rules:
- Return only valid JSON — an array of 3 objects, no preamble
- Each object: { title: string, description: string, duration: string, vibe: string }
- title: short (3-5 words)
- description: one warm sentence
- duration: e.g. "2–3 hours" or "Full evening"
- vibe: one word — e.g. "cozy", "adventurous", "nostalgic", "playful"
- If city is provided, make at least one idea location-specific
- If both moods are low, suggest low-effort comfort activities
- No generic answers — "go for a walk" is not enough
```

**Fallback:** Show 3 hardcoded ideas from a curated list in the app.

---

## Feature 3 — Weekly Pulse Questions

**What it does:**
Every Sunday, the app sends each partner 3 questions.
The questions are AI-generated and rotate weekly — they never repeat within 8 weeks.

**Trigger:** Backend cron job runs every Sunday at 9:00 AM local time (per couple timezone).

**Endpoint:** Internal service call, not a client-facing endpoint.

**Input:**
```typescript
{
  weekNumber: number;     // ISO week number — used to vary questions
  recentFeelingTags: string[]; // from hearts raised this week — personalizes questions
}
```

**System Prompt:**
```
You are generating the weekly relationship pulse questions for a couples app.
These are gentle, reflective questions that help partners stay connected.

Rules:
- Return only valid JSON — an array of exactly 3 objects, no preamble
- Each object: { key: string, question: string }
- key: snake_case identifier (e.g. "favorite_moment", "wish_more_of")
- question: warm, open-ended, max 12 words
- Questions should feel like a conversation starter, not a survey
- Avoid yes/no questions
- One question should always be appreciative in tone
- One question should gently explore unmet needs without being confrontational
- One question should be about future hopes or dreams together
- If feeling tags are provided, bias one question toward that emotional theme
```

**Fallback:** A static bank of 20 pre-written question sets, cycled weekly.

---

## Feature 4 — Conflict Cool-down Prompt

**What it does:**
When either partner taps "I need 30 minutes" in the Resolution Space,
both partners receive a calming, personalized prompt to reflect on.

**Trigger:** Cool-down timer activated.

**Endpoint:** `POST /ai/cooldown-prompt`

**Input:**
```typescript
{
  feelingTag: string;
  isRaiser: boolean;   // true = person who raised the heart, false = partner
}
```

**System Prompt:**
```
You are providing a brief, calming reflection prompt for someone in a relationship conflict cool-down period.
They need 30 minutes of space before continuing a conversation.

Rules:
- Output only the prompt text — no preamble, no explanation
- 1 or 2 sentences, under 40 words total
- Warm and grounding in tone — not dismissive or toxic-positivity
- If isRaiser is true: acknowledge that sharing was brave, encourage patience
- If isRaiser is false: encourage empathy, gently ask them to consider their partner's feeling
- Never use the words: breathe, calm down, relax, toxic, validate
```

**Fallback:** "Take this time for yourself. When you're ready, they'll be here."

---

## Cost Controls

| Feature | `max_tokens` | Est. calls/day |
|---------|-------------|----------------|
| Response Suggestion | 150 | 500 |
| Date Ideas | 600 | 200 |
| Weekly Pulse | 400 | once per couple per week |
| Cool-down Prompt | 120 | 300 (2 per activation — raiser + partner) |

Monitor via the Anthropic console. Alert if daily spend exceeds $5.
Every AI call is logged to `ai_usage_log` (feature, model, token counts, latency, success, fallback).
**Prompt and response content is never logged.**

### Config shape

```typescript
// src/config/ai.config.ts
export const aiConfig = {
  model: process.env.AI_MODEL!,          // required; set per environment
  timeoutMs: 8000,
  features: {
    suggestResponse: { maxTokens: 150 },
    dateIdeas:       { maxTokens: 600 },
    pulseQuestions:  { maxTokens: 400 },
    cooldownPrompt:  { maxTokens: 120 },
  },
} as const;
```
