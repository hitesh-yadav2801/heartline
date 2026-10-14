# Heartline — API Contracts

> **📐 Reference design — not final.** This document was derived from the feature specifications to guide
> implementation. It is **not** a complete or final API surface. During implementation, the full API surface is designed and
> finalized feature by feature. Additional routes, params, error codes or response fields will likely be needed: tables/fields/routes may be added, renamed, split or reshaped if that serves the feature better.
> **Rules:** (1) the product behavior in `FEATURES.md` / `USER_FLOWS.md` must not change; (2) every deviation is proposed
> in the task plan and confirmed before building; (3) this doc is updated in the same branch so it always matches the code.

Base URL: `https://api.heartline.app/v1`
All requests require `Authorization: Bearer {supabase_jwt}` unless marked `[public]`.

**Conventions**
- All timestamps in requests and responses are **ISO8601 UTC** (e.g. `2026-10-13T14:30:00Z`).
  The client converts them to local time for display. `date` fields (e.g. `recordedAt`) are plain calendar days.
- Endpoint names, codes, and enum values here are backend identifiers (e.g. `resolve-request`, `resolved`).
  They are never shown to users. User-facing copy follows the terminology in `PRODUCT.md`.

---

## Auth

### POST /auth/profile
Create or update user profile after Supabase sign-up.

**Request:**
```json
{
  "displayName": "string",
  "avatarUrl": "string | null",
  "loveLanguage": "words_of_affirmation | acts_of_service | receiving_gifts | quality_time | physical_touch | null",
  "utcOffsetMinutes": 330
}
```

`utcOffsetMinutes` comes from the device's `DateTime.now().timeZoneOffset.inMinutes`.

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "displayName": "string",
    "avatarUrl": "string | null",
    "loveLanguage": "string | null",
    "createdAt": "ISO8601"
  }
}
```

---

### PATCH /auth/fcm-token
Called on every app launch and on FCM token refresh. It updates the push token and the device's current UTC offset.

**Request:**
```json
{
  "fcmToken": "string",
  "utcOffsetMinutes": 330
}
```

**Response 200:**
```json
{ "success": true, "data": { "updated": true } }
```

---

## Couples

### POST /couples/create
Create a couple space and get an invite code.

**Response 201:**
```json
{
  "success": true,
  "data": {
    "coupleId": "uuid",
    "inviteCode": "string",
    "expiresAt": "ISO8601"
  }
}
```

---

### POST /couples/join
Join a couple using an invite code.

**Request:**
```json
{ "inviteCode": "string" }
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "coupleId": "uuid",
    "partner": {
      "id": "uuid",
      "displayName": "string",
      "avatarUrl": "string | null",
      "loveLanguage": "string | null"
    }
  }
}
```

**Errors:**
- `400 INVALID_CODE` — code not found or expired
- `400 CODE_EXPIRED` — code is older than 72 hours
- `400 ALREADY_LINKED` — user already in a pending or active couple
- `400 OWN_CODE` — user tried to join their own couple

---

### GET /couples/me
Get current couple and partner info.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "couple": {
      "id": "uuid",
      "linkedAt": "ISO8601",
      "status": "active"
    },
    "partner": {
      "id": "uuid",
      "displayName": "string",
      "avatarUrl": "string | null",
      "loveLanguage": "string | null",
      "latestMood": {
        "mood": "string",
        "recordedAt": "date"
      } | null
    }
  }
}
```

---

## Hearts

### GET /hearts
Get all hearts for the couple (open + resolved).

**Query params:**
- `status`: `open | resolved | all` (default: `all`)
- `limit`: number (default: 20)
- `cursor`: ISO8601 timestamp for pagination

**Response 200:**
```json
{
  "success": true,
  "data": {
    "hearts": [
      {
        "id": "uuid",
        "raisedBy": "uuid",
        "feelingTag": "string",
        "note": "string | null",
        "status": "open | hugged | in_resolution | resolved",
        "huggedAt": "ISO8601 | null",
        "resolveRequestedBy": "uuid | null",
        "resolveRequestedAt": "ISO8601 | null",
        "resolvedAt": "ISO8601 | null",
        "messageCount": 3,
        "createdAt": "ISO8601"
      }
    ],
    "nextCursor": "ISO8601 | null",
    "openCount": 2,
    "openLimit": 3
  }
}
```

`openCount` and `openLimit` let the client disable "Open a Heart" when the couple is at the limit.

---

### POST /hearts
Raise a new Heart.

**Request:**
```json
{
  "feelingTag": "ignored | overwhelmed | unheard | lonely | anxious | hurt",
  "note": "string | null"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "feelingTag": "string",
    "note": "string | null",
    "status": "open",
    "createdAt": "ISO8601"
  }
}
```

**Errors:**
- `400 NOT_LINKED` — no active couple found
- `400 HEART_LIMIT_REACHED` — the couple already has 3 open Hearts (shared total across both partners)

---

### PATCH /hearts/:heartId/hug
Send a Hug for a Heart.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "hugged",
    "huggedAt": "ISO8601"
  }
}
```

**Errors:**
- `403 NOT_PARTNER` — only the partner (not raiser) can hug
- `400 ALREADY_HUGGED` — hug already sent

---

### POST /hearts/:heartId/resolve-request
Step 1 of We're Good: either partner says "We're Good" first.
This sets `resolveRequestedBy` and `resolveRequestedAt`. The Heart stays open until the other partner says it back.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "awaitingPartner": true,
    "resolveRequestedBy": "uuid",
    "resolveRequestedAt": "ISO8601"
  }
}
```

**Errors:**
- `400 NOT_HUGGED_YET` — We're Good is only available after the Hug
- `400 ALREADY_REQUESTED` — a We're Good request is already pending on this Heart
- `400 HEART_ALREADY_RESOLVED`

The partner's "Not yet" makes no API call. The request stays pending, and a reminder goes out after 24h.

---

### POST /hearts/:heartId/resolve-confirm
Step 2 of We're Good: the **other** partner says it back. The Heart moves to `resolved` (Memory Jar).

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "resolved",
    "resolvedAt": "ISO8601"
  }
}
```

**Errors:**
- `400 NO_PENDING_REQUEST` — nobody has said We're Good yet
- `403 CANNOT_CONFIRM_OWN_REQUEST` — the partner who requested cannot confirm
- `400 HEART_ALREADY_RESOLVED`

---

## Heart Messages

### GET /hearts/:heartId/messages
Get all messages in a Resolution Space.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "string",
        "isAiSuggestion": false,
        "createdAt": "ISO8601"
      }
    ]
  }
}
```

---

### POST /hearts/:heartId/messages
Send a message in a Resolution Space.

**Request:**
```json
{ "content": "string" }
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "senderId": "uuid",
    "content": "string",
    "createdAt": "ISO8601"
  }
}
```

**Errors:**
- `400 NOT_HUGGED_YET` — hug must be sent before messaging
- `400 HEART_ALREADY_RESOLVED` — the Resolution Space is read-only after We're Good
- `400 COOLDOWN_ACTIVE` — cool-down timer is running *(Phase 2)*

---

## Moods

### POST /moods
Submit today's mood.

**Request:**
```json
{
  "mood": "joyful | calm | anxious | sad | overwhelmed",
  "note": "string | null"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "mood": "string",
    "note": "string | null",
    "recordedAt": "date"
  }
}
```

**Errors:**
- `400 ALREADY_SUBMITTED` — mood already submitted today

"Today" is the user's local calendar day, computed from `utcOffsetMinutes`.

---

### GET /moods/today
Get today's mood for both partners.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "mine": { "mood": "string", "note": "string | null" } | null,
    "partner": { "mood": "string", "note": "string | null" } | null
  }
}
```

---

## Appreciations

### POST /appreciations
Send an appreciation drop.

**Request:**
```json
{ "content": "string" }
```

**Response 201:**
```json
{
  "success": true,
  "data": { "id": "uuid", "content": "string", "createdAt": "ISO8601" }
}
```

---

### GET /appreciations
Get the Gratitude Wall.

**Query:** `limit` (default 20), `cursor`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "drops": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "string",
        "isRead": true,
        "createdAt": "ISO8601"
      }
    ],
    "nextCursor": "string | null"
  }
}
```

---

## AI

### POST /ai/suggest-response
Get an AI-suggested message for the Resolution Space.

**Request:**
```json
{
  "heartId": "uuid"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "suggestion": "string | null"
  }
}
```

`suggestion` is null if AI call fails — client shows fallback copy.

---

### POST /ai/date-ideas
Get AI-generated date ideas for Us Time Planner.

**Request:**
```json
{
  "city": "string | null"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "ideas": [
      {
        "title": "string",
        "description": "string",
        "duration": "string",
        "vibe": "string"
      }
    ]
  }
}
```

---

## Error Format (all endpoints)

```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "SCREAMING_SNAKE_CASE_CODE"
}
```
