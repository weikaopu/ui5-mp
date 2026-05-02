// https://ui5.github.io/webcomponents/components/RadioButton/
const baseBehavior = require('../behaviors/base-behavior')
const ValueState = require('../behaviors/ValueState')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior, ValueState],
  properties: {
    /**
     * 定义群组的标签文本。
     */
    label: String,
    /**
     * 定义组件的名称。
     */
    name: {
      type: String,
      value: ''
    },
    /**
     * 定义选中的值。
     */
    value: {
      type: String,
      value: ''
    },
    /**
     * 定义组件是否为只读。
     */
    readonly: {
      type: Boolean,
      value: false
    },
    /**
     * 定义排列布局。可选值: "Column" (默认), "Row"。
     */
    layout: {
      type: String,
      value: 'Column'
    },
    /**
     * 定义组件的可访问名称。
     */
    accessibleName: {
      type: String,
      value: ''
    }
  },
  observers: {
    'disabled, readonly, valueState, name, value': function () {
      const children = this.getRelationNodes('../ui5-radio-button/index')
      children.forEach(child => this._updateChild(child))
    }
  },
  relations: {
    '../ui5-radio-button/index': {
      type: 'child',
      linked(child) {
        this._updateChild(child)
      }
    }
  },
  methods: {
    _updateChild(child) {
      const { disabled, readonly, valueState, name, value } = this.data
      child.setData({
        checked: child.data.value === value,
        // 组状态覆盖或合并子项状态
        disabled: disabled || child.data.disabled,
        readonly: readonly || child.data.readonly,
        valueState: valueState === 'None' ? child.data.valueState : valueState,
        name: name || child.data.name
      })
    },
    _handleChildChange(selectedValue) {
      this.setData({ value: selectedValue })
      this.triggerEvent('change', {
        selected: selectedValue
      })
    }
  }
})
