// pages/welcome/welcom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onContainerTap:function(){
   /* //导航路由  页面跳转  
   从父跳转到子，可以返回，父子级深度最多五级,调用了生命周期的onHide方法，也就是父页面被隐藏
    wx.navigateTo({
      url:"../posts/post"
    });*/
    // 页面之间平行跳转 不能返回，调用了生命周期的unLoad方法
    wx.redirectTo({
      url:"../posts/post"
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})