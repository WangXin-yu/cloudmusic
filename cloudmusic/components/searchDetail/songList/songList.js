const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key_words:{
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playlists: [],
    loading_finished: false,
  },

  /**
   * 组件的方法列表
   */
  ready(){
    this.getSongListData();
  },
  methods: {
    //获取歌手的综合信息
    getSongListData() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/search?keywords=" + this.data.key_words +"&type=1000").then(res => {
        wx.hideLoading();
        if (res.data.result.playlists){
          this.setData({
            playlists: res.data.result.playlists
          })
        }
        console.log(this.data.playlists);
        this.setData({
          loading_finished: true
        })
      }).catch(err => {
        console.log(err);
      })
    },
    // 跳转到歌单详情界面
    goToRecommandList(event) {
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/recommendSongs?id=' + event.currentTarget.dataset.id,
      })
    },
  }
})
