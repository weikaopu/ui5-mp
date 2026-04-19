Component({
  options: { addGlobalClass: true },
  properties: {
    // labelLayout 可选值: Vertical (默认), Horizontal
    labelLayout: {
      type: String,
      value: 'Vertical'
    },
    label: String,
    value: String,
    placeholder: String,
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    type: { type: String, value: 'text' }, // text, number, password
    showClearIcon: { type: Boolean, value: false },
    // 状态: None, Error, Warning, Success
    valueState: { type: String, value: 'None' },
    valueStateText: String
  },
  data: {
    isFocused: false
  },
  methods: {
    onInput(e) {
      const val = e.detail.value
      this.setData({ value: val })
      this.triggerEvent('change', { value: val })
    },
    onClear() {
      this.setData({ value: '' })
      this.triggerEvent('change', { value: '' })
    },
    onFocus() {
      this.setData({ isFocused: true })
      this.triggerEvent('focus')
    },
    onBlur() {
      this.setData({ isFocused: false })
      this.triggerEvent('blur')
    },
  }
})
