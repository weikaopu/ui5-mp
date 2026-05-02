// https://ui5.github.io/webcomponents/components/Text/
const baseBehavior = require('../behaviors/base-behavior')
const tooltipBehavior = require('../behaviors/tooltip-behavior')
const textBehavior = require('../behaviors/text-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior, tooltipBehavior, textBehavior],
  properties: {
    wrappingType: {
      type: String,
      value: 'Normal' // Text 默认为 Normal，覆盖 Behavior 的 None
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
