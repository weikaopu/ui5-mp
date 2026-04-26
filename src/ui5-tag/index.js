// https://ui5.github.io/webcomponents/components/Tag/
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
     * 定义标签是否可交互。
     */
    interactive: {
      type: Boolean,
      value: false,
    },
    /**
     * 定义文字换行方式。可选值：None (截断), Normal (换行)。
     */
    wrappingType: {
      type: String,
      value: 'Normal',
    },
    /**
     * 定义标签内显示的图标名称。
     */
    icon: {
      type: String,
      value: '',
    },
    /**
     * 定义标签的配色方案。可选值：1-20。
     */
    colorScheme: {
      type: Number,
      value: 0,
    }
  },
  methods: {
    _handleTap() {
      if (this.data.disabled || !this.data.interactive) return
      this.triggerEvent('click')
    }
  }
})
