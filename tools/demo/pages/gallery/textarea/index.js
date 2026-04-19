Page({
  data: {
    longText: 'SAP Fiori Horizon is the latest evolution of the SAP Fiori design system.'
  },

  onTextChange(e) {
    console.log('Textarea value:', e.detail.value)
  }
})
