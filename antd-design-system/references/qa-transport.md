# QA传输与取证 3.2.0

assets/qa/reference-transport.js仅用于隔离官方参考浏览器，不进入业务包。canonical匹配公开mock的/api/fake_list（8项）、/api/fake_list_Detail（30项）及/api/currentUserDetail（notice为空）；尊重原请求count。目标是排除随机数据/团队造成的高度与换行差异，不属于CSS修复。官方DOM、CSS及组件不改动。每个meta.json另记录场景；未请求这些API的页面不受影响。

qa-fixture另有empty、error、chat。列表POST仅浏览器本地返回成功；AI接口返回与候选相同的固定SSE，不发送真实模型请求。停止/重新生成将35/150ms定时器放慢至1200ms后实际点击停止；多出的本地操作区和重新生成流程保留差异。不是生产时延测量。

资源错误由一次路由script加载失败触发真实ChunkLoadError；候选临时拒绝fixture资源。分别记录相同错误态、官方重试仍失败/本地恢复、移除故障完整刷新后恢复。故障参数不进入业务源文件。头像历史案例使用合成SVG，本地FileReader预览，不真实上传。

取证前切换前台，等待真实内容/字体和绘制；核验实际viewport、scrollY、背景、侧栏和弹层，不能录入骨架或隐藏旧模态。几何比较与截图审阅分别记录，不能自动给失败值盖章。测试结束关闭隔离浏览器或无initScript完整重载。

完整301组补充：reference-cat1-32.js以完整公开mock按cat1过滤后取8项，仅用于类别筛选同数据对照。chat-clock-full32.js将35/150ms流式计时器暂存，同步8次回调采样中间态，再推进到完成；不进入业务包。avatar-driver-full32.js在浏览器生成相同QA File并经实际file input change触发预览，官方POST被浏览器拦截，不传文件。MCP文件路径访问不可用，未验证系统文件对话框。
