import 'package:flutter/painting.dart';

/// Warm shadows (plum and crimson), never grey.
abstract final class AppShadows {
  // Elevation levels
  static const List<BoxShadow> level1 = [
    BoxShadow(color: Color(0x661A0A2E), blurRadius: 16, offset: Offset(0, 4)),
  ];
  static const List<BoxShadow> level2 = [
    BoxShadow(color: Color(0x408B1A4A), blurRadius: 32, offset: Offset(0, 8)),
  ];
  static const List<BoxShadow> level3 = [
    BoxShadow(color: Color(0x598B1A4A), blurRadius: 48, offset: Offset(0, 16)),
  ];
  static const List<BoxShadow> level4 = [
    BoxShadow(color: Color(0x991A0A2E), blurRadius: 64, offset: Offset(0, 24)),
  ];

  static const List<BoxShadow> primaryButton = [
    BoxShadow(color: Color(0x738B1A4A), blurRadius: 24, offset: Offset(0, 8)),
  ];

  // Glows — active / selected states
  static const List<BoxShadow> roseGlow = [
    BoxShadow(color: Color(0x80C4687A), blurRadius: 24),
  ];
  static const List<BoxShadow> goldGlow = [
    BoxShadow(color: Color(0x66C8863A), blurRadius: 24),
  ];
  static const List<BoxShadow> sageGlow = [
    BoxShadow(color: Color(0x807A9E8E), blurRadius: 24),
  ];
  static const List<BoxShadow> inputFocus = [
    BoxShadow(color: Color(0x59C4687A), blurRadius: 24),
  ];

  // Floating nav bar
  static const List<BoxShadow> navBar = [
    BoxShadow(color: Color(0x991A0A2E), blurRadius: 32, offset: Offset(0, -8)),
  ];
}
