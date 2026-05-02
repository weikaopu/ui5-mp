Page({
  data: {
    // 基础时间轴数据
    basicTimelineItems: [
      { titleText: 'Order Placed', subtitleText: 'Order #12345', timestamp: '2023-10-26 10:00 AM', icon: 'cart', state: 'Positive' },
      { titleText: 'Payment Confirmed', subtitleText: 'Transaction ID: ABCDEF', timestamp: '2023-10-26 10:15 AM', icon: 'money-bills', state: 'Information' },
      { titleText: 'Processing Order', subtitleText: 'Preparing for shipment', timestamp: '2023-10-26 11:30 AM', icon: 'pending', state: 'None' },
      { titleText: 'Shipped', subtitleText: 'Tracking: XYZ789', timestamp: '2023-10-26 03:00 PM', icon: 'shipping-status', state: 'Information' },
      { titleText: 'Delivered', subtitleText: 'Signed by John Doe', timestamp: '2023-10-27 09:00 AM', icon: 'sys-enter-2', state: 'Positive', lastItem: true },
    ],
    // 带有不同状态和可点击名称的时间轴数据
    statusTimelineItems: [
      { name: 'Alice', nameClickable: true, titleText: 'Task Assigned', subtitleText: 'Review document', timestamp: '2023-10-25 09:00 AM', state: 'Information' },
      { name: 'Bob', nameClickable: true, titleText: 'Review Pending', subtitleText: 'Waiting for feedback', timestamp: '2023-10-25 02:00 PM', state: 'Critical' },
      { name: 'Charlie', nameClickable: true, titleText: 'Feedback Received', subtitleText: 'Minor revisions needed', timestamp: '2023-10-25 04:30 PM', state: 'Negative' },
      { name: 'Alice', nameClickable: true, titleText: 'Task Completed', subtitleText: 'Document finalized', timestamp: '2023-10-26 10:00 AM', state: 'Positive', lastItem: true },
    ],
    // 用于加载更多的时间轴数据
    growingTimelineItems: [
      { titleText: '包裹已签收', subtitleText: '您的包裹已由物业代收', timestamp: '今天 11:30 AM', icon: 'sys-enter-2', state: 'Positive' },
      { titleText: '派送中', subtitleText: '派送员小张（138xxxx8888）正在为您派送', timestamp: '今天 08:45 AM', icon: 'shipping-status', state: 'Information' },
      { titleText: '到达目的地分拨中心', subtitleText: '上海北部分部', timestamp: '昨天 10:20 PM', icon: 'locate-me', state: 'None', lastItem: true },
    ],
    isLoadingMore: false,
    isTimelineLoading: false,
    // 带有 Avatar 的时间轴数据
    avatarTimelineItems: [
      { name: 'User A', titleText: 'Profile Updated', timestamp: '2023-11-01 09:00 AM', avatarSrc: '/assets/Woman_avatar_01.png', state: 'Information' },
      { name: 'User B', titleText: 'New Comment', timestamp: '2023-11-01 10:30 AM', avatarSrc: '/assets/Woman_avatar_01.png', state: 'Positive' },
      { name: 'User C', titleText: 'Shared Document', timestamp: '2023-11-01 11:45 AM', avatarSrc: '/assets/Woman_avatar_01.png', state: 'None', lastItem: true },
    ],
    // 带有 Initials Avatar 的时间轴数据
    avatarInitialsItems: [
      { name: 'John Doe', initials: 'JD', titleText: 'Task Created', timestamp: 'Just now', state: 'Information' },
      { name: 'Steve Jobs', initials: 'SJ', titleText: 'Meeting Started', timestamp: '2 hours ago', state: 'Positive', lastItem: true },
    ],
  },

  onNameClick(e) {
    const { name } = e.detail
    wx.showToast({
      title: `Name clicked: ${name}`,
      icon: 'none',
      duration: 1000,
    })
  },

  onItemClick() {
    wx.showToast({
      title: 'Timeline Item Clicked',
      icon: 'none',
      duration: 1000,
    })
  },

  onLoadMore() {
    console.log('onLoadMore...')
    if (this.data.isLoadingMore) return

    this.setData({ isLoadingMore: true })

    // 模拟从后端 API 获取下一页物流数据 (Simulate API request)
    // eslint-disable-next-line promise/catch-or-return
    this._fetchMockLogisticsData().then((newItems) => {
      const currentList = this.data.growingTimelineItems

      // 处理逻辑：
      // 1. 将原列表最后一项的 lastItem 标记设为 false，确保连接线能显示出来
      if (currentList.length > 0) {
        currentList[currentList.length - 1].lastItem = false
      }

      // 2. 合并新数据并更新状态
      this.setData({
        growingTimelineItems: currentList.concat(newItems),
        isLoadingMore: false,
      })

      wx.showToast({
        title: '已同步最新物流记录',
        icon: 'success',
        duration: 1500
      })
    })
  },

  // 模拟 API 调用 (Mock API Caller)
  _fetchMockLogisticsData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { titleText: '离开【上海分拨中心】', subtitleText: '发往【上海宝山分拣中心】', timestamp: '2023-10-26 02:15 PM', icon: 'shipping-status', state: 'None' },
          { titleText: '【上海分拨中心】分拣完成', subtitleText: '准备发往目的地', timestamp: '2023-10-26 09:00 AM', icon: 'inspect', state: 'None' },
          { titleText: '到达【上海分拨中心】', subtitleText: '干线车辆已入场', timestamp: '2023-10-25 11:30 PM', icon: 'locate-me', state: 'None' },
          { titleText: '离开【杭州分拨中心】', subtitleText: '发往【上海分拨中心】', timestamp: '2023-10-25 04:00 PM', icon: 'shipping-status', state: 'None' },
          { titleText: '仓库已发货', subtitleText: '包裹已装车，正在发往分拨中心', timestamp: '2023-10-24 11:00 AM', icon: 'product', state: 'None' },
          { titleText: '已支付', subtitleText: '订单支付成功，流水号：1000293', timestamp: '2023-10-24 09:35 AM', icon: 'money-bills', state: 'None' },
          { titleText: '已下单', subtitleText: '您的订单已提交，等待卖家备货', timestamp: '2023-10-24 09:30 AM', icon: 'cart', state: 'Positive', lastItem: true },
        ])
      }, 1500) // 模拟网络延迟
    })
  },

  onToggleLoading() {
    this.setData({ isTimelineLoading: !this.data.isTimelineLoading })
  },
})
