# Web 接入

复制 `assets/web/jb-tokens.css`、`jb.css` 和 `fonts/` 到同一静态目录。先加载 Token CSS，再加载组件 CSS，给应用根节点添加 `jb-app`；组件样式限定在此根内部。

html 的 `data-jb-theme="light"` / `"dark"` 显式选主题，省略属性跟随系统。`data-jb-density="compact"` 启用桌面紧凑尺寸。React/Vue 保留现有组件、事件和业务，映射语义 CSS 变量与类。

```html
<link rel="stylesheet" href="/design/jb-tokens.css">
<link rel="stylesheet" href="/design/jb.css">
<main class="jb-app">
  <section class="jb-island">
    <h1>连接设置</h1>
    <label for="endpoint">服务地址：</label>
    <input class="jb-input" id="endpoint" type="url" required>
    <button class="jb-button jb-primary" type="submit">连接</button>
  </section>
</main>
```

片段只示意绑定，实际接入须放进有真实提交处理的表单，沿用业务错误处理。无需复制展示页的 IDE 模拟业务。

## 展示页

在 Skill 目录执行：

```text
python -m http.server 8765 --bind 127.0.0.1 --directory assets/web
```

打开 `http://127.0.0.1:8765/`。也可直接打开 index.html；存储受限时示例有回退。

## 实现边界

- CSS px 为逻辑像素，字号用 rem，保留浏览器缩放，内容不设固定高度。
- 官方控件边框 1px；本包适配焦点环 2px。必要文字用 muted，subtle 只用于非关键信息。
- hover/pressed 是 alpha 覆盖色，叠加当前表面。跨端导出时不能当不透明色使用。
- tablist 实现方向键、Home/End、aria-selected 和焦点管理；details 层级不冒充 ARIA tree。
- 本地字体无 CDN，复制时保留许可证。dialog 保留原生模态语义，检查取消、焦点返回及字段错误。
