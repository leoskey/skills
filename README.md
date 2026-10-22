# Skills

## Skill 列表

| Skill | 简介 | 适用场景 | 资源 |
| --- | --- | --- | --- |
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
