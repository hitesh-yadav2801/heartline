# Heartline — Design System (Flutter Tokens)

> **Source of truth:** `HEARTLINE_UI_UX_SPEC.md` v1.1 (aligned with the approved Figma Make mocks).
> This file translates that spec into Flutter tokens and code rules.
> If the two ever disagree, the UI/UX spec wins. Update this file to match it.
> Screen layouts and component visuals live in the UI/UX spec (sections 03, 05, 06).
> This file only defines the tokens the code uses to build them.

---

## Philosophy

Heartline should feel like the inside of a love letter: candlelight in a dark room.
The three pillars are **Intimacy**, **Safety**, and **Depth** (see UI/UX spec §01).

- **Single theme.** Heartline has one dark theme. There is no light mode and no theme toggle.
- Nothing is instant, nothing is harsh, and nothing feels clinical.

---

## Theme

- One `ThemeData` (`AppTheme.theme`, brightness dark). Set `theme:` only; no `darkTheme`, no `themeMode` switching.
- Widgets read colors from `AppColors` or the theme. They never pick hex values.

---

## Color Palette

```dart
// lib/core/constants/app_colors.dart
// Use these everywhere. Never hardcode a hex value in a widget.

class AppColors {
  AppColors._();

  // ── Brand ────────────────────────────────────────────────────
  static const Color velvetCrimson = Color(0xFF8B1A4A); // Primary brand
  static const Color dustyRose     = Color(0xFFC4687A); // Secondary brand, active states
  static const Color blush         = Color(0xFFEBA8B4); // Highlights, selected states
  static const Color petal         = Color(0xFFF5D6DC); // Hover, skeleton loaders

  static const Color primary   = velvetCrimson;
  static const Color secondary = dustyRose;

  // ── Accents ──────────────────────────────────────────────────
  static const Color emberGold    = Color(0xFFC8863A); // Milestones, special moments
  static const Color sageWhisper  = Color(0xFF7A9E8E); // We're Good state, success
  static const Color lavenderDusk = Color(0xFF9B89C4); // AI suggestions, Unheard, partner avatar, Appreciation
  static const Color dawnBlue     = Color(0xFF7BA3C4); // Lonely / Sad
  static const Color warmAmber    = Color(0xFFD4943A); // Overwhelmed / Anxious

  // ── Functional ───────────────────────────────────────────────
  static const Color error   = dustyRose;   // "Error Blush": errors feel warm, never alarming
  static const Color success = sageWhisper; // "Success Sage"

  // ── Surfaces & text (single dark theme) ──────────────────────
  static const Color deepPlum      = Color(0xFF1A0A2E); // app background
  static const Color midnightRose  = Color(0xFF2D1B3D); // cards, sheets
  static const Color warmCream     = Color(0xFFFDF6F0); // text on gradients/buttons, display text
  static const Color ivory         = Color(0xFFFAF0E8); // primary text
  static const Color textPrimary   = ivory;
  static const Color textSecondary = Color(0xFFC4A8B4);
  static const Color textMuted     = Color(0xFF6B4A5A); // used sparingly
  static const Color divider       = Color(0x992D1B3D); // Midnight Rose @ 60%

  static const Color background = deepPlum;
  static const Color surface    = midnightRose;

  // ── Translucent layers ───────────────────────────────────────
  static const Color glassFill      = Color(0x992D1B3D); // rgba(45,27,61,0.6)
  static const Color glassBorder    = Color(0x33C4687A); // rgba(196,104,122,0.2)
  static const Color navBar         = Color(0xD91A0A2E); // rgba(26,10,46,0.85)
  static const Color navBarBorder   = Color(0x1FC4687A); // rgba(196,104,122,0.12)
  static const Color inputFill      = Color(0x802D1B3D); // rgba(45,27,61,0.5)
  static const Color inputBorder    = Color(0x33C4687A); // rgba(196,104,122,0.2)
  static const Color cardBorder     = Color(0x1AC4687A); // rgba(196,104,122,0.1)
  static const Color tintRose12     = Color(0x1FC4687A); // icon button bg, secondary press
  static const Color tintRose25     = Color(0x40C4687A); // icon button pressed
  static const Color scrim          = Color(0xB31A0A2E); // modal overlay rgba(26,10,46,0.7)
}
```

### Feeling Tag Colors

These come from the mocks (UI/UX spec §2.1 table). Every tag also shows its emoji and label,
so color never carries meaning on its own. The emoji and descriptor live in `AppStrings`.

```dart
// in AppColors
static const Color feelingIgnored     = dawnBlue;
static const Color feelingOverwhelmed = warmAmber;
static const Color feelingUnheard     = lavenderDusk;
static const Color feelingLonely      = dawnBlue;
static const Color feelingAnxious     = warmAmber;
static const Color feelingHurt        = dustyRose;
```

### Mood Colors

These drive the selected border, the 10% tint, and the 25% aura on mood cards (UI/UX spec Screen 16).

```dart
// in AppColors
static const Color moodJoyful      = emberGold;
static const Color moodCalm        = sageWhisper;
static const Color moodAnxious     = warmAmber;
static const Color moodSad         = dawnBlue;
static const Color moodOverwhelmed = lavenderDusk;
```

### Gradients

```dart
// lib/core/constants/app_gradients.dart
class AppGradients {
  AppGradients._();

  // Primary button, outgoing message bubble, avatar fallback
  static const LinearGradient primary = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight, // 135deg
    colors: [AppColors.velvetCrimson, AppColors.dustyRose],
  );

  // We're Good CTA
  static const LinearGradient sage = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.sageWhisper, Color(0xCC7A9E8E)], // Sage → Sage @ 80%
  );

  // Hug button — light source at 40% / 30%
  static const RadialGradient hug = RadialGradient(
    center: Alignment(-0.2, -0.4),
    colors: [AppColors.velvetCrimson, AppColors.dustyRose],
  );

  // Avatar fallbacks — user vs partner are told apart by gradient
  static const LinearGradient avatarUser = primary;
  static const LinearGradient avatarPartner = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.lavenderDusk, AppColors.dustyRose],
  );
}
```

### Quick Action Accents (Home)

```dart
// in AppColors — circle fill = accent @ 12%, border = accent @ 25%
static const Color quickAppreciation = lavenderDusk;
static const Color quickMemoryJar    = emberGold;
static const Color quickMood         = sageWhisper;
static const Color quickUsTime       = dustyRose;
```

### Global Background

Every screen sits on the same layered background (UI/UX spec §11). Build it once as
`HeartlineBackground` in `lib/shared/widgets/` and put it behind every page:

```
1. Deep Plum fill
2. Radial bloom: center (0.7, -1.2), Dusty Rose @ 10% → transparent
3. Radial bloom: center (-0.8, 1.2), Velvet Crimson @ 18% → transparent
4. Grain: 4% dot noise (a small tiled asset or CustomPainter)
5. 12 drifting Dusty Rose particles (2–4px, 15% opacity, 12–20s upward loop)
```
```

Gradients are allowed wherever the UI/UX spec uses them: primary buttons, hero cards,
the hug button, outgoing bubbles, avatar fallbacks, gratitude cards, and celebrations.

---

## Typography

**Display / romantic headers:** `Cormorant Garamond`. Weights: 300 Light Italic, 400 Regular, 400 Italic, 600 SemiBold Italic.
**Body / UI:** `DM Sans`. Weights: 300, 400, 400 Italic, 500, 600.

Fonts are **bundled as assets**, not fetched at runtime (low-bandwidth target market).
Do not use the `google_fonts` package.

### Font assets (pubspec.yaml)

```yaml
flutter:
  fonts:
    - family: CormorantGaramond
      fonts:
        - asset: assets/fonts/CormorantGaramond-LightItalic.ttf
          weight: 300
          style: italic
        - asset: assets/fonts/CormorantGaramond-Regular.ttf
          weight: 400
        - asset: assets/fonts/CormorantGaramond-Italic.ttf
          weight: 400
          style: italic
        - asset: assets/fonts/CormorantGaramond-SemiBoldItalic.ttf
          weight: 600
          style: italic
    - family: DMSans
      fonts:
        - asset: assets/fonts/DMSans-Light.ttf
          weight: 300
        - asset: assets/fonts/DMSans-Regular.ttf
          weight: 400
        - asset: assets/fonts/DMSans-Italic.ttf
          weight: 400
          style: italic
        - asset: assets/fonts/DMSans-Medium.ttf
          weight: 500
        - asset: assets/fonts/DMSans-SemiBold.ttf
          weight: 600
```

Both families are SIL Open Font License (free to bundle). Download the static `.ttf` files
from Google Fonts and commit them to `assets/fonts/`.

### Type Scale

```dart
// lib/core/constants/app_text_styles.dart
// Colors are NOT baked in. Apply them with copyWith(color: ...) or let the theme apply them.

class AppTextStyles {
  AppTextStyles._();

  static const _serif = 'CormorantGaramond';
  static const _sans  = 'DMSans';

  // Display — Cormorant Garamond
  static const TextStyle displayXl = TextStyle(
    fontFamily: _serif, fontSize: 48, fontWeight: FontWeight.w600,
    fontStyle: FontStyle.italic, height: 1.1, letterSpacing: -1,
  );
  static const TextStyle displayLg = TextStyle(
    fontFamily: _serif, fontSize: 38, fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic, height: 1.2, letterSpacing: -0.5,
  );
  static const TextStyle displayMd = TextStyle(
    fontFamily: _serif, fontSize: 32, fontWeight: FontWeight.w400,
    height: 1.25, letterSpacing: -0.3,
  );

  // Accent / quotes — pulled quotes, empty states, letter-style text
  static const TextStyle quote = TextStyle(
    fontFamily: _serif, fontSize: 16, fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic, height: 1.75,
  );

  // UI — DM Sans
  static const TextStyle headline = TextStyle(
    fontFamily: _sans, fontSize: 24, fontWeight: FontWeight.w600,
    height: 1.3, letterSpacing: -0.2,
  );
  static const TextStyle title = TextStyle(
    fontFamily: _sans, fontSize: 18, fontWeight: FontWeight.w500,
    height: 1.4, letterSpacing: -0.1,
  );
  static const TextStyle bodyLg = TextStyle(
    fontFamily: _sans, fontSize: 16, fontWeight: FontWeight.w400, height: 1.65,
  );
  static const TextStyle bodyMd = TextStyle(
    fontFamily: _sans, fontSize: 14, fontWeight: FontWeight.w400, height: 1.6,
  );
  static const TextStyle label = TextStyle(
    fontFamily: _sans, fontSize: 13, fontWeight: FontWeight.w500,
    height: 1.4, letterSpacing: 0.2,
  );
  static const TextStyle caption = TextStyle(
    fontFamily: _sans, fontSize: 11, fontWeight: FontWeight.w400,
    height: 1.5, letterSpacing: 0.3,
  );
  static const TextStyle micro = TextStyle( // section labels, ALL CAPS — uppercase the string itself
    fontFamily: _sans, fontSize: 11, fontWeight: FontWeight.w400,
    height: 1.4, letterSpacing: 0.4,
  );
}
```

The UI/UX spec sometimes uses a one-off size, such as a 28px Cormorant Italic prompt.
Build those with `copyWith(fontSize: ..., fontStyle: ...)` from the nearest style above.
Never create a new inline `TextStyle(...)`.

Max **2 font families** per screen. That is always Cormorant Garamond + DM Sans.

---

## Spacing

Base unit is 4px. Dart identifiers can't start with a digit, so the spec's `2xs`/`2xl`/`3xl`/`4xl` are renamed as shown.

```dart
// lib/core/constants/app_spacing.dart
class AppSpacing {
  AppSpacing._();
  static const double xxs   = 4.0;   // spec: 2xs
  static const double xs    = 8.0;
  static const double sm    = 12.0;
  static const double md    = 16.0;
  static const double lg    = 24.0;
  static const double xl    = 32.0;
  static const double xxl   = 48.0;  // spec: 2xl
  static const double xxxl  = 64.0;  // spec: 3xl
  static const double xxxxl = 96.0;  // spec: 4xl

  static const double screenHorizontal = md; // 16px side margins
  static const double cardPadding      = 20.0;
}
```

---

## Border Radius

```dart
// lib/core/constants/app_radius.dart
class AppRadius {
  AppRadius._();
  static const double xs   = 4.0;    // tags in dense lists only
  static const double sm   = 8.0;    // small chips
  static const double md   = 16.0;   // inputs, secondary buttons
  static const double lg   = 24.0;   // cards, primary buttons
  static const double xl   = 32.0;   // bottom sheets, modals
  static const double xxl  = 40.0;   // large hero cards (spec: 2xl)
  static const double full = 9999.0; // pills, avatars
  static const double pill = 28.0;   // floating nav bar, couple header

  static const double bubble     = 20.0; // message bubble corners
  static const double bubbleTail = 4.0;  // the corner pointing at the sender
}
```

---

## Component Sizes

These are fixed component dimensions from the UI/UX spec. Use them instead of magic numbers.

```dart
// lib/core/constants/app_sizes.dart
class AppSizes {
  AppSizes._();
  static const double buttonPrimaryHeight   = 56.0;
  static const double buttonSecondaryHeight = 48.0;
  static const double buttonMinWidth        = 180.0;
  static const double iconButton            = 40.0;
  static const double inputHeight           = 56.0;
  static const double messageInputHeight    = 48.0;
  static const double chipHeight            = 28.0;
  static const double navBarHeight          = 64.0;  // + bottom safe area
  static const double navBarBottomGap       = 8.0;
  static const double navIndicatorWidth     = 24.0;
  static const double navIndicatorHeight    = 3.0;
  static const double hugButton             = 110.0;
  static const double sendButton            = 48.0;
  static const double quickAction           = 48.0;
  static const double selectionCardHeight   = 96.0;  // feeling + mood cards
  static const double filterChipHeight      = 32.0;
  static const double coupleHeaderHeight    = 100.0;
  static const double heartAccentBar        = 6.0;
  static const double feelingAccentBar      = 8.0;
  static const double bubbleMaxWidthFactor  = 0.72; // fraction of screen width

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
}
```

---

## Elevation, Shadows & Glows

Shadows are warm (plum and crimson), never grey.

```dart
// lib/core/constants/app_shadows.dart
class AppShadows {
  AppShadows._();

  // Elevation levels
  static const level1 = [BoxShadow(color: Color(0x661A0A2E), blurRadius: 16, offset: Offset(0, 4))];
  static const level2 = [BoxShadow(color: Color(0x408B1A4A), blurRadius: 32, offset: Offset(0, 8))];
  static const level3 = [BoxShadow(color: Color(0x598B1A4A), blurRadius: 48, offset: Offset(0, 16))];
  static const level4 = [BoxShadow(color: Color(0x991A0A2E), blurRadius: 64, offset: Offset(0, 24))];

  // Primary button
  static const primaryButton = [BoxShadow(color: Color(0x738B1A4A), blurRadius: 24, offset: Offset(0, 8))];

  // Glows — active / selected states
  static const roseGlow = [BoxShadow(color: Color(0x80C4687A), blurRadius: 24)];
  static const goldGlow = [BoxShadow(color: Color(0x66C8863A), blurRadius: 24)];
  static const sageGlow = [BoxShadow(color: Color(0x807A9E8E), blurRadius: 24)];
  static const inputFocus = [BoxShadow(color: Color(0x59C4687A), blurRadius: 24)];

  // Floating nav bar
  static const navBar = [BoxShadow(color: Color(0x991A0A2E), blurRadius: 32, offset: Offset(0, -8))];
}
```

| Level | Use |
|-------|-----|
| 0 | Flat on-surface elements |
| 1 | Cards resting on background |
| 2 | Elevated cards, drawers, hug button |
| 3 | Modals, bottom sheets |
| 4 | Celebration overlays |

---

## Glassmorphism

Used for floating action cards, overlay panels, notification toasts, the couple header, the resolution top card, and the nav bar.

```dart
ClipRRect(
  borderRadius: BorderRadius.circular(AppRadius.lg),
  child: BackdropFilter(
    filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24), // nav bar: 32
    child: DecoratedBox(
      decoration: BoxDecoration(
        color: AppColors.glassFill,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(color: AppColors.glassBorder),
      ),
      child: ...,
    ),
  ),
)
```

Flutter has no direct `saturate(180%)`. Skip it, since the blur and fill carry the effect.
Build this once as a shared `GlassCard` widget in `lib/shared/widgets/`.

---

## Motion

```dart
// lib/core/constants/app_motion.dart
class AppDurations {
  AppDurations._();
  static const micro      = Duration(milliseconds: 100);  // toggles, press-in
  static const quick      = Duration(milliseconds: 200);  // chip selection
  static const normal     = Duration(milliseconds: 300);  // page transitions, reveals
  static const back       = Duration(milliseconds: 250);  // back navigation
  static const slow       = Duration(milliseconds: 500);  // bottom sheets, modals
  static const emotional  = Duration(milliseconds: 800);  // Heart open, Hug send
  static const ceremonial = Duration(milliseconds: 1200); // We're Good, onboarding
  static const heartbeat  = Duration(milliseconds: 1200); // Hug button, waiting dots, Heart Sent
  static const ripple     = Duration(milliseconds: 1600); // Hug ripple rings
  static const pageEnter  = Duration(milliseconds: 500);  // screen content fade-up
}

class AppCurves {
  AppCurves._();
  static const standard   = Cubic(0.4, 0.0, 0.2, 1.0);
  static const decelerate = Cubic(0.0, 0.0, 0.2, 1.0);   // entering
  static const accelerate = Cubic(0.4, 0.0, 1.0, 1.0);   // leaving
  static const spring     = Cubic(0.34, 1.56, 0.64, 1.0); // positive moments
  static const breathe    = Cubic(0.45, 0.05, 0.55, 0.95); // idle / living
}
```

The full choreography for each key moment (Heart burst, Hug heartbeat, We're Good celebration,
mood submission, Memory Jar locket-expand) is in UI/UX spec §04. Follow it exactly.

**Motion rules**
1. Nothing is instant. Minimum 200ms on transitions (except 100ms press-in).
2. Never use `Curves.linear`.
3. Spring curves for positive moments, decelerate for entries, accelerate for exits.
4. Use `AnimatedContainer`, `AnimatedOpacity`, and `TweenAnimationBuilder` for simple cases.
   Use `AnimationController` in a local `StatefulWidget` only for continuous or choreographed animations
   (heartbeat, particles). Use Lottie for the We're Good confetti.
5. Never use a raw `Timer` for animation.

**Page transitions** (configure once in GoRouter with `CustomTransitionPage`):
- Screen content entry: fade + slide up 12px, 500ms, decelerate (`AppDurations.pageEnter`).
- Forward navigation: fade + slide up, 300ms, decelerate.
- Back: reverse, 250ms, accelerate.
- Bottom sheet: slide up, 500ms, spring, with a `AppColors.scrim` overlay.

---

## Haptics

| Action | Feedback |
|--------|----------|
| Hug button tap | `HapticFeedback.mediumImpact()` |
| We're Good confirm | `HapticFeedback.heavyImpact()` (once) |
| Feeling tag selection | `HapticFeedback.lightImpact()` |
| Message sent | `HapticFeedback.lightImpact()` |
| Heart raise confirm | `HapticFeedback.mediumImpact()` |

---

## Iconography

- Style: **outlined, rounded caps, 1.5px stroke, 24px grid.**
- Never use filled icons, with two exceptions: the nav active state (2px stroke) and filled hearts in
  emotional moments (Heart Sent, We're Good celebration, the Profile partner card).
- Feelings and the Hug button use **emoji** (UI/UX spec §2.1), not custom icons.
- Standard icons: Lucide (`lucide_icons_flutter`).
- Custom SVGs (rendered with `flutter_svg`, stored in `assets/icons/`, created by the task that adds the first SVG): `open-heart`.
  The Memory Jar header jar is drawn in code (`CustomPainter`) per the mocks.
- Icons inherit color from context (`IconTheme`, or `colorFilter` for SVGs). Never hardcode an icon color.

---

## Bottom Navigation Bar

5 tabs: **Home | Hearts | Mood | Us Time | Profile**. The full spec is in UI/UX spec §3.1.

- Floating frosted pill: `AppColors.navBar` + blur 32, `AppRadius.pill`, full 1px
  `AppColors.navBarBorder`, `AppShadows.navBar`, inset `AppSizes.navBarBottomGap` from the bottom and both sides.
- The Hearts tab opens the Memory Jar screen.
- Active: Dusty Rose icon + visible label + pill indicator. Inactive: secondary text color, no label.
- Implemented with GoRouter `StatefulShellRoute.indexedStack` so each tab keeps its own stack.

---

## Do Not

- Use red for errors. Use `AppColors.error` (Error Blush).
- Use pure black `#000000` for text or backgrounds.
- Use `borderRadius` below `AppRadius.xs`. `xs` is only for tags in dense lists.
- Use more than 2 font families on a screen.
- Use linear easing.
- Use filled icons (except the active nav stroke weight and emotional-moment hearts).
- Use `Colors.*`, raw hex, raw `TextStyle(...)`, or magic numbers in widgets.
