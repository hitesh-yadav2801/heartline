import 'package:go_router/go_router.dart';

import '../../features/heart/presentation/pages/raise_heart_page.dart';
import '../../features/heart/presentation/pages/resolution_space_page.dart';
import '../../features/home/presentation/pages/home_page.dart';
import '../../features/memory_jar/presentation/pages/memory_jar_detail_page.dart';
import '../../features/memory_jar/presentation/pages/memory_jar_page.dart';
import '../../features/mood/presentation/pages/mood_page.dart';
import '../../features/profile/presentation/pages/profile_page.dart';
import '../../features/us_time/presentation/pages/us_time_page.dart';
import '../../shared/widgets/app_shell.dart';
import 'app_page_transitions.dart';
import 'app_routes.dart';

abstract final class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: AppPaths.home,
    routes: [
      // Tabs: each branch keeps its own navigation stack.
      StatefulShellRoute.indexedStack(
        pageBuilder: (context, state, navigationShell) =>
            AppPageTransitions.build(
              state: state,
              child: AppShell(navigationShell: navigationShell),
            ),
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppPaths.home,
                name: AppRoutes.home,
                builder: (context, state) => const HomePage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppPaths.hearts,
                name: AppRoutes.hearts,
                builder: (context, state) => const MemoryJarPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppPaths.mood,
                name: AppRoutes.mood,
                builder: (context, state) => const MoodPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppPaths.usTime,
                name: AppRoutes.usTime,
                builder: (context, state) => const UsTimePage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppPaths.profile,
                name: AppRoutes.profile,
                builder: (context, state) => const ProfilePage(),
              ),
            ],
          ),
        ],
      ),

      // Full-screen flows: top-level routes outside the shell, so the nav bar is hidden.
      GoRoute(
        path: AppPaths.raiseHeart,
        name: AppRoutes.raiseHeart,
        pageBuilder: (context, state) => AppPageTransitions.build(
          state: state,
          child: const RaiseHeartPage(),
        ),
      ),
      GoRoute(
        path: AppPaths.resolutionSpace,
        name: AppRoutes.resolutionSpace,
        pageBuilder: (context, state) => AppPageTransitions.build(
          state: state,
          child: ResolutionSpacePage(
            heartId: state.pathParameters[AppRoutes.heartIdParam]!,
          ),
        ),
      ),
      GoRoute(
        path: AppPaths.memoryJarDetail,
        name: AppRoutes.memoryJarDetail,
        pageBuilder: (context, state) => AppPageTransitions.build(
          state: state,
          child: MemoryJarDetailPage(
            heartId: state.pathParameters[AppRoutes.heartIdParam]!,
          ),
        ),
      ),
    ],
  );
}
