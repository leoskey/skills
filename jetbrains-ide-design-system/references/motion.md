# 动效与减少动画

这份表描述本包的跨端适配选择，不把 Web/Flutter 的时长称为 JetBrains 官方统一动效 Token。颜色、控件状态和平台交互语义仍按基础规范实现。

| 场景 | 当前行为 | 使用决策 |
| --- | --- | --- |
| 主题、列表选择、标签切换 | 直接更新 | 快速连续操作不等待补间，焦点与选中仍清晰可见 |
| Web 控件、dialog、资源弹层 | 没有自定义 CSS 动画或过渡 | 原生 select、光标和系统反馈由浏览器/操作系统负责 |
| Flutter 主/次按钮 | 自定义 ButtonStyle 的动画时长为 0，无水波扩散 | 平台 Ink 状态反馈可能有短渐隐，不能把此设置称为全部 Flutter 控件无动画 |
| Flutter 外观菜单 | PopupMenuButton + AnimationStyle.noAnimation | 选项首帧完整出现，避免逐项淡入造成选项短暂不可见 |
| Flutter 设置弹窗 | showDialog + AnimationStyle.noAnimation | 窗体和遮罩立即显示/关闭，保留模态、Escape、取消、焦点与输入逻辑 |
| Flutter 触摸资源抽屉 | 保留 SDK 标准短空间过渡 | 本包验证的 Flutter 3.41 使用基准 246ms 的抽屉控制器；系统减少动画设置由 SDK 缩短过渡，不声称固定 250ms 或完全无动画 |
| 复选框、焦点反馈、输入光标、软键盘避让 | 平台必要反馈 | 不用全局关闭 Ticker 的方法破坏控件、滚动或输入；弹窗无进退场动画不等于禁用软键盘避让 |

需要新增功能性过渡时，先说明它帮助理解的状态或空间变化；通常从 ease-out / 250ms 以内评估，避免延迟可操作内容，明确标注为产品适配值。弹跳、视差、装饰性循环不作为默认样式。

## 验证方法

Web 检查实际计算样式、可用时的运行时动画列表，以及实际交互。没有自定义动效时，“减少动态效果”不会额外触发页面动画；原生系统菜单不属于 DOM 动画列表。

Flutter 在系统动画正常和 disableAnimations 两种状态下检查：菜单所有选项首帧可见，设置弹窗立即可用，快速关闭后可重新打开，主题颜色无需等待补间。抽屉分别验证正常模式具有空间过渡、减少动画模式能更快稳定到目标位置。测试使用逐帧 pump，避免仅用 pumpAndSettle 把延迟隐藏起来。

同时保留 Escape、焦点返回、提交校验和 200% 文字缩放检查。系统设置需要从 Flutter 平台无障碍特性传入，而不是只给局部 MediaQuery 填值后就声称所有 AnimationController 已经响应。

实现参考：[Flutter showDialog](https://api.flutter.dev/flutter/material/showDialog.html)、[PopupMenuButton.popUpAnimationStyle](https://api.flutter.dev/flutter/material/PopupMenuButton/popUpAnimationStyle.html)、[AnimationBehavior](https://api.flutter.dev/flutter/animation/AnimationBehavior.html)。
