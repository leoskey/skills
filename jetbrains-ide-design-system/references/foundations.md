# 基础规范

## 基线与颜色

采用 Islands 官方明暗主题，2026-10-23 核对并锁定源码 commit，见 [来源](sources.md)。本包是非官方适配 Skill。完整语义映射见 `assets/tokens.json` 中各项 `source`。

旧 Platform Theme Colors 页面仍以 Light/Darcula 解释颜色键；当前 Islands 源码已使用新的语义调色板。本包以锁定 Islands JSON 为颜色依据，通用文档用于解释规则，避免混用旧 Darcula 色值。

| 角色 | Light | Dark | 上游键 |
| --- | --- | --- | --- |
| 外层窗口 | #E9EAEE | #26282C | main-window-bg |
| 编辑区 / 默认面板 | #FFFFFF | #191A1C | editor-bg / tool-window-bg |
| 正文 | #000000 | #D1D3D9 | text-default |
| 辅助正文 | #5F6269 | #9FA2A8 | text-muted |
| 主操作 | #3871E1 | #3871E1 | control-brand-bg |
| 链接 | #2F5EB9 | #71A1FE | text-link |
| 选中 | #D0DFFE | #2A4371 | selection-bg-active |
| 控件边框 | #D1D3D9 | #40434A | control-border |

这是固定基线，不是所有 IDE 版本的通用常量。上游 8 位颜色格式为 RRGGBBAA，Dart 必须换成 AARRGGBB。

正文、占位文字和必要帮助使用 `text` / `muted`；`subtle` 和 `disabled` 不能作为必要信息的颜色。官方某些边界对比度低，字段必须有持久标签；需要更强识别时可用官方 `icon` 色作有记录的可访问性覆盖。不能宣称所有官方颜色组合都满足 WCAG。禁用状态同时禁用交互。

## 几何与密度

- 标准控件最小高 28px，紧凑 24px，按钮最小宽 72px；树行高 24px，紧凑 22px。实际内容随字体和缩放增长。
- `Island.arc=20` 对应半径 10px，紧凑 arc 16 对应 8px。`Component.arc=8` 对应控件半径 4px。
- 当前源码 `Island.borderWidth=6`；迁移文档解释实际可见间距是值减 1，本包映射 5px，紧凑值 4 对应 3px。文档旧表显示标准值 5，本包选择锁定源码。
- 控件描边采用 Jewel 的 1px，优先于通用 0.5px 建议。岛屿本身无明显轮廓，不给每个面板叠加边框和阴影。
- 本包适配值：工具栏 44px、操作栏 40px、侧栏初始 240px、间距 4/8/12/24px。嵌套半径依据内边距调整。
- 触摸采用至少 48px 命中区域；窄屏保留一个主工作区，辅助面板通过明确入口打开。

## 字体和状态

官方默认 UI 字体 Inter 13px，代码字体 JetBrains Mono。本包随附字体与 OFL，UI 默认 12/13/16 三档，产品确需大标题时可按官方 Default+5 增加 18px。代码字号 13px 是示例选择，可独立设置。Web 中文使用系统 CJK 回退；Flutter 另附完整 Noto Sans SC 作为本地中文回退，这是本包适配选择。

焦点环用 `focus`，与选中分别表达；失焦选中用 `selectionInactive`，失焦标签用 `tabInactive` / `tabBorderInactive`。主题切换直接更新，无装饰动画。动作/文件图标通常 16px，New UI 工具图标 20px（另提供 16px）。图标按钮具备名称，状态用颜色配合文字/形状。
