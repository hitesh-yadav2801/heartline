import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../constants/app_motion.dart';

/// Heartline page transitions (UI spec §4.2):
/// forward — new page fades in and slides up 16px (300ms, decelerate), old page fades to 80%;
/// back — the reverse (250ms, accelerate).
abstract final class AppPageTransitions {
  static CustomTransitionPage<void> build({
    required GoRouterState state,
    required Widget child,
  }) {
    return CustomTransitionPage<void>(
      key: state.pageKey,
      name: state.name,
      child: child,
      transitionDuration: AppDurations.normal,
      reverseTransitionDuration: AppDurations.back,
      transitionsBuilder: _transition,
    );
  }

  static Widget _transition(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    final enter = CurvedAnimation(
      parent: animation,
      curve: AppCurves.decelerate,
      reverseCurve: AppCurves.accelerate,
    );
    final exit = CurvedAnimation(
      parent: secondaryAnimation,
      curve: AppCurves.decelerate,
      reverseCurve: AppCurves.accelerate,
    );

    return FadeTransition(
      opacity: Tween<double>(
        begin: 1,
        end: AppMotionOffsets.pageExitOpacity,
      ).animate(exit),
      child: FadeTransition(
        opacity: enter,
        child: AnimatedBuilder(
          animation: enter,
          builder: (context, child) => Transform.translate(
            offset: Offset(0, AppMotionOffsets.pageForward * (1 - enter.value)),
            child: child,
          ),
          child: child,
        ),
      ),
    );
  }
}
