Component({
  relations: { '../ui5-tab-container/index': { type: 'parent' } },
  properties: {
    key: String,
    text: String,
    icon: String
  },
  data: { visible: false },
  methods: {
    toggle(isVisible) { this.setData({ visible: isVisible }) }
  }
})
