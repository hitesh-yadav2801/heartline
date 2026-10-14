import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:heartline/app.dart';
import 'package:heartline/core/config/app_config.dart';
import 'package:heartline/core/constants/app_strings.dart';

void main() {
  // The background particles loop forever, so pump fixed frames instead of pumpAndSettle.
  const frame = Duration(milliseconds: 400);

  Finder navTab(String label) => find.byWidgetPredicate(
    (widget) =>
        widget is Semantics &&
        widget.properties.button == true &&
        widget.properties.label == label,
  );

  testWidgets('app opens on Home with the 5-tab nav bar', (tester) async {
    await tester.pumpWidget(
      const HeartlineApp(config: AppConfig(useMocks: true)),
    );
    await tester.pump(frame);

    expect(find.text(AppStrings.homeTitle), findsWidgets);
    for (final label in [
      AppStrings.tabHome,
      AppStrings.tabHearts,
      AppStrings.tabMood,
      AppStrings.tabUsTime,
      AppStrings.tabProfile,
    ]) {
      expect(navTab(label), findsOneWidget);
    }
  });

  testWidgets('Us Time tab shows the empty state', (tester) async {
    await tester.pumpWidget(
      const HeartlineApp(config: AppConfig(useMocks: true)),
    );
    await tester.pump(frame);

    await tester.tap(navTab(AppStrings.tabUsTime));
    await tester.pump(frame);

    expect(find.text(AppStrings.usTimeEmptyTitle), findsOneWidget);
    expect(find.text(AppStrings.usTimeEmptyBody), findsOneWidget);
    expect(find.byType(Icon), findsWidgets);
  });
}
