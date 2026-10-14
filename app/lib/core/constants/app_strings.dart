/// Every user-visible string lives here. Follow the terminology in AGENTS.md §6.
abstract final class AppStrings {
  static const String appName = 'Heartline';

  // ── Bottom navigation ────────────────────────────────────────
  static const String tabHome = 'Home';
  static const String tabHearts = 'Hearts';
  static const String tabMood = 'Mood';
  static const String tabUsTime = 'Us Time';
  static const String tabProfile = 'Profile';

  // ── Page titles (placeholders until each screen is built) ────
  static const String homeTitle = 'Home';
  static const String memoryJarTitle = 'Memory Jar';
  static const String moodTitle = 'Mood';
  static const String usTimeTitle = 'Us Time';
  static const String profileTitle = 'Profile';
  static const String raiseHeartTitle = 'Open a Heart';
  static const String resolutionSpaceTitle = 'Resolution Space';
  static const String memoryJarDetailTitle = 'Memory';

  // ── Empty states (UI spec §09) ───────────────────────────────
  static const String usTimeEmptyTitle = 'Nothing planned.';
  static const String usTimeEmptyBody = 'What do you two want to do?';

  // ── Temporary preview navigation (removed when real screens land) ──
  static const String previewOpenHeart = 'Preview: Open a Heart';
  static const String previewResolutionSpace = 'Preview: Resolution Space';
  static const String previewMemoryJarDetail = 'Preview: Memory';
  static const String previewBack = 'Back';
}
