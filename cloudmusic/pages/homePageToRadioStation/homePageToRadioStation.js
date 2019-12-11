const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "101009",
    dj: {},
    tabBar_index: 1, //0->切换到详细， 1->切换到节目
    programs: [], //保存电台节目的数据
    programs_count: '', //节目的数量
    current_count: 30, //当前展示的节目数量，用来控制下载加载更多
  },
  // 控制详情 节目 tabar的切换
  toggleTabBar(event) {
    this.setData({
      tabBar_index: event.currentTarget.dataset.index
    })
  },
  // 后退到上一个界面
  goback() {
    wx.navigateBack({
      
    })
  },
  // 获取电台的节目数据
  getRadioStationProgram(count) {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get("/dj/program?rid=" + this.data.id + "&limit=" + count).then(res => {
      wx.hideLoading();
      res.data.programs.map(item => {
        // 处理发布时间
        let currentTime = new Date();
        let current_year = currentTime.getFullYear()
        let createTime = new Date(item.createTime);
        let create_year = createTime.getFullYear();
        let create_month = createTime.getMonth() + 1;
        let create_day = createTime.getDate();
        if (current_year == create_year) {
          item.createTime = create_month + "-" + create_day
        } else {
          item.createTime = create_year + "-" + create_month + "-" + create_day
        }
        // 处理播放量
        if (item.listenerCount > 10000) {
          item.listenerCount = (item.listenerCount / 10000).toFixed(1) + "万"
        }
        if (item.listenerCount > 100000000) {
          item.listenerCount = (item.listenerCount / 100000000).toFixed(1) + "亿"
        }
        //处理时间
        //得到小时部分
        let hour_part = Math.floor(item.duration / 1000 / 3600);
        //得到分钟部分
        let minute_part = Math.floor((item.duration - hour_part * 3600 * 1000) / 1000 / 60);
        //得到秒数部分
        let sec_part = Math.floor((item.duration - hour_part * 3600 * 1000 - minute_part * 60 * 1000) / 1000)
        if (item.duration / 1000 < 3600 && item.duration / 1000 >= 60) {
          item.duration = (minute_part < 10 ? "0" : "" + minute_part) + ":" + (sec_part < 10 ? "0" : "") + sec_part
        } else {
          item.duration = (sec_part < 10 ? "0" : "") + sec_part
        }
      })
      if (res.data.programs) {
        this.setData({
          programs: res.data.programs,
          programs_count: res.data.count
        })
      }
      console.log(res.data.programs);
    }).catch(err => {
      console.log(err);
    })
  },
  // 获取电台的详情的数据
  getRadioStationDetailArray() {
    app.globalData.fly.get("/dj/detail?rid=" + this.data.id).then(res => {
      if (res.data.djRadio.subCount > 100000000) {
        res.data.djRadio.subCount = (res.data.djRadio.subCount / 100000000).toFixed(1) + "亿"
      }
      if (res.data.djRadio.subCount > 10000) {
        res.data.djRadio.subCount = (res.data.djRadio.subCount / 10000).toFixed(1) + "万"
      }
      if (res.data.djRadio) {
        this.setData({
          dj: res.data.djRadio
        })
        console.log(this.data.dj)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取电台的url
  getUrl(){
    app.globalData.fly.get("/dj/program/detail?id=2064471726").then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    // 获取电台的详情的数据
    this.getRadioStationDetailArray();
    //获取电台节目的数据
    this.getRadioStationProgram(this.data.current_count);
    this.getUrl();
  },

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
    if (this.data.tabBar_index == 1) {
      console.log("下拉加载")
      this.setData({
        current_count: this.data.current_count + 30
      })
      this.getRadioStationProgram(this.data.current_count);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})