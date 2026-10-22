# Skills

## Skill 列表

- [adobe-spectrum-design-system](adobe-spectrum-design-system/SKILL.md)
- [game-sutdio](game-sutdio/SKILL.md)
- [gentle-design-system](gentle-design-system/SKILL.md)

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
