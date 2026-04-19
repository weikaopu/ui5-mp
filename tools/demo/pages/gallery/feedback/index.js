Page({
  data: {
    isGlobalLoading: false
  },

  // 演示全局 Loading
  triggerGlobalLoading() {
    this.setData({ isGlobalLoading: true })

    // 模拟异步操作，3秒后自动关闭
    setTimeout(() => {
      this.setData({ isGlobalLoading: false })
    }, 3000)
  },

  // 演示 Toast
  showToast() {
    const toast = this.selectComponent('#demoToast')
    if (toast) {
      toast.show()
    }
  },

  // 演示 MessageStrip 关闭回调
  onStripClose() {
    wx.showToast({
      title: 'Strip Closed',
      icon: 'none'
    })
  }
})
