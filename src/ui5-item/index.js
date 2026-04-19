Component({
  options: {
    multipleSlots: true, // 必须开启
    addGlobalClass: true
  },
  properties: {
    title: String,
    description: String,
    // 新增：描述文本的最大行数，默认为 2
    descriptionLines: {
      type: Number,
      value: 2
    },
    icon: String, // 传入图标名称，如 'search'
    iconColor: String, // 可选：自定义图标颜色
    status: String, // 右侧显示的状态文字
    // type: 'Active' (默认) 或 'Navigation' (显示右箭头)
    type: {
      type: String,
      value: 'Active'
    },
    // 手动标识是否有 action，因为小程序难以在 JS 中直接检测 slot 是否为空
    hasActions: {
      type: Boolean,
      value: false
    },
    // 标识是否使用左侧插槽
    hasIconSlot: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onTap(e) {
      this.triggerEvent('click', e.detail)
    }
  }
})
