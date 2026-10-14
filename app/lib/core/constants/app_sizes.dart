/// Fixed component dimensions from the UI spec. Use these instead of magic numbers.
abstract final class AppSizes {
  static const double buttonPrimaryHeight = 56.0;
  static const double buttonSecondaryHeight = 48.0;
  static const double buttonMinWidth = 180.0;
  static const double iconButton = 40.0;
  static const double inputHeight = 56.0;
  static const double messageInputHeight = 48.0;
  static const double chipHeight = 28.0;
  static const double navBarHeight = 64.0; // + bottom safe area
  static const double navBarBottomGap = 8.0;
  static const double navIndicatorWidth = 24.0;
  static const double navIndicatorHeight = 3.0;
  static const double hugButton = 110.0;
  static const double sendButton = 48.0;
  static const double quickAction = 48.0;
  static const double selectionCardHeight = 96.0; // feeling + mood cards
  static const double filterChipHeight = 32.0;
  static const double coupleHeaderHeight = 100.0;
  static const double heartAccentBar = 6.0;
  static const double feelingAccentBar = 8.0;
  static const double bubbleMaxWidthFactor = 0.72; // fraction of screen width

  // Avatars
  static const double avatarXs = 32.0;
  static const double avatarSm = 40.0;
  static const double avatarMd = 48.0;
  static const double avatarLg = 64.0;
  static const double avatarXl = 96.0;

  // Icons
  static const double iconSm = 16.0;
  static const double iconMd = 20.0;
  static const double iconNav = 22.0;
  static const double iconLg = 24.0;
  static const double iconXl = 32.0;
  static const double iconEmptyState = 48.0;

  // Icon strokes (UI spec §08)
  static const double iconStroke = 1.5;
  static const double iconStrokeActive = 2.0;

  // Borders & blur
  static const double hairline = 1.0;
  static const double blurGlass = 24.0;
  static const double blurNavBar = 32.0;

  // Global background (UI spec §11)
  static const double bloomRoseWidth = 600.0;
  static const double bloomRoseHeight = 400.0;
  static const double bloomCrimsonSize = 500.0;
  static const double grainSpacing = 3.0;
  static const double grainDot = 0.6;
  static const int particleCount = 12;
  static const double particleMin = 2.0;
  static const double particleMax = 4.0;
}
