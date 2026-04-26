Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true
  },
  properties: {
    nodes: {
      type: Array,
      value: []
    },
    orientation: {
      type: String,
      value: 'Horizontal'
    },
    selectedKey: {
      type: String,
      value: ''
    },
    allowSelect: {
      type: Boolean,
      value: true
    }
  },
  data: {
    _nodes: [],
    _orientationClass: 'ui5-process-flow--horizontal'
  },
  observers: {
    'nodes, selectedKey, orientation': function (nodes = [], selectedKey, orientation) {
      const normalized = (nodes || []).map((item, index) => {
        const state = (item.state || '').toLowerCase()
        const completed = state === 'completed' || state === 'positive' || state === 'success'
        return Object.assign({}, item, {
          index: index + 1,
          isLast: index === nodes.length - 1,
          active: item.key && item.key === selectedKey,
          completed,
          stateClass: `ui5-process-flow__item--${state || 'neutral'}`,
          badgeType: item.badgeType || (completed ? 'success' : 'information')
        })
      })

      this.setData({
        _nodes: normalized,
        _orientationClass:
          orientation.toLowerCase() === 'vertical'
            ? 'ui5-process-flow--vertical'
            : 'ui5-process-flow--horizontal'
      })
    }
  },
  methods: {
    onNodeClick(e) {
      const key = e.currentTarget.dataset.key
      if (!this.data.allowSelect) {
        this.triggerEvent('nodeclick', { key })
        return
      }
      this.setData({ selectedKey: key })
      this.triggerEvent('nodeclick', { key })
    }
  }
})
