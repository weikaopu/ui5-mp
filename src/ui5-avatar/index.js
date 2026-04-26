// https://ui5.github.io/webcomponents/components/Avatar/
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
     * 图像的源 URL。
     */
    src: { type: String, value: '' },
    /**
     * 头像显示的缩写（最多两个字符）。
     */
    initials: { type: String, value: '' },
    /**
     * 在没有 src 或 initials 时显示的图标名称。
     */
    icon: { type: String, value: '' },
    /**
     * 头像形状。可选值：Circle, Square。
     */
    shape: { type: String, value: 'Circle' },
    /**
     * 头像尺寸。可选值：XS, S, M, L, XL。
     */
    size: { type: String, value: 'S' },
    /**
     * 定义头像是否可交互。
     */
    interactive: { type: Boolean, value: false }
  },
  methods: {
    _handleTap() {
      if (this.data.disabled || !this.data.interactive) return
      this.triggerEvent('click')
    }
  }
})
