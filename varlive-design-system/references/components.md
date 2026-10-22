# 组件与页面规则

数值来自 ../assets/tokens.json；以下规定的是组合和行为。桌面以中等信息密度为默认，手机重新排列区域，不能只缩小整张页面。

## 组件

| 组件 | 外观与布局 | 状态与行为 |
|---|---|---|
| 主按钮 | action.primary 底色、action.onPrimary 文字；control 字号；control 圆角；水平内边距 space.4 | hover 使用 action.primaryHover；按下使用 primaryPressed；聚焦另加 focus 描边；加载保留宽度与标签，阻止重复提交 |
| 次按钮 | surface 底色、text.primary 文字、border.control 边界 | hover 使用 surfaceRaised；禁用须表现为不可操作；危险操作使用 status.danger 与明确文案 |
| 输入框 / 下拉 | surface 背景、border.control 边界、可见标签；占位文字不能代替标签 | 聚焦用 focus；错误边框与辅助文字用 status.danger；长文本不撑破布局 |
| 卡片 / 面板 | surface，border.subtle，panel 圆角，space.5 内边距 | 卡片只有可点击时才出现交互高亮；不让每块内容都加阴影或霓虹 |
| 导航 | 暗色固定框架、图标＋文字，足够命中区域 | 选中项加橙色侧线和明确选中语义；键盘焦点与选中态区分；窄屏收为可关闭抽屉 |
| 表格 | 内容起始边对齐、金额末端对齐；数字等宽特性；tableRow 最小高度 | 标题行可扫描；操作有可读名称；手机可横向滚动表格，避免页面整体溢出 |
| 状态标签 | 文字＋图标或标记；success / warning / danger / info 各自语义 | 游戏海报颜色不决定系统状态；禁用和失败不能只靠降低透明度 |
| 弹窗 | surfaceRaised、dialog 圆角；宽度不超容器；操作区清楚 | 合理初始焦点、焦点约束、关闭后返回触发位置；支持取消；内容溢出可滚动 |
| 游戏卡片 | 内容图片固定比例、独立标题和参数区、图片按视觉焦点裁切 | 保留原游戏美术；关键信息不能只写在图片里；图像加载失败仍可辨识游戏 |
| 图表 / 指标 | 主系列橙色、比较系列灰色；数字与单位分层 | 写明时间范围和单位；数据、坐标与提示内容一致；提供等价摘要，不能只靠颜色区分 |

桌面控件高度 control.desktopHeight，触控命中区域至少 control.touchHeight。视觉圆角与命中区域可以独立；不为追求密度把按钮或文字压缩到难以操作。

禁用状态使用专门的 disabled 背景与文字，而不是对整个组件施加透明度。只读和禁用是不同状态。切换、展开等动画遵从 motion.fast / normal；减少动态效果偏好下取消非必要动画。

## 排版和响应式

- text.pageTitle 用于页面标题；sectionTitle 用于面板；body 与 bodyLarge 用于正常内容；caption 用于辅助信息，重要状态不藏进辅助文字。
- lineHeight 是无单位倍率。Web 直接使用；Flutter 对应 TextStyle.height，需检查中文上下边界和系统缩放。
- 字重使用字体真实支持的值，不人为拉伸字体。Logo 和游戏标志中的字形不代替应用正文。
- 桌面主内容最大宽度 layout.contentMax，导航宽度 layout.sidebarWidth，页面边距 layout.pagePadding。
- 窄屏使用 layout.compactPadding；宽度不足 layout.compactBreakpoint 时，导航改抽屉，横排面板按阅读顺序堆叠。断点允许按内容需求微调，不能截断长中文或放大后的文本。
- 表格和时间轴可局部横向滚动；表单优先改成单列。手机不保留空白的固定侧栏。

## 视觉验收

选一张真实业务页，检查同样内容在目标平台中的：Logo 比例、字体字重、标题与正文层级、按钮高度、面板圆角、橙色面积、焦点和状态表达。

跨端允许字形抗锯齿和像素取整差异；不允许默认 Material / Cupertino / 浏览器控件把品牌主题覆盖，也不允许为了“像截图”禁用文字缩放。验证用户已有页面，而不是每次额外搭建整套演示系统。
