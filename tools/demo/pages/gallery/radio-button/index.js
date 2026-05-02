Page({
  data: {
    selectedFruit: 'Apple',
    lastEvent: 'None'
  },
  handleFruitChange(e) {
    this.setData({
      selectedFruit: e.detail.selected,
      lastEvent: `Group Selection: ${e.detail.selected}`
    })
  },
  handleStandaloneChange(e) {
    this.setData({
      lastEvent: `Standalone changed: ${e.detail.checked}`
    })
  }
})
