// https://ui5.github.io/webcomponents/components/Bar/
const baseBehavior = require('../behaviors/base-behavior')
const tooltipBehavior = require('../behaviors/tooltip-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  behaviors: [baseBehavior, tooltipBehavior],
  properties: {
    /**
     * 定义 Bar 的设计模式。
     * 可选值：Header, Subheader, Footer, FloatingFooter.
     * 默认值：Header
     */
    design: {
      type: String,
      value: 'Header',
    }
  }
})
