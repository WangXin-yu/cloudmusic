const app = new getApp();
import create from '../../utils/create'
import store from '../../store/index'
create.Component(store, {
  /**
   * 组件的属性列表
   */
  use: ['current_playback_progress_seconds', 'play_or_pause', 'current_song_cover', 'songs_info'],
  properties: {
    playBarIndex: {
      type: Number,
      value: 0,
    }
  },
  observers: {
    'playBarIndex' (index) {
      //获取到歌曲的下标后，通过获取共享歌单拿到歌曲的url然后播放
      if (store.data.privileges[index].id){
        this.setData({
          currentSong_id: store.data.privileges[index].id
        })
      }
      // 如果暂停了然后切换歌曲，要将暂停状态设置为播放状态
      store.data.play_or_pause = 0;
      // console.log(index)
      //获取歌曲的封面
      this.getCoverOfTheCurrentSong();
      // 获取url
      this.getSongUrl();
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentSong_id: 0, //当前点击的歌曲的id
    play_or_pause: 1, //0->play 1->pause
    song_url: "", //当前歌曲的url
  },

  /**
   * 组件的方法列表
   */
  ready(){
    this.setData({
      playBarIndex: store.data.currentSongIndex
    })
    console.log("1111111");
  },

  methods: {
    //获取当前播放歌曲的封面  需要借助当前歌曲的在歌单中的位置current_song_index
    getCoverOfTheCurrentSong() {
      app.globalData.fly.get("/song/detail?ids=" + this.data.currentSong_id).then(res => {
          store.data.current_song_cover = res.data.songs[0].al.picUrl,
          store.data.songs_info = res.data.songs
      }).catch(err => {
        console.log(err);
      })
    },
    //切换播放暂停按钮
    togglePlayOrPauseIcon(event) {
      store.data.play_or_pause =  event.currentTarget.dataset.play_or_pause
      if (store.data.play_or_pause == 1) { //由true切换为false 图标由暂停切换到播放按钮，表示当前歌曲由播放状态切换为暂停状态
        store.data.bgMusic.pause();
      } else { //由false切换为true 图标由播放按钮切换到暂停按钮，表示当前歌曲由暂停状态，切换为播放状态
        store.data.bgMusic.play();
      }
    },
    // 获取url
    getSongUrl() {
      app.globalData.fly.get("/song/url?id=" + this.data.currentSong_id).then(res => {
        this.setData({
          song_url: res.data.data[0].url
        })
        //播放歌曲
        store.data.bgMusic.title = "music";
        if (this.data.song_url) {
          store.data.bgMusic.src = this.data.song_url;
          store.data.bgMusic.onTimeUpdate(() => { //监听音频播放进度
            store.data.current_playback_progress = store.data.bgMusic.currentTime
            store.data.current_playback_progress_minutes = Math.round(store.data.bgMusic.currentTime / 60)
            store.data.current_playback_progress_seconds = Math.round(store.data.bgMusic.currentTime % 60) < 10 ? 0 + parseInt(store.data.bgMusic.currentTime % 60) : Math.round(store.data.bgMusic.currentTime % 60);
            store.data.current_song_duration = store.data.bgMusic.duration
            store.data.current_song_duration_minutes = Math.round(store.data.bgMusic.duration / 60)
            store.data.current_song_duration_seconds = Math.round(store.data.bgMusic.duration - (parseInt(store.data.bgMusic.duration / 60) * 60));
          })
          store.data.bgMusic.onEnded(() => {
            console.log("当前音乐播放结束");
            // this.algorithmOfSongSwitching(1);
          })
        } else { //会员歌曲自动切换
          // this.algorithmOfSongSwitching(this.data.direction);

        }
        // 当前歌曲播放完成时自动切换
        store.data.bgMusic.onEnded(()=>{
          this.algorithmOfSongSwitching(1)
        })
      }).catch(err => {
        console.log(err);
      })
    },
    // 歌曲自动切换
    algorithmOfSongSwitching(direction) {
      //当前为歌单循环播放模式
      if (store.data.playback_mode == 0) {
        if (direction == -1) {  //切换到上一首
          //current_song_index下表减1
          if (store.data.currentSongIndex == 0) { //当前歌曲为第一首，那么切换到最后一首
            store.data.currentSongIndex = store.data.privileges.length - 1
          } else {
            store.data.currentSongIndex = --(store.data.currentSongIndex)
          }
        } else {                  //切换到下一首
          if (store.data.currentSongIndex === store.data.privileges.length - 1) { //当前歌曲为最后一首，那么切换到第一首
            store.data.currentSongIndex = 0;
          } else {
            store.data.currentSongIndex = ++(store.data.currentSongIndex);
          }
        }
      } else if (store.data.playback_mode === 1) {  //当前歌单为随机播放
        while (true) {                          //为了避免随机播放的下一首和当前歌重复，进行循环判断
          //只有当获取的随机值与当前current_song_index的值不同时才进行赋值
          let random_index = Math.round((Math.random() * (store.data.privileges.length - 1)));
          if (random_index != store.data.currentSongIndex) {  //
            store.data.currentSongIndex = random_index
            break;
          }
        }
      } else {                              //当前歌曲为单曲循环, 停止播放从头开始重新播放
        bgMusic.stop();
      }
      this.setData({
        playBarIndex: store.data.currentSongIndex
      })
    },
    // 跳转到播放歌曲界面
    goToPlaySong() {
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/PlaySong/PlaySong',
      })
    }
  }
})