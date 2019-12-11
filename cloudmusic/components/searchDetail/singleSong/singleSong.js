const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key_words: {
      type: String,
      value: "",
      loading_finished: false,    //表示是否加载完成
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    single_songs_data: [],      //所有单曲的数据
  },

  ready(){
    this.getSingleSongData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到播放详情页
    goToPlaySong(event) {
      console.log(11);
      let privileges = wx.getStorageSync("privileges")
      privileges.unshift(event.currentTarget.dataset.privilege);
      wx.setStorageSync("privileges", privileges)
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/PlaySong/PlaySong?fromSingle=true',
      })
    },
    //获取歌手的综合信息
    getSingleSongData() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/search?keywords=" + this.data.key_words+"&type=1").then(res => {
        wx.hideLoading();
        this.setData({
          loading_finished: true,
        })
        if (res.data.result.songs){
          this.setData({
            single_songs_data: res.data.result.songs,
            loading_finished: true,
          })
        }
        wx.setStorageSync("privileges", this.data.single_songs_data)
        store.data.privileges = this.data.single_songs_data
      }).catch(err => {
        console.log(err);
      })
    },
  }
})
