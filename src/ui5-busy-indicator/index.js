const baseBehavior = require('../behaviors/base-behavior')

Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义忙碌指示器是否处于激活状态。
     */
    active: {
      type: Boolean,
      value: false
    },
    /**
     * 定义显示在指示器下方的说明文本。
     */
    text: {
      type: String,
      value: ''
    },
    /**
     * 定义指示器的大小。可选值：S, M, L。
     */
    size: {
      type: String,
      value: 'M' // S, M, L
    },
    /**
     * 定义是否以全屏遮罩模式显示。
     */
    fullScreen: {
      type: Boolean,
      value: false
    },
    /**
     * 定义显示延迟（毫秒）。
     * 当 active 变为 true 后，延迟指定时间再显示指示器，以减少短时间异步任务引起的闪烁。
     */
    delay: {
      type: Number,
      value: 1000
    }
  },
  data: {
    show: false
  },
  observers: {
    'active, delay': function (active, delay) {
      if (this._timer) {
        clearTimeout(this._timer)
      }

      if (active) {
        this._timer = setTimeout(() => {
          this.setData({ show: true })
        }, delay)
      } else {
        this.setData({ show: false })
      }
    }
  },
  lifetimes: {
    detached() {
      if (this._timer) clearTimeout(this._timer)
    }
  }
})
