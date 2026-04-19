Component({
  options: {
    multipleSlots: true, // 启用多插槽支持
    addGlobalClass: true
  },
  properties: {
    title: {
      type: String,
      value: 'SAP Fiori'
    },
    logo: {
      type: String,
      value: '' // 传入图片路径
    }
  },
  data: {
    showBack: false,
    navBarHeight: 44, // 默认导航栏内容高度
  },
  lifetimes: {
    attached() {
      const menuButton = wx.getMenuButtonBoundingClientRect()
      const windowInfo = wx.getWindowInfo()
      const pages = getCurrentPages() // 获取当前页面栈

      this.setData({
        safePaddingTop: windowInfo.statusBarHeight,
        // 计算整个导航栏的高度，确保和右侧胶囊对齐
        // 公式：(胶囊顶部距离 - 状态栏高度) * 2 + 胶囊高度
        navBarHeight: (menuButton.top - windowInfo.statusBarHeight) * 2 + menuButton.height,
        navRightGap: windowInfo.windowWidth - menuButton.left,
        // 如果页面栈大于1，说明是从别的页面跳过来的，显示返回键
        showBack: pages.length > 1
      })
    }
  },
  methods: {
    onBackTap() {
      wx.navigateBack({
        delta: 1,
        fail: () => {
          // 如果返回失败（比如直接进的这一页），可以尝试回首页
          wx.reLaunch({ url: '/pages/index/index' })
        }
      })
      this.triggerEvent('back')
    }
  }
})
