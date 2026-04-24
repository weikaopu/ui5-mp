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
        information: 'sap-icon://message-information',
        success: 'sap-icon://message-success',
        warning: 'sap-icon://message-warning',
        error: 'sap-icon://message-error'
      }
      this.setData({ typeIcon: iconMap[type] || 'sap-icon://message-information' })
    },
    onClose() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    }
  }
})
