import 'package:flutter/painting.dart';

/// Heartline palette (single dark theme). Source: docs/DESIGN_SYSTEM.md.
/// Never hardcode a hex value in a widget — use these.
abstract final class AppColors {
  // ── Brand ────────────────────────────────────────────────────
  static const Color velvetCrimson = Color(0xFF8B1A4A); // Primary brand
  static const Color dustyRose = Color(0xFFC4687A); // Secondary brand, active states
  static const Color blush = Color(0xFFEBA8B4); // Highlights, selected states
  static const Color petal = Color(0xFFF5D6DC); // Hover, skeleton loaders

  static const Color primary = velvetCrimson;
  static const Color secondary = dustyRose;

  // ── Accents ──────────────────────────────────────────────────
  static const Color emberGold = Color(0xFFC8863A); // Milestones, special moments
  static const Color sageWhisper = Color(0xFF7A9E8E); // We're Good state, success
  static const Color lavenderDusk = Color(0xFF9B89C4); // AI, Unheard, partner avatar, Appreciation
  static const Color dawnBlue = Color(0xFF7BA3C4); // Lonely / Sad
  static const Color warmAmber = Color(0xFFD4943A); // Overwhelmed / Anxious

  // ── Functional ───────────────────────────────────────────────
  static const Color error = dustyRose; // "Error Blush": warm, never alarming
  static const Color success = sageWhisper; // "Success Sage"

  // ── Surfaces & text ──────────────────────────────────────────
  static const Color deepPlum = Color(0xFF1A0A2E); // app background
  static const Color midnightRose = Color(0xFF2D1B3D); // cards, sheets
  static const Color warmCream = Color(0xFFFDF6F0); // text on gradients/buttons, display text
  static const Color ivory = Color(0xFFFAF0E8); // primary text
  static const Color textPrimary = ivory;
  static const Color textSecondary = Color(0xFFC4A8B4);
  static const Color textMuted = Color(0xFF6B4A5A); // used sparingly
  static const Color divider = Color(0x992D1B3D); // Midnight Rose @ 60%
  static const Color transparent = Color(0x00000000);

  static const Color background = deepPlum;
  static const Color surface = midnightRose;

  // ── Translucent layers ───────────────────────────────────────
  static const Color glassFill = Color(0x992D1B3D); // rgba(45,27,61,0.6)
  static const Color glassBorder = Color(0x33C4687A); // rgba(196,104,122,0.2)
  static const Color navBar = Color(0xD91A0A2E); // rgba(26,10,46,0.85)
  static const Color navBarBorder = Color(0x1FC4687A); // rgba(196,104,122,0.12)
  static const Color inputFill = Color(0x802D1B3D); // rgba(45,27,61,0.5)
  static const Color inputBorder = Color(0x33C4687A); // rgba(196,104,122,0.2)
  static const Color cardBorder = Color(0x1AC4687A); // rgba(196,104,122,0.1)
  static const Color tintRose12 = Color(0x1FC4687A); // icon button bg, secondary press
  static const Color tintRose25 = Color(0x40C4687A); // icon button pressed
  static const Color scrim = Color(0xB31A0A2E); // modal overlay rgba(26,10,46,0.7)

  // ── Global background (UI spec §11) ──────────────────────────
  static const Color bloomRose = Color(0x1AC4687A); // Dusty Rose @ 10%
  static const Color bloomCrimson = Color(0x2E8B1A4A); // Velvet Crimson @ 18%
  static const Color grain = Color(0x0AFDF6F0); // Warm Cream @ 4%
  static const Color particle = Color(0x26C4687A); // Dusty Rose @ 15%

  // ── Empty states (UI spec §09) ───────────────────────────────
  static const Color emptyStateGold = Color(0x99C8863A); // Ember Gold @ 60%

  // ── Feeling tags ─────────────────────────────────────────────
  static const Color feelingIgnored = dawnBlue;
  static const Color feelingOverwhelmed = warmAmber;
  static const Color feelingUnheard = lavenderDusk;
  static const Color feelingLonely = dawnBlue;
  static const Color feelingAnxious = warmAmber;
  static const Color feelingHurt = dustyRose;

  // ── Moods ────────────────────────────────────────────────────
  static const Color moodJoyful = emberGold;
  static const Color moodCalm = sageWhisper;
  static const Color moodAnxious = warmAmber;
  static const Color moodSad = dawnBlue;
  static const Color moodOverwhelmed = lavenderDusk;

  // ── Home quick actions ───────────────────────────────────────
  static const Color quickAppreciation = lavenderDusk;
  static const Color quickMemoryJar = emberGold;
  static const Color quickMood = sageWhisper;
  static const Color quickUsTime = dustyRose;
}
