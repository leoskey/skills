# Web 接入

先复用项目已有组件。需要新交互基础件时，可选独立上游 Radix Primitives（MIT）；已有 shadcn/ui（MIT）项目可继续使用其组件，不从任何下游产品仓库复制修改版本。版本由项目锁文件确定，核查该版本许可；不要为样式迁移框架。

## 映射

在应用根节点附加 `cwb`，按产品主题设置 `data-theme="light"` 或 `dark`，引入 `assets/tokens.css`；仅在目标范围使用 `var(--cwb-text)` 等变量。组件库有主题配置入口时映射其 background、foreground、primary、muted、border、ring 等角色，不依赖覆盖其内部 DOM 类名。

原生 HTML 适合简单表单、按钮与 select；复杂菜单、对话框、组合框复用成熟基础件。例如 Radix Dialog 使用 Root、Trigger、Portal、Overlay、Content、Title、Description、Close，提供可见标题、描述及表单标签。保留其焦点约束、Esc 与焦点恢复，禁止只复制视觉外壳。对照官方目标版本 API；不假定所有 shadcn 组件都由同一个底层库实现。

使用 `minmax(0, 1fr)`、`min-width: 0`、长文本换行和内容驱动断点。仅数据区域滚动时明确滚动所有权；小屏避免三个嵌套滚动容器。导航与抽屉不遮挡焦点。状态颜色必须配文字；必要控件边界使用 control token，装饰分隔线才用 border。

预览为原创原生 HTML/CSS/JS，不打包第三方代码或字体。通过静态服务器打开 `assets/preview.html`，也可直接在浏览器打开文件。它依赖现代浏览器的 `<dialog>`，不支持时显示页内提示；正式产品按浏览器支持矩阵选用成熟基础件或提供替代流程。
