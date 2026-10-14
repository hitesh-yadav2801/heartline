import 'package:flutter/material.dart';

import '../../../../core/constants/app_strings.dart';
import '../../../../shared/widgets/placeholder_view.dart';

/// Placeholder until the Open a Heart flow task. Full-screen (no nav bar).
class RaiseHeartPage extends StatelessWidget {
  const RaiseHeartPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const PlaceholderView(
      title: AppStrings.raiseHeartTitle,
      showBack: true,
    );
  }
}
