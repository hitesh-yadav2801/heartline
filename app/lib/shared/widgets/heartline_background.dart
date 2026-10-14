import 'dart:ui';

import 'package:flutter/material.dart';

import '../../core/constants/app_colors.dart';
import '../../core/constants/app_gradients.dart';
import '../../core/constants/app_motion.dart';
import '../../core/constants/app_sizes.dart';

/// The global layered background behind every screen (UI spec §11):
/// deep plum, two radial blooms, grain, and 12 drifting particles.
///
/// It is mounted once (in `MaterialApp.router`'s builder) so particles never restart between pages.
class HeartlineBackground extends StatelessWidget {
  const HeartlineBackground({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    return ColoredBox(
      color: AppColors.deepPlum,
      child: Stack(
        fit: StackFit.expand,
        children: [
          // Bloom 1: ellipse with radii 600×400, centred at 85% / -10%.
          Positioned(
            left: size.width * 0.85 - AppSizes.bloomRoseRadiusX,
            top: size.height * -0.10 - AppSizes.bloomRoseRadiusY,
            width: AppSizes.bloomRoseRadiusX * 2,
            height: AppSizes.bloomRoseRadiusY * 2,
            child: Transform.scale(
              scaleY: AppSizes.bloomRoseRadiusY / AppSizes.bloomRoseRadiusX,
              child: const OverflowBox(
                maxWidth: AppSizes.bloomRoseRadiusX * 2,
                maxHeight: AppSizes.bloomRoseRadiusX * 2,
                child: SizedBox.square(
                  dimension: AppSizes.bloomRoseRadiusX * 2,
                  child: DecoratedBox(
                    decoration: BoxDecoration(gradient: AppGradients.bloomRose),
                  ),
                ),
              ),
            ),
          ),
          // Bloom 2: circle with radius 500, centred at 10% / 110%.
          Positioned(
            left: size.width * 0.10 - AppSizes.bloomCrimsonRadius,
            top: size.height * 1.10 - AppSizes.bloomCrimsonRadius,
            width: AppSizes.bloomCrimsonRadius * 2,
            height: AppSizes.bloomCrimsonRadius * 2,
            child: const DecoratedBox(
              decoration: BoxDecoration(gradient: AppGradients.bloomCrimson),
            ),
          ),
          const RepaintBoundary(child: CustomPaint(painter: _GrainPainter())),
          const RepaintBoundary(child: _Particles()),
          child,
        ],
      ),
    );
  }
}

/// 4% dot noise on a 3px grid. Painted once.
class _GrainPainter extends CustomPainter {
  const _GrainPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final points = <Offset>[
      for (var y = 0.0; y < size.height; y += AppSizes.grainSpacing)
        for (var x = 0.0; x < size.width; x += AppSizes.grainSpacing)
          Offset(x, y),
    ];
    final paint = Paint()
      ..color = AppColors.grain
      ..strokeWidth = AppSizes.grainDot
      ..strokeCap = StrokeCap.round;
    canvas.drawPoints(PointMode.points, points, paint);
  }

  @override
  bool shouldRepaint(_GrainPainter oldDelegate) => false;
}

/// 12 Dusty Rose dots drifting upward over 12–20s each (positions, sizes and delays mirror the mock).
class _Particles extends StatefulWidget {
  const _Particles();

  @override
  State<_Particles> createState() => _ParticlesState();
}

class _ParticlesState extends State<_Particles>
    with SingleTickerProviderStateMixin {
  // One controller covers a full cycle of every particle: LCM(12, 14, 16, 18, 20) = 5040s,
  // so the loop is seamless and value * cycle is the elapsed time in seconds.
  static const int _cycleSeconds = 5040;

  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(seconds: _cycleSeconds),
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (MediaQuery.disableAnimationsOf(context)) {
      _controller.stop();
    } else if (!_controller.isAnimating) {
      _controller.repeat();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: CustomPaint(
        painter: _ParticlePainter(_controller, _cycleSeconds),
        size: Size.infinite,
      ),
    );
  }
}

class _ParticlePainter extends CustomPainter {
  _ParticlePainter(this.animation, this.cycleSeconds)
    : super(repaint: animation);

  final Animation<double> animation;
  final int cycleSeconds;

  static const _durationStepSeconds = 2;
  static const _delayStepSeconds = 1.3;
  static const _fadeInEnd = 0.2;
  static const _startScale = 0.6;
  static const _endY = -0.10; // fraction of height above the top

  @override
  void paint(Canvas canvas, Size size) {
    final elapsed = animation.value * cycleSeconds;
    final minSeconds = AppDurations.particleMin.inSeconds;
    final paint = Paint();

    for (var i = 0; i < AppSizes.particleCount; i++) {
      final duration = minSeconds + (i % 5) * _durationStepSeconds;
      final delay =
          (i * _delayStepSeconds) % AppDurations.particleMin.inSeconds;
      final raw = ((elapsed + delay) % duration) / duration;
      final t = AppCurves.breathe.transform(raw);

      final diameter =
          AppSizes.particleMin +
          (i % 3).clamp(0, AppSizes.particleMax - AppSizes.particleMin);
      final scale = _startScale + (1 - _startScale) * t;
      final envelope = raw < _fadeInEnd
          ? raw / _fadeInEnd
          : 1 - (raw - _fadeInEnd) / (1 - _fadeInEnd);

      final x = size.width * ((i * 83) % 100) / 100;
      final y = size.height + (size.height * _endY - size.height) * t;

      paint.color = AppColors.particle.withValues(
        alpha: AppColors.particle.a * envelope,
      );
      canvas.drawCircle(Offset(x, y), diameter * scale / 2, paint);
    }
  }

  @override
  bool shouldRepaint(_ParticlePainter oldDelegate) => false;
}
