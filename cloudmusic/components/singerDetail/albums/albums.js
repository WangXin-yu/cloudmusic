const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    singer_id:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hot_albums: [],
    loading_finished: false
  },

  ready(){
    this.getAlbumsData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getAlbumsData(){
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/artist/album?id=" + this.data.singer_id +"&limit=30").then(res=>{
        wx.hideLoading();
        console.log(res);
        if (res.data.hotAlbums){
          this.setData({
            hot_albums: res.data.hotAlbums,
            loading_finished: true
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }
})
