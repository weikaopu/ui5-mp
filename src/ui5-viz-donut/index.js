Component({
  properties: {
    title: String,
    data: { type: Array, value: [] }, // [{name: 'A', value: 10}, ...]
    colorPalette: {
      type: Array,
      value: ['#5899da', '#e8743b', '#19a979', '#ed4a7b', '#945ecf']
    },
    showLegend: { type: Boolean, value: true },
    innerRadiusRatio: { type: Number, value: 0.65 } // 环中心孔径占比
  },

  data: {
    tooltip: { show: false, x: 0, y: 0, label: '', value: 0, percent: 0, color: '' }
  },

  observers: {
    'data': function (newVal) {
      if (newVal && this.ctx) this.render()
    }
  },

  lifetimes: {
    ready() { this.initCanvas() }
  },

  methods: {
    initCanvas() {
      const query = this.createSelectorQuery().in(this)
      query.select('#donutChart').fields({ node: true, size: true }).exec((res) => {
        if (!res) return
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        this.ctx = ctx
        this.chartSize = { w: res[0].width, h: res[0].height }
        this.render()
      })
    },

    render() {
      const { ctx, chartSize } = this
      const data = this.properties.data
      if (!data || data.length === 0) return

      const centerX = chartSize.w / 2
      const centerY = chartSize.h / 2
      const radius = Math.min(centerX, centerY) * 0.8
      const innerRadius = radius * this.properties.innerRadiusRatio

      ctx.clearRect(0, 0, chartSize.w, chartSize.h)

      const total = data.reduce((sum, item) => sum + item.value, 0)
      let currentAngle = -0.5 * Math.PI // 从正上方开始

      this.arcAreas = []

      data.forEach((item, i) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI
        const color = this.properties.colorPalette[i % this.properties.colorPalette.length]

        ctx.beginPath()
        // 绘制外弧
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
        // 绘制内弧（逆时针）
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()

        // 记录扇区角度信息用于点击检测
        this.arcAreas.push({
          startAngle: currentAngle,
          endAngle: currentAngle + sliceAngle,
          name: item.name,
          value: item.value,
          percent: ((item.value / total) * 100).toFixed(1),
          color
        })

        currentAngle += sliceAngle
      })

      // 记录圆心和半径信息
      this.chartMeta = { centerX, centerY, radius, innerRadius }
    },

    handleTouch(e) {
      if (!this.chartMeta) return
      const touch = e.touches[0]
      const query = this.createSelectorQuery().in(this)

      query.select('#donutChart').boundingClientRect(rect => {
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        const { centerX, centerY, radius, innerRadius } = this.chartMeta

        // 计算触点到圆心的距离
        const dx = x - centerX
        const dy = y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // 只有在环形区域内才触发
        if (distance >= innerRadius && distance <= radius) {
          // 计算角度 (atan2 返回 -PI 到 PI)，几何碰撞检测：通过 Math.atan2 和距离公式准确计算用户点击的是哪一个扇区
          let angle = Math.atan2(dy, dx)
          if (angle < -0.5 * Math.PI) angle += 2 * Math.PI // 映射到我们的起始坐标系，开始顺时针旋转，符合人类阅读图表的习惯。

          const target = this.arcAreas.find(a => angle >= a.startAngle && angle < a.endAngle)

          if (target) {
            this.setData({
              tooltip: {
                show: true,
                x,
                y,
                label: target.name,
                value: target.value,
                percent: target.percent,
                color: target.color
              }
            })
            // 2秒后自动隐藏
            setTimeout(() => this.setData({ 'tooltip.show': false }), 2000)
          }
        }
      }).exec()
    }
  }
})
