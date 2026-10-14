# HRT-001 — Project Scaffold + Navigation Shell — Plan

**Branch:** `feature/project-scaffold`
**Status:** Approved (2026-10-14), with the product owner's answers below

## Goal & Scope
- In scope:
  - Flutter app in `app/` (`flutter create app --project-name heartline --org app.heartline --platforms=android,ios`).
  - Feature-first clean-architecture folders from `FLUTTER_GUIDE.md` (only folders that get files; no `.gitkeep`).
  - `pubspec.yaml` with the `FLUTTER_GUIDE.md` package list (versions resolved by `flutter pub add`, never pinned from
    docs) and bundled fonts. `assets/icons/` and `assets/lottie/` are **not** created or registered until a task adds files.
  - Portrait-only orientation (Android manifest, iOS Info.plist, and `SystemChrome` in bootstrap).
  - All design tokens from `DESIGN_SYSTEM.md`: `AppColors`, `AppGradients`, `AppShadows`, `AppSizes`, `AppTextStyles`,
    `AppSpacing`, `AppRadius`, `AppDurations` + `AppCurves`.
  - `AppStrings` (tab labels, placeholder titles, Us Time empty state).
  - `AppTheme.theme` (single dark theme), `MaterialApp.router` with `theme:` only, no debug banner.
  - GoRouter: `StatefulShellRoute.indexedStack` with 5 tabs + 3 full-screen placeholder routes outside the shell.
  - `CustomTransitionPage` transitions (forward: fade + slide up 16px, 300ms, decelerate; back: 250ms, accelerate).
  - `AppShell` floating frosted nav pill (UI spec §3.1), `HeartlineBackground` (spec §11), `GlassCard`.
  - Us Time tab shows the "Nothing planned." empty state (spec §09).
  - `failures.dart`, `exceptions.dart`, `UseCase` base + `NoParams`, `AppConfig` (`USE_MOCKS` via `--dart-define`).
  - **Workflow doc updates requested by the product owner on 2026-10-14** (see Technical Deltas):
    task close-out happens inside the task branch, branches are never deleted, docs never pin package versions
    (`x.x.x`), local storage is ObjectBox (replaces Hive), portrait only, min SDK Android 24 / iOS 15.
- Out of scope:
  - Any feature logic, BLoCs, DI composition root (`core/di/` comes with the mock data layer, HRT-003).
  - `Firebase.initializeApp`, `firebase_options.dart` (Part B, Week 8). Packages are only added.
  - Shared components beyond `AppShell`, `HeartlineBackground`, `GlassCard` (HRT-002).
  - `open-heart` SVG and Lottie files (added by the tasks that use them).
  - CI (HRT-024).

## References Read
- AGENTS.md · AGENT_EXECUTE.md (HRT-001) · ARCHITECTURE.md (stack, layout, min SDK) · FLUTTER_GUIDE.md (full)
- DESIGN_SYSTEM.md (full) · UI spec §3.1 nav bar, §3.2 top bar, §4.2 transitions, §07 single theme, §08 icons,
  §09 empty states, Screen 21 Us Time, §11 mock alignment
- Mock: `design/figma-mock/app/components/heartline/BottomNav.tsx`, `Shared.tsx` (Particles), `styles.css`

## Approach
- **Domain / Data:** none yet. Only the shared base types in `core/` (`Failure`s, exceptions, `UseCase`).
- **Presentation:** stateless placeholder pages, each showing its title from `AppStrings`. No BLoCs.
- **Bootstrap:** `main.dart` → `bootstrap()` (binding init, error zone with `runZonedGuarded` + `FlutterError.onError`,
  portrait lock, dark status-bar style, edge-to-edge) → `HeartlineApp` (`MaterialApp.router`).
- **Theme:** `ColorScheme.fromSeed(seedColor: velvetCrimson, brightness: dark)` then `copyWith` primary
  `velvetCrimson`, secondary `dustyRose`, surface `midnightRose`, onSurface `textPrimary`, error `AppColors.error`.
  Scaffold `deepPlum` (transparent on pages so the background shows). `textTheme` mapped from `AppTextStyles`
  with `textPrimary` applied by the theme. Material 3.
- **Router:** `AppRoutes` holds names + paths. Shell branches: `home /home` · `hearts /hearts` (Memory Jar placeholder)
  · `mood /mood` · `usTime /us-time` · `profile /profile`. Outside the shell: `raiseHeart /heart/raise` ·
  `resolutionSpace /heart/:heartId/resolution` · `memoryJarDetail /memory-jar/:heartId`. Initial location `/home`.
  Placeholder pages get small debug-only buttons to reach the 3 full-screen routes (Home → raise Heart / Resolution
  Space; Hearts → Memory Jar detail) so they can be tested. They use `context.pushNamed` and `AppStrings`. They will be replaced in later tasks.
- **Transitions:** `AppPageTransitions.build()` returns a `CustomTransitionPage`. Forward: fade + slide up 16px,
  `AppDurations.normal`, `AppCurves.decelerate`; old page fades to 80% (`secondaryAnimation`). Back: 250ms,
  `AppCurves.accelerate`. Tab switches inside the shell keep their state (no transition).
- **AppShell:** `Scaffold(extendBody: true, backgroundColor: transparent)` over `HeartlineBackground`.
  Nav pill: `ClipRRect(AppRadius.pill)` + `BackdropFilter(blur 32)` + `AppColors.navBar` fill, 1px `navBarBorder`,
  `AppShadows.navBar`, height `AppSizes.navBarHeight`, inset `AppSizes.navBarBottomGap` + bottom safe area.
  Active tab: Dusty Rose icon + `caption`-based 11px Medium label + 24×3 indicator. Inactive: `textSecondary` icon, no label.
  Tab colors and sizes animate with `AnimatedContainer` / `AnimatedDefaultTextStyle` (`AppDurations.quick`).
- **HeartlineBackground:** deep plum fill + 2 radial blooms (spec §11 positions/colors) + grain (`CustomPainter`, 3px
  dot grid at 4%, wrapped in `RepaintBoundary`, painted once) + 12 particles (`StatefulWidget` with one
  `AnimationController`, the allowed exception; seeded `Random` so positions are stable; upward drift over 12–20s
  each, using `AppCurves.breathe` since linear easing is banned). Respects `MediaQuery.disableAnimations`
  (particles static).
- **GlassCard:** per `DESIGN_SYSTEM.md` → Glassmorphism (blur 24, `glassFill`, `glassBorder`, `AppRadius.lg`).
- **Us Time empty state:** centered calendar icon 48px Ember Gold @ 60%, title "Nothing planned." (Cormorant Regular
  Italic via `displayMd.copyWith`), body "What do you two want to do?" (DM Sans `bodyMd`, `textSecondary`).
  Built inline in `us_time_page.dart`. The reusable `EmptyState` widget belongs to HRT-002.
- **Tests:** `flutter create`'s counter test is replaced by one smoke test: the app boots on Home and the
  5 tab labels/icons exist (uses `pump`, not `pumpAndSettle`, because particles loop).

### Files to create
```
app/ (flutter create output; android/, ios/, pubspec.yaml, analysis_options.yaml ...)
app/assets/fonts/  CormorantGaramond-{LightItalic,Regular,Italic,SemiBoldItalic}.ttf
                   DMSans-{Light,Regular,Italic,Medium,SemiBold}.ttf  OFL-CormorantGaramond.txt  OFL-DMSans.txt
app/lib/main.dart  bootstrap.dart  app.dart
app/lib/core/constants/ app_colors.dart app_gradients.dart app_motion.dart app_radius.dart app_shadows.dart
                        app_sizes.dart app_spacing.dart app_strings.dart app_text_styles.dart
app/lib/core/config/app_config.dart
app/lib/core/error/ failures.dart exceptions.dart
app/lib/core/usecase/usecase.dart
app/lib/core/router/ app_router.dart app_routes.dart app_page_transitions.dart
app/lib/core/theme/app_theme.dart
app/lib/features/home/presentation/pages/home_page.dart
app/lib/features/heart/presentation/pages/ raise_heart_page.dart resolution_space_page.dart
app/lib/features/memory_jar/presentation/pages/ memory_jar_page.dart memory_jar_detail_page.dart
app/lib/features/mood/presentation/pages/mood_page.dart
app/lib/features/us_time/presentation/pages/us_time_page.dart
app/lib/features/profile/presentation/pages/profile_page.dart
app/lib/shared/widgets/ app_shell.dart glass_card.dart heartline_background.dart
app/test/app_smoke_test.dart
```
### Files to modify
- `README.md` → fill the "App" run section.
- `.gitignore` → only if `flutter create` output shows something uncovered.
- `docs/AGENT_EXECUTE.md` Stage 6, `docs/GIT_GUIDE.md` (lines on deleting branches, "After merge" commands) → workflow deltas.
- `docs/FLUTTER_GUIDE.md` (`x.x.x` versions + version policy, `lucide_icons_flutter`, ObjectBox, assets note),
  `docs/ARCHITECTURE.md` (min SDK, ObjectBox, portrait), `AGENTS.md` (ObjectBox, version rule),
  `docs/ROADMAP.md` HRT-032 (Hive → ObjectBox), `docs/AGENT_EXECUTE.md` HRT-001 criteria (assets, packages).
- At close-out: `docs/ROADMAP.md` (HRT-001 ✅), `docs/AGENT_EXECUTE.md` (completed log, next Current Task), this plan's status.

### Commits (planned)
1. `docs: keep branches and close tasks inside the task branch [HRT-001]`
1b. `docs: unpin package versions, use objectbox, portrait only, min sdk 24/15 [HRT-001]`
2. `chore(app): create flutter project [HRT-001]`
3. `chore(deps): add core packages [HRT-001]`
4. `chore(assets): bundle cormorant garamond and dm sans fonts [HRT-001]`
5. `feat(theme): add design tokens [HRT-001]`
6. `feat(theme): add single dark app theme [HRT-001]`
7. `feat(core): add config, failures, exceptions and use case base [HRT-001]`
8. `feat(shared): add heartline background and glass card [HRT-001]`
9. `feat(router): add go router shell, routes and transitions [HRT-001]`
10. `feat(shared): add floating nav bar app shell [HRT-001]`
11. `feat(app): add placeholder pages and us time empty state [HRT-001]`
12. `test(app): add app smoke test [HRT-001]` · `docs(repo): add app run instructions [HRT-001]` · plan commit
13. After acceptance: `docs: close HRT-001 and set HRT-002 as current task [HRT-001]`

## Technical Deltas vs Reference Docs
| Area | Reference says | Proposed | Why |
|------|----------------|----------|-----|
| Task close-out | Stage 6: merge, delete branch, then update ROADMAP/log/Current Task | After acceptance, the close-out commit goes on the task branch; then one squash merge. Branches are never deleted (local or remote). `GIT_GUIDE.md` "delete the branch" lines and `git branch -d` removed | Product owner decision 2026-10-14 |
| Package versions in docs | Pinned (`flutter_bloc: ^8.1.5`, `lucide_icons: ^0.0.2`, ...) | Docs show `x.x.x`. The latest version, or the most compatible with the other dependencies, is resolved with `flutter pub add` at install time and lives only in `pubspec.yaml`/`pubspec.lock` | Product owner decision: pinned doc versions go stale or don't exist (`lucide_icons ^0.0.2`) |
| Icons package | `lucide_icons` (abandoned 2023) | `lucide_icons_flutter` (maintained) | Same Lucide set, maintained package |
| Local storage | Hive (`hive_flutter`) | **ObjectBox**: `objectbox` + `objectbox_flutter_libs`; dev: `objectbox_generator` + `build_runner` | Product owner decision. Not used until Part B; packages are added now so pubspec matches the guide |
| Min SDK | Android 21 / iOS 14 (`ARCHITECTURE.md`) | Android **24** / iOS **15** | Flutter 3.41 defaults to Android minSdk 24 (`FlutterExtension.kt`); current Firebase iOS SDKs require iOS 15 |
| Font source | "Download static `.ttf` files from Google Fonts" | Static files from the official Google Fonts family download (`fonts.google.com/download/list`), the 9 files in `DESIGN_SYSTEM.md`. Weights cross-checked with the mock's `fonts.css` (the mock doesn't load DM Sans Italic; the spec's file list wins) | Google Fonts' GitHub now ships only variable fonts |
| Asset folders | `assets/icons/`, `assets/lottie/` created + registered in HRT-001 | Not created or registered until a task adds a file | Product owner decision (no `.gitkeep`) |
| Font license | not mentioned | Commit `OFL.txt` for each family in `assets/fonts/` | SIL OFL requires the license to ship with the fonts |

## New Packages
- `lucide_icons_flutter` (replaces `lucide_icons`), `objectbox` + `objectbox_flutter_libs` + dev `objectbox_generator`,
  `build_runner` (replace `hive_flutter`). All approved by the product owner on 2026-10-14.

## Risks & Assumptions
- `USE_MOCKS` defaults to `true` when not passed (Part A is mock-only).
- Lucide icons are an icon font with a fixed stroke. The spec's 1.5px inactive / 2px active stroke may not be
  exactly reproducible. `lucide_icons_flutter` ships stroke-weight variants. If they don't match, I'll show the
  closest option at handover rather than add a package.
- `BackdropFilter` blur over animated particles has a GPU cost; particles repaint in their own layer
  (`RepaintBoundary`) to keep it cheap. Checked on the emulator at handover.
- The iOS build needs Xcode + CocoaPods on this Mac; Android needs an emulator. I'll check both before handover.
- `flutter create` adds a `.gitignore` inside `app/`; I'll keep it (Flutter's own rules) unless you prefer one root file.

## Questions for Product Owner (answered 2026-10-14)
1. Versions → never pin in docs; use `x.x.x`; resolve the latest/most compatible at install. `lucide_icons_flutter` used.
2. Min SDK → Android 24 / iOS 15 (forced by current Flutter/Firebase; not objected to).
3. Local storage → **ObjectBox** instead of Hive / hive_ce.
4. Orientation → portrait only.
5. Asset folders → stay out until a task adds files.
6. Fonts → the agent downloads them (the 9 static files the mock + spec use).
7. Debug navigation buttons → OK (temporary).

## Manual Test Checklist
- [ ] `cd app && flutter run --dart-define=USE_MOCKS=true` on an Android emulator → opens on Home, no errors in console
- [ ] Same on an iOS simulator
- [ ] Tap all 5 tabs → each shows its page; Hearts shows the Memory Jar placeholder; Us Time shows "Nothing planned."
- [ ] Scroll/navigate in one tab, switch away and back → that tab kept its state
- [ ] Nav bar matches the mock: floating frosted pill, 8px inset, rounded 28px, active Dusty Rose icon + label + small
      indicator, inactive icons without labels
- [ ] Background: plum with two soft blooms, faint grain, slowly drifting particles behind every page and behind the nav bar
- [ ] Home → open raise Heart / Resolution Space; Hearts → open Memory Jar detail → no nav bar, page fades + slides
      up; back returns with the reverse animation
- [ ] Rotate the device → app stays portrait
- [ ] Turn on airplane mode, cold start → text still renders in Cormorant Garamond / DM Sans
- [ ] `flutter analyze` → 0 issues · `flutter test` → passes
- [ ] `git ls-files | grep gitkeep` → nothing; no `Co-Authored-By` in `git log`

## Build Notes (2026-10-14)
- Resolved versions (via `flutter pub add`, Flutter 3.41.3 / Dart 3.11.1): `go_router` resolved to 17.x
  (18.x needs a newer Dart), the others to their latest. Real versions live only in `pubspec.yaml`/`pubspec.lock`.
- `HeartlineBackground` is mounted once in `MaterialApp.router`'s `builder`, so every route (tabs and full-screen) sits
  on it and particles never restart. Scaffolds are therefore transparent (`scaffoldBackgroundColor` transparent; the
  background itself is Deep Plum).
- Mock CSS bloom sizes (`600px 400px`, `500px 500px`) are radii; grain is 2px white dots at ~2% on a 3px grid.
- Particle drift uses `AppCurves.breathe` (the mock uses linear, which our motion rules forbid).
- Verified on the Android emulator (API 36): Home, tab switching, Us Time empty state, full-screen route without the nav bar,
  back navigation, portrait lock.
- Environment issues on this Mac (not project bugs):
  - Flutter uses Android Studio's bundled Java 25, which Gradle 8.14 can't parse. Built with Java 17 via `./gradlew`.
    Fix once: `flutter config --jdk-dir=<JDK 17>`.
  - No iOS Simulator runtime installed, and CocoaPods fails (`ffi` not built for ARM). iOS not yet run.

