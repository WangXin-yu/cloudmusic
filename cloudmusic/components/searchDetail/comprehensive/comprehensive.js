import create from '../../../utils/create'
import store from '../../../store/index'
const app = new getApp();
create.Component(store, {
  /**
   * 组件的属性列表
   */
  properties: {
    key_words: {
      type: String,
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    comprehensive_data: {}, //存储综合页面的所有的数据
    song_count: 0, //存储歌手的歌曲数量
    album_count: 0, //存储歌手的专辑数量,
    loading_finished: false, //表示是否加载完成，加载完成了在显示数据    
  },

  ready() {
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

      app.globalData.fly.get("/search?keywords=" + this.data.key_words + "&type=1018").then(res => {
        wx.hideLoading();
        this.setData({
          loading_finished: true,
        })
        // 处理歌单的播放量
        res.data.result.playList.playLists.map(item => {
          if (item.playCount > 100000000) {
            item.playCount = (item.playCount / 100000000).toFixed(1) + "亿"
          }
          if (item.playCount > 10000) {
            item.playCount = (item.playCount / 10000).toFixed(1) + "万"
          }
        })
        this.setData({
          comprehensive_data: res.data.result,
        })
        console.log(this.data.comprehensive_data);
        wx.setStorageSync("privileges", this.data.comprehensive_data.song.songs)
        store.data.privileges = this.data.comprehensive_data.song.songs
        //获取歌手的歌曲数量
        if (res.data.result.artist) {
          app.globalData.fly.get("artists?id=" + res.data.result.artist.artists[0].id).then(res => {
            if (res.data.artist) {
              this.setData({
                song_count: res.data.artist.musicSize,
                album_count: res.data.artist.albumSize
              })
            }
          }).catch(err => {
            console.log(err);
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 跳转到单曲界面
    goToSingleSong() {
      let tab_bar_text = "单曲"
      this.triggerEvent('goToSingleSong', tab_bar_text)
    },
    // 跳转到单曲界面
    goToVideo() {
      let tab_bar_text = "视频"
      this.triggerEvent('goToVedio', tab_bar_text)
    },
    // 跳转到歌单
    goToSongList() {
      let tab_bar_text = "歌单"
      this.triggerEvent('goToSongList', tab_bar_text)
    },
    // 跳转到歌单
    goToAlbum() {
      let tab_bar_text = "专辑"
      this.triggerEvent('goToAlbum', tab_bar_text)
    },
    // 跳转到用户
    goToUser() {
      let tab_bar_text = "用户"
      this.triggerEvent('goToUser', tab_bar_text)
    },
    // 跳转到电台
    goToStation() {
      let tab_bar_text = "主播电台"
      this.triggerEvent('goToStation', tab_bar_text)
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
    // 跳转到歌单详情界面
    goToRecommandList(event) {
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/recommendSongs?id=' + event.currentTarget.dataset.id,
      })
    },
  }
})