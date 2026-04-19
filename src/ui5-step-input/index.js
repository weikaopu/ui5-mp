Component({
  options: { addGlobalClass: true },
  properties: {
    label: String,
    value: {
      type: Number,
      value: 0,
      observer(newVal) {
        // 强制转换，防止外部传入字符串 "10" 导致判断出错
        if (typeof newVal !== 'number') {
          this.setData({ value: Number(newVal) })
        }
      }
    },
    step: { type: Number, value: 1 },
    min: { type: Number, value: -999999 },
    max: { type: Number, value: 999999 },
    readonly: Boolean,
    disabled: Boolean,
    valueState: { type: String, value: 'None' }
  },
  methods: {
    onInput(e) {
      this._updateValue(Number(e.detail.value))
    },
    onBlur() {
      this._updateValue(this.data.value)
    },
    //
    //
    // 开始增加
    onStartIncrement() {
      this._startCounter(() => this.onIncrement())
    },

    // 开始减少
    onStartDecrement() {
      this._startCounter(() => this.onDecrement())
    },

    // 统一的计数器启动器
    _startCounter(action) {
      if (this.data.disabled || this.data.readonly) return

      // 1. 立即执行第一次
      action()

      // 2. 设定长按延时触发定时器
      this._timer = setTimeout(() => {
        this._interval = setInterval(() => {
          action()
        }, 100) // 连发频率：100ms 一次
      }, 350) // 长按判定时间：350ms
    },

    // 停止计数器
    onStopCounter() {
      if (this._timer) clearTimeout(this._timer)
      if (this._interval) clearInterval(this._interval)
    },

    // 复用之前的增减逻辑
    onIncrement() {
      const { value, max, step } = this.data
      if (value < max) {
        this._updateValue(value + step)
      } else {
        this.onStopCounter() // 达到最大值停止连发
      }
    },

    onDecrement() {
      const { value, min, step } = this.data
      if (value > min) {
        this._updateValue(value - step)
      } else {
        this.onStopCounter() // 达到最小值停止连发
      }
    },

    _updateValue(newVal) {
      // 保持之前的精度处理逻辑...
      const finalVal = parseFloat(newVal.toFixed(2))
      this.setData({ value: finalVal })
      this.triggerEvent('change', { value: finalVal })
    }
  }
})
