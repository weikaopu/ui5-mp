Component({
  properties: {
    title: String,
    data: { type: Array, value: [] },
    // 扩展：支持自定义调色盘，默认使用你定义的 SAP Viz Colors
    colorPalette: {
      type: Array,
      value: ['#5899da', '#e8743b', '#19a979', '#ed4a7b', '#945ecf']
    }
  },

  data: {
    tooltip: { show: false, x: 0, y: 0, label: '', value: '' }
  },

  observers: {
    'data': function (newData) {
      if (newData && this.ctx) this.render()
    }
  },

  lifetimes: {
    ready() { this.initCanvas() }
  },

  methods: {
    initCanvas() {
      const query = this.createSelectorQuery().in(this)
      query.select('#columnChart').fields({ node: true, size: true }).exec((res) => {
        if (!res[0]) return
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

      const padding = { top: 40, right: 20, bottom: 40, left: 50 }
      const drawW = chartSize.w - padding.left - padding.right
      const drawH = chartSize.h - padding.top - padding.bottom

      ctx.clearRect(0, 0, chartSize.w, chartSize.h)

      const maxVal = Math.max(...data.map(d => d.value), 1)
      const niceMax = Math.ceil(maxVal / 100) * 100 // 简单的刻度取整

      // --- 步骤 1: 先绘制背景刻度线 (修复：确保在柱子后面) ---
      ctx.strokeStyle = '#f0f0f0' // --sap-viz-grid-line
      ctx.lineWidth = 1
      ctx.fillStyle = '#6a6d70' // --sap-viz-axis-label
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'right'

      const split = 4
      for (let i = 0; i <= split; i++) {
        const val = (niceMax / split) * i
        const y = padding.top + drawH - (i * (drawH / split))

        // 画线
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(padding.left + drawW, y)
        ctx.stroke()

        // 画 Y 轴数值
        ctx.fillText(val.toString(), padding.left - 10, y + 4)
      }

      // --- 步骤 2: 绘制柱子 ---
      const barW = (drawW / data.length) * 0.6
      const space = (drawW / data.length) * 0.4
      this.barAreas = []

      data.forEach((item, i) => {
        const x = padding.left + (i * (barW + space)) + space / 2
        const h = (item.value / niceMax) * drawH
        const y = padding.top + drawH - h

        // 使用调色盘颜色
        ctx.fillStyle = this.properties.colorPalette[i % this.properties.colorPalette.length]

        // 绘制柱体
        ctx.beginPath()
        ctx.rect(x, y, barW, h) // 改为标准矩形，解决切断感
        ctx.fill()

        // 柱顶数值展示 (VizFrame 特色)
        ctx.fillStyle = '#32363a'
        ctx.textAlign = 'center'
        ctx.fillText(item.value.toString(), x + barW / 2, y - 8)

        // X 轴标签
        ctx.fillStyle = '#6a6d70'
        ctx.fillText(item.name, x + barW / 2, padding.top + drawH + 20)

        // this.barAreas.push({ x, y, w: barW, h, ...item })
        this.barAreas.push(Object.assign({ x, y, w: barW, h }, item))
      })
    },

    // 交互逻辑保持不变...
    handleTouch(e) {
      const touch = e.touches
      const query = this.createSelectorQuery().in(this)
      query.select('#columnChart').boundingClientRect(rect => {
        const touchX = touch.clientX - rect.left
        const target = this.barAreas.find(a => touchX >= a.x - 5 && touchX <= a.x + a.w + 5)
        if (target) {
          this.setData({
            tooltip: {
              show: true,
              x: target.x + target.w / 2,
              y: target.y,
              label: target.name,
              value: target.value
            }
          })
        }
      }).exec()
    },
    handleHideTooltip() {
      setTimeout(() => this.setData({ 'tooltip.show': false }), 1500)
    }
  }
})
