---
name: create-component
description: 创建一个新的 ui5-mp 组件。制定生成符合 UI5 设计规范的微信小程序 UI 组件严格的标准。参考文档规范、代码规范生成一个新组建。
user-invocable: false
---

# 创建一个新的 ui5-mp 组件

你现在需要帮我开发一些 UI 组件，当这个 skill 激活时，把 src/ 和 tools/ 目录都加入你的上下文，然后你需要完成以下动作：

## 使用场景

- 创建一个新组件，这个 UI 组件的代码必须同时遵循 SAP UI5 的设计规范和微信小程序 UI 规范。不兼容和冲突的地方优先尊循小程序 UI 规范。

## 生成代码规则

- 你总是应该根据 .gitignore 文件来忽略不相干的东西，不必扫描根目录下的所有东西。
- 你需要读取 check-component-dependency 技能(.agents/skills/check-component-dependency/SKILL.md)的所有规则，得到结果。如果结果中存在“未实现”依赖组件，请立即终止技能，停止后续动作，告诉我哪些依赖组件未实现。如果结果为”零个依赖组件“或者所有依赖组件均”已实现“在 src 目录下，则进入下一步动作。
- 参考源：所有新组件的设计必须参考 UI5 Web Components 的官方规范。参考文档从这里找：https://ui5.github.io/webcomponents/components 。
- 目录结构：组件必须存放在 src/ 目录下，命名格式为 `ui5-xxx`，目录名称格式 `ui5-` 开头加上组件名称 `xxx`，比如：`ui5-toast`。
- 在这个目录下新建 `index.{js,json,wxml,wxss}` 文件。如果文件已存在，则更新。

## 新建文件说明

- index.js
  1. 第一行是注释，首行必须包含参考文档链接。比如：https://ui5.github.io/webcomponents/components/Toast/ 。
  2. 必须配置 `externalClasses: ["ui5Class"]` 和 `options: { addGlobalClass: true, pureDataPattern: /^_/ }` 以提升样式灵活性及数据性能。
     比如

     ```js
     externalClasses: ["ui5Class"],
     options: {
       addGlobalClass: true,
       pureDataPattern: /^_/,
     },
     ```

  3. **必须强制引入**：在 src/behaviors/ 目录提供了一些 Behavior，比如以支持通用属性（design, status, disabled），确保 UI 一致性的 base-behavior。你需要判断引入哪些 Behavior 才能是组件符合 UI5 设计规范和小程序规范的标准，并能磨平两个标准之间的差异。
  4. 内部私有变量必须以 \_ 开头（如 \_visible），并通过 observers 监听外部属性来更新内部状态，**特别注意**：如果 Behavior 的 data 数据参与视图层渲染，则变量名不能以下划线开头，否则会被 pureDataPattern 拦截导致 WXML 无法获取。
  5. 示例：

     ```js
     // https://ui5.github.io/webcomponents/components/Toast/
     const baseBehavior = require("../../behaviors/base-behavior");

     Component({
       externalClasses: ["ui5Class"],
       options: {
         addGlobalClass: true,
         pureDataPattern: /^_,
       },
       behaviors: [baseBehavior],
       properties: {
         text: {
           type: String,
           value: "",
         },
         visible: {
           type: Boolean,
           value: false,
         },
         // 显示时长（毫秒）
         duration: {
           type: Number,
           value: 3000,
         },
       },
       data: {
         _visible: false,
       },
       observers: {
         visible(visible) {
           this.setData({
             _visible: visible,
           });
         },
       },
       methods: {
         show(text = "", duration = this.data.duration) {
           this.setData({
             text,
             _visible: true,
           });
           setTimeout(() => {
             this.setData({
               _visible: false,
             });
           }, duration);
         },
       },
     });
     ```

- index.json
  1. 声明为组件，并按需引用其他 UI5 组件。固定 `"component": true,`。 `"usingComponents": {}` 视情况而定，需要引入其他组件的时候再修改。
  2. 示例：
     ```json
     {
       "component": true,
       "usingComponents": {
         "ui5-icon": "../ui5-icon/index"
       }
     }
     ```

- index.wxml
  1. 是微信小程序 UI 的一般写法。
  2. 示例：
     ```xml
     <view class="ui5-toast-container {{_visible ? 'is-visible' : ''}}">
     <view class="ui5-toast">
         {{text}}
       </view>
     </view>
     ```

- index.wxss
  1. 需要以 src/assets/sap-fundamental-styles.wxss 文件为参考，这个文件是作为主题使用的（主题样式缺失的也请同时补充）。使用 SAP 风格变量（如 var(--sap-shadow-level-2)）和颜色方案。
  2. 微信小程序像素单位请使用 `rpx`。
  3. 示例：

     ```css
     .ui5-toast-container {
       position: fixed;
       left: 0;
       right: 0;
       bottom: 15%;
       /* 弹出位置通常在页面中下方 */
       display: flex;
       justify-content: center;
       align-items: center;
       z-index: 1000;
       pointer-events: none;
       /* 穿透点击，不干扰页面操作 */
       opacity: 0;
       transform: translateY(20px);
       transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
     }

     .ui5-toast-container.is-visible {
       opacity: 1;
       transform: translateY(0);
     }

     .ui5-toast {
       background-color: rgba(50, 54, 58, 0.9);
       /* SAP Quartz Dark 风格背景 */
       color: #ffffff;
       padding: 8px 20px;
       border-radius: 20px;
       /* 胶囊型 */
       font-size: 14px;
       box-shadow: var(--sap-shadow-level-2);
       max-width: 80%;
       text-align: center;
       word-break: break-all;
     }
     ```

- 更新这个文件 tools/config.js
  把新建的组件注册到编译入口 `entry: []` 数组里面，并确保数组按照字母顺序排列，如果已存在则不必更新。

## 交互和反馈

- 如果你在实现的过程中遇到任何不清楚的地方请终止活动，询问我或者和我确认，之后方可继续或者结束。
- 如果你发现有什么需要优化的地方，或者有更好的建议，在你实现完成最后输出告诉我，我来决定是否进行优化，或者下一步动作。

## 使用方法

```md
创建一个 ui5-tag 组件。

参考 UI5 的 Tag 规范创建一个组件。
```
