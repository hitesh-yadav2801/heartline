# Heartline — Flutter Agent Guide

Read this before writing any Flutter/Dart code for this project.
The Flutter project lives in `app/` at the repo root (see the repository layout in `ARCHITECTURE.md`).

> **Conventions are fixed, examples are illustrative.** The architecture rules here (layers, BLoC, GoRouter,
> fpdart, tokens) are mandatory. Class names, fields, and code samples are examples. Adapt them to what each
> feature actually needs.

---

## Package Versions (pubspec.yaml reference)

```yaml
dependencies:
  flutter_bloc: ^8.1.5
  go_router: ^14.0.0
  fpdart: ^1.1.0
  dio: ^5.4.3
  supabase_flutter: ^2.5.0
  firebase_core: ^3.0.0          # required by firebase_messaging
  firebase_messaging: ^15.0.0
  hive_flutter: ^1.1.0
  flutter_secure_storage: ^9.0.0
  lottie: ^3.1.0
  lucide_icons: ^0.0.2
  flutter_svg: ^2.0.10           # custom icons (open-heart); feelings + hug use emoji
  intl: ^0.19.0
  equatable: ^2.0.5              # value equality for entities, states, failures

dev_dependencies:
  bloc_test: ^9.1.7
  mocktail: ^1.0.3
  flutter_test:
    sdk: flutter
```

Do not add any package not listed here without explicit approval.

**Fonts are bundled assets. Do not use `google_fonts`.** See the `fonts:` block in `DESIGN_SYSTEM.md`.

```yaml
flutter:
  uses-material-design: true
  assets:
    - assets/icons/
    - assets/lottie/
  fonts:
    # CormorantGaramond + DMSans — copy the block from DESIGN_SYSTEM.md
```

**Firebase:** platform config (`google-services.json`, `GoogleService-Info.plist`, `firebase_options.dart`)
is generated with `flutterfire configure` during the Firebase setup task.
Call `Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform)` in `main()` once that file exists.

---

## Feature-First Clean Architecture

The app is organized **by feature first**. Inside each feature, code is split into **three clean-architecture layers**.
Shared, cross-feature code lives in `core/` and `shared/`.

### Layers & the dependency rule

```
presentation  ──▶  domain  ◀──  data
 (BLoC, pages,      (entities,      (models, datasources,
  widgets)           repository      repository implementations)
                     contracts,
                     use cases)
```

- **domain** is pure Dart. It has no Flutter, Dio, Supabase, Hive, or JSON imports, and it depends on nothing else.
- **data** implements the domain contracts. It is the only layer that talks to Dio, Supabase, Hive, secure storage, or mocks.
- **presentation** depends on domain only (use cases and entities). It never imports a model, datasource, or repository implementation.
- Dependencies point **inward**. If an import goes the other way, it is a bug.

### Feature folder layout

```
lib/features/heart/
├── domain/
│   ├── entities/
│   │   └── heart.dart                    # immutable, pure Dart, no JSON
│   ├── repositories/
│   │   └── heart_repository.dart         # abstract contract → Either<Failure, T>
│   └── usecases/
│       ├── get_hearts.dart
│       ├── raise_heart.dart
│       └── send_hug.dart
├── data/
│   ├── models/
│   │   └── heart_model.dart              # fromJson/toJson + toEntity()
│   ├── datasources/
│   │   ├── heart_remote_datasource.dart  # Dio / Supabase — throws exceptions
│   │   ├── heart_local_datasource.dart   # Hive cache (only where offline is needed)
│   │   └── heart_mock_datasource.dart    # fixtures for UI-first development
│   └── repositories/
│       └── heart_repository_impl.dart    # catches exceptions → returns Failure
└── presentation/
    ├── bloc/
    │   ├── heart_bloc.dart
    │   ├── heart_event.dart
    │   └── heart_state.dart
    ├── pages/
    │   ├── raise_heart_page.dart
    │   └── resolution_space_page.dart
    └── widgets/
        ├── heart_card.dart
        ├── feeling_tag_chip.dart
        └── hug_button.dart
```

Small features may skip layers they don't need. For example, a static screen with no data needs only `presentation/`.
Never merge layers into one file.

### App-level layout

```
lib/
├── main.dart                  # runs bootstrap()
├── bootstrap.dart             # init (Hive, Supabase, Firebase), error zones, runApp
├── app.dart                   # MaterialApp.router + root providers
├── core/
│   ├── constants/             # AppColors, AppStrings, AppSpacing, AppRadius, AppSizes, AppShadows,
│   │                          # AppTextStyles, AppGradients, AppDurations/AppCurves
│   ├── config/                # AppConfig (env, USE_MOCKS flag) from --dart-define
│   ├── di/                    # composition root: builds datasources → repos → use cases
│   ├── error/                 # Failure classes + exceptions
│   ├── network/               # Dio client, interceptors (auth header, error normalization)
│   ├── router/                # GoRouter, AppRoutes, transitions
│   ├── theme/                 # AppTheme (single dark theme)
│   ├── usecase/               # UseCase<T, Params> base + NoParams
│   └── utils/                 # date formatting, extensions, helpers
├── shared/
│   └── widgets/               # AppShell, HeartlineBackground, GlassCard, buttons, chips, avatars...
└── features/
    ├── onboarding/  auth/  couple/  home/  heart/  memory_jar/  mood/
    ├── profile/  appreciation/  pulse/  us_time/  bucket_list/  milestones/  subscription/
```

### Feature boundaries

- A feature never imports another feature's `data/` or `presentation/` internals.
- If two features need the same entity or widget, move it to `core/` (logic) or `shared/` (UI).
  Do not duplicate it, and do not cross-import.
- Navigation between features goes through GoRouter route names only.

### Use cases

One class per user action. It holds no state and is easy to test.

```dart
// core/usecase/usecase.dart
abstract class UseCase<T, Params> {
  Future<Either<Failure, T>> call(Params params);
}
class NoParams { const NoParams(); }

// features/heart/domain/usecases/raise_heart.dart
class RaiseHeart implements UseCase<Heart, RaiseHeartParams> {
  const RaiseHeart(this._repository);
  final HeartRepository _repository;

  @override
  Future<Either<Failure, Heart>> call(RaiseHeartParams params) =>
      _repository.raiseHeart(params);
}
```

Use cases are where feature rules that belong on the client live. For example, "can't open a Heart when the
couple has 3 open" is checked for UX here, and the backend enforces it for real.

### Repository contract & implementation

```dart
// domain/repositories/heart_repository.dart
abstract interface class HeartRepository {
  Future<Either<Failure, List<Heart>>> getHearts({HeartStatusFilter filter});
  Future<Either<Failure, Heart>> raiseHeart(RaiseHeartParams params);
}

// data/repositories/heart_repository_impl.dart
class HeartRepositoryImpl implements HeartRepository {
  const HeartRepositoryImpl(this._remote);
  final HeartRemoteDataSource _remote;

  @override
  Future<Either<Failure, Heart>> raiseHeart(RaiseHeartParams params) async {
    try {
      final model = await _remote.raiseHeart(params);
      return right(model.toEntity());
    } on ServerException catch (e) {
      return left(ServerFailure(e.message, code: e.code)); // e.g. HEART_LIMIT_REACHED
    } on NetworkException {
      return left(const NetworkFailure(AppStrings.errorNoConnection));
    }
  }
}
```

- Datasources **throw** typed exceptions (`ServerException`, `NetworkException`, `CacheException`).
- Repository implementations are the **only** place that `try/catch` turns exceptions into `Failure`.
- Everything above the repository works with `Either<Failure, T>`. There is no `try/catch` in use cases or BLoCs.

```dart
// core/error/failures.dart
sealed class Failure extends Equatable {
  const Failure(this.message, {this.code});
  final String message;
  final String? code;   // backend error code, for UX branching (e.g. HEART_LIMIT_REACHED)
  @override
  List<Object?> get props => [message, code];
}
class NetworkFailure extends Failure { const NetworkFailure(super.message, {super.code}); }
class ServerFailure  extends Failure { const ServerFailure(super.message, {super.code}); }
class CacheFailure   extends Failure { const CacheFailure(super.message, {super.code}); }
```

### Entities vs models

- **Entity** (domain): immutable, `Equatable`, Dart types only (`DateTime` in UTC, enums), no JSON.
- **Model** (data): mirrors the API/DB shape, has `fromJson`/`toJson`, and converts with `toEntity()`.
  Snake/camel-case mapping, string-to-enum parsing, and ISO-to-`DateTime` parsing all happen here and nowhere else.

### Dependency injection: composition root

There is no service locator package. `core/di/` builds the object graph once, and `app.dart` exposes it with
`MultiRepositoryProvider` (repositories/use cases) and `MultiBlocProvider` (app-wide BLoCs).
Feature-scoped BLoCs are created in their route builder with `BlocProvider`.

```dart
// core/di/app_dependencies.dart
class AppDependencies {
  AppDependencies(AppConfig config)
      : heartRepository = config.useMocks
            ? HeartRepositoryImpl(HeartMockDataSource())
            : HeartRepositoryImpl(HeartRemoteDataSourceImpl(DioClient(config)));

  final HeartRepository heartRepository;
  late final raiseHeart = RaiseHeart(heartRepository);
  late final getHearts  = GetHearts(heartRepository);
}
```

### Mock-first switch (UI-first build)

- `--dart-define=USE_MOCKS=true` → every repository gets its **mock datasource** (fixtures with realistic delays).
- Part B swaps in the remote datasource. Domain and presentation code don't change at all.
- Mock datasources stay in the codebase for widget tests and demos.

---

## BLoC Pattern

### Event Naming — NounVerb format

```dart
// Good
class HeartRaised extends HeartEvent {}
class HeartHugged extends HeartEvent {}
class HeartsLoaded extends HeartEvent {}

// Bad — do not use VerbNoun format
class RaiseHeart extends HeartEvent {}  // also collides with the RaiseHeart use case
class LoadHearts extends HeartEvent {}
```

### State Pattern

Use sealed classes for states, with `Equatable` so tests can compare them.

```dart
sealed class HeartState extends Equatable {
  const HeartState();
  @override
  List<Object?> get props => [];
}

final class HeartInitial extends HeartState { const HeartInitial(); }
final class HeartLoading extends HeartState { const HeartLoading(); }
final class HeartSuccess extends HeartState {
  const HeartSuccess(this.hearts);
  final List<Heart> hearts;            // entities, never models
  @override
  List<Object?> get props => [hearts];
}
final class HeartFailure extends HeartState {
  const HeartFailure(this.failure);
  final Failure failure;
  @override
  List<Object?> get props => [failure];
}
```

### BLoC Template

BLoCs depend on **use cases**, not repositories.

```dart
class HeartBloc extends Bloc<HeartEvent, HeartState> {
  HeartBloc({required GetHearts getHearts, required RaiseHeart raiseHeart})
      : _getHearts = getHearts,
        _raiseHeart = raiseHeart,
        super(const HeartInitial()) {
    on<HeartsLoaded>(_onHeartsLoaded);
    on<HeartRaised>(_onHeartRaised);
  }

  final GetHearts _getHearts;
  final RaiseHeart _raiseHeart;

  Future<void> _onHeartsLoaded(HeartsLoaded event, Emitter<HeartState> emit) async {
    emit(const HeartLoading());
    final result = await _getHearts(const GetHeartsParams());
    result.fold(
      (failure) => emit(HeartFailure(failure)),
      (hearts) => emit(HeartSuccess(hearts)),
    );
  }
}
```

### Clean architecture best practices

1. Keep domain pure. If you need `package:flutter` in domain, the code belongs in presentation.
2. One use case = one action. Don't build a "HeartService" that does everything.
3. Entities never have `fromJson`. Models never reach the UI.
4. Map backend error `code`s to user-facing `AppStrings` in presentation, not in data.
5. A BLoC per screen or flow, not per app. Share app-wide state (auth session, couple) through a few root BLoCs.
6. Keep pages thin. Pages compose widgets and dispatch events, and widgets stay small and `const` where possible.
7. Test by layer. Test use cases with a mocked repository, repository impls with mocked datasources,
   BLoCs with mocked use cases (`bloc_test`), and key widgets with mock datasources.
8. Don't over-abstract. If a layer adds nothing for a tiny feature, skip it (and say so in the task plan).

---

## Navigation — GoRouter Only

```dart
// core/router/app_router.dart

final appRouter = GoRouter(
  initialLocation: '/home',
  routes: [
    GoRoute(
      path: '/home',
      name: AppRoutes.home,
      builder: (context, state) => const HomePage(),
    ),
    GoRoute(
      path: '/heart/raise',
      name: AppRoutes.raiseHeart,
      builder: (context, state) => const RaiseHeartPage(),
    ),
    GoRoute(
      path: '/heart/:heartId/resolution',
      name: AppRoutes.resolutionSpace,
      builder: (context, state) => ResolutionSpacePage(
        heartId: state.pathParameters['heartId']!,
      ),
    ),
  ],
);

// AppRoutes constants
class AppRoutes {
  static const home = 'home';
  static const raiseHeart = 'raiseHeart';
  static const resolutionSpace = 'resolutionSpace';
}

// Bottom nav: tabs live in a StatefulShellRoute so each tab keeps its own stack.
// Full-screen flows (raise Heart, Resolution Space, Memory Jar detail) are top-level
// routes OUTSIDE the shell, so the nav bar is hidden on them.
StatefulShellRoute.indexedStack(
  builder: (context, state, shell) => AppShell(navigationShell: shell),
  branches: [
    StatefulShellBranch(routes: [GoRoute(path: '/home', name: AppRoutes.home, ...)]),
    StatefulShellBranch(routes: [GoRoute(path: '/hearts', name: AppRoutes.hearts, ...)]),
    StatefulShellBranch(routes: [GoRoute(path: '/mood', name: AppRoutes.mood, ...)]),
    StatefulShellBranch(routes: [GoRoute(path: '/us-time', name: AppRoutes.usTime, ...)]),
    StatefulShellBranch(routes: [GoRoute(path: '/profile', name: AppRoutes.profile, ...)]),
  ],
);

// How to navigate — always use named routes
context.goNamed(AppRoutes.home);
context.pushNamed(AppRoutes.raiseHeart);
```

Never use `Navigator.push`. Never use `Navigator.of(context).pushNamed`.

---

## Widget Rules

```dart
// Good — stateless widget using BlocBuilder
class HeartCard extends StatelessWidget {
  final HeartModel heart;
  const HeartCard({super.key, required this.heart});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HeartBloc, HeartState>(
      builder: (context, state) {
        // ...
      },
    );
  }
}

// Bad — do not use StatefulWidget unless animating locally
class HeartCard extends StatefulWidget { ... } // only if managing AnimationController
```

---

## Styling Rules

```dart
// Always use tokens — never hardcode
Container(
  padding: const EdgeInsets.all(AppSpacing.md),   // Good
  padding: const EdgeInsets.all(16),              // Bad

  color: AppColors.surface,                        // Good
  color: AppColors.dustyRose,                      // Good
  color: const Color(0xFF2D1B3D),                 // Bad

  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(AppRadius.lg),  // Good
    borderRadius: BorderRadius.circular(24),             // Bad
  ),
)

Text(
  AppStrings.raiseHeartCta,
  style: AppTextStyles.title,  // Good — color comes from the theme's onSurface
  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold), // Bad
)
```

---

## Responsive Layout

No fixed pixel widths. Use screen fractions.

```dart
// Good
width: MediaQuery.sizeOf(context).width * 0.9

// Good — for max-width containers
ConstrainedBox(
  constraints: const BoxConstraints(maxWidth: 480),
  child: ...,
)

// Bad — fixed pixel width
width: 360,
```

---

## Error Handling in UI

```dart
// In page widget using BlocConsumer
BlocConsumer<HeartBloc, HeartState>(
  listener: (context, state) {
    if (state is HeartFailure) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(failureMessage(state.failure)), // maps failure.code → AppStrings
          backgroundColor: AppColors.error,  // Error Blush — never red
        ),
      );
    }
  },
  builder: (context, state) {
    return switch (state) {
      HeartInitial() => const SizedBox.shrink(),
      HeartLoading() => const HeartLoadingShimmer(),
      HeartSuccess(:final hearts) => HeartList(hearts: hearts),
      HeartFailure() => const HeartErrorView(),
    };
  },
);
```

---

## Dates & Times

- Everything from the API is UTC. Parse it with `DateTime.parse(iso)` and convert **only for display** with `.toLocal()`.
- Never send local times to the API. Send `dateTime.toUtc().toIso8601String()`.
- Send the device offset (`DateTime.now().timeZoneOffset.inMinutes`) with the FCM token update on
  every launch (`PATCH /auth/fcm-token`) and at profile creation.
- Format for display with `intl` (`DateFormat`) in a helper in `core/utils/`. Never format inline in widgets.
- Models keep `DateTime` fields in UTC. Conversion happens in the presentation layer.

---

## Strings

All user-visible strings go in `core/constants/app_strings.dart`.

```dart
class AppStrings {
  static const homeTitle = 'Your Space';
  static const raiseHeartCta = 'Open a Heart';
  static const hugButtonLabel = 'Send a Hug';
  static const weAreGoodLabel = "We're Good";
  static const memoryJarTitle = 'Memory Jar';
  // ... and so on for every visible string
}
```

Never write visible text directly in widget code.

---

## Testing Pattern

Every BLoC and every use case has a test file. Tests mirror `lib/`:
`test/features/heart/presentation/bloc/heart_bloc_test.dart`, `test/features/heart/domain/usecases/raise_heart_test.dart`.

```dart
class MockGetHearts extends Mock implements GetHearts {}

void main() {
  late MockGetHearts getHearts;
  late HeartBloc bloc;

  setUp(() {
    getHearts = MockGetHearts();
    bloc = HeartBloc(getHearts: getHearts, raiseHeart: MockRaiseHeart());
  });

  tearDown(() => bloc.close());

  blocTest<HeartBloc, HeartState>(
    'emits [HeartLoading, HeartSuccess] when HeartsLoaded succeeds',
    build: () {
      when(() => getHearts(any())).thenAnswer((_) async => right(fakeHearts));
      return bloc;
    },
    act: (bloc) => bloc.add(HeartsLoaded()),
    expect: () => [const HeartLoading(), HeartSuccess(fakeHearts)],
  );
}
```

Automated tests cover logic. Every task also ends with a **manual test checklist** (see `AGENT_EXECUTE.md`).
