const app = new getApp();
import create from '../../../utils/create'
import store from '../../../store/index'
create.Component(store, {
  /**
   * 组件的属性列表
   */
  properties: {
    song_list:{
      type:Object,
      value: ()=>{}
    },
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    song_id: "",    //当前点击的歌曲的id, 用来获取歌曲的详细信息
    song_url: "",
  },


  /**
   * 组件的方法列表
   */
  methods: {
    // 获取歌曲详细信息
    // getDetailSongInfo(event) {
    //   let current_song_index = event.currentTarget.dataset.index
    //   let privileges = this.data.song_list.privileges;
    //   console.log(current_song_index);
    //   console.log(privileges);
    //   //跳转到播放歌曲界面
    //   console.log(JSON.stringify(privileges));
    //   wx.navigateTo({
    //     url: '../../../pages/homePageToRecommendSongs/recommendSongs/PlaySong/PlaySong?index=' + current_song_index,
    //   })
    // },
    //点击歌曲后给playBar传当前点击的歌的index
    sendPlayBarIndex(event){
      let index = event.currentTarget.dataset.index;
      store.data.currentSongIndex = index;
      this.triggerEvent("sendPlayBarIndex", index);
    },
  },

  ready: function(){
    //如果是从歌单点击进来的那么获取的是歌单的数据
    if (this.data.song_list.privileges){
      wx.setStorageSync("privileges", this.data.song_list.privileges)
      store.data.privileges = this.data.song_list.privileges
    } else {//如果是从专辑点进来的那么获取的是专辑的数据
      wx.setStorageSync("privileges", this.data.song_list)
      store.data.privileges = this.data.song_list
    }
  }
})
