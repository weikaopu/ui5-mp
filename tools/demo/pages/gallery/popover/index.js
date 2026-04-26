Page({
  data: {
    currentPlacement: 'Bottom',
    isModalOpen: false,
    longList: Array.from({ length: 50 }, (_, i) => `Option Item ${i + 1}`)
  },

  onOpenPopover(e) {
    const popover = this.selectComponent('#myPopover')
    popover.show(e.currentTarget.id)
  },

  onOpenPlacement(e) {
    const placement = e.currentTarget.dataset.placement
    this.setData({
      currentPlacement: placement
    }, () => {
      const popover = this.selectComponent('#placementPopover')
      popover.show(e.currentTarget.id)
    })
  },

  onOpenLongContent(e) {
    const popover = this.selectComponent('#longPopover')
    popover.show(e.currentTarget.id)
  },

  onToggleModal() {
    this.setData({
      isModalOpen: true
    })
  },

  onCloseModal() {
    this.setData({ isModalOpen: false })
  }
})
