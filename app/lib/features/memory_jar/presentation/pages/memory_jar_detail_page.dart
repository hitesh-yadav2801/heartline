import 'package:flutter/material.dart';

import '../../../../core/constants/app_strings.dart';
import '../../../../shared/widgets/placeholder_view.dart';

/// Placeholder until the Memory Jar detail task. Full-screen (no nav bar).
class MemoryJarDetailPage extends StatelessWidget {
  const MemoryJarDetailPage({super.key, required this.heartId});

  final String heartId;

  @override
  Widget build(BuildContext context) {
    return const PlaceholderView(
      title: AppStrings.memoryJarDetailTitle,
      showBack: true,
    );
  }
}
