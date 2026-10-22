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

克隆仓库，将所需 skill 的整个目录复制到 Agent 的 skills 目录。以 Codex 为例：

```bash
git clone https://github.com/leoskey/skills.git

# 将名称替换为上方列表中的 skill
SKILL=adobe-spectrum-design-system
SKILLS_DIR="${CODEX_HOME:-$HOME/.codex}/skills"
mkdir -p "$SKILLS_DIR"
cp -R "skills/$SKILL" "$SKILLS_DIR/"
```

未设置 `CODEX_HOME` 时，安装位置为 `~/.codex/skills/`。如果已有同名 skill，先检查本地修改，再决定是否替换。其他 Agent 使用其支持的 skills 目录。

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
