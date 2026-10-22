# Web 适配

优先沿用项目的 CSS 变量 / Tailwind 主题 / CSS-in-JS / 组件主题。按语义映射 assets/tokens.json，避免整份导入旧演示的全局 CSS。

将包内字体和许可复制到项目资源目录，按部署路径调整 src：

```css
@font-face {
  font-family: "VarLiveSans";
  src: url("/assets/fonts/NotoSansTC-Variable.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

.var-live {
  font-family: "VarLiveSans", sans-serif;
  font-synthesis: none;
}
```

把主题限定在应用根节点或现有主题机制里。不要给不相关页面改 body / button / input 的全局样式。

token 的 color 值为 sRGB 分量，可生成 `rgb(r g b / alpha)`；乘 255 并取整。dimension 使用 px，字体可转换成与项目基准一致的 rem。motion 毫秒映射为 CSS ms。颜色与尺寸只在公共主题中映射一次，不增加运行时 JSON 请求。

SVG 图标统一 viewBox 0 0 24 24，currentColor、1.6 线宽、圆形端点。装饰图标隐藏于辅助技术，单独图标按钮有可读名称。

为金额与指标启用 `font-variant-numeric: tabular-nums`。原字体不具备某种排版特性时按实测处理，不能为数字另选不协调的字体。

正常、悬停、:focus-visible、按下、禁用、加载和失败状态都沿用组件规范。支持 prefers-reduced-motion，不让隐藏抽屉里的控件仍获得焦点。

资源与预览测试：字体实际加载成功后再截图；检查缺字、横向溢出、窄屏导航、图片失败、键盘焦点。只有当前任务需要时才运行对应交互检查，不额外引入一套构建或测试框架。
