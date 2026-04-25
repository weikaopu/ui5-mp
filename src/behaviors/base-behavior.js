module.exports = Behavior({
  properties: {
    // 对应 UI5 的 design 属性
    design: {
      type: String,
      value: 'Default', // Default, Emphasized, Transparent, Positive, Negative
    },
    // 对应 UI5 的 valueState / status
    status: {
      type: String,
      value: 'None', // None, Error, Warning, Success, Information
    },
    disabled: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    // 预计算的 CSS 类名，方便 WXML 直接使用
    _statusClass: '',
  },
  observers: {
    status(status) {
      const statusMap = {
        Error: 'ui5-text-error',
        Success: 'ui5-text-success',
        Warning: 'ui5-text-warning',
        Information: 'ui5-text-information'
      }
      this.setData({
        _statusClass: statusMap[status] || ''
      })
    }
  }
})
