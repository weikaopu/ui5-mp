// https://ui5.github.io/webcomponents/components/CheckBox/
const ValueState = require('../behaviors/ValueState')
const baseBehavior = require('../behaviors/base-behavior')
const textBehavior = require('../behaviors/text-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [ValueState, baseBehavior, textBehavior],
  relations: {
    '../ui5-checkbox-group/index': {
      type: 'parent'
    }
  },
  properties: {
    checked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    indeterminate: {
      type: Boolean,
      value: false,
    },
    readonly: {
      type: Boolean,
      value: false,
    },
    required: {
      type: Boolean,
      value: false,
    },
    text: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    accessibleName: {
      type: String,
      value: '',
    }
  },
  data: {
    _ariaChecked: 'false'
  },
  observers: {
    value() {
      const parent = this.getRelationNodes('../ui5-checkbox-group/index')[0]
      if (parent) {
        parent._syncChild(this)
      }
    },
    'checked, indeterminate': function (checked, indeterminate) {
      let state = 'false'
      if (indeterminate) {
        state = 'mixed'
      } else if (checked) {
        state = 'true'
      }
      this.setData({ _ariaChecked: state })
    }
  },
  methods: {
    onTap() {
      if (this.data.disabled || this.data.readonly) return

      const newChecked = !this.data.checked

      const parent = this.getRelationNodes('../ui5-checkbox-group/index')[0]
      if (parent) {
        // 如果在 Group 中，交由 Group 处理逻辑和状态同步
        parent.onCheckboxChange({
          detail: { value: this.data.value, checked: newChecked }
        })
      } else {
        this.setData({
          checked: newChecked,
          indeterminate: false
        })
      }

      this.triggerEvent('change', {
        checked: newChecked,
        value: this.data.value
      })
    }
  }
})
