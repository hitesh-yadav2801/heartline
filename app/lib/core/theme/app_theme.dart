import 'package:flutter/material.dart';

import '../constants/app_colors.dart';
import '../constants/app_sizes.dart';
import '../constants/app_text_styles.dart';

/// Heartline has one theme: dark. There is no light theme and no `themeMode`.
abstract final class AppTheme {
  static final ThemeData theme = _build();

  static ThemeData _build() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: AppColors.velvetCrimson,
      brightness: Brightness.dark,
    ).copyWith(
      primary: AppColors.velvetCrimson,
      onPrimary: AppColors.warmCream,
      secondary: AppColors.dustyRose,
      onSecondary: AppColors.warmCream,
      surface: AppColors.midnightRose,
      onSurface: AppColors.textPrimary,
      onSurfaceVariant: AppColors.textSecondary,
      error: AppColors.error,
      onError: AppColors.warmCream,
      outline: AppColors.glassBorder,
      outlineVariant: AppColors.divider,
      scrim: AppColors.scrim,
    );

    final textTheme = const TextTheme(
      displayLarge: AppTextStyles.displayXl,
      displayMedium: AppTextStyles.displayLg,
      displaySmall: AppTextStyles.displayMd,
      headlineMedium: AppTextStyles.headline,
      titleLarge: AppTextStyles.title,
      titleMedium: AppTextStyles.label,
      bodyLarge: AppTextStyles.bodyLg,
      bodyMedium: AppTextStyles.bodyMd,
      labelLarge: AppTextStyles.label,
      labelMedium: AppTextStyles.caption,
      labelSmall: AppTextStyles.micro,
      bodySmall: AppTextStyles.caption,
    ).apply(
      bodyColor: AppColors.textPrimary,
      displayColor: AppColors.textPrimary,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: colorScheme,
      fontFamily: AppTextStyles.sans,
      textTheme: textTheme,
      // The global HeartlineBackground (deep plum + blooms) is painted behind every route.
      scaffoldBackgroundColor: AppColors.transparent,
      canvasColor: AppColors.deepPlum,
      dividerColor: AppColors.divider,
      splashFactory: InkSparkle.splashFactory,
      iconTheme: const IconThemeData(
        color: AppColors.textPrimary,
        size: AppSizes.iconLg,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.transparent,
        surfaceTintColor: AppColors.transparent,
        elevation: 0,
        foregroundColor: AppColors.textPrimary,
      ),
    );
  }
}
