import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/constants/app_strings.dart';
import '../../../../core/router/app_routes.dart';
import '../../../../shared/widgets/placeholder_view.dart';

/// Placeholder until the Home screen task.
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  // Fake id used only by the temporary preview link.
  static const _previewHeartId = 'preview';

  @override
  Widget build(BuildContext context) {
    return PlaceholderView(
      title: AppStrings.homeTitle,
      previewLinks: [
        PreviewLink(
          label: AppStrings.previewOpenHeart,
          onTap: () => context.pushNamed(AppRoutes.raiseHeart),
        ),
        PreviewLink(
          label: AppStrings.previewResolutionSpace,
          onTap: () => context.pushNamed(
            AppRoutes.resolutionSpace,
            pathParameters: {AppRoutes.heartIdParam: _previewHeartId},
          ),
        ),
      ],
    );
  }
}
