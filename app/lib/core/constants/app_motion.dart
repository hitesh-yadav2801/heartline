import 'package:flutter/animation.dart';

abstract final class AppDurations {
  // toggles, press-in
  static const Duration micro = Duration(milliseconds: 100);
  // chip selection
  static const Duration quick = Duration(milliseconds: 200);
  // page transitions, reveals
  static const Duration normal = Duration(milliseconds: 300);
  // back navigation
  static const Duration back = Duration(milliseconds: 250);
  // bottom sheets, modals
  static const Duration slow = Duration(milliseconds: 500);
  // Heart open, Hug send
  static const Duration emotional = Duration(milliseconds: 800);
  // We're Good, onboarding
  static const Duration ceremonial = Duration(milliseconds: 1200);
  // Hug button, waiting dots, Heart Sent
  static const Duration heartbeat = Duration(milliseconds: 1200);
  // Hug ripple rings
  static const Duration ripple = Duration(milliseconds: 1600);
  // screen content fade-up
  static const Duration pageEnter = Duration(milliseconds: 500);

  // Global background particles: each drifts upward over 12–20s.
  static const Duration particleMin = Duration(seconds: 12);
  static const Duration particleMax = Duration(seconds: 20);
}

/// Never use `Curves.linear`.
abstract final class AppCurves {
  static const Cubic standard = Cubic(0.4, 0.0, 0.2, 1.0);
  static const Cubic decelerate = Cubic(0.0, 0.0, 0.2, 1.0); // entering
  static const Cubic accelerate = Cubic(0.4, 0.0, 1.0, 1.0); // leaving
  static const Cubic spring = Cubic(0.34, 1.56, 0.64, 1.0); // positive moments
  static const Cubic breathe = Cubic(0.45, 0.05, 0.55, 0.95); // idle / living
}

/// Small motion distances used by transitions (logical px).
abstract final class AppMotionOffsets {
  static const double pageForward = 16.0; // forward navigation slide-up
  static const double pageEnter = 12.0; // screen content fade-up
  static const double pageExitOpacity = 0.8; // old screen fades to 80%
}
