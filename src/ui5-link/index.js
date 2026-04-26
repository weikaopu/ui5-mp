// https://ui5.github.io/webcomponents/components/Link/
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
     * 定义链接的目标 URL。
     */
    href: {
      type: String,
      value: '',
    },
    /**
     * 定义链接的目标窗口。可选值：_self, _top, _blank, _parent。
     * 在小程序中，此属性主要用于逻辑参考，实际行为受小程序路由限制。
     */
    target: {
      type: String,
      value: '_self',
    },
    /**
     * 定义文字换行方式。可选值：None (截断), Normal (换行)。
     */
    wrappingType: {
      type: String,
      value: 'Normal',
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
      value: 'link',
    }
  },
  methods: {
    _handleTap() {
      if (this.data.disabled) return

      const { href } = this.data
      if (href) {
        const isExternal = href.startsWith('http')
        const url = isExternal ? `/pages/gallery/webview/index?url=${encodeURIComponent(href)}` : href
        wx.navigateTo({
          url,
          fail: () => {
            wx.switchTab({ url })
          }
        })
      }
      this.triggerEvent('click')
    }
  }
})
