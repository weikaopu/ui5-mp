Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    // design: header, footer (默认为 footer)
    design: {
      type: String,
      value: 'footer'
    }
  }
})
