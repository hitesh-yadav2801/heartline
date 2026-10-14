import 'package:flutter/painting.dart';

/// Type scale. Colors are NOT baked in: the theme applies them, or use `copyWith(color: ...)`.
/// One-off sizes from the UI spec are built with `copyWith` from the nearest style — never a new `TextStyle`.
abstract final class AppTextStyles {
  static const String serif = 'CormorantGaramond';
  static const String sans = 'DMSans';

  // ── Display — Cormorant Garamond ─────────────────────────────
  static const TextStyle displayXl = TextStyle(
    fontFamily: serif,
    fontSize: 48,
    fontWeight: FontWeight.w600,
    fontStyle: FontStyle.italic,
    height: 1.1,
    letterSpacing: -1,
  );
  static const TextStyle displayLg = TextStyle(
    fontFamily: serif,
    fontSize: 38,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    height: 1.2,
    letterSpacing: -0.5,
  );
  static const TextStyle displayMd = TextStyle(
    fontFamily: serif,
    fontSize: 32,
    fontWeight: FontWeight.w400,
    height: 1.25,
    letterSpacing: -0.3,
  );

  /// Pulled quotes, empty states, letter-style text.
  static const TextStyle quote = TextStyle(
    fontFamily: serif,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    height: 1.75,
  );

  // ── UI — DM Sans ─────────────────────────────────────────────
  static const TextStyle headline = TextStyle(
    fontFamily: sans,
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.3,
    letterSpacing: -0.2,
  );
  static const TextStyle title = TextStyle(
    fontFamily: sans,
    fontSize: 18,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: -0.1,
  );
  static const TextStyle bodyLg = TextStyle(
    fontFamily: sans,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.65,
  );
  static const TextStyle bodyMd = TextStyle(
    fontFamily: sans,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.6,
  );
  static const TextStyle label = TextStyle(
    fontFamily: sans,
    fontSize: 13,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: 0.2,
  );
  static const TextStyle caption = TextStyle(
    fontFamily: sans,
    fontSize: 11,
    fontWeight: FontWeight.w400,
    height: 1.5,
    letterSpacing: 0.3,
  );

  /// Section labels, ALL CAPS — uppercase the string itself.
  static const TextStyle micro = TextStyle(
    fontFamily: sans,
    fontSize: 11,
    fontWeight: FontWeight.w400,
    height: 1.4,
    letterSpacing: 0.4,
  );
}
