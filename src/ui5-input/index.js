const baseBehavior = require("../behaviors/base-behavior")

Component({
  externalClasses: ["ui5Class"],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  behaviors: [baseBehavior],
  properties: {
    value: { type: String, value: "" },
    icon: { type: String, value: "" },
    // "Email" | "Number" | "Password" | "Search" | "Tel" | "Text" | "URL" (value descriptions in: InputType)
    // Email / URL / Text: 小程序中没有专门的键盘模式，统一映射为 type="text"。
    // Password: 映射为 type="text"（或 number）并配合小程序原生的 password="{{true}}" 属性。
    // Number / Tel: 映射为 type="number"。如果需要带小数点的数字，可以使用 type="digit"。
    // Search: 映射为 type="text"，但关键在于设置 confirm-type="search"，这会让手机键盘的右下角按钮变成“搜索”。
    type: { type: String, value: "Text" },
    placeholder: { type: String, value: "" },
    showSuggestions: { type: Boolean, value: false },
    disabled: { type: Boolean, value: false },
    readonly: { type: Boolean, value: false },
    required: { type: Boolean, value: false },
    name: { type: String, value: "" },
    showClearIcon: { type: Boolean, value: false },
    maxlength: { type: Number, value: -1 },
    valueState: { type: String, value: "None" },
    valueStateMessage: { type: String, value: "" }
  },
  data: {
    suggestions: [],
    popoverWidth: 0,
    opened: false,
    hasValueStateMessage: false,
    effectiveValueStateMessage: "",
    _currentKeyboardHeight: 0 // Track keyboard height from input focus event
  },
  observers: {
    "valueState, valueStateMessage": function (valueState, valueStateMessage) {
      if (valueState === "None") {
        this.setData({
          hasValueStateMessage: false,
          effectiveValueStateMessage: ""
        })
        return
      }

      const defaultMessages = {
        "Negative": "Invalid entry",
        "Critical": "Warning",
        "Positive": "Success",
        "Information": "Information"
      }

      this.setData({
        hasValueStateMessage: true,
        effectiveValueStateMessage: valueStateMessage || defaultMessages[valueState] || ""
      })
    }
  },
  relations: {
    "../ui5-suggestion-item/index": {
      type: "child",
      linked() { this._updateSuggestions() },
      unlinked() { this._updateSuggestions() }
    },
    "../ui5-suggestion-item-group/index": {
      type: "child",
      linked() { this._updateSuggestions() },
      unlinked() { this._updateSuggestions() }
    }
  },
  methods: {
    _updateSuggestions() {
      // 获取直属建议项
      const itemNodes = this.getRelationNodes("../ui5-suggestion-item/index")
      // 获取分组建议项
      const groupNodes = this.getRelationNodes("../ui5-suggestion-item-group/index")
      const allGroupedItems = new Set()

      let suggestions = []

      // 处理分组逻辑
      groupNodes.forEach(group => {
        const children = group.getRelationNodes("../ui5-suggestion-item/index")
        if (children.length > 0) {
          suggestions.push({
            isGroup: true,
            headerText: group.data.headerText
          })
          children.forEach(node => {
            allGroupedItems.add(node)
            suggestions.push({
              text: node.data.text,
              additionalText: node.data.additionalText,
              icon: node.data.icon,
              value: node.data.text
            })
          })
        }
      })

      // 过滤掉已经在分组里的项，处理孤立的建议项
      const standaloneItems = itemNodes.filter(node => !allGroupedItems.has(node))
      standaloneItems.forEach(node => {
        suggestions.push({
          text: node.data.text,
          additionalText: node.data.additionalText,
          icon: node.data.icon,
          value: node.data.text
        })
      })

      this._allSuggestions = suggestions
      this._filterSuggestions(this.data.value)
    },

    /**
     * 根据输入内容过滤建议项
     * @param {string} value 当前输入值
     * @param {function} callback 过滤并渲染完成后的回调
     */
    _filterSuggestions(value, callback) {
      const all = this._allSuggestions || []
      // 如果输入为空，显示所有建议项（或者根据 UI5 规范在无输入时不显示）
      if (!value) {
        this.setData({ suggestions: all }, callback)
        return
      }

      const term = value.toLowerCase()
      const result = []
      let pendingHeader = null

      for (const item of all) {
        if (item.isGroup) {
          // 记录最近的一个分组标题，只有当该组内有匹配项时才添加标题
          pendingHeader = item
        } else {
          const textMatch = (item.text || "").toLowerCase().includes(term)
          const addTextMatch = (item.additionalText || "").toLowerCase().includes(term)

          if (textMatch || addTextMatch) {
            if (pendingHeader) {
              result.push(pendingHeader)
              pendingHeader = null // 每个标题只添加一次
            }
            result.push(item)
          }
        }
      }
      this.setData({ suggestions: result }, callback)
    },

    onFocus(e) {
      this.setData({ _currentKeyboardHeight: e.detail.height || 0 }) // Capture keyboard height on focus
      this.triggerEvent("focus", e.detail)
      if (this.data.hasValueStateMessage) {
        this._openValueStateMessage()
      }
    },

    onBlur(e) {
      this.setData({ _currentKeyboardHeight: 0 }) // Reset keyboard height on blur
      this.triggerEvent("blur", e.detail)
      this._closeValueStateMessage()
    },

    onInput(e) {
      const value = e.detail.value
      this.setData({ value })
      this.triggerEvent("input", { value })

      // 执行筛选
      this._filterSuggestions(value, () => {
        if (this.data.showSuggestions && value) {
          this._closeValueStateMessage()
          this._openSuggestions()
        } else {
          this._closeSuggestions()
          if (this.data.hasValueStateMessage) {
            this._openValueStateMessage()
          }
        }
      })
    },

    onClear() {
      this.setData({ value: "" })
      this.triggerEvent("input", { value: "" })
      this.triggerEvent("change", { value: "" })
      this._closeSuggestions()
    },

    _openSuggestions() {
      const popover = this.selectComponent("#ui5-input-suggestions")
      if (!popover) return

      // 如果没有匹配的建议项，且当前是打开状态，则关闭它
      if (this.data.suggestions.length === 0) {
        if (this.data.opened) {
          this._closeSuggestions()
        }
        return
      }

      this.createSelectorQuery().in(this)
        .select(".ui5-input-root")
        .boundingClientRect(rect => {
          this.setData({
            popoverWidth: Math.floor(rect.width),
            opened: true
          }, () => {
            popover.show("ui5-input-root", this, this.data._currentKeyboardHeight) // Pass keyboard height
          })
        }).exec()
    },

    _openValueStateMessage() {
      const popover = this.selectComponent("#ui5-input-value-state-message")
      // 如果建议列表已打开，则不展示状态消息
      if (popover && this.data.hasValueStateMessage && !this.data.opened) {
        this.createSelectorQuery().in(this)
          .select(".ui5-input-root")
          .boundingClientRect(rect => {
            this.setData({
              popoverWidth: Math.floor(rect.width)
            }, () => {
              popover.show("ui5-input-root", this)
            })
          }).exec()
      }
    },

    _closeValueStateMessage() {
      const popover = this.selectComponent("#ui5-input-value-state-message")
      if (popover) {
        popover.close()
      }
    },

    _closeSuggestions() {
      const popover = this.selectComponent("#ui5-input-suggestions")
      if (popover) {
        popover.close()
      }
      this.setData({ opened: false })
    },

    onSuggestionClick(e) {
      const { value, text } = e.detail
      const selectedValue = value || text
      this.setData({
        value: selectedValue,
        opened: false
      })
      this.triggerEvent("change", { value: selectedValue })
      this.triggerEvent("suggestion-item-select", { item: e.detail.item })
      this._closeSuggestions()
    }
  }
})
