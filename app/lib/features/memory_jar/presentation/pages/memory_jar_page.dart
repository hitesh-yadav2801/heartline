import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/constants/app_strings.dart';
import '../../../../core/router/app_routes.dart';
import '../../../../shared/widgets/placeholder_view.dart';

/// Placeholder until the Memory Jar task. Shown by the Hearts tab.
class MemoryJarPage extends StatelessWidget {
  const MemoryJarPage({super.key});

  // Fake id used only by the temporary preview link.
  static const _previewHeartId = 'preview';

  @override
  Widget build(BuildContext context) {
    return PlaceholderView(
      title: AppStrings.memoryJarTitle,
      previewLinks: [
        PreviewLink(
          label: AppStrings.previewMemoryJarDetail,
          onTap: () => context.pushNamed(
            AppRoutes.memoryJarDetail,
            pathParameters: {AppRoutes.heartIdParam: _previewHeartId},
          ),
        ),
      ],
    );
  }
}
