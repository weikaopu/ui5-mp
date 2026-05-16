const baseBehavior = require("../behaviors/base-behavior")

Component({
  options: {
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义分组的标题文本
     */
    headerText: {
      type: String,
      value: "",
      observer: "_onDataChange"
    }
  },
  relations: {
    "../ui5-input/index": {
      type: "parent",
      linked(target) {
        this._parent = target
      }
    },
    "../ui5-suggestion-item/index": {
      type: "child",
      linked() { this._onDataChange() },
      unlinked() { this._onDataChange() }
    }
  },
  methods: {
    _onDataChange() {
      if (this._parent?._updateSuggestions) {
        this._parent._updateSuggestions()
      }
    }
  }
})
