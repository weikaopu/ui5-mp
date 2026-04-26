Page({
  data: {
    isBusy: false,
    isFullScreenBusy: false,
    delayBusy: false
  },

  toggleBusy() {
    this.setData({
      isBusy: !this.data.isBusy
    })
  },

  showFullScreen() {
    this.setData({ isFullScreenBusy: true })
    setTimeout(() => {
      this.setData({ isFullScreenBusy: false })
    }, 3000)
  },

  toggleDelayBusy() {
    this.setData({
      delayBusy: !this.data.delayBusy
    })
  }
})
