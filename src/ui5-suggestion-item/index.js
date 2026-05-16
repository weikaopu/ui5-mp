// https://ui5.github.io/webcomponents/components/SuggestionItem/
const baseBehavior = require("../behaviors/base-behavior")

Component({
  externalClasses: ["ui5Class"],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    // 定义建议项的主文本
    text: { type: String, value: "" },
    // 定义建议项的辅助文本
    additionalText: { type: String, value: "" },
    // 定义建议项展示的图标
    icon: { type: String, value: "" },
    // 定义建议项的类型: "Active", "Inactive", "Detail"
    type: { type: String, value: "Inactive" }
  },
  relations: {
    "../ui5-input/index": {
      type: "parent",
      linked(target) {
        this._inputParent = target
      }
    },
    "../ui5-suggestion-item-group/index": {
      type: "parent",
      linked(target) {
        this._groupParent = target
      }
    }
  }
})
