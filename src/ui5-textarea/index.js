Component({
  options: { addGlobalClass: true },
  properties: {
    label: String,
    value: { type: String, value: '' },
    placeholder: String,
    maxlength: { type: Number, value: 200 },
    showExceededText: Boolean,
    autoHeight: { type: Boolean, value: false },
    disabled: Boolean,
    readonly: Boolean,
    rows: { type: Number, value: 2 }, // 初始行数
    growing: { type: Boolean, value: false }, // 是否开启自动增长
    growingMaxLines: { type: Number, value: 0 }, // 最大行数，0 为无限制
    valueState: { type: String, value: 'None' },
    valueStateText: String
  },
  data: {
    isFocused: false,
    computedMinHeight: '42px',
    computedMaxHeight: 'none'
  },
  lifetimes: {
    attached() {
      this._calculateDimensions()
    }
  },
  methods: {
    _calculateDimensions() {
      const lineHeight = 21 // 对应 wxss 中的 line-height 1.5 * 14px
      const padding = 16 // 上下 padding 之和 (8px * 2)

      const minH = (this.data.rows * lineHeight) + padding
      let maxH = 'none'

      if (this.data.growing && this.data.growingMaxLines > 0) {
        maxH = (this.data.growingMaxLines * lineHeight) + padding + 'px'
      }

      this.setData({
        computedMinHeight: minH + 'px',
        computedMaxHeight: maxH
      })
    },
    onInput(e) {
      this.setData({ value: e.detail.value })
      this.triggerEvent('change', { value: e.detail.value })
    },
    onFocus() { this.setData({ isFocused: true }) },
    onBlur() { this.setData({ isFocused: false }) }
  }
})
