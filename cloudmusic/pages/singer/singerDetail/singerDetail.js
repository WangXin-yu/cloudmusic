const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    limit: 5,  //用来给song组件传值来控制歌曲展示的数量
    singer_id: 10559,          //歌手的默认id
    singer_info: {},        //存储歌手的基本信息
    hot_songs: [],             //存储热门歌手
    tabBar_index: "主页",        
    loading_finished: false,  
                
  },
  // 主页跳转到歌曲
  getSongs(e){
    console.log(e);
    this.setData({
      tabBar_index: e.detail
    })
  },
  //goback
  goBack(){
    wx.navigateBack({
    
    })
  },
  //切换tabbar
  toggleTabBar(event){
    this.setData({
      tabBar_index: event.currentTarget.dataset.index
    })
  },
  //获取歌手的歌曲列表
  getSingerSongList(){
    app.globalData.fly.get("/artists?id="+this.data.singer_id).then(res=>{
      if (res.data.hotSongs){
        this.setData({
          singer_info: res.data.artist,
          hot_songs: res.data.hotSongs,
          loading_finished: true
        })
      }
      console.log(this.data.hot_songs);
    }).catch(err=>{
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        singer_id: options.id
      })
    }
    //获取歌手的歌曲列表
    this.getSingerSongList();
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