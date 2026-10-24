# Flutter 接入

`assets/flutter/` 是最小示例包，无额外运行时依赖。`lib/jb_tokens.g.dart` 由生成器维护，`lib/jb_theme.dart` 提供主题和组件。

示例要求 Flutter 3.41+ / Dart 3.11+，已在 Flutter 3.41.0 验证。向较旧 Flutter 移植时先核对 ThemeData/ColorScheme API，再运行项目自己的分析与测试。

1. 复制这两个 Dart 文件到现有主题目录并调整 import。
2. 复制 fonts/，按示例 pubspec.yaml 声明 Inter、JetBrains Mono 和 Noto Sans SC，保留字体许可。后者用于本地中文回退，避免 Flutter Web 运行时才下载中文字体。只处理拉丁文字的项目可以移除 Noto Sans SC 声明及主题的对应 fallback；字体包体会明显减少。
3. 配置 MaterialApp 的 theme/darkTheme 为 `jbTheme(Brightness.light)` / `jbTheme(Brightness.dark)`，themeMode 由应用设置。合并业务主题扩展，保留 locale、路由、状态和缩放。
4. 从 `Theme.of(context).extension<JbColors>()!` 读取语义颜色，如 `colors['panel']`。组件可选复制 JbIsland、JbButton、JbField、JbBanner。

```dart
final colors = Theme.of(context).extension<JbColors>()!;
return JbIsland(child: Column(children: [
  Text('连接设置', style: Theme.of(context).textTheme.titleMedium),
  JbField(label: '服务地址', controller: controller, error: error),
  JbButton(label: '连接', primary: true, onPressed: connect),
]));
```

controller/error/connect 由应用提供。JbField 保持标签、错误和文字缩放；JbButton 基于 Flutter 按钮保留焦点和语义。

ThemeExtension 支持 copyWith/lerp，示例零时长切换。Material 作为实现基础，主题覆盖其颜色、圆角、表面染色与反馈；新增 Material 控件仍需视觉检查。

JbButton 的 touch 默认为 true（48px 命中目标），明确鼠标环境才设 false 使用 28px 最小高度。高度随文字增长，不能固定 MediaQuery.textScaler。使用 LayoutBuilder 按实际可用宽度决定抽屉和侧栏。

## 验证与运行

在 assets/flutter/ 执行：

```text
flutter pub get
flutter analyze
flutter test
```

运行到浏览器/桌面时先复制整个示例到新目录，在那里执行 `flutter create --platforms=web,windows .` 生成平台 runner，然后运行 `flutter run -d chrome` 或对应平台。复制字体与相对路径后再验证。
