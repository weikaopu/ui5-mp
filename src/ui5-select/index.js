// https://ui5.github.io/webcomponents/components/Select/
const baseBehavior = require("../behaviors/base-behavior")

Component({
  externalClasses: ["ui5Class"],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/, // 保持 pureDataPattern 启用
    multipleSlots: true,
  },
  behaviors: [baseBehavior],
  properties: {
    value: { type: String, value: "" },
    disabled: { type: Boolean, value: false },
    valueState: { type: String, value: "None" }, // None, Positive, Critical, Negative, Information
    valueStateMessage: { type: String, value: "" }, // 允许通过属性直接设置简短提示
    placeholder: { type: String, value: "" },
    name: { type: String, value: "" },
    readonly: { type: Boolean, value: false },
    required: { type: Boolean, value: false }
  },
  data: {
    optionsList: [], // 重命名，用于 WXML 渲染
    selectedText: "", // 重命名，用于 WXML 渲染
    selectedIcon: "", // 新增：用于显示选中项的图标
    opened: false, // 重命名，用于 WXML 渲染
    popoverWidth: 0,
    hasValueStateMessage: false, // 用于控制消息区域是否渲染
    effectiveValueStateMessage: "", // 最终显示的提示文字
    hasValueStateMessageSlot: false // 标记是否传入了消息插槽
  },
  relations: {
    "../ui5-option/index": {
      type: "child",
      linked() { this._updateOptions() },
      unlinked() { this._updateOptions() },
      linkChanged() { this._updateOptions() }
    }
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
    },
    "value, optionsList": function (value, optionsList) {
      // 如果选项列表还未同步（relations 还未建立），则直接返回
      // 避免在初始化过程中因列表暂时为空而清空已有的选中文字
      if (!optionsList || optionsList.length === 0) return

      // 查找逻辑：优先根据 value 匹配，若无 value（初始化场景）则查找标记为 selected 的选项
      let selectedOption = optionsList.find(o => o.value === value)

      if (!selectedOption && !value) {
        selectedOption = optionsList.find(o => o.selected)
      }

      if (selectedOption) {
        const update = {
          selectedText: selectedOption.text,
          selectedIcon: selectedOption.icon || ""
        }
        // 只有当内部匹配出的值与当前属性不符时才更新属性（防止由子项 selected 状态驱动初始化时 value 为空）
        if (value !== selectedOption.value) {
          update.value = selectedOption.value
        }
        this.setData(update)
      }
    }
  },
  methods: {
    _updateOptions() {
      const nodes = this.getRelationNodes("../ui5-option/index")
      const optionsList = nodes.map(node => ({ // 更新为 optionsList
        text: node.data.text || "",
        value: node.data.value || "",
        selected: node.data.selected || false,
        disabled: node.data.disabled || false,
        icon: node.data.icon || "",
        additionalText: node.data.additionalText || ""
      }))

      this.setData({ optionsList: optionsList }) // 更新为 optionsList
    },

    onSelectClick() {
      if (this.data.disabled || this.data.readonly) return

      const popover = this.selectComponent("#ui5-select-popover")
      if (popover) {
        this.createSelectorQuery().in(this)
          .select("#ui5-select-root")
          .boundingClientRect((rect) => {
            const width = rect ? rect.width : 0
            // 确保宽度样式已经应用到 DOM 之后再显示 Popover
            this.setData({ popoverWidth: width, opened: true }, () => {
              popover.show("ui5-select-root", this)
            })
          })
          .exec()
      }
    },

    onItemClick(e) {
      const { item, value } = e.detail
      const newValue = value !== undefined ? value : item.data.value

      if (newValue !== this.data.value) {
        this.setData({
          value: newValue,
          opened: false // 更新为 opened
        })
        this.triggerEvent("change", { value: newValue })
      }

      this.selectComponent("#ui5-select-popover").close()
    },

    onSlotChange() {
      // 当插槽内容发生变化（或初始化）时触发
      this.setData({
        hasValueStateMessageSlot: true
      })
    },

    onPopoverClose() {
      this.setData({ opened: false }) // 更新为 opened
    }
  }
})
