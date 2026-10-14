# 平台映射

设计规则不依赖具体框架。先把语义 token、信息层级、交互状态和可访问性映射到目标项目已有的主题与组件系统；下面的 Web 和 Flutter 示例按需选用，不要求更换技术栈。其他平台可沿用同样的映射方法。

## Web

导入 [tokens.css](../assets/tokens.css)，组件样式引用 `var(--mds-…)`。对应数值维护在 [tokens.json](../assets/tokens.json)，CSS 是便于直接使用的镜像；更新任一数值时同步两份。JSON 是本 skill 的简单 token schema，不声称兼容 DTCG 或某个生成工具。

前缀 `mds` 避免污染已有主题。根节点设 `font-family: var(--mds-font-family)`、主字色和工作区背景；数字用 `font-variant-numeric: tabular-nums`。卡片边框使用 border token，输入控件使用 control-border。选中行和焦点可使用 outline / inset box-shadow，避免边框厚度改变布局。

`--mds-pattern-blue` 与 `--mds-pattern-negative` 是 CSS 背景，可用于短条；SVG 图表用对应颜色和间距定义 `<pattern>`，每个实例 ID 唯一并裁切到数据区域。canvas 图表需要文本替代。复用现有图表库，不为了实现视觉而强制新增框架。

## Flutter

逻辑像素直接对应 token 数值。优先将语义颜色、尺寸、纹理间距封装为不可变 token 类或 `ThemeExtension`，让各页面通过主题访问；不把十六进制值分散到 widget。

| Token／组件 | Flutter 实现方向 |
| --- | --- |
| color.shell / surface | `Scaffold.backgroundColor` / 容器背景；Material 3 的 surfaceTint 不应额外染色 |
| radius.card + color.border | `RoundedRectangleBorder` 或 `BoxDecoration`；避免 Card 默认 elevation 改变灰白层次 |
| typography | `TextTheme` 显式设置 fontSize、height=行高/字号、fontWeight；保留系统字体与文字缩放 |
| 数字 | `FontFeature.tabularFigures()`；不要把带单位的数字固定在无法伸展的窄容器 |
| AppShell | `LayoutBuilder` 依可用宽度选侧栏、rail 或 drawer；复用现有路由选中状态 |
| 表格 | 复用项目 DataTable／自定义行；数值列右对齐，语义说明选中及排序状态 |
| 斜线纹理 | `CustomPainter` 先 clipRect／clipPath，再按 4px 间距绘制 1px 斜线；颜色和设备比例验证 |
| InsightCard | `Stack` 叠加 LinearGradient／RadialGradient 与局部深色遮罩，不依赖外部位图 |
| Toggle / modal | 使用平台已有 Switch、Dialog 等行为并调整颜色圆角；补足焦点、语义及 pending 状态 |
| CSS 阴影 | 按颜色、offset、blur、spread 映射到 `BoxShadow`；CSS blur 与 Flutter blurRadius 视觉不同，需渲染校准 |

尊重 `MediaQuery` 的文字缩放与减少动效偏好；给绘制图表添加 `Semantics` 和可访问的数据列表。不要通过禁用 text scaling 修复溢出。交互组件优先复用语义完整的原生控件，再做外观调整。

## 验证范围

本 skill 提供设计资产和实现指导，不包含可直接运行的成品组件库。落地时按目标项目的工具链做分析、构建或相关测试；单纯接入 token 不需要专门测试每个常量。图表计算与情景模型应独立于绘制代码，以便验证数据正确性。
