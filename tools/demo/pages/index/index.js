Page({
  data: {
    allComponentGroups: [ // 这是所有组件的原始数据源
      {
        headerText: '基础与内容 (Foundation)',
        items: [
          { icon: 'attachment-html', text: 'Icon', description: 'SAP 图标库浏览器与使用示例。', url: 'icon' },
          { icon: 'header', text: 'Title', description: '各种级别的标题样式与对齐。', url: 'title' },
          { icon: 'document-text', text: 'Text', description: '文本排版、行数截断与格式化。', url: 'text' },
          { icon: 'header', text: 'Label', description: '用于展示表单字段或信息的标签。', url: 'label' },
          { icon: 'chain-link', text: 'Link', description: '支持内链跳转与 WebView 外链。', url: 'link' },
          { icon: 'action', text: 'Button', description: '多种样式与加载状态的交互按钮。', url: 'button' },
        ]
      },
      {
        headerText: '数据录入 (Data Entry)',
        items: [
          { icon: 'edit', text: 'Input', description: '单行输入框及其状态变体。', url: 'input' },
          { icon: 'notes', text: 'Textarea', description: '多行文本输入与高度自适应。', url: 'textarea' },
          { icon: 'drop-down-list', text: 'Select', description: '单选下拉列表组件。', url: 'selection' },
          { icon: 'number-sign', text: 'Step Input', description: '步进式数值输入控制。', url: 'step-input' },
          { icon: 'horizontal-grip', text: 'Slider', description: '滑动条数值范围选择。', url: 'slider' },
          { icon: 'favorite', text: 'Rating Indicator', description: '星级评分与展示组件。', url: 'rating' },
        ]
      },
      {
        headerText: '选择与状态 (Selection & Status)',
        items: [
          { icon: 'checklist-item', text: 'Checkbox', description: '复选框及其分组管理。', url: 'checkbox' },
          { icon: 'multi-select', text: 'RadioButton', description: '单选按钮分组与状态展示。', url: 'radio-button' },
          { icon: 'switch-on', text: 'Switch', description: '开关切换控件。', url: 'switch' },
          { icon: 'dimension', text: 'Segmented Button', description: '多选项切换分段按钮。', url: 'segmented-button' },
        ]
      },
      {
        headerText: '展示与展示 (Data Display)',
        items: [
          { icon: 'customer', text: 'Avatar', description: '各种尺寸、形状与角标的头像显示。', url: 'avatar' },
          { icon: 'badge', text: 'Badge', description: '用于展示计数或短标记。', url: 'badge' },
          { icon: 'tag', text: 'Tag', description: '用于展示状态、元数据或简短信息。', url: 'tag' },
          { icon: 'list', text: 'List', description: '标准列表容器与列表项交互。', url: 'list' },
          { icon: 'table-view', text: 'Table', description: '响应式数据表格，支持列折叠。', url: 'table' },
        ]
      },
      {
        headerText: '布局与容器 (Layout)',
        items: [
          { icon: 'card', text: 'Card', description: '支持多种布局的通用容器卡片。', url: 'card' },
          { icon: 'tab', text: 'Tab Container', description: '选项卡内容组织与联动。', url: 'tab' },
          { icon: 'form', text: 'Form', description: '自适应列布局的表单容器。', url: 'form' },
        ]
      },
      {
        headerText: '弹窗与反馈 (Popups & Feedback)',
        items: [
          { icon: 'hint', text: 'Message Strip', description: '页内提示消息条。', url: 'message-strip' },
          { icon: 'popup-window', text: 'Toast', description: '轻量级自动消失提示。', url: 'toast' },
          { icon: 'popup-window', text: 'Dialog', description: '对话框及复杂流程录入。', url: 'dialog' },
          { icon: 'popup-window', text: 'Popover', description: '浮动弹出框，用于展示附加操作。', url: 'popover' },
          { icon: 'lateness', text: 'Busy Indicator', description: '正在处理任务的视觉指示器。', url: 'busy-indicator' },
        ]
      },
      {
        headerText: '业务可视化 (Analytics & Flow)',
        items: [
          { icon: 'vertical-bar-chart', text: 'Column 柱形图', description: '适用于物料月度库存等场景分析。', url: 'viz-column' },
          { icon: 'donut-chart', text: 'Donut 环形图', description: '集成图例与吸附式 Tooltip 演示。', url: 'viz-donut' },
          { icon: 'line-chart', text: 'Line 多线图', description: '趋势分析多线图表展示。', url: 'viz-line' },
          { icon: 'process', text: 'Process Flow', description: '业务流程节点状态与进度展示。', url: 'process-flow' },
          { icon: 'process', text: 'Timeline', description: 'Timeline 展示。', url: 'timeline' },
        ]
      }
    ],
    componentGroups: [], // 用于渲染的过滤后的组件列表
  },

  onLoad() {
    // 页面加载时，初始化显示所有组件
    this.setData({
      componentGroups: this.data.allComponentGroups
    })
  },

  navTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/gallery/${url}/index`
    })
  }
})
