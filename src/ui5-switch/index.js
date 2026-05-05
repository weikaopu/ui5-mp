const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义组件是否选中。
     */
    checked: {
      type: Boolean,
      value: false
    },
    /**
     * 定义组件是否禁用。
     */
    disabled: {
      type: Boolean,
      value: false
    },
    /**
     * 定义组件设计模式：'Textual' (默认) 或 'Graphical'。
     */
    design: {
      type: String,
      value: 'Textual'
    },
    accessibleName: {
      type: String,
      value: ''
    },
    /**
     * 开启状态显示的文本。
     */
    textOn: {
      type: String,
      value: ''
    },
    /**
     * 关闭状态显示的文本。
     */
    textOff: {
      type: String,
      value: ''
    }
  },
  methods: {
    _onTap() {
      if (this.properties.disabled) return
      const newValue = !this.properties.checked
      this.setData({ checked: newValue })
      this.triggerEvent('change', { checked: newValue })
    }
  }
})
