import 'package:flutter/painting.dart';

import 'app_colors.dart';

abstract final class AppGradients {
  /// Primary button, outgoing message bubble, avatar fallback (135deg).
  static const LinearGradient primary = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.velvetCrimson, AppColors.dustyRose],
  );

  /// We're Good CTA: Sage → Sage @ 80%.
  static const LinearGradient sage = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.sageWhisper, Color(0xCC7A9E8E)],
  );

  /// Hug button — light source at 40% / 30%.
  static const RadialGradient hug = RadialGradient(
    center: Alignment(-0.2, -0.4),
    colors: [AppColors.velvetCrimson, AppColors.dustyRose],
  );

  /// Avatar fallbacks — user vs partner are told apart by gradient.
  static const LinearGradient avatarUser = primary;
  static const LinearGradient avatarPartner = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.lavenderDusk, AppColors.dustyRose],
  );

  /// Global background blooms (UI spec §11): fade to transparent at 60%.
  static const RadialGradient bloomRose = RadialGradient(
    colors: [AppColors.bloomRose, AppColors.transparent],
    stops: [0.0, 0.6],
  );
  static const RadialGradient bloomCrimson = RadialGradient(
    colors: [AppColors.bloomCrimson, AppColors.transparent],
    stops: [0.0, 0.6],
  );
}
