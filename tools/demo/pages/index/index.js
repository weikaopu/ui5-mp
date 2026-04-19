Page({
  navTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/gallery/${url}/index`
    })
  }
})
