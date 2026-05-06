const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 节点的唯一标识符
     */
    nodeId: String,
    /**
     * 节点显示的标题
     */
    title: String,
    /**
     * 节点的状态：Positive, Negative, Critical, Neutral, Planned, Information
     */
    state: {
      type: String,
      value: 'Neutral'
    },
    /**
     * 节点是否处于选中状态
     */
    selected: {
      type: Boolean,
      value: false
    },
    /**
     * 标题是否可点击
     */
    isTitleClickable: {
      type: Boolean,
      value: false
    },
    /**
     * 是否显示焦点状态
     */
    focused: {
      type: Boolean,
      value: false
    },
    /**
     * 节点显示的描述文本数组
     */
    texts: {
      type: Array,
      value: null
    }
  },
  methods: {
    _onNodeTap() {
      this.triggerEvent('node-click', { nodeId: this.data.nodeId })
    },
    _onTitleTap() {
      if (this.data.isTitleClickable) {
        this.triggerEvent('title-click', { nodeId: this.data.nodeId })
        // 阻止冒泡到 node-click
      }
    }
  }
})
