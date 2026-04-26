// 移动端无法自动显示 title 属性。为了保持 UI5 的体验，引入 tooltip-behavior 来支持长按显示提示信息。
module.exports = Behavior({
  options: {
    // 允许 Behavior 或组件接收符合此正则的 data 字段为纯数据
    pureDataPattern: /^_/
  },
  properties: {
    // 对应 UI5 的 title 或自定义的 tooltip 内容
    tooltip: {
      type: String,
      value: '',
    }
  },
  data: {
    // 注意：这里的变量名不能以下划线开头，否则会被 pureDataPattern 拦截导致 WXML 无法获取
    tooltipVisible: false,
    tooltipPosition: {
      top: 0,
      left: 0
    }
  },
  methods: {
    /**
     * 显示 Tooltip 的通用方法
     * 建议在组件 WXML 中绑定 bindlongpress="openTooltip"
     */
    openTooltip() {
      if (!this.data.tooltip) return

      wx.vibrateShort({ type: 'light' }) // 增加触发反馈

      const query = wx.createSelectorQuery().in(this)
      // 获取组件根节点的位置（假设组件根节点带有相应的类名）
      query.select('.ui5-mp-root').boundingClientRect((res) => {
        if (!res) return

        // 计算 Tooltip 应该出现的位置（默认显示在组件正下方）
        const top = res.bottom + 8
        const left = res.left + (res.width / 2)

        this.setData({
          tooltipVisible: true,
          tooltipPosition: { top, left }
        })

        setTimeout(() => {
          this.closeTooltip()
        }, 3000)
      }).exec()
    },

    /**
     * 隐藏 Tooltip
     */
    closeTooltip() {
      this.setData({ tooltipVisible: false })
    }
  }
})
