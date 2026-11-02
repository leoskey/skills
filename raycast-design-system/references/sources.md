# 来源与维护

## 官方参考

视觉参考核对日期：2026-10-21。此日期描述参考资料的核对时间，不表示未来版本始终保持相同。

- [Raycast 官网](https://www.raycast.com/)：产品展示、快捷入口与整体气质。
- [Press & Media Kit](https://www.raycast.com/press)：品牌色与产品截图参考。该资料当时明确列出 Brand Red `#FF6363`、Preferred dark background `#151515`、Background Alt `#202123`。
- [Raycast User Interface](https://developers.raycast.com/api-reference/user-interface)：原生扩展界面的 List、Grid、Detail、Form 与 ActionPanel 等内容模式，以及键盘交互入口。

三项官方品牌色单独记录在 [tokens.json](../assets/tokens.json) 的 `officialBrand` 中。所有 `themes`、排版、密度、圆角、动效和样式组件都是本系统的独立提炼值；其中相同的品牌色不意味着整个主题来自官方。

## 自包含资源

- `tokens.json`：本系统自有结构，不宣称兼容某个 Figma 插件或标准 token 交换格式。
- `tokens.css`：从 JSON 的语义角色生成的 Web 自定义属性，使用 `.rc-theme` 与 `data-theme` 隔离主题。
- `components.css`：少量按钮、输入、行、键帽和窗口样式；需要目标应用补充真实状态与行为。
- `preview.html`：独立制作的设计系统概念展示，直接引用包内 CSS，可以检查明暗主题与控件焦点。
- `preview.png`：上述概念展示的渲染图，用于仓库目录展示；不是 Raycast 原生应用或目标业务应用的产品截图。

包内不含官方 Logo、官方截图、专有字体文件、用户原始稿或个人账号。系统字体由运行环境提供；调用本 skill 不代表获得额外品牌素材许可。

## 更新原则

用户要求官方精确值、最新 API 或官方素材时，重新核对对应原始资料，并按实际核对更新日期。不要把先前截图中估算的参数改标为官方 token。

修改 `tokens.json` 后同步更新 CSS，检查预览实际呈现与相关文字 / 背景组合。已有项目以其语义 token 和平台组件为接入点；新增角色说明用途，避免为了接近预览而固化某个产品的字段、人员或导航。

重新生成 CSS：

```bash
python3 scripts/build_tokens.py
```

在 skill 目录执行；脚本使用 Python 标准库，读取包内 JSON，生成同一目录下的 `assets/tokens.css`。
