Page({
  data: {
    rating1: 3,
    rating2: 7
  },

  onRatingChange(e) {
    const { index } = e.currentTarget.dataset
    const val = e.detail.value

    console.log(`Rating ${index} updated to: ${val}`)

    this.setData({
      [`rating${index}`]: val
    })

    // 如果是 5 分，给用户一个 Toast 反馈
    if (val === 5 && index === '1') {
      const toast = this.selectComponent('#demoToast')
      if (toast) {
        toast.show('Thank you for the 5-star!')
      }
    }
  }
})
