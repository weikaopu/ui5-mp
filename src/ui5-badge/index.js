// https://ui5.github.io/webcomponents/components/Badge/
const baseBehavior = require('../behaviors/base-behavior')
const tooltipBehavior = require('../behaviors/tooltip-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
  },
  behaviors: [baseBehavior, tooltipBehavior],
  properties: {
    /**
     * 定义角标内显示的图标名称。
     */
    icon: {
      type: String,
      value: '',
    },
    /**
     * 定义配色方案。可选值：1-10。
     */
    colorScheme: {
      type: Number,
      value: 1,
    }
  },
  methods: {
    _handleTap() {
      if (this.data.disabled) return
      this.triggerEvent('click')
    }
  }
})
