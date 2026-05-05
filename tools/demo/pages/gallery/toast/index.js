Page({
  data: {},

  handleShowBasic() {
    this.selectComponent('#wcToastBasic').show("Basic toast message");
  },

  handleShowLong() {
    this.selectComponent('#wcToastLong').show("This message will stay for 10 seconds");
  }
});
