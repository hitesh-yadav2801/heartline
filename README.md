# Heartline

> "Your relationship, in one place."

Heartline is a private mobile app for couples. It gives them a shared emotional space for daily connection,
gentle conflict resolution, and relationship rituals.

---

## Start Here

- **AI agents and contributors:** read [`AGENTS.md`](AGENTS.md) first, then follow [`docs/AGENT_EXECUTE.md`](docs/AGENT_EXECUTE.md).
- **All docs:** [`docs/INDEX.md`](docs/INDEX.md)
- **Git workflow:** [`docs/GIT_GUIDE.md`](docs/GIT_GUIDE.md)

---

## Repository Layout

```
heartline/
├── AGENTS.md          ← agent entry point: rules + workflow
├── README.md
├── docs/              ← product, design and technical docs (see docs/INDEX.md) + plans/
├── design/figma-mock/ ← approved Figma Make mock (visual reference only, not built or shipped)
├── app/               ← Flutter app (iOS + Android)
├── backend/           ← Node.js + TypeScript API (Google Cloud Run)
├── supabase/          ← migrations, seed, config
└── .github/           ← CI workflows + PR template
```

Full layout: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) → "Repository Layout".

---

## Prerequisites

- [Flutter](https://docs.flutter.dev/get-started/install) (stable channel), with Xcode + CocoaPods (iOS) and Android Studio + JDK 17 (Android)
- [Node.js 22](https://nodejs.org/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Git (and optionally the [GitHub CLI](https://cli.github.com/))

---

## Running

> Placeholders. Each section is filled in by the task that sets it up.

### App (`app/`)

```bash
cd app
flutter pub get
flutter run --dart-define=USE_MOCKS=true
```

- `USE_MOCKS` defaults to `true` (Part A builds every screen on mock data).
- `flutter analyze` must report 0 issues; `flutter test` runs the tests.
- Android needs a JDK that the project's Gradle supports (Java 17–24). If Flutter picks up Android Studio's
  newer bundled JDK, point it at a supported one once: `flutter config --jdk-dir="<path to JDK 17>"`.
- iOS needs Xcode with an iOS Simulator runtime and a working CocoaPods install.

### Backend (`backend/`)

_Added in the backend setup task._

### Database (`supabase/`)

_Added in the database setup task._

---

## Contributing

Every change follows the task workflow in [`docs/AGENT_EXECUTE.md`](docs/AGENT_EXECUTE.md):
plan → approval → build → manual test. Work happens on one branch per task, and every branch merges into `main`
through a pull request (see [`docs/GIT_GUIDE.md`](docs/GIT_GUIDE.md)).
