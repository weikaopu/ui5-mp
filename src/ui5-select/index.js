Component({
  options: { addGlobalClass: true },
  properties: {
    label: String,
    placeholder: { type: String, value: 'Select an option' },
    // 选项列表，格式如: [{text: 'Option 1', value: '1'}, ...]
    options: {
      type: Array,
      value: []
    },
    value: String,
    valueState: { type: String, value: 'None' },
    valueStateText: String,
    disabled: Boolean
  },
  data: {
    selectedText: ''
  },
  observers: {
    'value, options': function (value, options) {
      const selected = options.find(opt => opt.value === value)
      this.setData({ selectedText: selected ? selected.text : '' })
    }
  },
  methods: {
    onOpen() {
      if (this.data.disabled || this.data.options.length === 0) return

      const itemList = this.data.options.map(opt => opt.text)

      wx.showActionSheet({
        itemList,
        success: (res) => {
          const selectedOption = this.data.options[res.tapIndex]
          this.setData({
            value: selectedOption.value,
            selectedText: selectedOption.text
          })
          this.triggerEvent('change', {
            value: selectedOption.value,
            text: selectedOption.text
          })
        }
      })
    }
  }
})
