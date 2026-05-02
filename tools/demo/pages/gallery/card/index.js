Page({
  data: {
    isCardLoading: false
  },
  onCardPress() {
    wx.showToast({
      title: 'Card Clicked',
      icon: 'none'
    })
  },
  onHeaderPress() {
    wx.showToast({
      title: 'Header Clicked',
      icon: 'none'
    })
  },
  onToggleLoading() {
    if (this._timer) {
      clearTimeout(this._timer)
    }

    this.setData({ isCardLoading: !this.data.isCardLoading })
    this._timer = setTimeout(() => {
      this.setData({ isCardLoading: false })
    }, 3000)
  }
})
