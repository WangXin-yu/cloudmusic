const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer_type:[               //顶部导航栏的分类
      { type: "入驻歌手", cat:"5001"},
      { type: "华语男歌手", cat:"1001"},
      { type: "华语女歌手", cat:"1002"},
      { type: "华语组合/乐队", cat:"1003"},
      { type: "欧美男歌手", cat:"2001"},
      { type: "欧美女歌手", cat:"2002"},
      { type: "欧美组合/乐队", cat:"2003"},
      { type: "日本男歌手", cat:"6001"},
      { type: "日本女歌手", cat:"6002"},
      { type: "日本组合/乐队", cat:"6003"},
      { type: "韩国男歌手", cat:"7001"},
      { type: "韩国女歌手", cat:"7002"},
      { type: "韩国组合/乐队", cat:"7003"},
      { type: "其他男歌手", cat:"4001"},
      { type: "其他女歌手", cat:"4002"},
      { type: "其他组合/乐队", cat:"4003"},
    ],
    alph_type:['热', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    selected_index: 0,     //0->选中入驻歌手，以此往后推,
    artists: [],           //存储展示的歌手的数组
    defaultImg: "../../images/homePageIcons/music-icon.png",    //默认图片
    alpha_selected_index: '热',
    current_cat: "5001",        //记录当前下的cat
  },
  //跳转到歌手详情页面
  goToSingeDetail(event){
    console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: './singerDetail/singerDetail?id=' + event.currentTarget.dataset.id,
    })
  },
  //点击顶部切换ABCD的分类
  toggleAlpha(event){
    this.setData({
      alpha_selected_index: event.currentTarget.dataset.index
    })
    if (this.data.alpha_selected_index === "热"){
      app.globalData.fly.get("/artist/list?cat=" + this.data.current_cat).then(res => {
        wx.hideLoading();
        this.setData({
          artists: res.data.artists
        })
      }).catch(err => {
        console.log(err);
      })
    }else{
      //重新获取数据  //  artist/list?cat=1001&initial=b
      app.globalData.fly.get("artist/list?cat=" + this.data.current_cat + "&initial=" + this.data.alpha_selected_index).then(res => {
        console.log(res);
        wx.hideLoading();
        this.setData({
          artists: res.data.artists
        })
        console.log(this.data.artists);
      }).catch(err => {
        console.log(err);
      })
    }
  },

  //获取歌手分类的数组
  getArtistArray(cat){
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      current_cat : cat
    })
    app.globalData.fly.get("/artist/list?cat=" + cat).then(res=>{
      wx.hideLoading();
      this.setData({
        artists: res.data.artists
      })
      console.log(this.data.artists);
    }).catch(err=>{
      console.log(err);
    })
  },

  //点击顶部tabbar实现切换效果 根据顶部传过来的歌手类型的id获取歌手列表的数据
  toggleTopTabBar(event){
    this.setData({
      selected_index: event.currentTarget.dataset.index
    })
    let cat = event.currentTarget.dataset.cat;
    this.getArtistArray(cat);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArtistArray('5001');
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
    this.getArtistArray('5001');
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