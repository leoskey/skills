import 'package:flutter/material.dart';
import 'jb_theme.dart';

void main() => runApp(const IslandsApp());

class IslandsApp extends StatefulWidget {
  const IslandsApp({super.key});
  @override
  State<IslandsApp> createState() => _IslandsAppState();
}

class _IslandsAppState extends State<IslandsApp> {
  ThemeMode mode = ThemeMode.system;
  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'Islands 组件展示',
        debugShowCheckedModeBanner: false,
        theme: jbTheme(Brightness.light),
        darkTheme: jbTheme(Brightness.dark),
        themeMode: mode,
        themeAnimationDuration: Duration.zero,
        home: Workspace(
            mode: mode, onMode: (value) => setState(() => mode = value)),
      );
}

class Workspace extends StatefulWidget {
  const Workspace({super.key, required this.mode, required this.onMode});
  final ThemeMode mode;
  final ValueChanged<ThemeMode> onMode;
  @override
  State<Workspace> createState() => _WorkspaceState();
}

class _WorkspaceState extends State<Workspace> {
  final project = TextEditingController(text: 'workspace-ui');
  final filter = TextEditingController();
  String name = '设计工作台', current = '组件', message = '配置已更新。';
  bool autoSave = true;
  @override
  void dispose() {
    project.dispose();
    filter.dispose();
    super.dispose();
  }

  Future<void> editSettings() async {
    final result = await showDialog<String>(
        context: context,
        animationStyle: AnimationStyle.noAnimation,
        builder: (ctx) => WorkspaceSettingsDialog(name: name));
    if (mounted && result != null) setState(() => name = result);
  }

  Widget resources({bool drawer = false}) {
    final c = Theme.of(context).extension<JbColors>()!;
    final rows =
        ['组件', '主题颜色', '空状态'].where((item) => item.contains(filter.text));
    return JbIsland(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text('资源', style: TextStyle(fontWeight: FontWeight.w600)),
      JbField(
          label: '筛选资源', controller: filter, onChanged: (_) => setState(() {})),
      if (rows.isEmpty)
        const Padding(padding: EdgeInsets.all(12), child: Text('未找到资源')),
      for (final title in rows)
        Padding(
            padding: const EdgeInsets.only(bottom: 4),
            child: Semantics(
                selected: current == title,
                child: TextButton(
                  style: TextButton.styleFrom(
                      foregroundColor: c['text'],
                      backgroundColor: current == title
                          ? c['selection']
                          : Colors.transparent,
                      minimumSize: const Size(double.infinity, 48),
                      alignment: Alignment.centerLeft,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4))),
                  onPressed: () {
                    setState(() => current = title);
                    if (drawer) Navigator.pop(context);
                  },
                  child: Text(title),
                ))),
    ]));
  }

  Widget content() {
    final c = Theme.of(context).extension<JbColors>()!;
    if (current == '空状态')
      return Column(children: [
        const SizedBox(height: 40),
        Text('尚未添加资源', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        const Text('添加首个资源以开始整理工作区。'),
        const SizedBox(height: 16),
        JbButton(
            label: '添加资源',
            primary: true,
            onPressed: () => setState(() {
                  current = '组件';
                  message = '已添加示例资源。';
                })),
      ]);
    if (current == '主题颜色')
      return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('主题颜色', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 16),
        for (final key in [
          'window',
          'editor',
          'text',
          'muted',
          'accent',
          'link',
          'selection',
          'border'
        ])
          Padding(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Row(children: [
                Container(
                    width: 20,
                    height: 20,
                    decoration: BoxDecoration(
                        color: c[key],
                        border: Border.all(color: c['border']),
                        borderRadius: BorderRadius.circular(4))),
                const SizedBox(width: 12),
                Text(key),
              ])),
      ]);
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('常用组件', style: Theme.of(context).textTheme.titleMedium),
      const SizedBox(height: 8),
      Text('用于列表、表单和多面板应用的基础控件。', style: Theme.of(context).textTheme.bodySmall),
      const SizedBox(height: 24),
      Wrap(spacing: 8, runSpacing: 8, children: [
        JbButton(
            label: '保存',
            primary: true,
            onPressed: () => setState(() => message = '示例配置已保存在当前会话中。')),
        JbButton(
            label: '重置',
            onPressed: () => setState(() {
                  project.text = 'workspace-ui';
                  message = '已重置项目名称。';
                })),
        const JbButton(label: '发布', onPressed: null),
      ]),
      const SizedBox(height: 16),
      JbField(label: '项目名称', controller: project),
      CheckboxListTile(
          contentPadding: EdgeInsets.zero,
          title: const Text('自动保存'),
          value: autoSave,
          controlAffinity: ListTileControlAffinity.leading,
          onChanged: (v) => setState(() => autoSave = v!)),
      const SizedBox(height: 16),
      JbBanner(message: message),
      const SizedBox(height: 12),
      const JbBanner(message: '当前有未保存的修改。', kind: 'warning'),
      const SizedBox(height: 12),
      const JbBanner(message: '无法连接服务，请检查地址后重试。', kind: 'error'),
      const SizedBox(height: 24),
      Text('代码', style: Theme.of(context).textTheme.titleMedium),
      const SizedBox(height: 8),
      Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          color: c['panelAlternate'],
          child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Text("const theme = 'islands';",
                  style: TextStyle(
                      fontFamily: JbType.codeFamily,
                      fontSize: JbType.codeSize,
                      color: c['editorText'])))),
    ]);
  }

  @override
  Widget build(BuildContext context) => LayoutBuilder(builder: (context, size) {
        final narrow = size.maxWidth < JbMetrics.narrowBreakpoint;
        return Scaffold(
          drawer: narrow
              ? Drawer(child: SafeArea(child: resources(drawer: true)))
              : null,
          body: SafeArea(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                Padding(
                    padding: const EdgeInsets.all(8),
                    child: Wrap(
                        crossAxisAlignment: WrapCrossAlignment.center,
                        spacing: 12,
                        runSpacing: 8,
                        children: [
                          if (narrow)
                            Builder(
                                builder: (ctx) => IconButton(
                                    tooltip: '打开资源',
                                    onPressed: () =>
                                        Scaffold.of(ctx).openDrawer(),
                                    icon: const Icon(Icons.folder_outlined))),
                          Text(name,
                              style:
                                  const TextStyle(fontWeight: FontWeight.w600)),
                          Semantics(
                            label: '外观',
                            child: PopupMenuButton<ThemeMode>(
                              tooltip: '外观',
                              popUpAnimationStyle: AnimationStyle.noAnimation,
                              initialValue: widget.mode,
                              onSelected: widget.onMode,
                              itemBuilder: (_) => [
                                for (final entry in const {
                                  ThemeMode.system: '跟随系统',
                                  ThemeMode.light: '浅色',
                                  ThemeMode.dark: '深色',
                                }.entries)
                                  CheckedPopupMenuItem(
                                    value: entry.key,
                                    checked: widget.mode == entry.key,
                                    child: Text(entry.value),
                                  ),
                              ],
                              child: Container(
                                constraints: const BoxConstraints(minHeight: 48),
                                padding: const EdgeInsets.symmetric(horizontal: 8),
                                decoration: BoxDecoration(
                                  color: Theme.of(
                                    context,
                                  ).extension<JbColors>()!['control'],
                                  border: Border.all(
                                    color: Theme.of(
                                      context,
                                    ).extension<JbColors>()!['border'],
                                  ),
                                  borderRadius: BorderRadius.circular(
                                    JbMetrics.controlRadius,
                                  ),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(switch (widget.mode) {
                                      ThemeMode.system => '跟随系统',
                                      ThemeMode.light => '浅色',
                                      ThemeMode.dark => '深色',
                                    }),
                                    const SizedBox(width: 8),
                                    const Icon(Icons.keyboard_arrow_down),
                                  ],
                                ),
                              ),
                            ),
                          ),
                          JbButton(label: '设置…', onPressed: editSettings),
                        ])),
                Expanded(
                    child: Padding(
                        padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
                        child: Row(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              if (!narrow) ...[
                                SizedBox(
                                    width: JbMetrics.sidebarWidth,
                                    child: resources()),
                                const SizedBox(width: JbMetrics.islandGap)
                              ],
                              Expanded(
                                  child: JbIsland(
                                      child: SingleChildScrollView(
                                          child: content()))),
                            ]))),
              ])),
        );
      });
}

class WorkspaceSettingsDialog extends StatefulWidget {
  const WorkspaceSettingsDialog({super.key, required this.name});
  final String name;
  @override
  State<WorkspaceSettingsDialog> createState() =>
      _WorkspaceSettingsDialogState();
}

class _WorkspaceSettingsDialogState extends State<WorkspaceSettingsDialog> {
  late final draft = TextEditingController(text: widget.name);
  String? error;
  @override
  void dispose() {
    draft.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AlertDialog(
        title: const Text('工作区设置'),
        content: SizedBox(
            width: 360,
            child: Column(mainAxisSize: MainAxisSize.min, children: [
              JbField(label: '工作区名称', controller: draft, error: error),
              Text('设置在当前会话中生效。', style: Theme.of(context).textTheme.bodySmall),
            ])),
        actions: [
          JbButton(label: '取消', onPressed: () => Navigator.pop(context)),
          JbButton(
              label: '应用',
              primary: true,
              onPressed: () {
                if (draft.text.trim().isEmpty) {
                  setState(() => error = '请输入工作区名称。');
                  return;
                }
                Navigator.pop(context, draft.text.trim());
              })
        ],
      );
}
