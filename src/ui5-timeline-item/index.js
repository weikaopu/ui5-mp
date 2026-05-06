// https://ui5.github.io/webcomponents/components/TimelineItem/
const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true // 必须开启以支持具名插槽 avatar
  },
  behaviors: [baseBehavior],
  observers: {
    state(state) {
      const colorMap = {
        Information: '#0a6ed1',
        Positive: '#107e3e',
        Critical: '#e9730c',
        Negative: '#bb0000',
        None: '#6a6d70'
      }
      this.setData({
        iconColor: colorMap[state] || colorMap.None
      })
    }
  },
  properties: {
    /** 定义条目标题 */
    titleText: String,
    /** 定义副标题或描述 */
    subtitleText: String,
    /** 时间戳文本 */
    timestamp: String,
    /** 条目指示器图标名称 */
    icon: String,
    /**
     * 定义项的状态。
     * 可选值: Information, Positive, Critical, Negative, None
     */
    state: {
      type: String,
      value: 'Information'
    },
    /**
     * 定义布局方式。
     * 可选值: Vertical, Horizontal
     */
    layout: {
      type: String,
      value: 'Vertical'
    },
    /** 显示在标题前的名称 */
    name: String,
    /** 名称是否可点击 */
    nameClickable: {
      type: Boolean,
      value: false
    },
    /** 是否为最后一个条目（用于隐藏底部的线） */
    lastItem: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    _onNameClick() {
      if (this.data.nameClickable) {
        this.triggerEvent('name-click', {
          name: this.data.name
        })
      }
    },
    _onItemClick() {
      this.triggerEvent('item-click')
    }
  }
})
