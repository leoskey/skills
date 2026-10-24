# 安装与使用

从 GitHub 仓库安装到 Codex 用户技能目录：

```bash
npx skills add leoskey/skills --skill jetbrains-ide-design-system --agent codex --global
```

省略 `--global` 可安装到当前项目。Skill 目录：[leoskey/skills / jetbrains-ide-design-system](https://github.com/leoskey/skills/tree/main/jetbrains-ide-design-system)。

## 手动安装

解压后将整个 jetbrains-ide-design-system 文件夹复制到 Codex 用户技能目录（通常 ~/.codex/skills/）。Windows 从解压目录执行：

```powershell
$target = Join-Path $env:USERPROFILE '.codex\skills\jetbrains-ide-design-system'
if (Test-Path -LiteralPath $target) { throw '目标 Skill 已存在，请先比较版本并备份。' }
Copy-Item -LiteralPath '.\jetbrains-ide-design-system' -Destination $target -Recurse
```

项目共享可放 `<project>/.agents/skills/jetbrains-ide-design-system/`。重新打开技能列表或后续对话刷新发现。

## 调用

调用示例：

```text
使用 $jetbrains-ide-design-system 将当前 Web 应用改为 Islands 明暗主题，保留现有路由、接口与业务，先处理列表和设置页面。

使用 $jetbrains-ide-design-system 为 Flutter 应用接入统一主题和控件，支持触摸、键盘与系统文字缩放。
```

Web 展示页是 assets/web/index.html，Flutter 接入步骤见 [指南](references/flutter.md)。修改 Token 后运行生成器与包校验。复制到实际项目时只取所需主题和控件。

这是非官方跨端适配 Skill，官方来源与许可随包提供。
