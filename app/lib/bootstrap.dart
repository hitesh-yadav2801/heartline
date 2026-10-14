import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import 'app.dart';
import 'core/config/app_config.dart';
import 'core/constants/app_colors.dart';

/// App start-up: bindings, error zones, portrait lock, system UI, then `runApp`.
/// Firebase / Supabase / ObjectBox initialization is added by the tasks that wire them.
Future<void> bootstrap() async {
  runZonedGuarded<Future<void>>(
    () async {
      WidgetsFlutterBinding.ensureInitialized();

      FlutterError.onError = (details) {
        if (kDebugMode) FlutterError.presentError(details);
      };

      await SystemChrome.setPreferredOrientations([
        DeviceOrientation.portraitUp,
      ]);
      await SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
      SystemChrome.setSystemUIOverlayStyle(
        const SystemUiOverlayStyle(
          statusBarColor: AppColors.transparent,
          statusBarBrightness: Brightness.dark, // iOS: light content
          statusBarIconBrightness: Brightness.light, // Android: light icons
          systemNavigationBarColor: AppColors.transparent,
          systemNavigationBarIconBrightness: Brightness.light,
        ),
      );

      runApp(HeartlineApp(config: AppConfig.fromEnvironment()));
    },
    (error, stack) {
      // Never log user content here; error types and stacks only.
      if (kDebugMode) {
        debugPrint('Uncaught error: ${error.runtimeType}\n$stack');
      }
    },
  );
}
