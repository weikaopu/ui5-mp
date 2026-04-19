Page({
  data: {
    // 场景一：多线对比数据
    performanceSeries: [
      {
        name: 'Revenue',
        data: [
          { name: 'Jan', value: 450 },
          { name: 'Feb', value: 520 },
          { name: 'Mar', value: 680 }
        ]
      },
      {
        name: 'Cost',
        data: [
          { name: 'Jan', value: 310 },
          { name: 'Feb', value: 340 },
          { name: 'Mar', value: 490 }
        ]
      }
    ],

    // 场景二：单线趋势数据
    userSeries: [
      {
        name: 'Daily Active Users',
        data: [
          { name: 'Mon', value: 1200 },
          { name: 'Tue', value: 1350 },
          { name: 'Wed', value: 1100 },
          { name: 'Thu', value: 1400 },
          { name: 'Fri', value: 1600 },
          { name: 'Sat', value: 900 },
          { name: 'Sun', value: 850 }
        ]
      }
    ]
  },

  onLoad() {
    console.log('Line Chart Demo Loaded')
  }
})
