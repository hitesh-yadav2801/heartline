import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../core/constants/app_colors.dart';
import '../../core/constants/app_sizes.dart';
import '../../core/constants/app_spacing.dart';
import '../../core/constants/app_strings.dart';
import '../../core/constants/app_text_styles.dart';

/// A temporary preview link on a placeholder page (debug builds only).
class PreviewLink {
  const PreviewLink({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;
}

/// Temporary body for screens that are not built yet. Replaced screen by screen in later tasks.
class PlaceholderView extends StatelessWidget {
  const PlaceholderView({
    super.key,
    required this.title,
    this.showBack = false,
    this.previewLinks = const [],
  });

  final String title;
  final bool showBack;
  final List<PreviewLink> previewLinks;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.screenHorizontal,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      title,
                      style: AppTextStyles.displayMd,
                      textAlign: TextAlign.center,
                    ),
                    if (kDebugMode)
                      for (final link in previewLinks) ...[
                        const SizedBox(height: AppSpacing.md),
                        TextButton(
                          onPressed: link.onTap,
                          child: Text(
                            link.label,
                            style: AppTextStyles.label.copyWith(
                              color: AppColors.dustyRose,
                            ),
                          ),
                        ),
                      ],
                  ],
                ),
              ),
            ),
            if (showBack)
              Padding(
                padding: const EdgeInsets.all(AppSpacing.xs),
                child: IconButton(
                  tooltip: AppStrings.previewBack,
                  onPressed: () => context.pop(),
                  icon: const Icon(
                    LucideIcons.chevronLeft300,
                    size: AppSizes.iconLg,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
