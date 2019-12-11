import create from '../../utils/create'
import store from '../../store/index'
const app = new getApp();
create.Page(store, {
  use: ['currentSongIndex'],
  /**
   * 页面的初始数据
   */
  data: {
    id: 83285545,
    album: {},  ///存储album的数据
    songs: [],
    loading_finished: false,
    playBarIndex: -1,    //底部的播放歌曲的索引
  },
  goBack(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id: options.id
      })
    }
    console.log(this.data.id);
  },
  getDishesData(){
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get("/album?id="+this.data.id).then(res=>{
      wx.hideLoading();
      if(res.data.album){
        this.setData({
          album: res.data.album,
          songs: res.data.songs,
          loading_finished: true
        })
      }
      // 添加到vuex中
      store.data.privileges = this.data.songs;
      // 添加到本地一份
      wx.setStorageSync("privileges", this.data.songs);
      console.log(store.data.privileges);
    }).catch(err=>{
      console.log(err);
    })
  },
  //
  getPlayBarIndex(event){
    this.setData({
      playBarIndex: event.currentTarget.dataset.index
    })
    store.data.currentSongIndex = this.data.playBarIndex;
    console.log(event);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDishesData();
    console.log(store.data.currentSongIndex)
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