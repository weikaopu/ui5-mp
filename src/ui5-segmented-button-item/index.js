Component({
  options: { addGlobalClass: true },
  relations: {
    '../ui5-segmented-button/index': { type: 'parent' }
  },
  properties: {
    key: String,
    text: String,
    icon: String,
    disabled: Boolean,
    selected: Boolean
  },
  methods: {
    onTap() {
      if (this.data.disabled || this.data.selected) return
      const parent = this.getRelationNodes('../ui5-segmented-button/index')[0]
      if (parent) {
        parent.handleSelect(this.data.key)
      }
    },
    setSelection(selected) {
      this.setData({ selected })
    }
  }
})
