Component({
  options: { addGlobalClass: true },
  properties: {
    icon: String,
    colorScheme: {
      type: String,
      value: '1'
    },
    type: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value: ''
    }
  },
  data: {
    _colorScheme: '1'
  },
  observers: {
    type(type = '') {
      const typeMap = {
        success: '4',
        positive: '4',
        information: '5',
        info: '5',
        warning: '2',
        error: '3',
        negative: '3',
        neutral: '1'
      }
      this.setData({
        _colorScheme: typeMap[type.toLowerCase()] || this.data.colorScheme || '1'
      })
    },
    colorScheme(colorScheme = '1') {
      this.setData({
        _colorScheme: colorScheme
      })
    }
  }
})
