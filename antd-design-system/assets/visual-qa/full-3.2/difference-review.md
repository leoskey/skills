# 77组差异逐项复核 · 3.2.0

原77组全部重验：70组在记录的同视口、同状态及同数据条件下对齐；7组保留实际行为差异。新增27页桌面及相关回归后共107组，100组受测锚点在2px内。几何通过不等于全页像素一致，最终用户认可待确认。

[本轮107组截图](index.html) · [完整结构记录](acceptance.json) · [3.1.0原始证据](../expanded/index.html)

## 原因与处理

|原因|组数|当前结果|
|---|---:|---|
|数据、资料与头像组合|38|已对齐|
|欢迎页内容版本|8|已对齐|
|自行添加的响应式布局|21|已对齐|
|遗漏的官方全局表格样式|3|已对齐|
|本地可用流程扩展|5|保留真实功能差异|
|停止后的助手操作区|1|保留真实功能差异|
|官方故障恢复行为|1|保留真实功能差异|

## 逐项清单

每行提供原始与新证据。旧差异数为几何偏移项数，新差异数还包含缺失/新增锚点，均保留原始JSON供核查。原始失败未覆盖为通过；模式中的zoom为等效CSS视口/DPR。data类同时含资料/头像代码修正与公开mock标准化，不能将全部38组表述为CSS修复。

### 数据、资料与头像组合（38组）

个人中心36组（8种环境、3个Tab、25段长页），应用搜索下半页2组。原样例团队、头像对齐与随机指标不一致。

默认团队改为空、头像恢复官方左对齐；完整公开mock数据在隔离参考浏览器匹配。随机数据对齐属于标准化取证，另与CSS修正区分。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`collapsed-account-center`<br>`/account/center`|collapsed / default|1→0|受测几何对齐 · [原图](../expanded/collapsed-account-center/pair.jpg) / [复验](collapsed-account-center/pair.jpg)|
|`dark-account-center`<br>`/account/center`|dark / default|1→0|受测几何对齐 · [原图](../expanded/dark-account-center/pair.jpg) / [复验](dark-account-center/pair.jpg)|
|`desktop-account-center`<br>`/account/center`|desktop / default|1→0|受测几何对齐 · [原图](../expanded/desktop-account-center/pair.jpg) / [复验](desktop-account-center/pair.jpg)|
|`lower-center-applications-s1200`<br>`/account/center`|lower / long-page-segment|60→0|受测几何对齐 · [原图](../expanded/lower-center-applications-s1200/pair.jpg) / [复验](lower-center-applications-s1200/pair.jpg)|
|`lower-center-applications-s1800`<br>`/account/center`|lower / long-page-segment|60→0|受测几何对齐 · [原图](../expanded/lower-center-applications-s1800/pair.jpg) / [复验](lower-center-applications-s1800/pair.jpg)|
|`lower-center-applications-s2400`<br>`/account/center`|lower / long-page-segment|60→0|受测几何对齐 · [原图](../expanded/lower-center-applications-s2400/pair.jpg) / [复验](lower-center-applications-s2400/pair.jpg)|
|`lower-center-applications-s2555`<br>`/account/center`|lower / long-page-segment|60→0|受测几何对齐 · [原图](../expanded/lower-center-applications-s2555/pair.jpg) / [复验](lower-center-applications-s2555/pair.jpg)|
|`lower-center-applications-s600`<br>`/account/center`|lower / long-page-segment|60→0|受测几何对齐 · [原图](../expanded/lower-center-applications-s600/pair.jpg) / [复验](lower-center-applications-s600/pair.jpg)|
|`lower-center-articles-s1200`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s1200/pair.jpg) / [复验](lower-center-articles-s1200/pair.jpg)|
|`lower-center-articles-s1800`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s1800/pair.jpg) / [复验](lower-center-articles-s1800/pair.jpg)|
|`lower-center-articles-s2400`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s2400/pair.jpg) / [复验](lower-center-articles-s2400/pair.jpg)|
|`lower-center-articles-s3000`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s3000/pair.jpg) / [复验](lower-center-articles-s3000/pair.jpg)|
|`lower-center-articles-s3600`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s3600/pair.jpg) / [复验](lower-center-articles-s3600/pair.jpg)|
|`lower-center-articles-s4200`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s4200/pair.jpg) / [复验](lower-center-articles-s4200/pair.jpg)|
|`lower-center-articles-s4800`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s4800/pair.jpg) / [复验](lower-center-articles-s4800/pair.jpg)|
|`lower-center-articles-s5400`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s5400/pair.jpg) / [复验](lower-center-articles-s5400/pair.jpg)|
|`lower-center-articles-s600`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s600/pair.jpg) / [复验](lower-center-articles-s600/pair.jpg)|
|`lower-center-articles-s6000`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s6000/pair.jpg) / [复验](lower-center-articles-s6000/pair.jpg)|
|`lower-center-articles-s6600`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s6600/pair.jpg) / [复验](lower-center-articles-s6600/pair.jpg)|
|`lower-center-articles-s7090`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-articles-s7090/pair.jpg) / [复验](lower-center-articles-s7090/pair.jpg)|
|`lower-center-projects-s1200`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s1200/pair.jpg) / [复验](lower-center-projects-s1200/pair.jpg)|
|`lower-center-projects-s1800`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s1800/pair.jpg) / [复验](lower-center-projects-s1800/pair.jpg)|
|`lower-center-projects-s2400`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s2400/pair.jpg) / [复验](lower-center-projects-s2400/pair.jpg)|
|`lower-center-projects-s3000`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s3000/pair.jpg) / [复验](lower-center-projects-s3000/pair.jpg)|
|`lower-center-projects-s3600`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s3600/pair.jpg) / [复验](lower-center-projects-s3600/pair.jpg)|
|`lower-center-projects-s4200`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s4200/pair.jpg) / [复验](lower-center-projects-s4200/pair.jpg)|
|`lower-center-projects-s4681`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s4681/pair.jpg) / [复验](lower-center-projects-s4681/pair.jpg)|
|`lower-center-projects-s600`<br>`/account/center`|lower / long-page-segment|1→0|受测几何对齐 · [原图](../expanded/lower-center-projects-s600/pair.jpg) / [复验](lower-center-projects-s600/pair.jpg)|
|`lower-search-applications`<br>`/list/search/applications`|lower / lower|2→0|受测几何对齐 · [原图](../expanded/lower-search-applications/pair.jpg) / [复验](lower-search-applications/pair.jpg)|
|`lower-search-applications-s298`<br>`/list/search/applications`|lower / long-page-segment|2→0|受测几何对齐 · [原图](../expanded/lower-search-applications-s298/pair.jpg) / [复验](lower-search-applications-s298/pair.jpg)|
|`mobile-account-center`<br>`/account/center`|mobile / default|33→0|受测几何对齐 · [原图](../expanded/mobile-account-center/pair.jpg) / [复验](mobile-account-center/pair.jpg)|
|`state-center-applications`<br>`/account/center`|state / tab-applications|60→0|受测几何对齐 · [原图](../expanded/state-center-applications/pair.jpg) / [复验](state-center-applications/pair.jpg)|
|`state-center-articles`<br>`/account/center`|state / tab-articles|1→0|受测几何对齐 · [原图](../expanded/state-center-articles/pair.jpg) / [复验](state-center-articles/pair.jpg)|
|`state-center-projects`<br>`/account/center`|state / tab-projects|1→0|受测几何对齐 · [原图](../expanded/state-center-projects/pair.jpg) / [复验](state-center-projects/pair.jpg)|
|`tablet1024-account-center`<br>`/account/center`|tablet1024 / default|1→0|受测几何对齐 · [原图](../expanded/tablet1024-account-center/pair.jpg) / [复验](tablet1024-account-center/pair.jpg)|
|`tablet768-account-center`<br>`/account/center`|tablet768 / default|33→0|受测几何对齐 · [原图](../expanded/tablet768-account-center/pair.jpg) / [复验](tablet768-account-center/pair.jpg)|
|`zoom125-account-center`<br>`/account/center`|zoom125 / default|1→0|受测几何对齐 · [原图](../expanded/zoom125-account-center/pair.jpg) / [复验](zoom125-account-center/pair.jpg)|
|`zoom150-account-center`<br>`/account/center`|zoom150 / default|33→0|受测几何对齐 · [原图](../expanded/zoom150-account-center/pair.jpg) / [复验](zoom150-account-center/pair.jpg)|

### 欢迎页内容版本（8组）

欢迎页在桌面、390、768、1024、125%、150%、深色、折叠8种环境中，6.0.3新增文档导致高度不同。

以实际线上6.0.1提交的中英文Cheatsheet为视觉基线，替换正文。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`collapsed-welcome`<br>`/welcome`|collapsed / default|1→0|受测几何对齐 · [原图](../expanded/collapsed-welcome/pair.jpg) / [复验](collapsed-welcome/pair.jpg)|
|`dark-welcome`<br>`/welcome`|dark / default|1→0|受测几何对齐 · [原图](../expanded/dark-welcome/pair.jpg) / [复验](dark-welcome/pair.jpg)|
|`desktop-welcome`<br>`/welcome`|desktop / default|1→0|受测几何对齐 · [原图](../expanded/desktop-welcome/pair.jpg) / [复验](desktop-welcome/pair.jpg)|
|`mobile-welcome`<br>`/welcome`|mobile / default|4→0|受测几何对齐 · [原图](../expanded/mobile-welcome/pair.jpg) / [复验](mobile-welcome/pair.jpg)|
|`tablet1024-welcome`<br>`/welcome`|tablet1024 / default|1→0|受测几何对齐 · [原图](../expanded/tablet1024-welcome/pair.jpg) / [复验](tablet1024-welcome/pair.jpg)|
|`tablet768-welcome`<br>`/welcome`|tablet768 / default|1→0|受测几何对齐 · [原图](../expanded/tablet768-welcome/pair.jpg) / [复验](tablet768-welcome/pair.jpg)|
|`zoom125-welcome`<br>`/welcome`|zoom125 / default|1→0|受测几何对齐 · [原图](../expanded/zoom125-welcome/pair.jpg) / [复验](zoom125-welcome/pair.jpg)|
|`zoom150-welcome`<br>`/welcome`|zoom150 / default|1→0|受测几何对齐 · [原图](../expanded/zoom150-welcome/pair.jpg) / [复验](zoom150-welcome/pair.jpg)|

### 自行添加的响应式布局（21组）

390px的搜索筛选、设置导航、AI侧栏、工作台网格、分步字段、监控分类、卡片页头、宽表，以及注册结果/部分平板表格曾偏离官方。

移除默认手机改版、固定表格宽度和额外滚动；恢复官方栅格、字段宽、导航与样式。注册结果恢复800px容器和操作间距，保留本地演示的诚实语义。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`mobile-account-settings`<br>`/account/settings`|mobile / default|8→0|受测几何对齐 · [原图](../expanded/mobile-account-settings/pair.jpg) / [复验](mobile-account-settings/pair.jpg)|
|`mobile-chatbot`<br>`/chatbot`|mobile / default|2→0|受测几何对齐 · [原图](../expanded/mobile-chatbot/pair.jpg) / [复验](mobile-chatbot/pair.jpg)|
|`mobile-dashboard-monitor`<br>`/dashboard/monitor`|mobile / default|5→0|受测几何对齐 · [原图](../expanded/mobile-dashboard-monitor/pair.jpg) / [复验](mobile-dashboard-monitor/pair.jpg)|
|`mobile-dashboard-workplace`<br>`/dashboard/workplace`|mobile / default|15→0|受测几何对齐 · [原图](../expanded/mobile-dashboard-workplace/pair.jpg) / [复验](mobile-dashboard-workplace/pair.jpg)|
|`mobile-form-advanced`<br>`/form/advanced-form`|mobile / default|4→0|受测几何对齐 · [原图](../expanded/mobile-form-advanced/pair.jpg) / [复验](mobile-form-advanced/pair.jpg)|
|`mobile-form-step`<br>`/form/step-form`|mobile / default|5→0|受测几何对齐 · [原图](../expanded/mobile-form-step/pair.jpg) / [复验](mobile-form-step/pair.jpg)|
|`mobile-list-card`<br>`/list/card-list`|mobile / default|18→0|受测几何对齐 · [原图](../expanded/mobile-list-card/pair.jpg) / [复验](mobile-list-card/pair.jpg)|
|`mobile-profile-advanced`<br>`/profile/advanced`|mobile / default|6→0|受测几何对齐 · [原图](../expanded/mobile-profile-advanced/pair.jpg) / [复验](mobile-profile-advanced/pair.jpg)|
|`mobile-profile-basic`<br>`/profile/basic`|mobile / default|11→0|受测几何对齐 · [原图](../expanded/mobile-profile-basic/pair.jpg) / [复验](mobile-profile-basic/pair.jpg)|
|`mobile-search-applications`<br>`/list/search/applications`|mobile / default|19→0|受测几何对齐 · [原图](../expanded/mobile-search-applications/pair.jpg) / [复验](mobile-search-applications/pair.jpg)|
|`mobile-search-articles`<br>`/list/search/articles`|mobile / default|9→0|受测几何对齐 · [原图](../expanded/mobile-search-articles/pair.jpg) / [复验](mobile-search-articles/pair.jpg)|
|`mobile-search-projects`<br>`/list/search/projects`|mobile / default|19→0|受测几何对齐 · [原图](../expanded/mobile-search-projects/pair.jpg) / [复验](mobile-search-projects/pair.jpg)|
|`mobile-user-register-result`<br>`/user/register-result`|mobile / default|1→0|受测几何对齐 · [原图](../expanded/mobile-user-register-result/pair.jpg) / [复验](mobile-user-register-result/pair.jpg)|
|`tablet1024-list-table`<br>`/list/table-list`|tablet1024 / default|21→0|受测几何对齐 · [原图](../expanded/tablet1024-list-table/pair.jpg) / [复验](tablet1024-list-table/pair.jpg)|
|`tablet1024-profile-basic`<br>`/profile/basic`|tablet1024 / default|13→0|受测几何对齐 · [原图](../expanded/tablet1024-profile-basic/pair.jpg) / [复验](tablet1024-profile-basic/pair.jpg)|
|`tablet768-profile-basic`<br>`/profile/basic`|tablet768 / default|13→0|受测几何对齐 · [原图](../expanded/tablet768-profile-basic/pair.jpg) / [复验](tablet768-profile-basic/pair.jpg)|
|`tablet768-user-register-result`<br>`/user/register-result`|tablet768 / default|1→0|受测几何对齐 · [原图](../expanded/tablet768-user-register-result/pair.jpg) / [复验](tablet768-user-register-result/pair.jpg)|
|`zoom125-list-table`<br>`/list/table-list`|zoom125 / default|21→0|受测几何对齐 · [原图](../expanded/zoom125-list-table/pair.jpg) / [复验](zoom125-list-table/pair.jpg)|
|`zoom125-profile-basic`<br>`/profile/basic`|zoom125 / default|13→0|受测几何对齐 · [原图](../expanded/zoom125-profile-basic/pair.jpg) / [复验](zoom125-profile-basic/pair.jpg)|
|`zoom150-list-table`<br>`/list/table-list`|zoom150 / default|21→0|受测几何对齐 · [原图](../expanded/zoom150-list-table/pair.jpg) / [复验](zoom150-list-table/pair.jpg)|
|`zoom150-profile-basic`<br>`/profile/basic`|zoom150 / default|13→0|受测几何对齐 · [原图](../expanded/zoom150-profile-basic/pair.jpg) / [复验](zoom150-profile-basic/pair.jpg)|

### 遗漏的官方全局表格样式（3组）

768px分析页、高级表单、高级详情有约15px宽度差；此前仅称滚动条差异，未定位完整原因。

迁移官方global.less在max-width:768px下的表格overflow、white-space:pre和单元格span规则，重新核对实际宽度。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`tablet768-dashboard-analysis`<br>`/dashboard/analysis`|tablet768 / default|6→0|受测几何对齐 · [原图](../expanded/tablet768-dashboard-analysis/pair.jpg) / [复验](tablet768-dashboard-analysis/pair.jpg)|
|`tablet768-form-advanced`<br>`/form/advanced-form`|tablet768 / default|4→0|受测几何对齐 · [原图](../expanded/tablet768-form-advanced/pair.jpg) / [复验](tablet768-form-advanced/pair.jpg)|
|`tablet768-profile-advanced`<br>`/profile/advanced`|tablet768 / default|7→0|受测几何对齐 · [原图](../expanded/tablet768-profile-advanced/pair.jpg) / [复验](tablet768-profile-advanced/pair.jpg)|

### 本地可用流程扩展（5组）

文章加载更多、标准列表10条/页、卡片新增、卡片详情、AI重新生成。

保留本地实际功能。官方文章仍5条、标准列表仍5条、卡片两个入口无处理、AI没有重新生成入口；无法得到相同完成态，原始差异继续保留。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`state-articles-more`<br>`/list/search/articles`|state / load-more|1→6|保留功能差异 · [原图](../expanded/state-articles-more/pair.jpg) / [复验](state-articles-more/pair.jpg)|
|`state-basic-size10`<br>`/list/basic-list`|state / 10 rows per page; pagination updated|1→6|保留功能差异 · [原图](../expanded/state-basic-size10/pair.jpg) / [复验](state-basic-size10/pair.jpg)|
|`state-card-create`<br>`/list/card-list`|state / create-action|1→4|保留功能差异 · [原图](../expanded/state-card-create/pair.jpg) / [复验](state-card-create/pair.jpg)|
|`state-card-details`<br>`/list/card-list`|state / details-action|1→2|保留功能差异 · [原图](../expanded/state-card-details/pair.jpg) / [复验](state-card-details/pair.jpg)|
|`state-chat-regenerate`<br>`/chatbot`|state / candidate regenerate; official stopped UI has no regenerate action|3→5|保留功能差异 · [原图](../expanded/state-chat-regenerate/pair.jpg) / [复验](state-chat-regenerate/pair.jpg)|

### 停止后的助手操作区（1组）

停止流式后，本地显示重新生成按钮，官方没有；原先仅归为流式采样差异。

两边用相同固定SSE并将35/150ms定时器放慢至1200ms后实际停止；仍有40px操作区差，重新归因为本地扩展。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`state-chat-stop`<br>`/chatbot`|state / aborted partial message|1→1|保留功能差异 · [原图](../expanded/state-chat-stop/pair.jpg) / [复验](state-chat-stop/pair.jpg)|

### 官方故障恢复行为（1组）

官方设置路由分包一次失败后，点击重试仍错误；本地解除数据故障后可重试恢复。

分别保存相同错误态、点击重试后的真实不同状态、移除故障完整刷新后的相同恢复态。保留本地恢复能力，不构造官方成功截图。

|案例与路由|环境/状态|原差异数→新差异数|结果与证据|
|---|---|---:|---|
|`state-resource-retry`<br>`/account/settings`|state / click retry: candidate restores; official route lazy cache keeps error|1→11|保留功能差异 · [原图](../expanded/state-resource-retry/pair.jpg) / [复验](state-resource-retry/pair.jpg)|

## 验收边界

- 本轮107组是新证据；3.1.0的其余案例保留为previous_evidence，未声称301组全部复验。
- 70组对齐指受测几何及截图审阅；公开mock同数据传输、代码修正分开记录。
- 截图来自官方原UI与本地实际页面；不修改官方DOM/CSS。公开mock、流式与故障仅隔离浏览器测试传输。
- 390×844采用固定CSS视口，无mobile自动缩放；官方禁用用户缩放，本地保留可访问缩放。不是实体手机验收。
- 125%/150%仍为等效CSS视口+DPR，不是浏览器菜单原生缩放。
- 本地页脚、演示注册/转账/AI等诚实文案与功能扩展保留；动态地图、时间和图表不承诺逐像素一致。
- 没有真实注册、邮件、上传、转账或模型调用；用户最终视觉认可独立待确认。
