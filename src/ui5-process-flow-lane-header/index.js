const baseBehavior = require('../behaviors/base-behavior')

const STATE_COLORS = {
  Positive: '#107e3e',
  Negative: '#bb0000',
  Critical: '#e9730c',
  Information: '#0a6ed1',
  Neutral: '#6a6d70'
}

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 泳道标题
     */
    title: String,
    /**
     * 泳道图标
     */
    icon: String,
    /**
     * 泳道状态：Positive, Negative, Critical, Neutral
     */
    state: {
      type: String,
      value: 'Neutral'
    },
    /**
     * 是否显示焦点
     */
    focused: {
      type: Boolean,
      value: false
    },
    /**
     * 状态分布统计
     * 格式: [{ state: 'Positive', value: 10 }, { state: 'Negative', value: 2 }]
     */
    statistics: {
      type: Array,
      value: []
    }
  },
  data: {
    donutGradient: '',
    displayIcon: ''
  },
  observers: {
    'statistics, state, icon': function (statistics, state, icon) {
      let stats = statistics
      // 如果没有传入统计数据，则根据单体 state 兜底生成 100% 的环
      if (!stats || stats.length === 0) {
        stats = [{ state: state || 'Neutral', value: 1 }]
      }

      const total = stats.reduce((sum, item) => sum + (item.value || 0), 0)
      let currentPercent = 0
      const gradientParts = []

      stats.forEach(item => {
        const color = STATE_COLORS[item.state] || STATE_COLORS.Neutral
        const percent = (item.value / total) * 100
        gradientParts.push(`${color} ${currentPercent}% ${currentPercent + percent}%`)
        currentPercent += percent
      })

      let displayIcon = icon || ''
      if (displayIcon.indexOf('sap-icon://') === 0) {
        displayIcon = displayIcon.replace('sap-icon://', '')
      }

      this.setData({
        donutGradient: `conic-gradient(${gradientParts.join(', ')})`,
        displayIcon
      })
    }
  },
  methods: {
    _onHeaderTap() {
      this.triggerEvent('click')
    }
  }
})
