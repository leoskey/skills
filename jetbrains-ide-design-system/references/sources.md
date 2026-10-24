# 来源与维护

核对日期 2026-10-23。具体 commit、URL 与 SHA-256 见 [source-lock.json](../assets/source-lock.json)，原样快照在 assets/upstream/。字体与源码许可见 [第三方说明](../THIRD_PARTY_NOTICES.md)。

| 官方来源 | 用途 |
| --- | --- |
| [UI Guidelines](https://plugins.jetbrains.com/docs/intellij/ui-guidelines-welcome.html) | 总入口 |
| [Supporting Islands Theme](https://plugins.jetbrains.com/docs/intellij/supporting-islands-theme.html) | 分区、半径换算与背景/标签语义 |
| [Islands 默认外观](https://blog.jetbrains.com/platform/2025/12/meet-the-islands-theme-the-new-default-look-for-jetbrains-ides/) | 默认基线依据 |
| [Typography](https://plugins.jetbrains.com/docs/intellij/typography.html) | UI Inter 13，字号派生，代码 JetBrains Mono |
| [Layout](https://plugins.jetbrains.com/docs/intellij/layout.html) | 表单标签和分组 |
| [Button](https://plugins.jetbrains.com/docs/intellij/button.html) | 主动作、命名、焦点、禁用 |
| [Input Field](https://plugins.jetbrains.com/docs/intellij/input-field.html) | 标签、输入与验证 |
| [Tool Window](https://plugins.jetbrains.com/docs/intellij/tool-window.html) | 面板结构、方向与空状态 |
| [Icons](https://plugins.jetbrains.com/docs/intellij/icons.html) | 尺寸与明暗图标 |
| [UI Kit](https://plugins.jetbrains.com/docs/intellij/ui-kit.html) | 官方 Figma Kit/Icons 入口，本包未复制 Figma 文件 |
| [Platform Theme Colors](https://plugins.jetbrains.com/docs/intellij/platform-theme-colors.html) | 按语义键管理颜色，具体值选择当前 Islands 源码 |
| [Islands source](https://github.com/JetBrains/intellij-community/tree/master/platform/platform-resources/src/themes/islands) | 明暗颜色和控件几何，锁定 URL 见 source-lock |
| [Jewel](https://github.com/JetBrains/intellij-community/tree/master/platform/jewel) | 1px 控件描边及实现参考，本包不依赖 Kotlin |
| [Inter](https://github.com/rsms/inter) / [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) | 字体和 OFL |
| [Noto Sans SC](https://github.com/google/fonts/tree/main/ofl/notosanssc) | Flutter 本地中文回退及 OFL，属于跨端适配 |
| [Flutter ThemeExtension](https://api.flutter.dev/flutter/material/ThemeExtension-class.html) | Flutter 扩展机制 |

Ring UI 面向 JetBrains Web 产品，本包没有把它作为 IDE 的官方 Web 实现。

更新时先选择目标 IDE 版本，固定 commit 和哈希，更新原始快照，核对每个 source 与继承关系，再修改 tokens.json。当前使用的颜色在快照自身解析，不模拟任意 IDE 主题的完整继承。几何分别标记直接官方值、换算值、适配值。重新生成、校验并检查 Web/Flutter，最后更新版本、说明和报告。
