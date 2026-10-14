import 'package:flutter/material.dart';

import '../../../../core/constants/app_strings.dart';
import '../../../../shared/widgets/placeholder_view.dart';

/// Placeholder until the Daily Mood task.
class MoodPage extends StatelessWidget {
  const MoodPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const PlaceholderView(title: AppStrings.moodTitle);
  }
}
