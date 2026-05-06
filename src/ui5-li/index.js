// https://ui5.github.io/webcomponents/components/StandardListItem/
const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  relations: {
    '../ui5-list/index': {
      type: 'parent'
    }
  },
  properties: {
    /**
     * 定义列表项显示的主文本。
     */
    text: String,
    /**
     * 定义列表项显示的副文本（描述）。
     */
    description: String,
    /**
     * 定义列表项末尾显示的附加文本。
     */
    additionalText: String,
    /**
     * 定义列表项的图标。
     */
    icon: String,
    /**
     * 定义列表项的类型。可选值: "Active", "Inactive", "Detail", "Navigation"。
     */
    type: {
      type: String,
      value: 'Inactive'
    },
    /**
     * 定义列表项是否被选中。
     */
    selected: {
      type: Boolean,
      value: false
    },
    /**
     * 内部属性：由父级 ui5-list 维护的模式 (None, SingleSelect, MultiSelect, Delete)
     */
    _mode: {
      type: String,
      value: 'None'
    }
  },
  data: {
    _isNavigated: false
  },
  methods: {
    _handleTap() {
      if (this.data.disabled) return

      const parent = this.getRelationNodes('../ui5-list/index')[0]
      if (parent) {
        parent._handleItemClick(this)
      }

      this.triggerEvent('item-click', {
        item: this,
        text: this.data.text
      })
    },
    _handleDetailClick() {
      this.triggerEvent('detail-click', {
        item: this
      })
    }
  }
})
