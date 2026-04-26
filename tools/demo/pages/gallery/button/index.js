Page({
  data: {
    loading: false
  },

  onButtonClick() {
    wx.showToast({
      title: 'Button Clicked',
      icon: 'none'
    })
  },

  onLoadingToggle() {
    this.setData({ loading: true })
    setTimeout(() => {
      this.setData({ loading: false })
    }, 2000)
  },

  onShareAppMessage() {
    return {
      title: 'UI5-MP Button Gallery'
    }
  }
})
