// https://ui5.github.io/webcomponents/components/Label/
const baseBehavior = require('../behaviors/base-behavior')
const textBehavior = require('../behaviors/text-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
  },
  behaviors: [baseBehavior, textBehavior],
  properties: {
    /**
     * 定义标签是否为必填项。如果是，则会在标签后面显示一个星号。
     */
    required: {
      type: Boolean,
      value: false,
    },
    /**
     * 定义是否在标签文本后显示冒号。
     */
    showColon: {
      type: Boolean,
      value: false,
    }
  },
  data: {},
  methods: {}
})
