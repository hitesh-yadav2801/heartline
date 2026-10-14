import 'package:flutter/material.dart';

import 'core/config/app_config.dart';
import 'core/constants/app_strings.dart';
import 'core/router/app_router.dart';
import 'core/theme/app_theme.dart';
import 'shared/widgets/heartline_background.dart';

class HeartlineApp extends StatelessWidget {
  const HeartlineApp({super.key, required this.config});

  final AppConfig config;

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: AppStrings.appName,
      theme: AppTheme.theme,
      debugShowCheckedModeBanner: false,
      routerConfig: AppRouter.router,
      // One global background behind every route (UI spec §11).
      builder: (context, child) =>
          HeartlineBackground(child: child ?? const SizedBox.shrink()),
    );
  }
}
