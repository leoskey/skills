import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:jetbrains_islands_starter/main.dart';
import 'package:jetbrains_islands_starter/jb_theme.dart';

void main() {
  testWidgets('Primary button keeps touch target and a distinct focus edge',
      (tester) async {
    await tester.pumpWidget(MaterialApp(
        theme: jbTheme(Brightness.dark),
        home: Scaffold(
            body: Center(
                child:
                    JbButton(label: '保存', primary: true, onPressed: () {})))));
    final button = tester.widget<OutlinedButton>(find.byType(OutlinedButton));
    final style = button.style!;
    expect(tester.getSize(find.byType(OutlinedButton)).height,
        greaterThanOrEqualTo(48));
    expect(style.side!.resolve({WidgetState.focused})!.color,
        isNot(style.backgroundColor!.resolve({WidgetState.focused})));
    expect(
        style.overlayColor!.resolve({WidgetState.pressed}), Colors.transparent);
  });
  test(
      'Theme extension preserves opaque and alpha colors and supports copy/lerp',
      () {
    expect(JbColors.dark['window'], const Color(0xFF26282C));
    expect(JbColors.dark['hover'], const Color(0x17FFFFFF));
    expect(JbColors.light.copyWith(values: {'text': Colors.red})['text'],
        Colors.red);
    expect(
        JbColors.light.lerp(JbColors.dark, 1)['text'], JbColors.dark['text']);
    expect(jbTheme(Brightness.dark).extension<JbColors>(), isNotNull);
  });
  testWidgets('Settings validate, cancel without mutation, then apply',
      (tester) async {
    await tester.pumpWidget(const IslandsApp());
    await tester.pumpAndSettle();
    await tester.tap(find.text('设置…'));
    await tester.pumpAndSettle();
    await tester.enterText(
        find.descendant(
            of: find.byType(WorkspaceSettingsDialog),
            matching: find.byType(TextField)),
        '');
    await tester.tap(find.text('应用'));
    await tester.pumpAndSettle();
    expect(find.text('请输入工作区名称。'), findsOneWidget);
    await tester.enterText(
        find.descendant(
            of: find.byType(WorkspaceSettingsDialog),
            matching: find.byType(TextField)),
        '未应用');
    await tester.tap(find.text('取消'));
    await tester.pumpAndSettle();
    expect(find.text('设计工作台'), findsOneWidget);
    expect(find.text('未应用'), findsNothing);
    await tester.tap(find.text('设置…'));
    await tester.pumpAndSettle();
    await tester.enterText(
        find.descendant(
            of: find.byType(WorkspaceSettingsDialog),
            matching: find.byType(TextField)),
        '我的工作区');
    await tester.tap(find.text('应用'));
    await tester.pumpAndSettle();
    expect(find.text('我的工作区'), findsOneWidget);
  });
  testWidgets('Narrow drawer, filter empty state and scaled text stay usable',
      (tester) async {
    tester.view.resetPhysicalSize();
    tester.view.physicalSize = const Size(390, 844);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const IslandsApp());
    await tester.pumpAndSettle();
    await tester.tap(find.byTooltip('打开资源'));
    await tester.pumpAndSettle();
    await tester.enterText(
        find.descendant(
            of: find.byType(Drawer), matching: find.byType(TextField)),
        '不存在');
    await tester.pumpAndSettle();
    expect(find.text('未找到资源'), findsOneWidget);
    await tester.enterText(
        find.descendant(
            of: find.byType(Drawer), matching: find.byType(TextField)),
        '主题');
    await tester.pumpAndSettle();
    await tester.tap(find.text('主题颜色'));
    await tester.pumpAndSettle();
    expect(find.text('window'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(MaterialApp(
        theme: jbTheme(Brightness.light),
        home: MediaQuery(
            data: const MediaQueryData(textScaler: TextScaler.linear(2)),
            child: const Workspace(mode: ThemeMode.light, onMode: _ignore))));
    await tester.pumpAndSettle();
    expect(tester.takeException(), isNull);
  });
}

void _ignore(ThemeMode _) {}
