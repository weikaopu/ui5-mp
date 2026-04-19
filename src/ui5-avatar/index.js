Component({
  options: { addGlobalClass: true },
  properties: {
    image: String,
    initials: String, // 如 "JD"
    icon: String, // 支持传入图标名称，如 "settings"
    shape: { type: String, value: 'Circle' }, // Circle, Square
    size: { type: String, value: 'M' }, // XS, S, M, L, XL
    accentColor: { type: String, value: '4' } // 1 to 4
  },
  data: {
    iconSize: 24
  },
  lifetimes: {
    attached() {
      // format:off
      const sizeMap = { XS: 12, S: 16, M: 24, L: 36, XL: 56 }
      this.setData({ iconSize: sizeMap[this.data.size] || 24 })
    }
  }
})
