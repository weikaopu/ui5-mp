Page({
  data: {
    // 场景一：地区库存数据
    inventoryData: [
      { name: 'EMEA', value: 450 },
      { name: 'Americas', value: 320 },
      { name: 'APJ', value: 280 },
      { name: 'China', value: 150 }
    ],

    // 场景二：系统健康状态（使用语义化颜色）
    healthData: [
      { name: 'Healthy', value: 92 },
      { name: 'Critical', value: 3 },
      { name: 'Warning', value: 5 }
    ]
  },

  onLoad() {
    console.log('Donut Chart Demo Loaded')
  }
})
