Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    columns: {
      type: Array,
      value: []
    }
  },
  data: {
    mainColumns: [],
    popinColumns: []
  },
  observers: {
    'columns': function (columns) {
      if (!columns || columns.length === 0) return
      // 提取不需要收起的列
      const main = columns.filter(c => !c.demandPopin)
      // 提取需要收起的列
      const popin = columns.filter(c => c.demandPopin)

      this.setData({
        mainColumns: main,
        popinColumns: popin
      })
    }
  }
})
