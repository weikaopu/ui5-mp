Page({
  data: {
    selectedStep: 'step-2',
    steps: [
      {
        key: 'step-1',
        title: 'Start',
        subtitle: '准备阶段',
        description: '初始化流程并收集基础数据',
        status: 'Completed',
        statusText: '已完成',
        state: 'Completed',
        badgeType: 'success',
        icon: 'sap-icon://status-completed'
      },
      {
        key: 'step-2',
        title: 'Review',
        subtitle: '审核阶段',
        description: '正在校验输入内容与审批规则',
        status: 'In Progress',
        statusText: '进行中',
        state: 'Information',
        badgeType: 'information'
      },
      {
        key: 'step-3',
        title: 'Confirm',
        subtitle: '确认阶段',
        description: '等待最终确认与交付',
        status: 'Pending',
        statusText: '待处理',
        state: 'Warning',
        badgeType: 'warning'
      }
    ]
  },
  onNodeClick(e) {
    const { key } = e.detail
    const toast = this.selectComponent('#demoToast')
    if (toast) {
      toast.show(key)
    }
  }
})
