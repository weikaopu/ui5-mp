// https://ui5.github.io/webcomponents/components/CheckBox/ (Group logic)
const baseBehavior = require('../behaviors/base-behavior')
const ValueState = require('../behaviors/ValueState')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  relations: {
    '../ui5-checkbox/index': {
      type: 'child',
      linked(child) {
        this._syncChild(child)
      }
    }
  },
  behaviors: [baseBehavior, ValueState],
  properties: {
    label: String,
    value: {
      type: Array,
      value: []
    },
    layout: {
      type: String,
      value: 'Column' // 默认垂直排列
    },
    disabled: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    },
    required: {
      type: Boolean,
      value: false
    },
    accessibleName: {
      type: String,
      value: ''
    }
  },
  observers: {
    'value, disabled, readonly, valueState, required': function () {
      const children = this.getRelationNodes('../ui5-checkbox/index')
      children.forEach(child => this._syncChild(child))
    }
  },
  methods: {
    _syncChild(child) {
      const { value, disabled, readonly, valueState, required } = this.data
      child.setData({
        checked: value.includes(child.data.value),
        disabled: disabled || child.data.disabled,
        readonly: readonly || child.data.readonly,
        required: required || child.data.required,
        valueState: valueState === 'None' ? child.data.valueState : valueState
      })
    },
    selectAll() {
      const children = this.getRelationNodes('../ui5-checkbox/index')
      const allValues = children.map(child => child.data.value).filter(v => v !== undefined)
      this.setData({ value: allValues })
      this.triggerEvent('change', { value: allValues })
    },
    deselectAll() {
      this.setData({ value: [] })
      this.triggerEvent('change', { value: [] })
    },
    // 页面调用此方法或在子组件 change 时触发
    onCheckboxChange(e) {
      const { value, checked } = e.detail
      let newValue = [...(this.data.value || [])]

      if (checked) {
        if (!newValue.includes(value)) newValue.push(value)
      } else {
        newValue = newValue.filter(v => v !== value)
      }

      this.setData({ value: newValue })
      this.triggerEvent('change', { value: newValue })
    }
  }
})
