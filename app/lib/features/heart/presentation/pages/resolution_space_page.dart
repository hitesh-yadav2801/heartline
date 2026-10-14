import 'package:flutter/material.dart';

import '../../../../core/constants/app_strings.dart';
import '../../../../shared/widgets/placeholder_view.dart';

/// Placeholder until the Resolution Space task. Full-screen (no nav bar).
class ResolutionSpacePage extends StatelessWidget {
  const ResolutionSpacePage({super.key, required this.heartId});

  final String heartId;

  @override
  Widget build(BuildContext context) {
    return const PlaceholderView(
      title: AppStrings.resolutionSpaceTitle,
      showBack: true,
    );
  }
}
