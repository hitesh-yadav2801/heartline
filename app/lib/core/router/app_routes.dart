/// GoRouter route names (camelCase) and paths. Navigate by name only.
abstract final class AppRoutes {
  // Bottom-nav tabs (inside the shell)
  static const String home = 'home';
  static const String hearts = 'hearts';
  static const String mood = 'mood';
  static const String usTime = 'usTime';
  static const String profile = 'profile';

  // Full-screen flows (outside the shell — no nav bar)
  static const String raiseHeart = 'raiseHeart';
  static const String resolutionSpace = 'resolutionSpace';
  static const String memoryJarDetail = 'memoryJarDetail';

  // Path parameters
  static const String heartIdParam = 'heartId';
}

abstract final class AppPaths {
  static const String home = '/home';
  static const String hearts = '/hearts';
  static const String mood = '/mood';
  static const String usTime = '/us-time';
  static const String profile = '/profile';

  static const String raiseHeart = '/heart/raise';
  static const String resolutionSpace =
      '/heart/:${AppRoutes.heartIdParam}/resolution';
  static const String memoryJarDetail =
      '/memory-jar/:${AppRoutes.heartIdParam}';
}
