// https://ui5.github.io/webcomponents/components/Toast/

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true
  },
  properties: {
    text: {
      type: String,
      value: ''
    },
    visible: {
      type: Boolean,
      value: false
    },
    // 显示时长（毫秒）
    duration: {
      type: Number,
      value: 3000
    }
  },
  data: {
    _visible: false
  },
  observers: {
    visible(visible) {
      this.setData({
        _visible: visible
      })
    }
  },
  methods: {
    show(text = '', duration = this.data.duration) {
      this.setData({
        text,
        _visible: true
      })
      setTimeout(() => {
        this.setData({
          _visible: false
        })
      }, duration)
    }
  }
})
