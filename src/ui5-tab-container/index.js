Component({
  relations: {
    '../ui5-tab/index': {
      type: 'child',
      linked() { this._updateItems() }
    }
  },
  properties: {
    currentKey: String
  },
  data: {
    items: []
  },
  lifetimes: {
    ready() {
      // 核心修复：组件准备就绪后，手动触发一次显示逻辑
      const { currentKey, items } = this.data
      const targetKey = currentKey || (items.length > 0 ? items[0].key : null)

      if (targetKey) {
        this.setData({ currentKey: targetKey })
        this._showSelectedTab(targetKey)
      }
    }
  },
  methods: {
    _updateItems() {
      const nodes = this.getRelationNodes('../ui5-tab/index')
      const items = nodes.map(node => ({
        key: node.data.key,
        text: node.data.text,
        icon: node.data.icon
      }))
      this.setData({ items })
      // 默认选中第一个
      if (!this.data.currentKey && items.length > 0) {
        this.setData({ currentKey: items[0].key })
      }
    },
    onTabTap(e) {
      const { key } = e.currentTarget.dataset
      this.setData({ currentKey: key })
      this.triggerEvent('change', { key })
      // 通知子组件更新显示状态
      this._showSelectedTab(key)
    },
    _showSelectedTab(key) {
      const nodes = this.getRelationNodes('../ui5-tab/index')
      nodes.forEach(node => node.toggle(node.data.key === key))
    }
  }
})
