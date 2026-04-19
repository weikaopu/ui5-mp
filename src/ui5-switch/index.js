Component({
  options: { addGlobalClass: true },
  properties: {
    checked: Boolean,
    disabled: Boolean,
    // 是否使用图标代替文本 (Accept/Decline)
    graphical: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onToggle() {
      if (this.data.disabled) return
      const newState = !this.data.checked
      this.setData({ checked: newState })
      this.triggerEvent('change', { value: newState })
    }
  }
})
