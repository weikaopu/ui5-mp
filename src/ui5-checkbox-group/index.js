Component({
  options: { addGlobalClass: true },
  properties: {
    label: String,
    value: Array, // 当前选中的 value 数组
  },
  methods: {
    // 页面调用此方法或在子组件 change 时触发
    onCheckboxChange(e) {
      const { value, checked } = e.detail
      let newValue = [...(this.data.value || [])]

      if (checked) {
        if (!newValue.includes(value)) newValue.push(value)
      } else {
        newValue = newValue.filter(v => v !== value)
      }

      this.setData({ value: newValue })
      this.triggerEvent('change', { value: newValue })
    }
  }
})
