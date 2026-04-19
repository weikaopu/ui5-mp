Component({
  properties: {
    min: { type: Number, value: 0 },
    max: { type: Number, value: 100 },
    step: { type: Number, value: 1 },
    value: { type: Number, value: 0 },
    disabled: { type: Boolean, value: false },
    showTooltip: { type: Boolean, value: true },
    showLabels: { type: Boolean, value: true },
    showTickmarks: { type: Boolean, value: false },
    labelStep: { type: Number, value: 0 } // 若为0，则默认使用 step
  },

  data: {
    progress: 0,
    currentValue: 0,
    ticks: [], // 存储百分比数组
    isDragging: false,
    sliderWidth: 0,
    sliderLeft: 0
  },

  observers: {
    // 监听范围变化时重新生成刻度
    'min, max, step, showTickmarks': function () {
      if (this.properties.showTickmarks) {
        this.generateTicks()
      }
    },
    'value': function (newVal) {
      this.setData({
        currentValue: newVal,
        progress: this.calculateProgress(newVal)
      })
    }
  },

  lifetimes: {
    attached() {
      wx.nextTick(() => {
        this.initSlider()
        if (this.properties.showTickmarks) this.generateTicks()
      })
    }
  },

  methods: {
    generateTicks() {
      const { min, max, step, labelStep } = this.properties
      const interval = labelStep > 0 ? labelStep : step
      const ticks = []

      // 防止 step 为 0 导致死循环
      if (interval <= 0) return

      for (let i = min; i <= max; i += interval) {
        ticks.push(this.calculateProgress(i))
      }

      // 确保包含最后一个点
      if ((max - min) % interval !== 0) {
        ticks.push(100)
      }

      this.setData({ ticks })
    },

    initSlider() {
      const query = this.createSelectorQuery()
      query.select('#slider-track').boundingClientRect(rect => {
        if (rect) {
          this.setData({
            sliderWidth: rect.width,
            sliderLeft: rect.left,
            currentValue: this.properties.value,
            progress: this.calculateProgress(this.properties.value)
          })
        }
      }).exec()
    },

    calculateProgress(value) {
      const { min, max } = this.properties
      if (max === min) return 0
      return ((value - min) / (max - min)) * 100
    },

    updateValueByTouch(touch) {
      if (this.properties.disabled) return
      const clientX = touch.clientX || (touch.touches && touch.touches[0].clientX)
      const deltaX = clientX - this.data.sliderLeft
      const percentage = Math.max(0, Math.min(1, deltaX / this.data.sliderWidth))

      const rawValue = this.properties.min + percentage *
        (this.properties.max - this.properties.min)
      let steppedValue = Math.round(rawValue / this.properties.step) * this.properties.step

      // 限制范围
      steppedValue = Math.max(this.properties.min, Math.min(this.properties.max, steppedValue))

      this.setData({
        currentValue: steppedValue,
        progress: this.calculateProgress(steppedValue)
      })

      this.triggerEvent('change', { value: steppedValue })
    },

    onTouchStart(e) {
      this.setData({ isDragging: true })
      this.updateValueByTouch(e.touches[0])
    },

    onTouchMove(e) {
      this.updateValueByTouch(e.touches[0])
    },

    onTouchEnd() {
      this.setData({ isDragging: false })
      this.triggerEvent('finished', { value: this.data.currentValue })
    }
  }
})
