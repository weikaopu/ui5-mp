Component({
  properties: {
    // 按钮类型: default, emphasized, transparent, negative
    type: {
      type: String,
      value: 'default'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onTap(e) {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('click', e.detail)
      }
    }
  }
})
