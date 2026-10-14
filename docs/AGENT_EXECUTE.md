# AGENT_EXECUTE — Task Workflow & Current Task

> This is the file the AI agent reads to know **what to do right now** and **how to do it**.
> The product owner updates "Current Task" for every new task. Finished tasks move to the completed log at the bottom.
> Task order and branch names come from `ROADMAP.md`.

---

## The Task Workflow (mandatory for every task)

Every task goes through these 6 stages **in order**. ⛔ marks a stop: the agent ends its turn and waits.

### Stage 1 — Understand
- Read `AGENTS.md`, then the docs relevant to this task (use `docs/INDEX.md` → "What to Read for Which Task").
- Read the existing code the task touches. Match existing patterns.

### Stage 2 — Plan  ⛔
Write `docs/plans/HRT-XXX-<short-name>.md` using the **Plan Template** at the bottom, then present it and **stop**.
The plan must include:
- **Goal & scope.** What will be built, and what is explicitly out of scope.
- **Approach.** Layers, files to create or modify, key classes, state flow.
- **Technical deltas.** Any schema, API, notification, or package change vs the reference docs, with the reason.
  (Reference docs are not final. Improving the technical design is welcome. Changing product behavior is not.)
- **Risks / assumptions.**
- **Questions.** Anything ambiguous or conflicting. If there are none, write "No questions".
- **Manual test checklist.** The exact steps the product owner will run to accept the task.

### Stage 3 — Confirm  ⛔
The product owner answers questions and approves the plan (or asks for changes).
**No code is written before approval.** If answers change the plan, update the plan file.

### Stage 4 — Build
- Create the branch from up-to-date `main` (see `GIT_GUIDE.md`): `feature/<name>`, `fix/<name>`, etc.
- Build in small, logical commits (Conventional Commits, task ID in the message).
- Keep docs in sync **in the same branch**. If the schema, endpoints, notifications, or env vars changed,
  update `DATABASE_SCHEMA.md` / `API_CONTRACTS.md` / `NOTIFICATIONS.md` / `.env.example`.
- If something unexpected forces a change to the approved plan, stop and ask before continuing.

### Stage 5 — Self-check, then hand over for manual testing  ⛔
- Run: `flutter analyze` (0 issues), `flutter test`, and for backend tasks `npm run lint` + `npm test`.
- Re-check the hard rules in `AGENTS.md` (tokens, AppStrings, no setState, layers, copy rules).
- Post a **handover message**: what was built, how to run it, known limitations, and the manual test checklist
  (copied from the plan, updated if needed). Then **stop**.

### Stage 6 — Manual test → fix → done
- The product owner runs the checklist and reports results.
- Failures are fixed **on the same branch** and handed back for re-test.
- On acceptance, the agent adds the **close-out commit on the same branch**: the task's row in `ROADMAP.md` is set
  to ✅, the task moves to the completed log below, the next task is set as Current Task, and the plan status says
  accepted. Then the product owner squash-merges the PR into `main`. There is no separate close-out PR.
- Branches are **never deleted** after merge (locally or on GitHub).
- Bugs found later in already-merged work get their own `fix/<name>` branch and go through the same workflow (with a short plan).

**Never:** skip a ⛔ stop, start the next task on your own, change product behavior, merge to `main` without
the product owner's acceptance, or leave docs out of sync with the code.

---

## Current Task

**Task ID:** HRT-001
**Phase:** Part A — Complete App UI · Week 1
**Branch:** `feature/project-scaffold`
**Feature:** Project Scaffold + Navigation Shell

### What to Build

Set up the Flutter project with the full folder structure, routing, the single app theme,
all design tokens from `DESIGN_SYSTEM.md`, bundled fonts, and the bottom navigation bar shell
with placeholder tab pages.

No feature logic yet. This is just the skeleton that everything else builds on.

### Acceptance Criteria

- [ ] Flutter project created: `flutter create app --project-name heartline --org app.heartline --platforms=android,ios` (run at repo root → `app/`)
- [ ] Folder structure matches the feature-first clean architecture in `FLUTTER_GUIDE.md` (core/, shared/, features/<f>/{domain,data,presentation})
- [ ] `pubspec.yaml` has exactly the packages from `FLUTTER_GUIDE.md` (incl. `firebase_core`, `flutter_svg`; **no** `google_fonts`)
- [ ] Fonts bundled: Cormorant Garamond + DM Sans `.ttf` files in `assets/fonts/`, `fonts:` block from `DESIGN_SYSTEM.md` in pubspec
- [ ] `assets/icons/` and `assets/lottie/` folders created and registered in pubspec
- [ ] `AppColors` — full single-theme palette, translucent layers, feeling + mood + quick-action colors (mock-aligned)
- [ ] `AppGradients`, `AppShadows`, `AppSizes` defined per `DESIGN_SYSTEM.md`
- [ ] `AppTextStyles` — full type scale (displayXl → micro + quote) using the bundled families
- [ ] `AppSpacing` and `AppRadius` constants defined (renamed spec keys: xxs, xxl, xxxl...)
- [ ] `AppDurations` + `AppCurves` defined (no linear curves anywhere)
- [ ] `AppStrings` created with the 5 tab labels and placeholder page titles only
- [ ] `AppTheme.theme` (single dark theme) built from tokens; `MaterialApp.router` sets `theme:` only — no light theme, no `themeMode`
- [ ] GoRouter with `StatefulShellRoute.indexedStack` for the 5 tabs:
      Home `/home` · Hearts `/hearts` · Mood `/mood` · Us Time `/us-time` · Profile `/profile`
- [ ] Placeholder full-screen routes **outside** the shell (no nav bar):
      `raiseHeart` `/heart/raise` · `resolutionSpace` `/heart/:heartId/resolution` ·
      `memoryJarDetail` `/memory-jar/:heartId`
- [ ] The Hearts tab (`/hearts`) renders the Memory Jar placeholder (per the mocks)
- [ ] Page transitions via `CustomTransitionPage` (forward: fade + slide up 16px, 300ms, decelerate)
- [ ] `AppShell` nav bar matches UI/UX spec §3.1: floating frosted pill (28px radius), inset 8px,
      active Dusty Rose icon (2px stroke) + 11px label + pill indicator, inactive icon only
- [ ] `HeartlineBackground` (plum + 2 blooms + grain + drifting particles) behind every page, per spec §11
- [ ] Us Time tab shows the "Nothing planned." empty state from UI/UX spec §09 (Phase 2 fills it)
- [ ] `failures.dart` (`Failure`, `NetworkFailure`, `ServerFailure`, `CacheFailure`), `exceptions.dart`, `UseCase` base class
- [ ] `flutter analyze` passes with zero warnings

### Files to Create

```
app/lib/
  main.dart
  bootstrap.dart
  app.dart
  core/
    constants/
      app_colors.dart
      app_gradients.dart
      app_motion.dart           # AppDurations + AppCurves
      app_radius.dart
      app_shadows.dart
      app_sizes.dart
      app_spacing.dart
      app_strings.dart
      app_text_styles.dart
    config/
      app_config.dart          # reads USE_MOCKS etc. from --dart-define
    error/
      failures.dart
      exceptions.dart
    usecase/
      usecase.dart             # UseCase<T, Params> + NoParams
    router/
      app_router.dart
      app_routes.dart
      app_page_transitions.dart
    theme/
      app_theme.dart            # AppTheme.theme (single theme)
  features/
    home/presentation/pages/home_page.dart                      # placeholder
    heart/presentation/pages/raise_heart_page.dart              # placeholder
    heart/presentation/pages/resolution_space_page.dart         # placeholder
    memory_jar/presentation/pages/memory_jar_page.dart          # placeholder (Hearts tab)
    memory_jar/presentation/pages/memory_jar_detail_page.dart   # placeholder
    mood/presentation/pages/mood_page.dart                      # placeholder
    us_time/presentation/pages/us_time_page.dart                # empty state
    profile/presentation/pages/profile_page.dart                # placeholder
  shared/
    widgets/
      app_shell.dart            # Scaffold + frosted bottom nav bar
      glass_card.dart
      heartline_background.dart
app/pubspec.yaml
app/assets/ (fonts, icons, lottie)
```

### Do Not Touch

- Nothing to avoid yet. This is a fresh project.

### Notes

- **Do not** call `Firebase.initializeApp` yet. `firebase_options.dart` is generated in the Firebase setup task (Part B, Week 8).
  Just add the packages.
- Font files: download the static `.ttf` files from Google Fonts (SIL OFL) and commit them. Never fetch fonts at runtime.
- Theme seed / primary: `AppColors.velvetCrimson` (`0xFF8B1A4A`). Secondary: `AppColors.dustyRose`.
- Theme: brightness dark, scaffold `AppColors.deepPlum`, surface `AppColors.midnightRose`, onSurface `AppColors.textPrimary`.
- Set `debugShowCheckedModeBanner: false`.
- Visual reference: the approved Figma Make mocks. Match their look, but use the spec's copy (spec §11 lists the differences).
- Placeholder pages are stateless and show their title from `AppStrings`. No BLoCs yet, so no tests are required in this task.
- The nav bar's frosted look uses `BackdropFilter`. The page body extends behind it (`extendBody: true`).

### Manual Test Checklist (draft — finalize in plan)
- [ ] `flutter run --dart-define=USE_MOCKS=true` on an Android emulator and an iOS simulator: app opens on Home with no errors
- [ ] All 5 tabs switch correctly, and each tab keeps its own scroll/stack
- [ ] Nav bar looks like the mock (floating frosted pill, active label + indicator)
- [ ] Background blooms, grain, and particles are visible behind pages
- [ ] Fonts render as Cormorant Garamond / DM Sans in airplane mode (bundled, not downloaded)
- [ ] Placeholder full-screen routes open without the nav bar and go back correctly
- [ ] `flutter analyze` → 0 issues

---

## Up Next

**Task ID:** HRT-002 — Shared components (`feature/shared-components`). Details to be written by the product owner;
see the HRT-002 row in `ROADMAP.md`.

---

## Completed Tasks

### HRT-000 — Repository Setup ✅
- Branch: `chore/repo-setup` · Merged: 2026-10-14 (PR #2, squash) · Plan: docs/plans/HRT-000-repo-setup.md
- Notes: monorepo initialized, Figma mock in `design/figma-mock/`, README, `.gitignore`, PR template.
  Doc changes: Node.js 22 (AGENTS, ARCHITECTURE, BACKEND_GUIDE); GIT_GUIDE now requires a PR for every merge,
  bans `.gitkeep` files and `Co-Authored-By`/AI attribution trailers. `app/`, `backend/`, `supabase/` are created
  by the tasks that add their first files.

<!-- Entry format:
### HRT-XXX — <Feature> ✅
- Branch: `feature/<name>` · Merged: YYYY-MM-DD · Plan: docs/plans/HRT-XXX-<name>.md
- Notes: technical deltas made (schema/API/doc changes), follow-ups
-->

---

## Current Task Template (copy for the next task)

```markdown
## Current Task

**Task ID:** HRT-XXX
**Phase:** <Part A / Part B — phase> · Week X
**Feature:** <Feature name>
**Branch:** `feature/<name>`

### What to Build
<Clear description — point to FEATURES.md / USER_FLOWS.md / UI spec sections instead of repeating them>

### Acceptance Criteria
- [ ] item

### Do Not Touch
- <files/areas that must not change>

### Notes
<optional — decisions already made, references>
```

---

## Plan Template (the agent writes this to `docs/plans/HRT-XXX-<name>.md`)

```markdown
# HRT-XXX — <Feature> — Plan

**Branch:** `feature/<name>`
**Status:** Draft → Approved (date)

## Goal & Scope
- In scope:
- Out of scope:

## References Read
- FEATURES.md §… · USER_FLOWS.md Flow … · UI spec Screen … · API_CONTRACTS … · DATABASE_SCHEMA …

## Approach
- Domain: entities / repository contract / use cases
- Data: models / datasources (mock / remote / local) / repository impl
- Presentation: BLoC (events, states) / pages / widgets
- Backend (if any): routes / validators / services / repositories / jobs
- Files to create:
- Files to modify:

## Technical Deltas vs Reference Docs
| Area | Reference says | Proposed | Why |
|------|----------------|----------|-----|
| (none) | | | |

## New Packages
- None / <package> — why — alternatives considered

## Risks & Assumptions
-

## Questions for Product Owner
1. … (or "No questions")

## Manual Test Checklist
- [ ] Step → expected result
- [ ] Edge case → expected result
- [ ] `flutter analyze` 0 issues · tests pass
```
