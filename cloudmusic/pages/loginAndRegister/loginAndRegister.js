const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggle_index: 0,    //0->代表选中手机号登录 1->代表选中邮箱登录
    phone_username:'',     //手机登录绑定的手机输入的值
    phone_password:'',     //手机登录绑定的密码输入的值
    email_username:'',     //邮箱登录绑定的邮箱输入的值
    email_password:'',     //邮箱登录绑定的密码输入的值
  },

  //监听手机输入框的值
  getPhoneUserName(e){
    console.log(e);
    this.setData({
      phone_username: e.detail
    })
  },
  //监听手机密码输入框的值
  getPhonePassword(e) {
    console.log(e);
    this.setData({
      phone_password: e.detail
    })
  },

  //监听邮箱输入框的值
  getEmailUserName(e) {
    console.log(e);
    this.setData({
      email_username: e.detail
    })
  },
  //监听邮箱密码输入框的值
  getEmailPassword(e) {
    console.log(e);
    this.setData({
      email_password: e.detail
    })
  },

  //点击切换手机号登录 邮箱登录
  toggleRegister(event){
    this.setData({
      toggle_index: event.currentTarget.dataset.index
    })
    if (this.data.toggle_index == 0){
      //切换到手机登录 清空邮箱登录的输入框
      this.setData({
        email_username : '',
        email_password : '',
      })
    }else{
      //切换到邮箱登录 清空手机登录的输入框
      this.setData({
        phone_username: '',
        phone_password: '',
      })
    }
  },

  //点击登录，调用接口
  loginImmediately(){
    //手机号登录
    if (this.data.toggle_index == 0){
      console.log("手机登录")
      app.globalData.fly.get("/login/cellphone?phone=" + this.data.phone_username + "&password=" + this.data.phone_password).then(res=>{
        console.log(res);
        //登录成功
        if(res.status == 200){
          wx.showToast({
            title: '登录成功',
          })
          //将个人信息存储到本地
          wx.setStorageSync("user", res.data)
          //跳转到个人中心界面
          wx.switchTab({
            url: '../my/my',
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    }else{  //邮箱登录
      console.log("邮箱登录")
      app.globalData.fly.get("/login?email=" + this.data.email_username + "&password=" + this.data.email_password).then(res => {
        console.log(res);
        if (res.status == 200) {
          wx.showToast({
            title: '登录成功',         
          })
          //将个人信息存储到本地
          wx.setStorageSync("user", res.data)
          //跳转到个人中心界面
          wx.switchTab({
            url: '../my/my',
          })
        }
      }).catch(err => {
        // console.log(err);
      })
    }
    
  },

  //点击立即注册跳转到注册界面
  goToRegister(event){
    wx.navigateTo({
      url: '../register/register',
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