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

- **Fiori 视觉还原**：严格遵循 SAP Fundamental Styles 规范，适配移动端。
- **自定义导航适配**：内置 `ui5-page` 自动处理状态栏、胶囊按钮及悬浮 Footer。
- **响应式表格**：支持通用的 **Popin 模式**，在窄屏下自动折叠次要列。
- **原子化驱动**：基于 CSS Variables 设计，支持全局主题色一键切换。

---

## 📦 组件清单 (Total: 22+)

### 1. 容器与导航 (Containers & Navigation)

- `ui5-page`: 核心容器，支持全局 `busy` 遮罩、`floatingFooter` 适配。
- `ui5-shellbar`: 顶部导航栏，支持 Logo 与 Action 区域。
- `ui5-card`: 业务卡片，支持 `header`、`status` 及交互态。
- `ui5-tab-container` / `ui5-tab`: 联动切换的页签容器，支持图标与下划线动画。
- `ui5-bar`: 工具栏组件，常用于页面底部 (Footer) 动作排版。

### 2. 数据输入 (Data Input)

- `ui5-input`: 支持 Focus 状态联动、ValueState (Error/Warning) 校验。
- `ui5-textarea`: 支持 `growing` 自动增长、`growingMaxLines` 及字数统计。
- `ui5-step-input`: 数值步进器，支持 TouchStart 长按连发与边界禁用。
- `ui5-select`: 基于原生 ActionSheet 封装的移动端选择器。
- `ui5-slider`: 具有 Fiori 焦点圆环反馈的数值滑动条。
- `ui5-segmented-button`: 互斥选项切换器，支持图标与文字混合。
- `ui5-checkbox` / `ui5-checkbox-group`: 语义化复选框及其数据管理。
- `ui5-switch`: 符合 Horizon 标准的开关，支持图形化状态。
- `ui5-button`: 包含 Emphasized, Standard, Transparent, Negative 等变体。
- `ui5-rating-indicator`: 纯 CSS 绘制的五星评分组件，支持只读模式。

### 3. 数据展示与反馈 (Display & Feedback)

- `ui5-table` / `ui5-table-row`: 响应式表格，支持 `demandPopin` 配置。
- `ui5-list` / `ui5-item`: 高度可定制列表，支持左侧 `icon` 和右侧 `actions` 插槽。
- `ui5-avatar`: 身份头像，支持图片、姓名缩写 (Initials) 或图标回退。
- `ui5-badge`: 语义化状态标签 (Status Colors 1-5)。
- `ui5-toast`: 非侵入式底部轻提示。
- `ui5-message-strip`: 页面内嵌的警告/通知条。
- `ui5-busy-indicator`: 局部或全屏的“花瓣”加载动画，支持全局抑制逻辑。
- `ui5-dialog`: 深度还原 `sap.m.Dialog` 质感，支持模态遮罩与底部 Toolbar。

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

- **Node.js**: 建议版本 v24.14.0+
  ```bash
  npm i
  npm run dev
  npm run watch
  ```
- **构建注意**: 若使用旧版 Webpack 运行构建遇到 OpenSSL 相关的 `crypto` 错误，请在终端执行：

  ```bash
  # macOS/Linux
  export NODE_OPTIONS=--openssl-legacy-provider

  # Windows (PowerShell)
  $env:NODE_OPTIONS = "--openssl-legacy-provider"
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

### 5. 温馨提示

有些 AI 助手可能没有能力创建文件或者目录，但是有能力更新他们，所以务必了解自己正在使用的 AI。

### 6. Live Demo

打开微信小程序体验 ![二维码](./tools/demo/assets/ui5-mp-qrcode.jpeg)
