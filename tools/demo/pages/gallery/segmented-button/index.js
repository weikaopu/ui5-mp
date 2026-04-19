Page({
  data: {
    viewMode: 'day'
  },

  onViewChange(e) {
    const { key } = e.detail
    this.setData({ viewMode: key })

    // 模拟联动反馈
    wx.showToast({
      title: `Switched to ${key}`,
      icon: 'none',
      duration: 1000
    })
  }
})
