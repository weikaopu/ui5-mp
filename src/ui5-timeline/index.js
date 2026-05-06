// https://ui5.github.io/webcomponents/components/Timeline/
const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义组件的辅助功能名称
     */
    accessibleName: {
      type: String,
      value: ''
    },
    /**
     * 定義時間軸的佈局方向
     * 可選值: Vertical, Horizontal
     */
    layout: {
      type: String,
      value: 'Vertical'
    },
    /**
     * 定义是否支持加载更多。
     * 可选值: None (默认), Button
     */
    growing: {
      type: String,
      value: 'None'
    },
    /**
     * 定义加载更多按钮的文本内容。
     */
    growingButtonText: {
      type: String,
      value: 'More'
    },
    /**
     * 定义组件是否处于加载状态。
     */
    loading: {
      type: Boolean,
      value: false
    },
    /**
     * 定义显示加载指示器之前的延迟（以毫秒为单位）。
     */
    loadingDelay: {
      type: Number,
      value: 1000
    }
  },
  data: {
    _showStartMask: false,
    _showEndMask: true
  },
  lifetimes: {
    ready() {
      // 初始化时检查是否需要显示结束遮罩
      if (this.properties.layout === 'Horizontal') {
        this._updateMaskState()
      }
    }
  },
  methods: {
    _onLoadMore() {
      this.triggerEvent('load-more')
    },
    _onScroll(e) {
      if (this.properties.layout !== 'Horizontal') return
      const { scrollLeft, scrollWidth } = e.detail

      this.createSelectorQuery().select('.ui5-timeline').boundingClientRect(res => {
        if (!res) return
        const offsetWidth = res.width
        this.setData({
          _showStartMask: scrollLeft > 10,
          _showEndMask: scrollLeft < (scrollWidth - offsetWidth - 10)
        })
      }).exec()
    },
    _updateMaskState() {
      this.createSelectorQuery().select('.ui5-timeline').fields({
        scrollOffset: true,
        size: true,
        scrollWidth: true
      }, res => {
        if (!res) return
        const { scrollLeft, scrollWidth, width } = res
        this.setData({
          _showStartMask: scrollLeft > 10,
          _showEndMask: scrollLeft < (scrollWidth - width - 10)
        })
      }).exec()
    }
  }
})
