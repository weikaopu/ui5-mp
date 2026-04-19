Component({
  relations: {
    '../ui5-segmented-button-item/index': { type: 'child' }
  },
  properties: {
    selectedKey: {
      type: String,
      observer(newKey) { this._updateChildren(newKey) }
    }
  },
  methods: {
    handleSelect(key) {
      this.setData({ selectedKey: key })
      this.triggerEvent('change', { key })
      this._updateChildren(key)
    },
    _updateChildren(key) {
      const nodes = this.getRelationNodes('../ui5-segmented-button-item/index')
      nodes.forEach(node => {
        node.setSelection(node.data.key === key)
      })
    }
  },
  lifetimes: {
    ready() { this._updateChildren(this.data.selectedKey) }
  }
})
