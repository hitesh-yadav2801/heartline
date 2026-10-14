# Heartline — Architecture

> **What is fixed vs flexible.** The stack and the architectural patterns below are final.
> Exact tables, fields, endpoints, and folder contents inside a feature are worked out during each task's
> planning step and may grow or change. That is expected. The product itself (see `PRODUCT.md`, `PRD.md`,
> `FEATURES.md`) does not change.

## Stack (Final — Do Not Deviate)

### Frontend
- **Framework:** Flutter (Dart)
- **Platforms:** iOS + Android only (no web, no desktop)
- **Min SDK:** Android 24 / iOS 15 (current Flutter and Firebase minimums)
- **Orientation:** Portrait only
- **State Management:** BLoC (flutter_bloc) — no Provider, no Riverpod, no GetX
- **Navigation:** GoRouter — no Navigator.push anywhere in the codebase
- **Error Handling:** fpdart (Either, Option) — no raw try/catch in business logic
- **Networking:** Dio with interceptors for auth headers and error normalization
- **Local Storage:** ObjectBox for offline cache, flutter_secure_storage for tokens
- **Push Notifications:** Firebase Cloud Messaging (FCM) via `firebase_core` + `firebase_messaging`
- **Animations:** Built-in Flutter animations + Lottie for celebration sequences
- **Design system:** `HEARTLINE_UI_UX_SPEC.md` (source of truth) → tokens in `DESIGN_SYSTEM.md`. Single dark theme (no light mode).
- **Fonts:** Cormorant Garamond + DM Sans, bundled as assets (no runtime font fetching)
- **Icons:** Lucide (`lucide_icons_flutter`) + custom SVGs via `flutter_svg`

### Backend
- **Runtime:** Node.js 22 with TypeScript (strict mode)
- **Framework:** Express.js
- **Deployment:** Google Cloud Run (containerized)
- **Validation:** Zod on every route — no unvalidated request bodies ever
- **Auth:** Supabase Auth (JWT) — verified via middleware on every protected route
- **ORM:** None — use Supabase JS client with typed queries
- **Real-time:** Supabase Realtime (Postgres changes + broadcast channels)
- **Push sending:** Firebase Admin SDK (`firebase-admin`)

### Database
- **Provider:** Supabase (Postgres under the hood)
- **Schema reference:** `docs/DATABASE_SCHEMA.md`. It is a reference design, finalized in task HRT-023.
  Once migrations exist, `supabase/migrations/` is the real source of truth, and the doc is kept in sync with it.
- **RLS:** Enabled on all tables — no table is publicly readable
- **Migrations:** Supabase migration files in `supabase/migrations/`

### AI
- **Provider:** Anthropic API. The model is set per environment via `AI_MODEL` and never hardcoded
- **Integration:** Server-side only — API key never touches the client
- **Features:** Response suggestions, date ideas, conflict prompts, weekly pulse generation
- **Fallback:** Every AI feature must degrade gracefully — show default content if API fails

### Infrastructure
- **Auth:** Supabase Auth (email + Google OAuth)
- **File Storage:** Supabase Storage (profile photos, memory jar media)
- **Push:** Firebase Cloud Messaging via backend trigger
- **CI/CD:** GitHub Actions
- **Secrets:** Google Cloud Secret Manager

### Time
- **All timestamps are stored and transferred in UTC.** The client converts to local time for display only.
- The user's UTC offset is stored on their profile (refreshed every launch) and is used only for
  local-time scheduling (mood nudge, Sunday Pulse) and the local-day mood boundary.

---

## Build Order

The complete app UI comes first, then functionality. Every screen for every phase is built against mock data
(hardcoded fixtures behind the repository interface) before backend wiring starts. Not-yet-shipped
screens stay behind feature flags. See `ROADMAP.md`.

---

## Repository Layout (Monorepo)

One Git repository holds the app, the backend, the database, and the docs.

```
heartline/
├── AGENTS.md                     # Entry point for AI agents — rules + workflow (read first)
├── README.md                     # Human quick start: setup, run, test
├── .gitignore
├── .github/
│   ├── workflows/                # CI: flutter analyze/test, backend lint/test
│   └── pull_request_template.md
│
├── docs/                         # All product, design and technical docs (see docs/INDEX.md)
│   ├── INDEX.md
│   ├── AGENT_EXECUTE.md          # Current task + workflow + completed log
│   ├── GIT_GUIDE.md
│   ├── PRODUCT.md  PRD.md  FEATURES.md  USER_FLOWS.md  ROADMAP.md
│   ├── HEARTLINE_UI_UX_SPEC.md  DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md  FLUTTER_GUIDE.md  BACKEND_GUIDE.md
│   ├── DATABASE_SCHEMA.md  API_CONTRACTS.md  NOTIFICATIONS.md  AI_FEATURES.md
│   └── plans/                    # One plan file per task: HRT-008-heart-raise-ui.md
│
├── design/
│   └── figma-mock/               # Exported Figma Make mock (visual reference only — not built or shipped)
│
├── app/                          # Flutter app (iOS + Android)
│   ├── lib/                      # Feature-first clean architecture (below)
│   ├── test/                     # Mirrors lib/
│   ├── assets/  fonts/ icons/ lottie/
│   ├── android/  ios/
│   └── pubspec.yaml
│
├── backend/                      # Node.js + TypeScript API (Cloud Run)
│   ├── src/                      # routes / validators / services / repositories / middleware / config / types
│   ├── test/
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
│
└── supabase/                     # Supabase CLI project
    ├── migrations/               # SQL migrations — real source of truth for the schema
    ├── seed.sql                  # Dev seed data
    └── config.toml
```

---

## Flutter Project Structure (Feature-First Clean Architecture)

Each feature has `domain/` (entities, repository contracts, use cases), `data/` (models, datasources,
repository implementations), and `presentation/` (BLoC, pages, widgets). Cross-feature code lives in `core/` and `shared/`.
The full layout, the dependency rule, and best practices are in `FLUTTER_GUIDE.md`.

```
app/lib/
├── main.dart  bootstrap.dart  app.dart
├── core/        constants · config · di · error · network · router · theme · usecase · utils
├── shared/      widgets (AppShell, HeartlineBackground, GlassCard, buttons, chips, avatars...)
└── features/
    ├── onboarding/   auth/   couple/   home/   heart/   memory_jar/   mood/   profile/
    ├── appreciation/ pulse/  us_time/  bucket_list/  milestones/  subscription/
    └── <feature>/
        ├── domain/        entities/ repositories/ usecases/
        ├── data/          models/ datasources/ repositories/
        └── presentation/  bloc/ pages/ widgets/
```

---

## Backend Project Structure

```
backend/
├── src/
│   ├── routes/            # One file per feature domain
│   ├── validators/        # Zod schemas
│   ├── services/          # Business logic + AI calls
│   ├── repositories/      # DB access layer — no queries in routes
│   ├── middleware/        # Auth, error handler, request logger
│   ├── config/            # env, ai.config.ts
│   ├── jobs/              # Scheduled jobs (reminders, Pulse) — runner decided in the relevant task
│   ├── types/             # Shared TypeScript interfaces
│   └── index.ts
├── test/
├── Dockerfile
└── package.json
```

---

## Absolute Rules for AI Agents

1. Never install a package not listed here without explicitly stating why and asking for approval.
   Never pin a version from the docs: add packages with `flutter pub add` / `npm install` to get the latest compatible version
2. Never use `setState` in Flutter — always use BLoC
3. Never write raw SQL in application code — use Supabase JS client typed methods (SQL lives only in `supabase/migrations/`)
4. Never put business logic in a Flutter page widget
5. Never call Anthropic API from the Flutter client directly
6. Never hardcode any string visible to the user — use `AppStrings`
7. Never hardcode any color — use `AppColors`
8. Never use `Navigator.push` — use `context.go()` or `context.push()` from GoRouter
9. Every BLoC and use case must have a corresponding unit test file
10. Every backend route must have Zod validation before any logic runs
11. Never store or send local times — UTC everywhere, convert to local only for display
12. Never hardcode the AI model name — read it from config
13. Follow the task workflow in `AGENT_EXECUTE.md`: plan → questions → approval → build → manual test. Never skip the approval stops
14. Follow `GIT_GUIDE.md`: one branch per task, never commit to `main` directly
