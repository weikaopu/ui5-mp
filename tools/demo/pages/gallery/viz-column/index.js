Page({
  data: {
    // 趋势数据
    monthlyData: [
      { name: 'Jan', value: 450 },
      { name: 'Feb', value: 380 },
      { name: 'Mar', value: 520 },
      { name: 'Apr', value: 610 }
    ],

    // 类别对比
    categoryData: [
      { name: 'Software', value: 850 },
      { name: 'Hardware', value: 620 },
      { name: 'Services', value: 430 },
      { name: 'Training', value: 210 }
    ],

    // 联动数据
    simValue: 500,
    simData: []
  },

  onLoad() {
    this.updateSimData(this.data.simValue)
  },

  onSimChange(e) {
    const val = e.detail.value
    this.updateSimData(val)
  },

  updateSimData(val) {
    this.setData({
      simData: [
        { name: 'Project A', value: val },
        { name: 'Project B', value: 400 },
        { name: 'Project C', value: 550 }
      ]
    })
  }
})
