Page({
  data: {
    basicChecked: true,
    indeterminate: true,
    lastEvent: 'No event yet'
  },

  handleCheckboxChange(e) {
    const { checked, value } = e.detail
    this.setData({
      indeterminate: false, // 交互后清除中间态
      lastEvent: `Checked: ${checked}${value ? ', Value: ' + value : ''}`
    })
  },

  toggleIndeterminate() {
    this.setData({ indeterminate: !this.data.indeterminate })
  },

  handleSelectAll() {
    const group = this.selectComponent('#selectionGroup')
    if (group) {
      group.selectAll()
    }
  },
  handleDeselectAll() {
    const group = this.selectComponent('#selectionGroup')
    if (group) {
      group.deselectAll()
    }
  }
})
