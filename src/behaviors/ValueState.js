/**
 * ValueState Behavior for UI5 Web Components in WeChat Mini Program.
 * Provides properties for value state and value state message.
 */
module.exports = Behavior({
  properties: {
    /**
     * Defines the value state of the component.
     * Available options are: "None", "Error", "Warning", "Success", "Information".
     */
    valueState: {
      type: String,
      value: 'None', // Default value state
    },
    /** Defines the text of the value state message. */
    valueStateMessage: String,
  },
})
