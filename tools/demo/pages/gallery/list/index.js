Page({
  data: {
    items: [
      { id: '1', text: 'Apple', description: 'Fresh Red Apple', icon: 'nutrition-activity', additionalText: 'In Stock' },
      { id: '2', text: 'Banana', description: 'Tropical Yellow Banana', icon: 'multiple-bar-chart', additionalText: 'Low Stock' },
      { id: '3', text: 'Cherry', description: 'Sweet Dark Cherry', icon: 'dishwasher', additionalText: 'Out of Stock' },
      { id: '4', text: 'Durian', description: 'Strong Smell Durian', icon: 'x-ray', additionalText: 'New' }
    ],
    selectedKey: '1',
    selectedKeys: ['2', '4'],
    lastEvent: 'None'
  },

  handleSelectionChange(e) {
    const { selectedItem, selectedItems } = e.detail
    let log = ''

    if (selectedItem) {
      // SingleSelect
      log = `Selected: ${selectedItem.data.text}`
      this.setData({ selectedKey: selectedItem.data.value })
    } else if (selectedItems) {
      // MultiSelect
      const names = selectedItems.map(item => item.data.text).join(', ')
      log = `Selected IDs: ${names}`
      this.setData({ selectedKeys: selectedItems.map(item => item.data.value) })
    }

    this.setData({ lastEvent: log })
  },

  handleItemDelete(e) {
    const { item } = e.detail
    wx.showToast({
      title: `Deleted: ${item.data.text}`,
      icon: 'none'
    })

    const newItems = this.data.items.filter(i => i.id !== item.data.value)
    this.setData({
      items: newItems,
      lastEvent: `Deleted item ${item.data.value}`
    })
  },

  handleItemClick(e) {
    const { text } = e.detail
    this.setData({ lastEvent: `Clicked: ${text}` })
  }
})
