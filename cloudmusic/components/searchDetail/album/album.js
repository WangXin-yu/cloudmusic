
const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key_words:{
      type:String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    album_data:[],
    loading_finished: false,
  },

  ready(){
    this.getComprehensiveData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取歌手的综合信息
    getComprehensiveData() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/search?keywords=" + this.data.key_words+"&type=10").then(res => {
        wx.hideLoading();
        if (res.data.result.albums){
          this.setData({
            album_data: res.data.result.albums
          })
        }
       this.setData({
         loading_finished: true
       })
        console.log(this.data.album_data);
      }).catch(err => {
        console.log(err);
      })
    },
    // 跳转到歌单详情界面
    goToRecommandList(event) {
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/recommendSongs?id=' + event.currentTarget.dataset.id+"&formAlbum=" + true
      })
      app.globalData.fly.get("/album?id=" + event.currentTarget.dataset.id).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
  }
})
