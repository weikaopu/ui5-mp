// https://ui5.github.io/webcomponents/components/RadioButton/
const baseBehavior = require('../behaviors/base-behavior')
const textBehavior = require('../behaviors/text-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior, textBehavior],
  relations: {
    '../ui5-radio-button-group/index': {
      type: 'parent'
    }
  },
  properties: {
    /**
     * 定义单选按钮旁显示的文本。
     */
    text: {
      type: String,
      value: ''
    },
    /**
     * 定义组件是否被选中。
     */
    checked: {
      type: Boolean,
      value: false
    },
    /**
     * 定义组件的名称。用于在 RadioButtonGroup 中进行分组。
     */
    name: {
      type: String,
      value: ''
    },
    /**
     * 定义组件在选中时发送给服务器的值。
     */
    value: {
      type: String,
      value: ''
    },
    /**
     * 定义组件的值状态。可选值: "None", "Error", "Warning", "Success", "Information"。
     */
    valueState: {
      type: String,
      value: 'None'
    },
    /**
     * 定义组件是否为只读。
     */
    readonly: {
      type: Boolean,
      value: false
    },
    /**
     * 定义组件是否为必填。如果是，则会在标签后面显示一个星号。
     */
    required: {
      type: Boolean,
      value: false
    },
    /**
     * 定义组件的可访问名称。
     */
    accessibleName: {
      type: String,
      value: ''
    }
  },
  data: {
    _ariaChecked: 'false'
  },
  observers: {
    value() {
      const parent = this.getRelationNodes('../ui5-radio-button-group/index')[0]
      if (parent) {
        parent._updateChild(this)
      }
    },
    checked(checked) {
      this.setData({
        _ariaChecked: checked ? 'true' : 'false'
      })
    }
  },
  methods: {
    _handleTap() {
      if (this.data.disabled || this.data.readonly || this.data.checked) {
        return
      }

      const parent = this.getRelationNodes('../ui5-radio-button-group/index')[0]
      if (parent) {
        parent._handleChildChange(this.data.value)
      } else {
        this.setData({ checked: true })
      }

      this.triggerEvent('change', {
        checked: true,
        value: this.data.value
      })
    }
  }
})
