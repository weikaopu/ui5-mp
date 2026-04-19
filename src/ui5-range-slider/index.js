Component({
  properties: {
    min: { type: Number, value: 0 },
    max: { type: Number, value: 100 },
    startValue: { type: Number, value: 20 },
    endValue: { type: Number, value: 80 },
    step: { type: Number, value: 1 },
    disabled: { type: Boolean, value: false },
    showTooltip: { type: Boolean, value: true },
    showLabels: { type: Boolean, value: true },
    showTickmarks: { type: Boolean, value: false }
  },
  data: {
    startProgress: 0,
    endProgress: 0,
    activeHandle: null, // 'start' or 'end'
    sliderWidth: 0,
    sliderLeft: 0,
    ticks: []
  },
  observers: {
    'startValue, endValue, min, max': function () { this.updateUI() },
    'showTickmarks': function (val) { if (val) this.generateTicks() }
  },
  lifetimes: {
    attached() {
      wx.createSelectorQuery().in(this).select('#range-track').boundingClientRect(rect => {
        this.setData({ sliderWidth: rect.width, sliderLeft: rect.left })
        this.updateUI()
      })
        .exec()
    }
  },
  methods: {
    updateUI() {
      const { startValue, endValue, min, max } = this.properties
      this.setData({
        startProgress: ((startValue - min) / (max - min)) * 100,
        endProgress: ((endValue - min) / (max - min)) * 100
      })
    },
    generateTicks() {
      const ticks = []
      for (let i = this.properties.min; i <= this.properties.max; i += this.properties.step) {
        ticks.push(((i - this.properties.min) / (this.properties.max - this.properties.min)) * 100)
      }
      this.setData({ ticks })
    },
    onTouchStart(e) {
      this.setData({ activeHandle: e.currentTarget.dataset.type })
    },
    onTouchMove(e) {
      if (this.properties.disabled) return
      const { min, max, step, startValue, endValue } = this.properties
      const clientX = e.touches[0].clientX
      const percentage = Math.max(0, Math.min(1,
        (clientX - this.data.sliderLeft) / this.data.sliderWidth))
      let val = Math.round((min + percentage * (max - min)) / step) * step

      if (this.data.activeHandle === 'start') {
        val = Math.min(val, endValue - step) // 不能超过右滑块
        this.triggerEvent('change', { startValue: val, endValue })
      } else {
        val = Math.max(val, startValue + step) // 不能低于左滑块
        this.triggerEvent('change', { startValue, endValue: val })
      }
    },
    onTouchEnd() {
      this.setData({ activeHandle: null })
    }
  }
})
