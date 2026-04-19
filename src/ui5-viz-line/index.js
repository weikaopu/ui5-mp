Component({
  properties: {
    title: String,
    // 数据格式：[{ name: 'Revenue', data: [...] }, { name: 'Cost', data: [...] }]
    series: { type: Array, value: [] },
    colorPalette: {
      type: Array,
      value: ['#5899da', '#e8743b', '#19a979', '#ed4a7b', '#945ecf']
    },
    showLegend: { type: Boolean, value: true } // 是否显示图例
  },

  data: {
    tooltip: { show: false, x: 0, y: 0, label: '', items: [] }
  },

  observers: {
    'series': function (newVal) {
      if (newVal && this.ctx) this.render()
    }
  },

  lifetimes: {
    ready() { this.initCanvas() }
  },

  methods: {
    initCanvas() {
      const query = this.createSelectorQuery().in(this)
      query.select('#lineChart').fields({ node: true, size: true }).exec((res) => {
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
      const series = this.properties.series
      if (!series || series.length === 0) return

      const padding = { top: 40, right: 30, bottom: 40, left: 50 }
      const drawW = chartSize.w - padding.left - padding.right
      const drawH = chartSize.h - padding.top - padding.bottom
      ctx.clearRect(0, 0, chartSize.w, chartSize.h)

      // 1. 计算所有序列的最大值
      const allValues = []
      series.forEach(s => s.data.forEach(d => allValues.push(d.value)))
      const maxVal = Math.max(...allValues, 1)
      const niceMax = Math.ceil(maxVal / 100) * 100

      // 2. 绘制网格背景
      ctx.strokeStyle = '#f0f0f0'
      ctx.lineWidth = 1
      ctx.fillStyle = '#6a6d70'
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'right'
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + drawH - (i * (drawH / 4))
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(padding.left + drawW, y)
        ctx.stroke()
        ctx.fillText(((niceMax / 4) * i).toString(), padding.left - 10, y + 4)
      }

      this.allSeriesPoints = []

      // 3. 循环绘制每一条线
      series.forEach((s, sIndex) => {
        const color = this.properties.colorPalette[sIndex % this.properties.colorPalette.length]
        const points = s.data.map((item, i) => Object.assign({
          x: padding.left + (i * (drawW / (s.data.length - 1))),
          y: padding.top + drawH - (item.value / niceMax * drawH),
          seriesName: s.name
        }, item))


        this.allSeriesPoints.push(points)

        // 绘制线条
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        ctx.stroke()

        // 绘制数据点
        points.forEach(p => {
          ctx.beginPath()
          ctx.fillStyle = '#ffffff'
          ctx.strokeStyle = color
          ctx.lineWidth = 2
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        })

        // 仅在第一个序列绘制 X 轴标签
        if (sIndex === 0) {
          ctx.fillStyle = '#6a6d70'
          ctx.textAlign = 'center'
          points.forEach(p => ctx.fillText(p.name, p.x, padding.top + drawH + 20))
        }
      })
    },

    handleTouch(e) {
      const touch = e.touches[0]
      const query = this.createSelectorQuery().in(this)
      query.select('#lineChart').boundingClientRect(rect => {
        const touchX = touch.clientX - rect.left

        // 寻找 X 轴上最近的索引
        const firstSeries = this.allSeriesPoints[0]
        const closestIndex = firstSeries.reduce(
          // eslint-disable-next-line no-confusing-arrow, no-multi-spaces, max-len
          (prevIdx, curr, currIdx) => Math.abs(curr.x - touchX) < Math.abs(firstSeries[prevIdx].x - touchX) ? currIdx : prevIdx, 0
        )

        // 获取该索引下所有线的数据
        const tooltipItems = this.allSeriesPoints.map((sPoints, idx) => ({
          name: sPoints[closestIndex].seriesName,
          value: sPoints[closestIndex].value,
          color: this.properties.colorPalette[idx % this.properties.colorPalette.length]
        }))

        const refPoint = firstSeries[closestIndex]
        this.setData({
          tooltip: {
            show: true,
            x: refPoint.x,
            y: refPoint.y,
            label: refPoint.name,
            items: tooltipItems
          }
        })
      }).exec()
    },

    handleHideTooltip() {
      setTimeout(() => this.setData({ 'tooltip.show': false }), 2000)
    }
  }
})
