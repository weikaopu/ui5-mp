Page({
  data: {
    val1: 50,
    rangeVal: {
      start: 100,
      end: 400
    }
  },
  onSliderChange(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ [id]: e.detail.value })
  },
  onRangeChange(e) {
    this.setData({
      rangeVal: {
        start: e.detail.startValue,
        end: e.detail.endValue
      }
    })
  }
})
