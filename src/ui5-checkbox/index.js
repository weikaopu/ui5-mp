Component({
  options: { addGlobalClass: true },
  properties: {
    label: String,
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    value: String, // 用于表单提交时的标识
    // None, Error, Warning, Success
    valueState: {
      type: String,
      value: 'None'
    }
  },
  methods: {
    onTap() {
      if (this.data.disabled) return

      const newChecked = !this.data.checked
      this.setData({ checked: newChecked })

      // 触发事件，方便在页面监听
      this.triggerEvent('change', {
        value: this.data.value,
        checked: newChecked
      })
    }
  }
})
