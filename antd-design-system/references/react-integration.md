# React集成

模板组合：React19.2.5、antd6.6.7、ProComponents3.1.14-2、Plots2.6.8、antd-style4.1.0、Ant Design X/Markdown2.9.0、React Query5.101.2、Vite8.3.5。准确依赖、KaTeX安全覆盖与许可证随锁文件提供。现有项目保留自己的依赖，按本地类型确认API。

## 主题与布局

入口先引入antd/dist/reset.css，再用ConfigProvider(locale=zhCN, variant=filled, theme=proTheme)和App包裹应用。通过App.useApp取得主题化message/modal。src/theme.ts保留seed与Card阴影覆盖；assets/antd-theme.ts由Token生成，用于跨项目基础值，不把某次alias快照覆盖到所有未来版本。

ProLayout使用layout=mix、navTheme=light、contentWidth=Fluid、token.header.heightLayoutHeader=56、siderWidth=256、fixSiderbar、fixedHeader=false。保留原生响应式与菜单展开层级；Umi项目接入已有runtime layout，避免再嵌一层。antd6 cssVar使用对象，ProComponents3不再使用旧headerHeight属性。

## 独立工程

模板路径assets/analysis-starter保留兼容名称，实际包含27页。执行npm ci、npm run dev打开4175端口；npm run build执行TypeScript与Vite生产构建。通过#/路由访问，不能把hash路径改成静态服务器不存在的目录。

| 页面组 | 本地实现 |
| --- | --- |
| 分析 | src/AnalysisPage.tsx、src/analysis/ |
| 查询表格、基础表单、基础详情 | src/pages/list/index.tsx、form/index.tsx、profile/index.tsx |
| 其余官方页面 | src/pages/下对应dashboard/form/list/profile/result/exception/account/user/chatbot目录；Welcome.tsx、Admin.tsx |
| 精确路由与搜索容器 | src/page-registry.tsx；src/pages/list/search/index.tsx |
| 本地API与状态适配 | src/runtime/local-api.ts、umi.tsx、drafts.ts、local-chat.ts、PageBoundary.tsx |
| 固定演示数据、地图 | public/analysis-data.json、public/fixtures/ |
| 390px预览与可见测量 | public/responsive-check.html、runtime/responsive-observer.ts，仅preview=mobile时启用 |

官方源码6.0.3的组件、子组件、样式与fixture一起迁移；Umi运行时改为本地适配，React Query负责页面数据和失败重试。服务入口需要逐项替换，不能把当前客户端演示角色当成生产权限。

## 状态与服务边界

- 登录默认提供管理员演示；admin/user密码ant.design，短信演示验证码1234。角色保存在本次浏览器sessionStorage；退出、普通角色菜单隐藏与管理页403可验证，不连接真实认证。
- 查询规则和标准列表的筛选、排序/分页、增删改在本地实现；普通列表数据在当前页面会话中改变，刷新恢复固定样例。高级表单草稿在SPA切换时保留，基本表单提交写入sessionStorage。
- 个人资料保存到当前Query缓存，中心/设置共享完整资料；刷新恢复样例。头像FileReader预览，不发起上传；通知开关保存在sessionStorage。安全/绑定只反馈演示边界。
- 注册只进入本地结果页，不创建真实账户或发短信/邮件。AI使用固定本地流式回复，无真实模型请求；会话保留在当前助手页面实例。
- 字体、头像、项目封面、欢迎页文档图像仍使用官方CDN；地图JSON已本地化。断网时远程图像/字体可能回退。

## 密度与响应式

表格操作与Card操作检查实际行高；普通32px链接Button常使参考22px操作行膨胀。Descriptions检查表格等宽列、原生td起始内边距与行距。分步表单裸h3须继承14/22，避免额外高度。

使用官方ProLayout/PageContainer响应式留白，不全局强制16px；当前390px内容起点40px。精确还原默认保留官方固定字段、工作台三列Card.Grid、设置纵向菜单与AI固定会话侧栏；不要自动增加手机重排。注册结果800px固定容器和卡片页头定位来自视觉提交，原站窄屏可用性局限单独记录。基础表单与ProForm字段保持官方自然宽度，不加全局100%字段钳制；真实错误恢复继续保留。

必须迁移官方global.less：max-width:768px下.ant-table width:100%和overflow-x:auto，单元格white-space:pre、直接span display:block。不要另给所有ProTable强制scroll.x或固定min-width；热门搜索按官方手机条件处理。搜索页label取消当前依赖额外8px padding。默认团队为空，中心头像按官方左对齐；public fixture请求no-store防止旧版本缓存。后台ConfigProvider主色1890ff，独立认证嵌套1677ff。

减少动效用transition:none，不能给所有元素设置极短全属性过渡。打开菜单、选择框和日期弹层后检查真实坐标与焦点，不能仅凭DOM中存在菜单判断可用。

模板为了本地预览稳定采用单包构建，JS约5.25MB（gzip约1.65MB），构建会提示体积。正式产品按实际功能拆分模块，并替换演示服务；不要直接复制当前全站包的体积策略。

## 已验证的状态维护规则

标准列表更新显式保留current.id；仅请求成功后显示结果，失败保留可重试表单。成功弹窗保持640px宽与上下72px留白，不把横向留白一起扩大。省份改变后在依赖Select更新完成时清空city，避免旧城市重新显示。指标包含“万”单位时用自然高度，不强制32px外框。内联提示/催办使用可换行链接，避免32px链接Button改变窄屏步骤高度。

页面错误边界区分资源加载与渲染错误，使用官方Card/Result/操作组合；错误态去掉外层重复正文padding。资源重试重置查询并重新挂载，渲染错误提供刷新与返回首页。当前源码、交互与错误恢复证据见expanded-acceptance.json。
