// https://ui5.github.io/webcomponents/components/Option/
const baseBehavior = require("../behaviors/base-behavior")

Component({
  externalClasses: ["ui5Class"],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
  },
  behaviors: [baseBehavior],
  relations: {
    "../ui5-select/index": {
      type: "parent",
      linked(target) {
        this._parent = target
      }
    }
  },
  properties: {
    // 定义选项的显示文本（微信小程序中由于无法直接读取 slot 文本节点，建议增加此属性或通过 slot 传值）
    text: {
      type: String,
      value: "",
      observer: "_onDataChange"
    },
    // 选项对应的真实值
    value: {
      type: String,
      value: "",
      observer: "_onDataChange"
    },
    // 是否选中
    selected: {
      type: Boolean,
      value: false,
      observer: "_onDataChange"
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
      observer: "_onDataChange"
    },
    // 图标名称
    icon: {
      type: String,
      value: "",
      observer: "_onDataChange"
    },
    // 辅助文本
    additionalText: {
      type: String,
      value: "",
      observer: "_onDataChange"
    }
  },
  data: {},
  methods: {
    _onDataChange() {
      if (this._parent) {
        this._parent._updateOptions()
      }
    }
  }
})
