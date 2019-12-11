import create from '../../../utils/create'
import store from '../../../store/index'
const app = new getApp();
create.Page(store, {
  use: ['currentSongIndex'],
  /**
   * 页面的初始数据
   */
  data: {
    song_list_id: "924680166",//点击歌单传进来的id，有个默认值
    song_list: [],            //存取歌曲的列表
    show_sheet_list: false,   //控制显示歌曲列表的变量
    from_album: false,        //true表示从专辑页面来的，false,表示从其他的歌单来的
    //如果是从专辑来的
    album: {},                //如果从专辑来的需要存储album的数据来展示封面等数据
    playBarIndex: 0,         //给底部playBar传的点击的歌曲的index的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        song_list_id: options.id
      })
    }
    if(options.formAlbum === "true"){
      this.setData({
        from_album: true
      })
    }
  },
  // 
  getPlayBarIndex(e){
    this.setData({
      playBarIndex: e.detail
    })
    console.log(this.data.playBarIndex);
  },
  //返回上一个页面
  goBack(){
    wx.navigateBack({
      
    })
  },
  //通过得到的id获取到歌曲列表
  getSongList(){
    wx.showLoading({
      title: '加载中...',
    })
    // 如果是从歌单页面来的
    if (!this.data.from_album){
      app.globalData.fly.get("/playlist/detail?id=" + this.data.song_list_id).then(res => {
        wx.hideLoading();
        if (res.data.playlist.playCount > 100000000) {   //大于亿以亿为单位
          res.data.playlist.playCount = (res.data.playlist.playCount / 100000000).toFixed(1) + "亿"
        } else if (res.data.playlist.playCount > 10000) {  //大于万以万为单位
          res.data.playlist.playCount = (res.data.playlist.playCount / 10000).toFixed(0) + "万"
        }
        if (res.data.playlist.subscribedCount > 100000000) {   //大于亿以亿为单位
          res.data.playlist.subscribedCount = (res.data.playlist.subscribedCount / 100000000).toFixed(1) + "亿"
        } else if (res.data.playlist.subscribedCount > 10000) {  //大于万以万为单位
          res.data.playlist.subscribedCount = (res.data.playlist.subscribedCount / 10000).toFixed(0) + "万"
        }
        this.setData({
          song_list: res.data,
          show_sheet_list: true,
        })
      }).catch(err => {
        console.log(err);
      })
    }else{  //如果从专辑界面来的
      app.globalData.fly.get("/album?id=" + this.data.song_list_id).then(res=>{
        console.log(res);
        wx.hideLoading();
        this.setData({
          song_list: res.data.songs,
          show_sheet_list: true,
          album: res.data.album
        })
        console.log(this.data.song_list);
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // //获取歌单数据
    this.getSongList();
    //获取歌曲的详细
    // this.getDetailSong();
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