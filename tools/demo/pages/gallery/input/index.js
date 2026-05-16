Page({
  onInput(e) {
    console.log('Input event:', e.detail.value)
  },
  onChange(e) {
    console.log('Change event:', e.detail.value)
  },
  onSuggestionSelect(e) {
    wx.showToast({
      title: `Selected: ${e.detail.value || e.detail.text}`,
      icon: 'none'
    })
  }
})
