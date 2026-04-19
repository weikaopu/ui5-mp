Component({
  options: { addGlobalClass: true },
  properties: {
    label: String,
    value: { type: Number, value: 0 },
    max: { type: Number, value: 5 },
    disabled: Boolean,
    readonly: Boolean
  },
  methods: {
    onTap(e) {
      if (this.data.disabled || this.data.readonly) return

      const newValue = e.currentTarget.dataset.index
      // SAP 逻辑：如果点击已选中的最后一颗星，通常不会取消，除非是特定业务逻辑
      this.setData({ value: newValue })
      this.triggerEvent('change', { value: newValue })
    }
  }
})
