const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    newSongsNewForces: [], //存储新歌新势力的数组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNewSongsNewForcesData() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("personalized/newsong").then(res => {
        wx.hideLoading();
        res.data.result = res.data.result.slice(0, 6);
        this.setData({
          newSongsNewForces: res.data.result
        })
        console.log(this.data.newSongsNewForces);
      }).catch(err => {
        console.log(err);
      })
    },
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
  },

  ready: function() {
    this.getNewSongsNewForcesData();
  }
})