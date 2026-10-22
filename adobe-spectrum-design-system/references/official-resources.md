# 官方资源与版本

核对日期：2026-10-22。以下是公开官方入口；实施时仍需核对当前页面、仓库分支及已安装依赖。本文是原创使用索引，不是官方文档镜像。

| 资源 | 用途 |
| --- | --- |
| [Spectrum](https://spectrum.adobe.com/) | 当前设计规范、基础语言和组件指导 |
| [应用内容区](https://spectrum.adobe.com/foundations/app-frame/content-area-browsing-context) | 内容分区、注意力、滚动及布局取舍；此页针对浏览场景，不应当作所有编辑器的固定模板 |
| [React Spectrum](https://react-spectrum.adobe.com/) | 当前 React 实现及交互展示；先核对依赖版本再使用示例代码 |
| [TableView](https://react-spectrum.adobe.com/TableView) | 表格选择、密度与交互示例，适合比较记录型数据 |
| [CardView](https://react-spectrum.adobe.com/CardView) | 网格、瀑布流和卡片选择示例，适合视觉内容浏览 |
| [Spectrum Design Data](https://github.com/adobe/spectrum-design-data) | 官方设计 token 源码；按选定版本查看定义与许可证 |
| [S2 token 浏览器](https://opensource.adobe.com/spectrum-design-data/s2-visualizer/) | 可视化查阅 Spectrum 2 token |

## 版本边界

核对时 Spectrum Design Data 的 main 为 Spectrum 2；Spectrum 1 保留在 s1-legacy 分支和 v12.x 包。分支含义与包版本可能变化，复用时以仓库 README、发布说明和项目锁文件为准。

React Spectrum 当前首页的示例使用 @react-spectrum/s2。不要将旧 v3 文档中的属性、样式方式或 token 名称未经核对地套入 S2，也不要据此断言所有组件均与旧版本等价。

使用 token 时记录来源包和版本，优先语义映射。若只提取少量值作为本项目起点，标明是映射或自定义，不伪装成官方完整主题。

## Demo 与资产的区别

官网首页包含应用场景展示，组件页包含交互示例；它们不等于带真实业务后端的完整应用。阅读页面可以核实有哪些示例，但只有实际运行相应交互后才能声称交互测试通过。

尚未确认可公开访问、完整下载的官方 Spectrum 2 Figma 套件。需要 Figma 时从当前官网资源链接核实访问与许可，不能把旧版 UI kit、受限文件或第三方重制版当作官方公开套件。

引用、下载或再分发字体、图标、插画和源码前分别检查其许可；文档可访问不等于所有资产可自由再分发。本 skill 不捆绑这些资产。
