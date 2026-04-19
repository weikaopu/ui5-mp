Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
    styleIsolation: 'apply-shared'
  },
  properties: {
    visible: Boolean,
    headerText: { type: String, value: 'Message' }
  },
  methods: {
    onMaskTap() {
      // 默认点击遮罩不关闭，除非业务需要
      this.triggerEvent('maskClick')
    },
    close() {
      this.setData({ visible: false })
    }
  }
})
