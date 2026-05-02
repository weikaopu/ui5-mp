# AI Assist 指令指南 (UI5-MP)

本项目是一个基于 SAP UI5 风格和规范实现的微信小程序 UI 组件库项目。

## 🤖 AI 辅助开发技能 (AI Assisted Development Skills)

本项目通过以下专用技能来指导 AI 助手执行特定任务。这些技能的详细规则和上下文定义在各自的 `.agents/skills/` 目录下的 `SKILL.md` 文件中。

- **`create-component`**: 用于创建新的 `ui5-mp` 组件。它确保新组件遵循 SAP UI5 设计规范和微信小程序 UI 规范，并处理依赖检查、文件结构和代码生成规则。
  - 详细定义: `.agents/skills/create-component/SKILL.md`
- **`update-component`**: 用于更新现有的 `ui5-mp` 组件。它指导 AI 助手根据 SAP UI5 设计规范和微信小程序 UI 规范重构和优化现有组件，并检查 Behavior 引入和属性覆盖。
  - 详细定义: `.agents/skills/update-component/SKILL.md`
- **`check-component-dependency`**: 用于检查一个组件的依赖关系。此技能会识别组件的依赖项，并验证它们是否已实现或是否可行，以确保组件开发的顺序性。
  - 详细定义: `.agents/skills/check-component-dependency/SKILL.md`
- **`create-demo`**: 用于为 `ui5-mp` 组件创建演示页面。它指导 AI 助手生成符合规范的 demo 页面，包括 mock 数据、页面布局和配置更新。
  - 详细定义: `.agents/skills/create-demo/SKILL.md`

---

_注意：此文件由团队维护，用于辅助 AI 助手生成更符合本项目标准的回答。_
