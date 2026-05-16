# ui5-mp (UI5 Mini Program)

**ui5-mp** 是一套专为原生微信小程序打造的自定义 UI 组件库。它规范参考 SAP Fiori Design Guidelines，深度还原 **SAP Fiori (Horizon/Quartz)** 设计语言，通过原生组件模型实现了企业级应用的严谨质感与高效交互。

---

## 🏗️ 项目动态与声明

> **⚠️ 注意事项**
> 本项目目前仍处于 **开发孵化 (Incubating)** 阶段，API 可能会有变动，暂不建议直接用于严苛的生产环境。

- **欢迎 PR (Pull Requests)**：如果你发现了 Bug 或有更好的实现方案，欢迎提交 PR。
- **欢迎 AI 协作**：本项目积极拥抱 AI 辅助开发，欢迎贡献符合 Fiori 规范的 AI 优化代码。
- **意见反馈**：如有组件需求或视觉还原建议，请通过 Pull Requests 进行讨论。

---

## ✨ 特性

- **Fiori 视觉还原**：深度还原 SAP Fiori (Horizon/Quartz) 设计语言，适配移动端交互。
- **现代工具链**：基于 **Gulp 4 + Webpack 5 + TypeScript 5.7** 构建，支持极致的开发性能与类型安全。
- **自定义导航适配**：内置 `ui5-page` 自动处理状态栏、胶囊按钮及悬浮 Footer。
- **原子化驱动**：基于 CSS Variables 设计，支持主题色彩平滑切换。
- **原子化驱动**：基于 CSS Variables 设计，支持全局主题色一键切换。

---

## 📦 组件状态矩阵 (Component Status Matrix)

| 分类           | 组件名                        | 状态 | 说明                               |
| :------------- | :---------------------------- | :--: | :--------------------------------- |
| **布局与容器** | `ui5-page`                    |  🟡  | 支持全局 Busy 状态与 SafeArea 适配 |
|                | `ui5-shellbar`                |  🟡  | 深度还原 Fiori 顶部导航            |
|                | `ui5-card` / `header`         |  🟢  | 包含交互态与状态映射               |
|                | `ui5-bar`                     |  🟡  | 常用作 Page Footer                 |
|                | `ui5-tab-container` / `tab`   |  🟢  | 支持图标、计数及溢出处理           |
|                | `ui5-dialog` / `popover`      |  🟢  | 模态与浮层交互                     |
|                | `ui5-form` / `form-group`     |  ⚪️  | 基于响应式列布局                   |
| **数据输入**   | `ui5-button`                  |  🟢  | 包含 6+ 种语义化变体               |
|                | `ui5-input` / `textarea`      |  🟡  | 支持 ValueState 与建议列表         |
|                | `ui5-step-input`              |  🟢  | 步进器，支持长按连发               |
|                | `ui5-select`                  |  🟢  | 适配移动端原生拾取器               |
|                | `ui5-textarea`                |  🟡  | 多行文本框支持 ValueState          |
|                | `ui5-switch`                  |  🟢  | 符合 Horizon 图形标准              |
|                | `ui5-checkbox` / `group`      |  🟢  | 语义化多选                         |
|                | `ui5-radio-button` / `group`  |  🟢  | 语义化单选                         |
|                | `ui5-slider` / `range-slider` |  🟢  | 带刻度与提示的滑动条               |
|                | `ui5-segmented-button`        |  🟢  | 互斥分段控制器                     |
|                | `ui5-rating-indicator`        |  🟢  | 五星评分                           |
| **数据展示**   | `ui5-list` / `ui5-li`         |  🟡  | 高度可定制的列表项                 |
|                | `ui5-table` / `row`           |  🟡  | 响应式表格 (DemandPopin)           |
|                | `ui5-timeline` / `item`       |  🟢  | 支持纵向/横向时间轴                |
|                | `ui5-avatar` / `badge`        |  🟢  | 用户身份与状态标签                 |
|                | `ui5-icon`                    |  🟢  | 完整支持 700+ SAP Icons            |
|                | `ui5-tag` / `text` / `link`   |  🟢  | 基础展示组件                       |
| **反馈与图表** | `ui5-toast`                   |  🟢  | 非侵入式提示                       |
|                | `ui5-message-strip`           |  🟢  | 内嵌警告通知                       |
|                | `ui5-popover`                 |  🟢  | 弹层                               |
|                | `ui5-dialog`                  |  🟡  | 对话框                             |
|                | `ui5-busy-indicator`          |  🟢  | 三种尺寸的“花瓣”加载动画           |
|                | `ui5-viz-column` / `line`     |  🟡  | 简单的可视化图表组件               |
| **高级组件**   | `ui5-process-flow`            |  🟡  | 拓扑布局与连线算法开发中           |
|                | `ui5-table-cell`              |  ⚪️  | 精细化表格单元格控制 (Planned)     |

> 状态说明：🟢 已实现 | 🟡 孵化中 | ⚪️ 待开发

---

## 🎨 样式体系 (CSS Variables)

在 `app.wxss` 中定义全局变量，确保视觉一致性：

```css
page {
  /* SAP Fiori Colors */
  --sap-primary-color: #0854a0;
  --sap-shell-color: #354a5f;
  --sap-background-color: #f7f7f7;
  --sap-content-color: #ffffff;

  /* Semantic States */
  --sap-success-color: #107e3e;
  --sap-error-color: #bb0000;
  --sap-warning-color: #e9730c;

  /* Spacing & Radius */
  --sap-border-radius: 8px;
  --sap-spacing-medium: 16px;
}
```

## 🚀 快速上手

### 1. 环境准备

- **Node.js**: 建议版本 v20.0.0+ 或 v24.14.0+
  ```bash
  npm i
  ```

### 2. 配置自定义导航

由于 **ui5-mp** 深度定制了页面适配逻辑，你需要在小程序配置文件 `app.json` 中全局开启自定义导航模式：

```json
{
  "window": {
    "navigationStyle": "custom"
  }
}
```

### 3. 引入全局样式

在项目根目录的 app.wxss 中引入核心变量与辅助类文件：

```css
/* app.wxss */
@import "./components/assets/sap-fundamental-styles.wxss";

/* 建议添加基础辅助类 */
.fd-padding-md {
  padding: var(--sap-spacing-medium) !important;
}
.ui5-text-secondary {
  color: var(--sap-text-secondary-color);
  font-size: 12px;
}
```

### 4. 声明与使用组件

在页面的 .json 文件中按需声明组件：

```json
{
  "usingComponents": {
    "ui5-page": "/components/ui5-page/index",
    "ui5-shellbar": "/components/ui5-shellbar/index",
    "ui5-card": "/components/ui5-card/index",
    "ui5-button": "/components/ui5-button/index"
  }
}
```

在 .wxml 中构建符合 Fiori 规范的页面结构：

```xml
<ui5-page>
  <ui5-shellbar slot="header" title="My Fiori App" />

  <view class="fd-padding-md">
    <ui5-card title="Welcome">
      <view class="fd-padding-md">
        <text>Hello UI5-MP!</text>
        <ui5-button type="emphasized" style="display: block; margin-top: 10px;">
          Confirm Action
        </ui5-button>
      </view>
    </ui5-card>
  </view>
</ui5-page>
```

### 5. Live Demo

打开微信小程序体验

![二维码](./tools/demo/assets/ui5-mp-qrcode.png)
