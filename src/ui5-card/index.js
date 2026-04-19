Component({
  options: { addGlobalClass: true },
  properties: {
    title: String,
    subtitle: String,
    icon: String,
    status: String,
    interactive: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onCardClick() {
      if (this.data.interactive) {
        this.triggerEvent('click')
      }
    }
  }
})
