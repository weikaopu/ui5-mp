// https://ui5.github.io/webcomponents/components/Button/
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
     * 定义按钮是否处于忙碌/加载状态。
     */
    loading: {
      type: Boolean,
      value: false
    },
    /**
     * 定义按钮内显示的图标名称。
     */
    icon: {
      type: String,
      value: '',
    },
    /**
     * 定义图标是否显示在文字后面。
     */
    iconEnd: {
      type: Boolean,
      value: false,
    },
    /**
     * 辅助功能名称。
     */
    accessibleName: {
      type: String,
      value: '',
    },
    /**
     * 辅助功能角色。
     */
    accessibleRole: {
      type: String,
      value: 'button',
    },
    /**
     * 微信小程序特有：开放能力。
     */
    openType: {
      type: String,
      value: '',
    },
    /**
     * 微信小程序特有：用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件。
     */
    formType: {
      type: String,
      value: '',
    }
  },
  methods: {
    _handleTap(e) {
      if (this.data.disabled || this.data.loading) return
      // 开启 bubbles 和 composed 确保事件能穿越 slot 边界到达页面
      this.triggerEvent('click', e.detail, {
        bubbles: true,
        composed: true
      })
    },
    _handleGetUserInfo(e) { this.triggerEvent('getuserinfo', e.detail) },
    _handleContact(e) { this.triggerEvent('contact', e.detail) },
    _handleGetPhoneNumber(e) { this.triggerEvent('getphonenumber', e.detail) },
    _handleError(e) { this.triggerEvent('error', e.detail) },
    _handleOpenSetting(e) { this.triggerEvent('opensetting', e.detail) },
    _handleLaunchApp(e) { this.triggerEvent('launchapp', e.detail) }
  }
})
