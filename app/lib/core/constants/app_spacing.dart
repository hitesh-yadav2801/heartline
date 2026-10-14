/// 4px base unit. The spec's `2xs`/`2xl`/`3xl`/`4xl` are renamed (Dart identifiers can't start with a digit).
abstract final class AppSpacing {
  static const double xxs = 4.0; // spec: 2xs
  static const double xs = 8.0;
  static const double sm = 12.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0; // spec: 2xl
  static const double xxxl = 64.0; // spec: 3xl
  static const double xxxxl = 96.0; // spec: 4xl

  static const double screenHorizontal = md; // 16px side margins
  static const double cardPadding = 20.0;
}
