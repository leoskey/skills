# Skills

## Skill 列表

| Skill | 简介 | 适用场景 | 资源 |
| --- | --- | --- | --- |
| [collaborative-workbench-design-system](collaborative-workbench-design-system/SKILL.md) | 原创协作工作台规范：导航、集合、上下文详情、人员与自动化状态、明暗主题 | 建立或审查协作工作区的主题与组件契约；保留品牌、语言与技术栈 | [主题与布局](collaborative-workbench-design-system/references/foundations.md) · [组件契约](collaborative-workbench-design-system/references/components.md) · [概念示例](collaborative-workbench-design-system/assets/preview.html) · [概念预览](collaborative-workbench-design-system/assets/preview.png) · [来源与许可](collaborative-workbench-design-system/references/sources.md) |
| [linear-design-system](linear-design-system/SKILL.md) | Linear 风格：近黑表面、细边框、紧凑工作区与克制蓝紫色；区分产品内与官网密度 | 明确指定 Linear 风格的工作台、列表、详情、项目视图或展示网站；保留业务、语言与技术栈 | [基础与布局](linear-design-system/references/foundations.md) · [设计变量](linear-design-system/assets/tokens.json) · [组件与交互](linear-design-system/references/components.md) · [概念预览](linear-design-system/assets/preview.png) |
| [jetbrains-ide-design-system](jetbrains-ide-design-system/SKILL.md) | JetBrains IDE Islands 风格：官方明暗主题、语义 Token、字体与工作区组件规范 | 明确指定 JetBrains IDE 风格的 Web / Flutter 应用设计、改造与审查；保留现有业务流程 | [基础规范](jetbrains-ide-design-system/references/foundations.md)、[Web 接入](jetbrains-ide-design-system/references/web.md)、[Flutter 接入](jetbrains-ide-design-system/references/flutter.md)、[来源与维护](jetbrains-ide-design-system/references/sources.md) |
| [antd-design-system](antd-design-system/SKILL.md) | Ant Design Pro 官方页面模式与视觉验收：27 页模板、ProLayout、主题 Token 和同视口同状态对照 | 明确指定 Ant Design Pro 风格的后台设计、实现与改造；包含本地演示模板和差异记录 | [页面模式](antd-design-system/references/page-patterns.md) · [主题 Token](antd-design-system/assets/tokens.json) · [视觉验收](antd-design-system/references/visual-acceptance.md) · [验收范围与差异](antd-design-system/references/expanded-acceptance.md) |
| [gentle-design-system](gentle-design-system/SKILL.md) | **柔和极简数据风**：灰白表面、细边框圆角卡片、克制排版、语义配色与纹理图表 | SaaS 后台、数据仪表盘、列表、详情与预测页面；可适配不同技术栈 | [设计 token](gentle-design-system/assets/tokens.json) · [CSS](gentle-design-system/assets/tokens.css) · [预览](gentle-design-system/assets/preview.png) |
| [game-sutdio](game-sutdio/SKILL.md) | 游戏全流程交付：需求与设计确认、可玩原型、完整体验样段、内容扩充、测试试玩与反馈迭代 | 新游戏策划、已有游戏阶段推进与单项修复；按目标选择引擎和平台 | [阶段交付与验收](game-sutdio/references/lifecycle.md) |
| [adobe-spectrum-design-system](adobe-spectrum-design-system/SKILL.md) | Adobe Spectrum 2 设计与实现指南：官方 token、组件状态、应用布局与桌面信息密度 | 用户明确指定 Spectrum 的产品设计、实现与界面审查；适配既有技术栈 | [官方资源与 Demo](adobe-spectrum-design-system/references/official-resources.md) · [布局与验收](adobe-spectrum-design-system/references/desktop-and-quality.md) |
| [varlive-design-system](varlive-design-system/SKILL.md) | VAR LIVE 黑白橙品牌 UI：统一设计变量、字体、图标与组件状态 | 明确要求 VAR LIVE 风格的品牌项目；支持 Flutter、Web 与其他原生界面技术 | [设计变量](varlive-design-system/assets/tokens.json) · [组件规范](varlive-design-system/references/components.md) · [概念预览](varlive-design-system/references/desktop-preview.webp) · [素材使用说明](varlive-design-system/references/brand.md) |

`varlive-design-system` 的 Logo 与游戏图片仅用于用户授权的品牌项目，不声明为开源素材；Noto Sans TC 字体按包内 SIL OFL 1.1 许可分发。

## 安装

### 通过 npx 安装

先安装 [Node.js](https://nodejs.org/) 22.20 或更新版本，然后在项目目录运行以下命令，按提示选择 skill 和目标 Agent：

```bash
npx skills add leoskey/skills
```

也可以直接指定 skill，将名称替换为上方列表中的任意一项：

```bash
npx skills add leoskey/skills --skill varlive-design-system
```

默认安装到当前项目；添加 `--global` 可供多个项目使用。例如，安装到 Codex 的用户级 skills：

```bash
npx skills add leoskey/skills --skill varlive-design-system --agent codex --global
```

只查看可安装的 skill，可运行 `npx skills add leoskey/skills --list`。更多选项见 [skills CLI 安装说明](https://github.com/vercel-labs/skills/blob/main/docs/commands.md#skills-add)。

安装 JetBrains IDE 设计系统到 Codex 用户目录：

```bash
npx skills add leoskey/skills --skill jetbrains-ide-design-system --agent codex --global
```

### 通过提示词安装

将下面的提示词发送给支持访问 GitHub 和写入本地文件的 Agent；需要其他 skill 时，替换名称和链接末尾的目录名：

```text
请将 https://github.com/leoskey/skills/tree/main/varlive-design-system 中的 varlive-design-system 安装到当前 Agent 的用户级 skills 目录，供多个项目使用。
请安装完整目录，包括 SKILL.md 及其引用的脚本、参考文档和素材。若已有同名 skill，先检查本地修改，保留自定义内容后再处理更新。
完成后确认 skill 可被发现，并告诉我调用方式。
```

## 使用

在支持 skill 调用的 Agent 中，明确指定名称和任务：

```text
使用 $linear-design-system 设计记录列表与详情页，保留当前业务、中文内容和技术栈，验证桌面、手机与键盘交互。
```

```text
使用 $jetbrains-ide-design-system 为当前 Web 或 Flutter 应用呈现 JetBrains Islands 风格，保留业务流程，验证明暗主题、键盘操作和响应式布局。
```

```text
使用 $antd-design-system，参照 Ant Design Pro 构建后台查询表格页，保留现有业务和技术栈，按同视口、同状态做视觉验收。
```

```text
使用 $adobe-spectrum-design-system 设计一个数据管理工作台，保留现有技术栈并验证桌面布局与键盘交互。
```

```text
使用 $game-sutdio，先整理游戏需求，确认需求与设计后再开始实现。
```

```text
按照 $gentle-design-system 审查这个页面，指出具体差异，并修复本次范围内的问题。
```

```text
使用 $varlive-design-system，将当前页面应用 VAR LIVE 品牌配色、字体和组件规范，保留项目语言、业务结构与现有技术栈。
```
