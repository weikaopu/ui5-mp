Component({
  properties: {
    name: String,
    color: {
      type: String,
      value: 'currentColor' // 默认继承父元素颜色
    },
    size: {
      type: Number,
      value: 24
    }
  },
  options: {
    addGlobalClass: true // 允许组件访问 app.wxss 中定义的 CSS 变量
  },
})
