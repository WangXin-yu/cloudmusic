import create from '../../../utils/create'
import store from '../../../store/index'
const app = new getApp();
create.Component(store, {
  /**
   * 组件的属性列表
   */
  properties: {
    limit: {
      type: Number,
      value: 0,
    },
    singer_id: {
      type: Number,
      value: 0,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    hot_songs: [],             //存储热门歌手
    loading_finished: false,
  },

  ready(){
    this.getSingerSongList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取歌手的歌曲列表
    getSingerSongList() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/artists?id=" + this.data.singer_id).then(res => {
        wx.hideLoading();
        this.setData({
          hot_songs: res.data.hotSongs,
          loading_finished: true,
        })
        if (this.data.limit == 5){
          wx.setStorageSync("privileges", this.data.hot_songs.slice(0, 5))
          store.data.privileges = this.data.hot_songs.slice(0, 5)
        }else{
          wx.setStorageSync("privileges", this.data.hot_songs)
          store.data.privileges = this.data.hot_songs
        }
      }).catch(err => {
        console.log(err);
      })
    },
    goToPlaySong(event) {
      console.log(11);
      let privileges = wx.getStorageSync("privileges")
      privileges.unshift(event.currentTarget.dataset.privilege);
      wx.setStorageSync("privileges", privileges)
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/PlaySong/PlaySong?fromSingle=true',
      })
    },
  }
})
