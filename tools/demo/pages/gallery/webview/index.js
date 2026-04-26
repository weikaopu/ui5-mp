Page({
  data: {
    url: ''
  },
  onLoad(options) {
    if (options.url) {
      // 对传入的 url 进行解码
      this.setData({ url: decodeURIComponent(options.url) })
    }
  }
})
