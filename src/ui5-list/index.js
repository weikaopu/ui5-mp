// https://ui5.github.io/webcomponents/components/List/
const baseBehavior = require('../behaviors/base-behavior')

Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  relations: {
    '../ui5-li/index': {
      type: 'child',
      linked(child) {
        this._updateChild(child)
      },
      moved(child) {
        this._updateChild(child)
      }
    }
  },
  properties: {
    headerText: String,
    footerText: String,
    noBorder: {
      type: Boolean,
      value: false
    },
    /**
     * 定义列表的选择模式。
     * 可选值: "None", "SingleSelect", "MultiSelect", "Delete"。
     */
    mode: {
      type: String,
      value: 'None'
    },
    /**
     * 在 SingleSelect 模式下，当前选中项的 value。
     */
    selectedKey: String,
    /**
     * 在 MultiSelect 模式下，当前选中项的 value 数组。
     */
    selectedKeys: {
      type: Array,
      value: []
    },
    /**
     * 列表的可访问名称。
     */
    accessibleName: String
  },
  observers: {
    'mode, selectedKey, selectedKeys': function () {
      this._updateChildren()
    }
  },
  methods: {
    _updateChildren() {
      const children = this.getRelationNodes('../ui5-li/index')
      children.forEach(child => this._updateChild(child))
    },
    _updateChild(child) {
      const { mode, selectedKey, selectedKeys, disabled } = this.data
      let isSelected = false

      if (mode === 'SingleSelect') {
        isSelected = (child.data.value === selectedKey)
      } else if (mode === 'MultiSelect') {
        isSelected = selectedKeys.includes(child.data.value)
      }

      child.setData({
        _mode: mode,
        selected: isSelected,
        disabled: disabled || child.data.disabled // 列表禁用会禁用所有子项
      })
    },
    _handleItemClick(itemComponent) {
      const { mode, selectedKey, selectedKeys } = this.data
      const itemValue = itemComponent.data.value
      let newSelectedKey = selectedKey
      let newSelectedKeys = [...selectedKeys]

      if (mode === 'SingleSelect') {
        newSelectedKey = (itemValue === selectedKey) ? '' : itemValue // 切换选中状态
        this.setData({ selectedKey: newSelectedKey })
        this.triggerEvent('selection-change', {
          selectedItem: newSelectedKey ? itemComponent : null
        })
      } else if (mode === 'MultiSelect') {
        if (newSelectedKeys.includes(itemValue)) {
          newSelectedKeys = newSelectedKeys.filter(key => key !== itemValue)
        } else {
          newSelectedKeys.push(itemValue)
        }
        this.setData({ selectedKeys: newSelectedKeys })
        this._updateChildren() // 强制更新所有子项的选中状态
        this.triggerEvent('selection-change', {
          selectedItems: this.getRelationNodes('../ui5-li/index').filter(li => newSelectedKeys.includes(li.data.value))
        })
      } else if (mode === 'Delete') {
        this.triggerEvent('item-delete', { item: itemComponent })
      }
    }
  }
})
