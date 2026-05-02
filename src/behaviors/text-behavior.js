module.exports = Behavior({
  properties: {
    /**
     * 严格遵循 UI5 WC 规范：定义文本的换行模式。
     * 可选值: "None", "Normal"
     */
    wrappingType: {
      type: String,
      value: 'None' // 默认为截断，符合大多数企业级 UI 场景
    },
    /**
     * 定义文本的对齐方式。
     * 可选值: "Left", "Center", "Right"
     */
    textAlign: {
      type: String,
      value: 'Left'
    }
  }
})
