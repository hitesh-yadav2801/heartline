# Heartline — Backend Agent Guide

> **Patterns are fixed, examples are illustrative.** Layering (routes → validators → services → repositories),
> response format, Zod, auth and the hard rules are mandatory. File names, classes and code samples are examples —
> adapt them to what each feature needs.

Read this before writing any Node.js/TypeScript backend code.

---

## Stack

- **Runtime:** Node.js 22
- **Framework:** Express.js
- **Language:** TypeScript (strict mode — `"strict": true` in tsconfig)
- **Validation:** Zod (every route, no exceptions)
- **Package versions:** never pinned in the docs. Add packages with `npm install <package>` so npm resolves the latest
  compatible version; the real versions live only in `package.json` / `package-lock.json`.
- **DB Client:** Supabase JS v2 (`@supabase/supabase-js`)
- **AI:** Anthropic SDK (`@anthropic-ai/sdk`). The model comes from config, not code.
- **Push:** Firebase Admin SDK (`firebase-admin`)
- **Auth:** Supabase JWT verified on every protected route
- **Deployment:** Google Cloud Run (Dockerfile included)

---

## Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── heart.routes.ts
│   │   ├── mood.routes.ts
│   │   ├── appreciation.routes.ts
│   │   ├── us-time.routes.ts
│   │   ├── pulse.routes.ts
│   │   ├── auth.routes.ts
│   │   └── index.ts         # mounts all routers
│   ├── repositories/
│   │   ├── heart.repository.ts
│   │   ├── mood.repository.ts
│   │   └── ...
│   ├── services/
│   │   ├── notification.service.ts
│   │   ├── ai.service.ts
│   │   └── couple.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── validators/
│   │   ├── heart.validators.ts
│   │   ├── mood.validators.ts
│   │   └── ...
│   ├── config/
│   │   └── ai.config.ts     # AI model + per-feature token limits (see AI_FEATURES.md)
│   ├── types/
│   │   ├── express.d.ts     # extends Express Request with user
│   │   └── index.ts
│   └── index.ts             # app entry point
├── Dockerfile
├── tsconfig.json
└── package.json
```

---

## Response Format

Every response — success or failure — follows this shape:

```typescript
// Success
{ success: true, data: T }

// Error
{ success: false, error: string, code: string }

// Helpers in src/types/index.ts
export const ok = <T>(data: T) => ({ success: true, data });
export const fail = (error: string, code: string) => ({
  success: false,
  error,
  code,
});
```

Time: every timestamp in a response is an ISO8601 UTC string (`new Date().toISOString()`).
Never format dates for a timezone on the server. The client does that.

Status codes:
- `200` — success
- `201` — created
- `400` — validation error
- `401` — unauthenticated
- `403` — forbidden (authenticated but not authorized)
- `404` — not found
- `500` — server error

---

## Route Template

```typescript
// src/routes/mood.routes.ts

import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.middleware';
import { MoodRepository } from '../repositories/mood.repository';
import { ok, fail } from '../types';

const router = Router();
const moodRepo = new MoodRepository();

const createMoodSchema = z.object({
  mood: z.enum(['joyful', 'calm', 'anxious', 'sad', 'overwhelmed']),
  note: z.string().max(200).optional(),
});

router.post('/', authMiddleware, async (req, res) => {
  const parsed = createMoodSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(fail(parsed.error.message, 'VALIDATION_ERROR'));
  }

  const result = await moodRepo.createMood({
    userId: req.user.id,
    coupleId: req.user.coupleId,
    ...parsed.data,
  });

  if (!result.success) {
    return res.status(500).json(fail(result.error, 'SERVER_ERROR'));
  }

  return res.status(201).json(ok(result.data));
});

export default router;
```

---

## Auth Middleware

```typescript
// src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { fail } from '../types';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json(fail('No token provided', 'UNAUTHORIZED'));
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json(fail('Invalid token', 'UNAUTHORIZED'));
  }

  // Fetch couple_id from DB and attach to request
  const { data: couple } = await supabase
    .from('couples')
    .select('id')
    .or(`user_a_id.eq.${data.user.id},user_b_id.eq.${data.user.id}`)
    .eq('status', 'active')
    .maybeSingle(); // a user with no linked partner yet is valid — must not error

  req.user = {
    id: data.user.id,
    coupleId: couple?.id ?? null,
  };

  next();
};
```

---

## Repository Pattern

```typescript
// src/repositories/heart.repository.ts

import { createClient } from '@supabase/supabase-js';

type RepoResult<T> = Promise<{ success: true; data: T } | { success: false; error: string }>;

export class HeartRepository {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async getHeartsByCoupleId(coupleId: string): RepoResult<Heart[]> {
    try {
      const { data, error } = await this.supabase
        .from('hearts')
        .select('*, heart_messages(*)')
        .eq('couple_id', coupleId)
        .order('created_at', { ascending: false });

      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (err) {
      return { success: false, error: 'Unexpected error' };
    }
  }

  async createHeart(params: CreateHeartParams): RepoResult<Heart> {
    try {
      const { data, error } = await this.supabase
        .from('hearts')
        .insert(params)
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (err) {
      return { success: false, error: 'Unexpected error' };
    }
  }
}
```

No raw SQL. No queries inside route handlers. Repository layer is the only place DB calls happen.

### Rules enforced in services (not repositories)

- **Open Heart limit:** before creating a Heart, `HeartService` counts the couple's Hearts with
  `status != 'resolved'`. If the count is 3 or more, it returns `HEART_LIMIT_REACHED`. The DB trigger in
  `DATABASE_SCHEMA.md` is the safety net for races. Map its exception to the same code.
- **We're Good (two-sided):** `resolve-request` records who asked. `resolve-confirm` succeeds only
  when called by the *other* partner while a request is pending.
- **Local-day logic:** compute a user's local date as
  `new Date(Date.now() + utcOffsetMinutes * 60_000).toISOString().slice(0, 10)`.
  Use it for the mood day boundary and for scheduling local-time notifications.

---

## AI Service Pattern

Prompts and limits come from `AI_FEATURES.md`. Model and tokens come from `ai.config.ts`.

```typescript
// src/services/ai.service.ts

import Anthropic from '@anthropic-ai/sdk';
import { aiConfig } from '../config/ai.config';
import { AiUsageRepository } from '../repositories/ai-usage.repository';

const client = new Anthropic({ timeout: aiConfig.timeoutMs }); // reads ANTHROPIC_API_KEY

const SUGGEST_RESPONSE_SYSTEM = `...`; // copy verbatim from AI_FEATURES.md, Feature 1

export class AIService {
  constructor(private usage = new AiUsageRepository()) {}

  async getResponseSuggestion(params: {
    coupleId: string;
    userId: string;
    feelingTag: string;
    note: string;
    partnerLoveLanguage: string;
  }): Promise<string | null> {
    const started = Date.now();
    try {
      const message = await client.messages.create({
        model: aiConfig.model,
        max_tokens: aiConfig.features.suggestResponse.maxTokens,
        system: SUGGEST_RESPONSE_SYSTEM,
        messages: [
          {
            role: 'user',
            content:
              `My partner feels ${params.feelingTag}.\n` +
              `They said: <note>${params.note}</note>\n` +
              `Their love language is ${params.partnerLoveLanguage}.\n` +
              `Suggest one loving response I could send them right now.`,
          },
        ],
      });

      const block = message.content.find((c) => c.type === 'text');
      const text = block && block.type === 'text' ? block.text.trim() : null;

      await this.usage.log({
        feature: 'suggest_response',
        coupleId: params.coupleId,
        userId: params.userId,
        model: aiConfig.model,
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        latencyMs: Date.now() - started,
        success: !!text,
        usedFallback: !text,
      });

      return text || null;
    } catch {
      await this.usage.log({
        feature: 'suggest_response',
        coupleId: params.coupleId,
        userId: params.userId,
        model: aiConfig.model,
        latencyMs: Date.now() - started,
        success: false,
        usedFallback: true,
      });
      return null; // always degrade gracefully — client shows fallback copy
    }
  }
}
```

---

## Notification Service Pattern

```typescript
// src/services/notification.service.ts

import { getMessaging } from 'firebase-admin/messaging';

export class NotificationService {
  async sendHeartOpened(params: {
    partnerFcmToken: string;
    raisedByName: string;
    heartId: string;
  }): Promise<void> {
    try {
      await getMessaging().send({
        token: params.partnerFcmToken,
        notification: {
          title: `${params.raisedByName} opened their heart to you`,
          body: 'Tap to send a hug and open your Resolution Space.',
        },
        data: {
          type: 'heart_opened',
          heartId: params.heartId,
        },
        android: { priority: 'high' },
        apns: { payload: { aps: { sound: 'default' } } },
      });
    } catch {
      // swallow — notification failure should not break the heart creation flow
    }
  }
}
```

---

## Environment Variables

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
AI_MODEL=                      # chosen per environment — never hardcoded
FIREBASE_PROJECT_ID=
GOOGLE_APPLICATION_CREDENTIALS= # Firebase Admin service account (local only; Cloud Run uses its service identity)
PORT=8080
NODE_ENV=production
```

All secrets stored in Google Cloud Secret Manager in production.
Local development uses `.env` (never committed).

---

## Hard Rules

1. Zod validation before any logic runs — no exceptions
2. No raw queries in routes — repository only
3. No business logic in repositories — services only
4. AI calls must have a fallback — never let AI failure break a user flow
5. All async route handlers must be wrapped in try/catch or use a wrapper
6. Never log sensitive data (tokens, message content, personal notes)
7. TypeScript strict mode — no `any` types unless absolutely unavoidable
8. All times are UTC end to end; local time exists only on the client and in scheduling math
9. Never hardcode the AI model name or token limits — use `ai.config.ts`
