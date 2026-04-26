Component({
  options: { addGlobalClass: true },
  properties: {
    // type 可选值: information, success, warning, error
    type: {
      type: String,
      value: 'information',
      observer(newVal) {
        this._updateIcon(newVal)
      }
    },
    hideCloseButton: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: true,
    typeIcon: 'information'
  },
  lifetimes: {
    attached() {
      this._updateIcon(this.data.type)
    }
  },
  methods: {
    _updateIcon(type) {
      const iconMap = {
        information: 'message-information',
        success: 'message-success',
        warning: 'message-warning',
        error: 'message-error'
      }
      this.setData({ typeIcon: iconMap[type] || 'message-information' })
    },
    onClose() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    }
  }
})
