Page({
  data: {
    selectedCountry: 'CN',
    countries: [
      { text: 'China', value: 'CN' },
      { text: 'United States', value: 'US' },
      { text: 'Germany', value: 'DE' },
      { text: 'Japan', value: 'JP' }
    ],
    shipping: [
      { text: 'Standard Shipping', value: 'std' },
      { text: 'Express Delivery', value: 'exp' }
    ]
  },

  onSelectChange(e) {
    console.log('Selected Country:', e.detail.value)
  },

  onSwitchChange(e) {
    wx.showToast({
      title: `Switch is now ${e.detail.value ? 'ON' : 'OFF'}`,
      icon: 'none'
    })
  },

  onGroupChange(e) {
    console.log('Selected Channels:', e.detail.value)
  }
})
