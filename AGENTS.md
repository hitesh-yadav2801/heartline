# AGENTS.md — Heartline

> **Entry point for any AI coding agent** (Cursor, Claude Code, Copilot, etc.) working on this repository.
> Read this file fully before every task. Then follow `docs/AGENT_EXECUTE.md` for the current task and its workflow.

You are an expert Flutter + Node.js engineer building **Heartline**, a private mobile app for couples
that gives them a shared emotional space: open a Heart, get a Hug, talk it through, say We're Good.
Read `docs/PRODUCT.md` to understand the product's soul before writing anything user-facing.

---

## 1. The Golden Principle: Product Fixed, Implementation Flexible

| Fixed (never change without the product owner) | Flexible (improve freely, but propose it in the plan) |
|---|---|
| What the product does: features, flows, rules, limits (`PRODUCT.md`, `PRD.md`, `FEATURES.md`, `USER_FLOWS.md`) | Exact DB tables, columns, indexes, triggers |
| How it looks and speaks: screens, theme, tokens, copy (`HEARTLINE_UI_UX_SPEC.md`, `DESIGN_SYSTEM.md`) | API routes, params, response fields, error codes |
| The stack and architecture patterns (`ARCHITECTURE.md`) | Notification payloads and scheduling mechanics |
| Sacred terminology in the UI | Prompt wording, token limits, internal class/file names |

`DATABASE_SCHEMA.md`, `API_CONTRACTS.md`, `NOTIFICATIONS.md`, and `AI_FEATURES.md` are **reference designs** derived from the
features. They are not final or complete. Expect to add tables, fields, and routes. Any deviation goes in the task plan,
gets confirmed, and is written back to the doc in the same branch.

If a product doc seems wrong or impractical, **ask**. Don't work around it silently.

---

## 2. How Work Happens

1. **One task at a time**, in `docs/ROADMAP.md` order. The current task is in `docs/AGENT_EXECUTE.md`.
2. **Plan → ⛔ questions/approval → build → ⛔ manual test → done.** The full workflow is in `AGENT_EXECUTE.md`.
   Never write code before the plan is approved. Never start the next task on your own.
3. **One branch per task**, named per `docs/GIT_GUIDE.md` (`feature/…`, `fix/…`, `chore/…`). Never commit to `main`.
4. **UI first:** Part A builds every screen on mock datasources (`USE_MOCKS=true`). Part B wires real data
   by swapping datasources only.
5. **Docs stay true:** if the code changes a technical contract, update the doc in the same branch.

Find any doc fast with `docs/INDEX.md`.

---

## 3. Stack (Non-negotiable)

- Flutter + Dart (iOS + Android only), in `app/`
- **Feature-first clean architecture:** `features/<f>/{domain, data, presentation}` (see `FLUTTER_GUIDE.md`)
- BLoC for state (never Provider/Riverpod/GetX/setState) · GoRouter (never `Navigator.push`) · fpdart `Either`
- Node.js 22 + TypeScript strict + Express + Zod, in `backend/` (Google Cloud Run)
- Supabase: Postgres + RLS + Realtime + Auth + Storage; migrations in `supabase/migrations/`
- Firebase Cloud Messaging (client: `firebase_messaging`, server: `firebase-admin`)
- Anthropic API, **server-side only**, with the model from config
- Portrait only · single dark theme · bundled fonts (Cormorant Garamond + DM Sans) · UTC everywhere

---

## 4. Hard Rules — Flutter

1. Respect the layer rule: presentation → domain ← data. Domain is pure Dart. Features never import another feature's internals.
2. BLoCs depend on **use cases**. Use cases depend on **repository contracts**. Only `data/` touches Dio/Supabase/ObjectBox.
3. Repositories return `Either<Failure, T>`. `try/catch` exists only in repository implementations.
4. No `setState` (local `AnimationController` in a `StatefulWidget` is the only exception).
5. No `Navigator.push` / `Navigator.of(context)`. Use GoRouter named routes.
6. No hardcoded colors, sizes, spacing, radii, durations, or `TextStyle(...)`. Use `AppColors`, `AppSizes`, `AppSpacing`,
   `AppRadius`, `AppDurations`, `AppTextStyles`.
7. No user-visible string outside `AppStrings`.
8. No package outside `FLUTTER_GUIDE.md` without asking first (state why + alternatives in the plan).
   Docs never pin versions (`x.x.x`): add packages with `flutter pub add` so the latest compatible version is resolved.
9. Every BLoC and use case has a unit test. BLoC events are NounVerb (`HeartRaised`), states are sealed + Equatable.
10. No business logic in pages or widgets.

## 5. Hard Rules — Backend

1. Zod validation runs before any logic on every route.
2. Routes → services (business logic) → repositories (DB only). No queries in routes, no logic in repositories.
3. Responses are always `{ success: true, data }` or `{ success: false, error, code }`.
4. `authMiddleware` on every protected route. The service-role key never leaves the server.
5. No `any`. TypeScript strict.
6. AI calls always degrade gracefully, with the model and limits from `src/config/ai.config.ts`.
7. Never log message content, notes, tokens, or personal data.
8. All timestamps are ISO8601 UTC. Local time exists only for display and user-local scheduling.
9. No raw SQL in application code. SQL lives only in migrations.

---

## 6. Terminology (User-Facing Copy Only)

Applies to `AppStrings`, notification text, and AI output shown to users. Backend identifiers (`resolve-request`,
`status = 'resolved'`) are intentionally technical. Don't "fix" them, and never let them leak into the UI.

| Say | Never say |
|-----|-----------|
| Heart | Issue, Ticket, Problem |
| Open a Heart | Raise an issue, Create a ticket |
| Resolution Space | Thread, Chat |
| Memory Jar | Archive, History |
| Hug | Acknowledge, Confirm |
| We're Good | Resolve, Close, Mark done |
| Appreciation Drop | Compliment, Note |
| Pulse | Survey, Check-in form |
| Us Time | Date, Meeting, Event |

Tone: warm, gentle, intimate, never clinical. No gendered pronouns for the partner.

---

## 7. Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Dart files | snake_case | `raise_heart.dart` |
| Dart classes | PascalCase | `HeartRepositoryImpl` |
| Use cases | VerbNoun class | `RaiseHeart`, `GetHearts` |
| BLoC events | NounVerb | `HeartRaised` |
| BLoC states | Noun + status | `HeartLoading`, `HeartSuccess` |
| TypeScript files | kebab-case + role | `heart.repository.ts` |
| DB tables | snake_case plural | `hearts`, `heart_messages` |
| API routes | kebab-case | `/hearts/:heartId/messages` |
| GoRouter route names | camelCase | `resolutionSpace` |
| Branches | `<type>/<kebab-name>` | `feature/heart-raise-ui` |
| Plans | `HRT-XXX-<kebab-name>.md` | `docs/plans/HRT-008-heart-raise-ui.md` |

---

## 8. Build Order Inside a Feature

**Flutter**
1. `domain/entities/` → `domain/repositories/` (contract) → `domain/usecases/`
2. `data/models/` → `data/datasources/` (mock first in Part A; remote/local in Part B) → `data/repositories/` (impl)
3. Register in `core/di/`
4. `presentation/bloc/` (events, states, bloc) → `presentation/widgets/` → `presentation/pages/` → route in `core/router/`
5. Tests: `test/features/<f>/domain/usecases/…`, `test/features/<f>/presentation/bloc/…`

**Backend**
1. Migration (if the schema changes) → `validators/` → `repositories/` → `services/` → `routes/` → register in `routes/index.ts`
2. Tests for services and routes · update `API_CONTRACTS.md` / `DATABASE_SCHEMA.md`

---

## 9. When in Doubt

- Ask before choosing between two meaningful approaches. Put the options in the plan's Questions section.
- Prefer explicit and readable over clever.
- Match the patterns already in the codebase. Consistency beats preference.
- If a requirement conflicts with these rules, flag it. Don't silently deviate.
