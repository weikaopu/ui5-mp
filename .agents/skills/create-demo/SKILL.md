---
name: create-demo
description: 创建一个新的 demo 演示。针对 src 目录下的一个 ui5 微信小程序 UI 组件，在 tools/demo/pages/gallery 目录下创建一个演示，并将其添加到首页 tools/demo/pages/index/index.wxml 里面。
user-invocable: false
---

# 创建一个新的 demo 演示

你现在需要帮我开发一些 UI 组件，当这个 skill 激活时，把 src/ 和 tools/ 目录都加入你的上下文，然后你需要完成以下动作：

## 使用场景

- 创建一个新演示，这个 UI 组件的代码必须同时遵循 SAP UI5 的设计规范和微信小程序 UI 规范。不兼容和冲突的地方优先尊循小程序 UI 规范。

## 生成代码规则

- 你总是应该根据 .gitignore 文件来忽略不相干的东西，不必扫描根目录下的所有东西。
- given：当我告诉你创建一个组件的演示的时候，你需要去 src 目录下找到对应的 UI 组件，一般这个组件会有不同的 `property` 和一下 `method`，针对这些 features 做出一些 mock 数据。
- then：在 tools/demo/pages/gallery 目录下创建一个演示目录，目录名称和组件名称一致即可，比如：`ui5-toast` UI 组件的 demo 目录叫作 `toast`。
- 在这个目录下新建 `index.{js,json,wxml,wxss}` 文件。
- 更新这个文件 tools/demo/app.json，把新增的 demo 的路径添加进去。比如：`"pages/gallery/toast/index"`。
- tools/demo/assets 目录下有图片资源供你使用。比如：`"../../../assets/Woman_avatar_01.png"`。

## 新建文件说明

- index.js
  1. mock 一些数据和一些响应方法来供演示交互使用。
  2. 示例：

     ```js
     Page({
       data: {
         // some mock data
       },
       onChange(e) {
         // show something or change something
       },
     });
     ```

- index.json
  1. 声明该 demo 依赖的其他组件，引用路径格式固定 `../../../components` (这个路径是编译后的路径，无须担心不存在问题)加上 src 目录下组件的目录，比如：`"../../../components/ui5-page"`。
  2. `ui5-page`，`ui5-shellbar`，`ui5-card` 这是三个都会用到，用于统一固定 demo 页面布局，实现 ui5-mp UI 组件库自举。
  3. 示例：
     ```json
     {
       "usingComponents": {
         "ui5-page": "../../../components/ui5-page",
         "ui5-shellbar": "../../../components/ui5-shellbar",
         "ui5-card": "../../../components/ui5-card",
         "ui5-toast": "../../../components/ui5-toast"
       }
     }
     ```

- index.wxml
  1. 是微信小程序页面的一般写法。`<ui5-page />` 为根，它的一些 `property` 按需添加。`<ui5-shellbar />` 的 `slot="header"` `show-back-button` 固定，`title` 则为你为该 demo 写简短说明。
  2. 示例：

     ```xml
     <ui5-page>
      <ui5-shellbar slot="header" title="Text Gallery" show-back-button></ui5-shellbar>

      <view class="fd-padding-md">
        <!-- 基础展示：默认自动换行 -->
        <ui5-card title="Default Text (Wrapping)">
          <view class="fd-padding-md">
            <ui5-text>
              <!-- 一些 mock 数据和方法 -->
            </ui5-text>
          </view>
        </ui5-card>

        <!-- 单行截断展示 -->
        <ui5-card title="No Wrapping (Truncated)">
          <view class="fd-padding-md">
            <ui5-text wrapping="{{false}}">
              <!-- ... -->
            </ui5-text>
          </view>
        </ui5-card>

        <!-- 更多的展示... -->
      </view>
     </ui5-page>

     ```

- index.wxss
  尽可能不要写太多 css，要实现 ui5-mp 组件的自举能力。要加的话也是展示一些定制的 css，比如：ui5-class。

## 交互和反馈

- 如果你在实现的过程中遇到任何不清楚的地方请终止活动，询问我或者和我确认，之后方可继续或者结束。
- 如果你发现有什么需要优化的地方，或者有更好的建议，在你实现完成最后输出告诉我，我来决定是否进行优化，或者下一步动作。

## 使用方法

```md
创建一个 ui5-tag 组件的 demo 演示。
```
