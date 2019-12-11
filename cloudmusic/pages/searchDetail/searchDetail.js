const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_value: "", //绑定popup输入框的值
    tab_bar_text: "综合", //绑定tabBar的切换
    key_words: "444",      //用来发送请求获取详情的接口传入的数据
    timer: 1,
    show_search_suggestion : false,
    search_suggestion_arr:[]
  },
  //tabBar的切换
  tabBarToggle(event){
    this.setData({
      tab_bar_text: event.currentTarget.dataset.text
    })
  },
  // 获取综合组建传过来的跳转到单曲的值
  getSingleSong(e){
    console.log(e.detail);
    this.setData({
      tab_bar_text: e.detail
    })
  },
  //跳转视频
  getVideo(e){
    console.log(e.detail);
    this.setData({
      tab_bar_text: e.detail
    })
  },
  //跳转歌单
  getSongList(e) {
    console.log(e.detail);
    this.setData({
      tab_bar_text: e.detail
    })
  },
  //跳转歌单
  getAlbum(e) {
    console.log(e.detail);
    this.setData({
      tab_bar_text: e.detail
    })
  },
  //跳转到用户
  getUser(e) {
    console.log(e.detail);
    this.setData({
      tab_bar_text: e.detail
    })
  },
  //跳转到电台
  getStation(e) {
    console.log(e.detail);
    this.setData({
      tab_bar_text: e.detail
    })
  },
  // 防抖函数
  debounce(e) {
    this.setData({
      input_value: e.detail.value
    })
   
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
    this.setData({
      timer: setTimeout(() => {
        //获取数据
        app.globalData.fly.get("/search/suggest?keywords=" + this.data.input_value).then(res => {
          if (res.data.result && res.data.result.songs) {
            //得到数据后展示搜索建议的数据
            this.setData({
              show_search_suggestion: true,
              search_suggestion_arr: res.data.result.songs
            })
          } else {
            //得到数据后展示搜索建议的数据
            this.setData({
              show_search_suggestion: false
            })
          }
        }).catch(err => {
          console.log(err);
          this.setData({
            show_search_suggestion: false
          })
        });
      }, 2000)
    })
  },
  //点击搜索建议跳转到搜索详情页面
  goToSearchDetail(e) {
    wx.navigateTo({
      url: '/pages/searchDetail/searchDetail?key_words=' + e.currentTarget.dataset.key_words
    })
  },
  //输入框的回车事件
  goToSearchDetailByInput() {
    wx.navigateTo({
      url: '/pages/searchDetail/searchDetail?key_words=' + this.data.input_value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.key_words){
      this.setData({
        key_words: options.key_words
      })
    }
    console.log(options.key_words);
    this.setData({
      input_value: this.data.key_words
    })
  },
  //后退
  goback(){
    wx.navigateBack({
      
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