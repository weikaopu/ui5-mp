Component({
  options: { addGlobalClass: true },
  properties: {
    // 完整的列配置，由父组件或页面传入
    columns: Array,
    // 该行的数据对象，key 对应 columns 中的 key
    data: Object
  },
  data: {
    mainCells: [],
    popinCells: []
  },
  observers: {
    'columns, data': function (columns, data) {
      if (!columns || !data) return
      // 动态拆分：哪些横向显示，哪些纵向显示
      this.setData({
        mainCells: columns.filter(c => !c.demandPopin),
        popinCells: columns.filter(c => c.demandPopin)
      })
    }
  }
})
