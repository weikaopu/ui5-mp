Page({
  data: {
    activeTab: 'info'
  },

  onTabChange(e) {
    const { key } = e.detail
    console.log('Active Tab switched to:', key)

    // 可以在切换时触发加载提示
    if (key === 'attachments') {
      wx.showToast({
        title: 'Loading files...',
        icon: 'none',
        duration: 800
      })
    }
  }
})
