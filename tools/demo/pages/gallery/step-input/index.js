Page({
  data: {
    value1: 10,
    value2: 50,
    value3: 5
  },

  onChange(e) {
    const { index } = e.currentTarget.dataset
    const val = e.detail.value

    console.log(`Step Input ${index} changed to: ${val}`)

    // 更新对应的数据
    this.setData({
      [`value${index}`]: val
    })
  }
})
