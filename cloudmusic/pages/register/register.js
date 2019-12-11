const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",
    verification: "",
    username: "",
  },
  //跳转到登录界面
  goToLogin(){
    wx.navigateTo({
      url: '../loginAndRegister/loginAndRegister',
    })
  },
  //发送验证码
  sendVerification(){
    console.log(11);
    app.globalData.fly.get("/captcha/sent?phone="+this.data.phone).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  //立即注册
  immediateRegistration(event) {
    // 正则表达式验证
    //验证手机号
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
    }
    //验证密码
    if (!(/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g.test(this.data.password)))     {
      wx.showToast({
        title: '密码必须由6-16个英文字母和数字的字符串组成！',
        duration: 2000,
        icon: 'none'
      });
    }
    //进行注册之前需要检测手机号是否已经注册了
    app.globalData.fly.get("/cellphone/existence/check?phone="+this.data.phne).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    //进行注册
    // app.globalData.fly.get("/register/cellphone?phone=" + this.data.phone + "&password=" + this.data.password + "&captcha=" + this.data.verification + "&nickname=" + this.data.username).then(res=>{
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // })
  },
  
  //getPhone 获取输入框的手机号的值
  getPhone(e) {
    this.setData({
      phone: e.detail
    })
  },
  //getPassword 获取输入框的密码的值
  getPassword(e) {
    this.setData({
      password: e.detail
    })
  },
  //获取验证码输入框的值
  getVerification(e) {
    this.setData({
      verification: e.detail
    })
  },
  //获取昵称输入框的值
  getUsername(e) {
    this.setData({
      username: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})