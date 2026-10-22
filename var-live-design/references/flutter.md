# Flutter 适配

先检查项目 Flutter 版本、现有 ThemeData / ThemeExtension、组件与字体声明。保持当前状态管理和路由。这里是接入说明，不是已经编译验证的 Flutter 组件库。

## 映射

| 设计变量 | Flutter |
|---|---|
| color.background / surface / text.primary | ThemeData.scaffoldBackgroundColor、ColorScheme.surface / onSurface |
| color.action.primary / onPrimary | ColorScheme.primary / onPrimary |
| color.status.danger | ColorScheme.error |
| 自定义状态、边界与品牌层级 | 现有 ThemeExtension，或按需求增加小型扩展 |
| text.* | TextTheme 的对应样式；字号为逻辑像素，height 为倍率 |
| space / radius / control / layout | 公共 Dart 常量或现有扩展，不在每页重复写 |
| motion.* | Duration(milliseconds: value) |

tokens 中颜色是 sRGB 0–1 分量，映射到 Flutter 时每项乘以 255 后四舍五入，alpha 同理。例如 action.primary 对应 `Color(0xFFF59A00)`。dimension 的 px 在此映射为逻辑像素；不要额外乘 devicePixelRatio。

优先在 FilledButtonTheme、OutlinedButtonTheme、InputDecorationTheme 等现有组件主题中明确外观，保留平台的语义和命中行为。自定义 Widget 只补项目需要的品牌组合，不包裹全部原生控件。不要使用 ColorScheme.fromSeed 生成色替代已确定的品牌橙和中性色；如用其补齐其他槽位，显式覆盖本包指定的槽位。

根据当前 SDK 支持的字段设置表面色、描边、圆角、阴影和交互覆盖色；避免默认色调叠加改变面板。分别检查默认、悬停、焦点、按下和禁用样式。

## 字体

复制 assets/fonts/NotoSansTC-Variable.ttf 和 OFL.txt 到目标项目，按项目约定声明，例如：

```yaml
flutter:
  fonts:
    - family: VarLiveSans
      fonts:
        - asset: assets/fonts/NotoSansTC-Variable.ttf
```

ThemeData.fontFamily 使用 `VarLiveSans`。注册包内 OFL 文本到应用现有的许可展示流程。

此字体具有 wght 100–900 可变轴。Flutter 3.41 起 FontWeight 同时设置该轴；更旧版本如不能正确呈现字重，使用 dart:ui 的 FontVariation('wght', 600) 等与目标字重一致的配置。不要通过调大字号冒充粗体。检查实际 SDK，而不是强制升级项目。

来源：[Flutter 自定义字体](https://docs.flutter.dev/cookbook/design/fonts)、[可变字体字重变更](https://docs.flutter.dev/release/breaking-changes/font-weight-variation)。

## 图标、布局和测试

- 已安装 SVG 渲染支持时可使用包内 icons。没有时优先复用已有统一线性图标，或为少量图标使用原生绘制；不为了使用本包强制增加依赖。
- 使用 LayoutBuilder 根据可用宽度选择侧栏或抽屉，用灵活布局支持长中文。保留 MediaQuery 的文字缩放，避免固定高度裁切字形。
- 字体测试字符串可用：`營運總覽 設備管理 體驗場次 NT$ 86,400 82.5%`，同时验证项目真实语言和动态数据。
- 运行现有分析与相关 Widget 测试；有环境时以实际页面截图验证。不要把 Web 预览通过当成 Flutter 编译或渲染通过。
