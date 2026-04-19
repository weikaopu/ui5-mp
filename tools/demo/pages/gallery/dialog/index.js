Page({
  data: {
    dialogVisible: false,
    isSubmitting: false,
    isGlobalLoading: false,
    submitError: false,
    formData: {
      name: '',
      category: 'electronics',
      qty: 1
    },
    formErrors: {
      name: false
    },
    categories: [
      { text: 'Electronics', value: 'electronics' },
      { text: 'Furniture', value: 'furniture' },
      { text: 'Office Supplies', value: 'office' }
    ]
  },

  openFormDialog() {
    this.setData({ dialogVisible: true, submitError: false })
  },

  closeDialog() {
    if (!this.data.isSubmitting) {
      this.setData({ dialogVisible: false })
    }
  },

  onNameChange(e) {
    this.setData({ 'formData.name': e.detail.value, 'formErrors.name': false })
  },

  onCategoryChange(e) { this.setData({ 'formData.category': e.detail.value }) },
  onQtyChange(e) { this.setData({ 'formData.qty': e.detail.value }) },

  onSubmit() {
    // 1. 简单校验
    if (!this.data.formData.name) {
      this.setData({ 'formErrors.name': true })
      return
    }

    // 2. 模拟提交状态
    this.setData({ isSubmitting: true, submitError: false })

    setTimeout(() => {
      // 模拟提交成功
      this.setData({ isSubmitting: false, dialogVisible: false })

      // 3. 联动全屏 BusyIndicator
      this.setData({ isGlobalLoading: true })

      setTimeout(() => {
        this.setData({ isGlobalLoading: false })
        this.selectComponent('#successToast').show()
      }, 1500)
    }, 2000)
  }
})
