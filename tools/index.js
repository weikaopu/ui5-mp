Page({
  data: {
    settings: {
      email: true,
      sms: false,
      marketing: true,
      twoFactor: true,
      biometric: false,
      visibility: true,
      status: true
    }
  },

  onSwitchChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value

    this.setData({
      [`settings.${field}`]: value
    })

    wx.showToast({
      title: `${field} updated to ${value}`,
      icon: 'none',
      duration: 1000
    })
  }
})
