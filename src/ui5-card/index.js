const baseBehavior = require('../behaviors/base-behavior')

Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true // 必须开启以支持具名插槽 header
  },
  behaviors: [baseBehavior],
  properties: {
    /**
     * 定义组件的辅助功能名称。
     */
    accessibleName: String,
    /**
     * 定义组件是否处于加载状态。
     */
    loading: {
      type: Boolean,
      value: false
    },
    /**
     * 定义显示加载指示器之前的延迟（以毫秒为单位）。
     */
    loadingDelay: {
      type: Number,
      value: 1000
    }
  }
})
