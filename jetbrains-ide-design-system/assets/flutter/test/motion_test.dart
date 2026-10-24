import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jetbrains_islands_starter/main.dart';
import 'package:jetbrains_islands_starter/jb_theme.dart';

double effectiveOpacity(WidgetTester tester, Finder finder) {
  double opacity = 1;
  RenderObject? render = tester.renderObject(finder);
  while (render != null) {
    if (render is RenderAnimatedOpacity) opacity *= render.opacity.value;
    if (render is RenderOpacity) opacity *= render.opacity;
    render = render.parent;
  }
  return opacity;
}

void main() {
  for (final reduced in [false, true]) {
    testWidgets(
      'Menus and dialogs are ready on the next frame (reduced=$reduced)',
      (tester) async {
        tester.binding.platformDispatcher.accessibilityFeaturesTestValue =
            FakeAccessibilityFeatures(disableAnimations: reduced);
        addTearDown(
          tester.binding.platformDispatcher.clearAccessibilityFeaturesTestValue,
        );
        await tester.pumpWidget(const IslandsApp());
        await tester.pumpAndSettle();

        await tester.tap(find.byTooltip('外观'));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 16));
        for (final label in ['浅色', '深色']) {
          expect(find.text(label), findsOneWidget);
          expect(effectiveOpacity(tester, find.text(label)), 1);
        }
        await tester.tap(
          find.widgetWithText(CheckedPopupMenuItem<ThemeMode>, '深色'),
        );
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 16));
        final colors = Theme.of(
          tester.element(find.byType(Workspace)),
        ).extension<JbColors>()!;
        expect(colors['panel'], JbColors.dark['panel']);
        expect(find.byType(PopupMenuItem<ThemeMode>), findsNothing);

        await tester.tap(find.text('设置…'));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 16));
        expect(effectiveOpacity(tester, find.text('工作区设置')), 1);
        await tester.sendKeyEvent(LogicalKeyboardKey.escape);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 16));
        expect(find.byType(WorkspaceSettingsDialog), findsNothing);
        await tester.tap(find.text('设置…'));
        await tester.pump();
        expect(find.byType(WorkspaceSettingsDialog), findsOneWidget);
        await tester.tap(find.text('取消'));
        await tester.pump();
        expect(find.byType(WorkspaceSettingsDialog), findsNothing);
        expect(tester.takeException(), isNull);
      },
    );
  }

  testWidgets('Reduced system motion shortens the native drawer transition', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    addTearDown(
      tester.binding.platformDispatcher.clearAccessibilityFeaturesTestValue,
    );
    final positions = <bool, double>{};
    for (final reduced in [false, true]) {
      tester.binding.platformDispatcher.accessibilityFeaturesTestValue =
          FakeAccessibilityFeatures(disableAnimations: reduced);
      await tester.pumpWidget(const SizedBox());
      await tester.pumpWidget(const IslandsApp());
      await tester.pumpAndSettle();
      await tester.tap(find.byTooltip('打开资源'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 50));
      positions[reduced] = tester.getTopLeft(find.byType(Drawer)).dx;
      await tester.pumpAndSettle();
      expect(tester.getTopLeft(find.byType(Drawer)).dx, closeTo(0, .1));
    }
    expect(positions[false]!, lessThan(-1));
    expect(positions[true]!, closeTo(0, .1));
  });
}
