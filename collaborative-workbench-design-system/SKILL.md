---
name: collaborative-workbench-design-system
description: "设计、实现或审查协作工作台的可复用设计系统：导航、记录列表、上下文详情、人员与自动化状态、明暗主题和组件契约。用于明确要求此设计系统或需要建立协作工作区规范的任务；保留现有品牌、语言与技术栈，不用于选择 shadcn、Liquid Glass 或 Linear 风格。"
---

# 协作工作台设计系统

以“找到工作、理解状态、作出下一步决定”为主线。此包提供原创规范和可运行概念示例，不是任何第三方产品的 UI 抽取或官方主题。

## 执行

1. 读取现有代码、运行界面与需求，确定主要实体、用户动作、权限与真实状态。已有产品先渲染，保留品牌和有效约定；不要把演示中的实体、字段或人员当作需求。
2. 读取 [基础与主题](references/foundations.md)。建立导航、集合与详情的任务层级，使用 [tokens.json](assets/tokens.json) 作为原创起点；项目已有 token 时先做语义映射，不全局覆盖。
3. 读取 [组件契约](references/components.md)，为本次实际出现的组件实现状态和键盘行为。人员、自动化执行者与审批权限必须分开表达，操作权限来自真实数据。
4. Web 实现按需读取 [接入说明](references/web.md)，复用许可合适的独立上游组件；其他平台映射原生主题、导航和焦点模型，不强制安装 Web 组件库。
5. 依 [验收](references/quality.md) 渲染、检查并修复。报告实际测试、截图、未验证项及来源边界。构建通过不等于视觉或无障碍验收通过。

## 资源与边界

- [原创概念示例](assets/preview.html)：零网络依赖，含主题切换、搜索、详情、状态更新和创建表单；数据仅保留在当前页面内存，刷新恢复。它用于验证设计契约，不是业务模板。
- [来源与许可](references/sources.md)：参考思路、上游选择、许可检查与禁止复制范围。引入第三方源码前核实目标版本许可并保留要求的声明。
- [CSS 主题](assets/tokens.css) 只作用于 `.cwb` 根节点。将其映射到目标组件库，避免第二套并行主题。

已有 design-three-styles 负责 shadcn/ui、Liquid Glass、Linear 的风格选择与一般视觉诊断；本技能负责协作工作台的实体关系、状态、主题和组件契约。已有 linear-design-system 或品牌系统时，优先保留其视觉语言，仅按需采用这里的工作流契约；不要叠加两套 token。

## 调用示例

- “使用 $collaborative-workbench-design-system 为现有应用设计集合与详情视图，保留语言、品牌和技术栈。”
- “依据 $collaborative-workbench-design-system 审查工作区的执行状态、权限、窄屏返回路径和明暗主题，修复本次范围内的问题。”
