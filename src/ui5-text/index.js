// https://ui5.github.io/webcomponents/components/Text/
const baseBehavior = require('../behaviors/base-behavior')
const tooltipBehavior = require('../behaviors/tooltip-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior, tooltipBehavior],
  properties: {
    /**
     * 定义文本是否应当换行。
     */
    wrapping: {
      type: Boolean,
      value: true
    },
    /**
     * 定义文本的最大行数（当 wrapping 为 true 时生效）。
     */
    maxLines: {
      type: Number,
      value: 0
    }
  }
})
