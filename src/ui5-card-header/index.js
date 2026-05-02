// https://ui5.github.io/webcomponents/components/CardHeader/
Component({
  externalClasses: ['ui5Class'],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    // 启用纯数据属性，提高性能
    // 参见：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/pure-data.html
    pureDataPattern: /^_/
  },
  properties: {
    /**
     * 定义卡片主标题文本
     */
    titleText: String,
    /**
     * 定义卡片副标题文本
     */
    subtitleText: String,
    /**
     * 定义卡片状态或数值
     */
    status: String,
    /**
     * 定义头部是否可交互（会有激活态反馈）
     */
    interactive: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    _onHeaderClick() {
      if (this.data.interactive) {
        /**
         * 头部被点击时触发
         * @event click
         */
        this.triggerEvent('click')
      }
    }
  }
})
