Page({
  data: {
  },

  // 演示 MessageStrip 关闭回调
  onStripClose() {
    wx.showToast({
      title: 'Strip Closed',
      icon: 'none'
    })
  }
})
