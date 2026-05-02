---
name: check-component-dependency
description: 检查一个组件依赖于哪些其他组件。
user-invocable: false
---

# 任务描述

一个组件的实现有可能需要先实现其依赖组件，因此，当我让你检查一个组件依 A 赖于哪些其他组件的时候，你可能能找到 A 有零个或者多个依赖组件。你现在需要帮我列出组件 A 依赖于哪些其他组件。

当这个 skill 激活时，

- 把 @src/ 目录下的所有名为 index.js 的文件都加入你的上下文。
- 把 @src/behaviors 目录下的所有 js 的文件都加入你的上下文。
- 把 @src/assets/sap-fundamental-styles.wxss 文件加入你的上下文。
- 把 @tools/config.js 文件加入你的上下文。
- 把 @tools/demo/app.json 文件加入你的上下文。
- 把 @tools/demo/pages 目录下的所有名为 index.js 的文件都加入你的上下文。

然后你需要完成以下动作：

## 实现规则

- 你总是应该根据 .aignore 文件来忽略不相干的东西，不必扫描根目录下的所有东西。
- 你需要去 https://ui5.github.io/webcomponents/components/ 这里找到该组件的规范，从中判断出它是否有依赖组件。比如：`ui5-button` 依赖于 `ui5-icon`、`ui5-badge`。
- **你需要在检查依赖时同时对比官方文档的 API 列表（包括 Properties, Slots, Events），确保完整识别由于功能实现需求而产生的潜在组件依赖。**
- 你需要检测依赖组件在微信小程序的技术和规范范围内是否具有可行性。
- 检查和对比组件在 tools/config.js 编译配置文件的 `entry: []` 数组节点是否已经存在，这是判断`组件已实现`的依据。
- 无需文件操作动作，只需要输出结果报告即可。

## 输出结果报告

整理出被依赖的组件清单，标记哪些已实现(用 🟢 标识)，哪些未实现(用 ⚪️ 标识)，以及可行性。

## 使用示例

```md
请遵循 `check-component-dependency` 技能的规则，检查 `ui5-tag` 组件。

检查 `ui5-tag` 组件的依赖组件。
```
