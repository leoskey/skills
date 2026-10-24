---
name: jetbrains-ide-design-system
description: 为 Web 或 Flutter 应用构建、改造和审查 JetBrains IDE 风格界面，采用官方 Islands 明暗主题、Inter 字体、语义 Token 和 IDE 工作区模式。用户指定 JetBrains、IntelliJ、Rider、WebStorm 或 Islands 视觉风格时使用；普通 UI 请求不自动套用。
metadata:
  version: 1.0.1
---

# JetBrains IDE Design System

将 JetBrains IDE 的 Islands 视觉语言用于用户自己的产品。这是跨技术栈适配包；产品保留自己的名称、任务结构、业务流程、API、权限与数据。

## 执行入口

1. 修改前，合并最新需求为当前规格：目标页面、业务操作、Web/Flutter、主题、屏幕范围和验收项。已明确的内容直接沿用。
2. 读取 [基础规范](references/foundations.md)，以 [tokens.json](assets/tokens.json) 为本包 Token 的唯一编辑入口。官方版本及来源见 [来源与维护](references/sources.md)。
3. 按任务读取 [组件与布局](references/components.md)。只应用业务需要的模式；普通业务应用无需增加编辑器、终端、Git 或模拟窗口控制按钮。
   动效设计、过渡审查或减少动画适配时，读取 [动效规范](references/motion.md)，区分本包适配选择与平台内置反馈。
4. Web 任务读取 [Web 接入](references/web.md)，从 `assets/web/` 复制所需主题和样式。Flutter 任务读取 [Flutter 接入](references/flutter.md)，从 `assets/flutter/` 复制所需主题和控件。
5. 同步更新实现、调用方、命名、配置、文案、状态、注释、测试与使用说明。按照 [验收](references/acceptance.md) 检查实际渲染与受影响交互。

## 设计约束

- 默认 Islands Light / Dark。官方主题颜色、控件尺寸与字体优先于通用 UI 建议；本包不混入 Radix 配色。无冲突的减少冗余文案、眉题和装饰等建议继续应用。
- 使用编辑区、工具面板和外层背景层次组织工作区。岛屿以背景分隔；控件边框保留官方 1px，岛屿实际半径 10px（紧凑 8px），Swing arc 直径需换算。
- UI 使用 Inter，默认 13px；辅助文字 12px，普通标题 16px。代码使用 JetBrains Mono。中文按技术栈使用系统 CJK 或随包 Noto Sans SC 回退，用户缩放与可访问性设置有效。
- 主操作、链接、焦点、选中、错误分别使用自己的语义 Token，即使值相同也不互相替代。代码语法配色与 UI 主题独立。
- 分别处理普通、悬停、按下、焦点、禁用、选中和区域失焦。优先标准控件语义、键盘操作、可见焦点和错误文字。
- Web 断点、触摸目标与初始面板宽度属于适配值，见 Token 的 `origin`；桌面紧凑密度不能直接用于触摸端。
- 官方图标从 [图标目录](https://intellij-icons.jetbrains.design/) 查找并核对许可。示例使用原创轮廓图和 Flutter 内置图标，不标称官方图标。品牌使用用户自己的资产。

## 工具与完成标准

在 Skill 目录执行（Python 3，无第三方依赖）：

```text
python scripts/generate.py
python scripts/validate.py
```

修改 Token 后重新生成 CSS/Dart。上游更新按来源文档核对，生成器不联网取最新值。交付可操作页面、验证证据和必要说明，区分官方值、适配选择、静态检查与实机验收。示例数据仅供演示。安装说明见 [INSTALL.md](INSTALL.md)。
