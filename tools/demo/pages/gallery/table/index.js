Page({
  data: {
    // 列配置：控制哪些字段横向显示，哪些纵向折叠
    tableColumns: [
      {
        name: 'Product',
        key: 'name',
        demandPopin: false,
        isTitle: true,
        width: 2
      },
      {
        name: 'Price',
        key: 'price',
        demandPopin: false,
        halign: 'flex-end',
        width: 1
      },
      {
        name: 'Supplier',
        key: 'supplier',
        demandPopin: true
      },
      {
        name: 'Weight',
        key: 'weight',
        demandPopin: true
      }
    ],
    products: [
      {
        id: 'HT-1001',
        name: 'Notebook Basic 15',
        price: '950.00 EUR',
        supplier: 'Titanium Technology',
        weight: '2.56 kg'
      },
      {
        id: 'HT-1002',
        name: 'Smart Office Watch',
        price: '249.50 EUR',
        supplier: 'Ultrasonic Industries',
        weight: '0.15 kg'
      },
      {
        id: 'HT-1003',
        name: 'Wireless Mouse',
        price: '35.00 EUR',
        supplier: 'Oxigenic Systems',
        weight: '0.08 kg'
      }
    ]
  },

  onRowSelect(e) {
    const item = e.detail.item
    wx.showToast({
      title: `Selected: ${item.name}`,
      icon: 'none'
    })
  }
})
