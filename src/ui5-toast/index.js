Component({
  options: { addGlobalClass: true },
  properties: {
    // 显示时长（毫秒）
    duration: {
      type: Number,
      value: 3000
    }
  },
  data: {
    visible: false
  },
  methods: {
    // 供外部调用的显示方法
    show() {
      if (this._timer) clearTimeout(this._timer)

      this.setData({ visible: true })

      this._timer = setTimeout(() => {
        this.setData({ visible: false })
        this.triggerEvent('close')
      }, this.data.duration)
    }
  }
})
