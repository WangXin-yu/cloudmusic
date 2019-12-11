// pages/my/my.js
const app = new getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    login_state: true,     //登录状态
    user_info: [],          //存储用户的信息
  },

  // 退出登录
  exit(){
    app.globalData.fly.get("/logout").then(res=>{
      console.log(res);
      this.setData({
        login_state: false
      })
      wx.setStorageSync("user", "")
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //跳转到编辑界面
  goToEdit(){
    wx.navigateTo({
      url: '../myToEdit/myToEdit',
    })
  },
  //跳转到登录注册界面
  goToLoginAndRegister(){
    wx.navigateTo({
      url: '../loginAndRegister/loginAndRegister',
    })
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
    if (wx.getStorageSync("user")) {
      this.setData({
        login_state: true,
        user_info: wx.getStorageSync("user")
      })
    } else {
      this.setData({
        login_state: false
      })
    }
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