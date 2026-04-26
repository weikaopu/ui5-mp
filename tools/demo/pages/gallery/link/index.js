Page({
  data: {
    // 可以在这里 mock 动态链接或状态
  },

  onLinkClick() {
    wx.showToast({
      title: 'Link Clicked',
      icon: 'none'
    })
  }
})
