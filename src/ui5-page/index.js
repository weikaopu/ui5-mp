// https://ui5.github.io/webcomponents/components/fiori/Page/

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
    styleIsolation: 'apply-shared' // 关键：允许样式影响插槽内的组件
  },
  properties: {
    floatingFooter: {
      type: Boolean,
      value: false
    },
    // 控制全屏加载状态
    busy: {
      type: Boolean,
      value: false
    },
    // 加载时显示的文本
    busyText: {
      type: String,
      value: 'Please wait...'
    }
  },
  data: {
    statusBarHeight: 0,
    navBarHeight: 44,
    totalHeaderHeight: 64
  },
  lifetimes: {
    attached() {
      const windowInfo = wx.getWindowInfo()
      const menuButton = wx.getMenuButtonBoundingClientRect()

      const sHeight = windowInfo.statusBarHeight
      // 导航栏高度 = (胶囊顶部 - 状态栏高度) * 2 + 胶囊高度
      const nHeight = (menuButton.top - sHeight) * 2 + menuButton.height

      this.setData({
        statusBarHeight: sHeight,
        navBarHeight: nHeight,
        totalHeaderHeight: sHeight + nHeight
      })
    }
  }
})
