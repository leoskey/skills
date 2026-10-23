---
name: antd-design-system
description: 按 Ant Design Pro 官方页面模式构建或改造企业后台，提供27页模板、ProLayout、主题Token及逐页视觉验收。覆盖仪表盘、列表、表单、详情、结果/异常、个人/认证与AI助手；用户指定本Skill、Ant Design Pro风格或参考站点时使用，普通界面不自动套用。
---

# Ant Design Pro 设计系统

先选择对应的官方页面组合，再应用主题。代码基线为 `ant-design/ant-design-pro@52506486ea134486937043c5fb677d89bbcd07f2`（6.0.3），视觉内容和样式对照为线上6.0.1@2db826cb350e46206252197f416a0a22f2b9bbfe；版本、来源和适配见 [来源证据](references/source-evidence.json)。

## 工作路径

1. 识别业务任务、页面类型、技术栈和依赖，读取 [页面模式](references/page-patterns.md)。指定参考图时，以其构图、层级、密度和状态为约束。
2. 读取 [设计基础](references/design-system.md) 与 [React集成](references/react-integration.md)。React优先复用真实ProLayout/ProComponents及相应模板；保留现有项目的构建、路由和服务边界。
3. 按所选模式实施结构与实际交互，重写受影响的导航、文案、状态和说明。普通单页请求不自动扩成全站；补齐全目录时先按 [完成工作流](references/completion-workflow.md) 保存计划。
4. 执行 [视觉验收](references/visual-acceptance.md)：同类型、同视口、同状态对照，先修布局与组合，再检查文字、颜色与细节。保存截图、原始测量、交互证据与差异。全站或跨环境任务使用 [状态矩阵](references/expanded-acceptance.json) 的合同；默认桌面通过不能代表其他视口、主题、交互或长页。
5. 更新受影响的模板、锁文件、页面覆盖表与安装/打包副本。明确技术检查、代理视觉检查与用户最终认可各自的状态。

## 模板与模式

[可运行工程](assets/analysis-starter/package.json) 覆盖27个官方独立页面；保留analysis-starter路径以兼容已有调用方，目录名不限制范围。实际路由、入口和证据见 [页面覆盖表](references/page-coverage.json)，截图可在 [验收索引](assets/visual-qa/index.html) 查阅。当前原301组全部有3.2.0证据（294组受测几何2px内、7组保留差异），另5组回归；头像/安全/绑定另有几何一致的行为差异。具体状态和例外见 [扩展验收](references/expanded-acceptance.md)。

- 分析/监控直接以GridContent承载统计和图表；工作台的PageContainer页头承载问候与统计。
- 查询表格、标准/卡片列表、三类搜索列表各自保留完整组合；共享搜索容器与子页分别检查。
- 基础/分步/高级表单分别使用居中表单、确认/结果步骤和分组长表单。基础/高级详情分别组织说明表格、对象操作、流程与记录。
- 成功/失败/403/404/500按结果语义组织原因与返回。个人中心3个Tab、个人设置4个子视图独立验收。
- 登录/注册/注册结果使用独立布局。AI助手使用Conversations、Bubble、Think、Markdown与Sender，检查流式、停止、重新生成和会话隔离。

## 视觉与实现约束

- 保留ProLayout层级、缩进、选中与响应式。当前模板头部56px、侧栏256px；按参考版本复现，不把数值当成所有产品的永久规格。
- 当前后台主色为 `#1890ff`；独立认证页使用 `#1677ff`。白卡、8px卡片圆角、细微阴影、14/22正文与30/38统计值共同建立层次；业务色、图表色、状态色分别维护。
- 统计卡保留Card标题、指标说明/数值、46px微图或趋势区及分隔线/footer。不要把欢迎页组件拼贴当作分析页。
- 保留reset与官方字体声明；测量实际字体加载和裸标题/段落默认边距。antd6的Button、Descriptions与表单默认布局需要按当前参考检查。
- 路由按精确映射；分组入口重定向，未知路径进入404。链接适配不能让传入href覆盖hash路由目标。
- 精确还原时默认使用官方各断点的页面模式；包含全局样式、表格换行、头像、固定宽度与导航。不得自行重排手机布局后以“可用性适配”标为通过；产品需要改版时另立合同。390px仍检查真实控件与溢出，并记录原站缺陷。
- 减少动效时直接禁用过渡；不要给所有元素设置极短transition-duration，这会使弹层定位测量经历坐标插值。菜单和Select打开后，确认其实际位置与点击反馈。
- 模板使用本地演示API/验证码/认证/流式fixture，资料头像只做本地预览。接入产品时替换适配层，真实权限须由服务端执行。
- 实现实际流程的加载、空数据、失败重试、校验、返回保值、选中/禁用与反馈；保留键盘焦点。产品界面只展示完成用户任务所需的信息。

## 维护与完成标准

所选页面的构图、关键组件、比例和密度完成同视口、同状态对照；交互、类型检查与构建通过。记录可接受差异与未验收项；代理检查不代替用户最终视觉认可。

- [Token数据](assets/tokens.json) 是基础值维护入口；运行 `python scripts/build_tokens.py` 同步CSS/TS，`--check` 检查一致性。
- 新锚点格式使用 [compare_anchors.py](scripts/compare_anchors.py)；旧四页cards格式保留 [compare_geometry.py](scripts/compare_geometry.py)。所有配对必须核验实际viewport、字体、scrollY、主题、侧栏和弹层，切换前台后等待真实绘制，不能将骨架或短暂渲染缺块作为参考。
- [几何比较](scripts/compare_geometry.py) 默认2px，检查视口、壳层、滚动、内容锚点和字体；不能用空页面或骨架状态作为通过证据。截图仍需审阅。
- [模板验收说明](references/template-acceptance.md) 记录本次快照的范围、数据/版本差异及本地演示边界。修改共享样式后回归分析、查询表格、基础表单和基础详情及其他受影响页面。

- [77项复核清单](assets/visual-qa/refinement/difference-review.md)明确数据、内容、响应式、遗漏全局样式与行为差异。先查确切视觉提交；随机数据用披露的同数据诊断，不能当CSS修复。官方无完成态时保留功能差异，不伪造同状态通过。

- 全量重验按[原始ID映射](assets/visual-qa/full-3.2/original-301-coverage.json)逐项证明当前版本覆盖；额外案例不能抵充遗漏。控件宽度与外框都测，规范自动聚焦产生的scrollX；固定Footer覆盖字段时先将真实控件滚入可见区域，再操作和确认结果。
