Component({
  options: { addGlobalClass: true },
  properties: {
    active: {
      type: Boolean,
      value: false
    },
    text: String,
    size: {
      type: String,
      value: 'M' // S, M, L
    },
    fullScreen: {
      type: Boolean,
      value: false
    }
  }
})
