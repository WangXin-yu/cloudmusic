const app = new getApp();
const bgMusic = wx.getBackgroundAudioManager() //创建背景音乐
import create from '../../../../utils/create'
import store from '../../../../store/index'
create.Page(store,{
  use:[
    "current_playback_progress",
    "current_playback_progress_minutes",
    "current_playback_progress_seconds",
    "current_song_duration",
    "current_song_duration_minutes",
    "current_song_duration_seconds",
    "play_or_pause",
    "playback_mode",
    "current_song_cover",
    "songs_info"
  ],
  /**
   * 页面的初始数据
   */
  data: {
    song_id: 1405327607, //当前歌曲的id
    current_song_cover: "", //歌曲的封面
    song_url: "", //歌曲的url
    // current_playback_progress: 0,    //记录当前播放进度
    // current_playback_progress_minutes: 0,   //当前播放时间的分钟部分
    // current_playback_progress_seconds: 0,   //当前播放时间的分钟部分
    // current_song_duration_minutes: 0,    //记录当前歌曲的总时长的分钟部分
    // current_song_duration_seconds: 0,    //记录当前歌曲的总时长的秒数部分
    collect: false,                     //是否收藏
    pase_or_play: true,               //true->正在播放状态为暂停按钮, false->暂停状态为播放按钮
    direction: 0,                     //-1表示当前点击上一首 1表示当前点击下一首
    songs_info: [],                   //歌曲信息
  },
  //后退
  goBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  //拖动滑块的事件
  dragSlider(event){
    console.log(event)
    // console.log(event.detail);
    //当前播放的歌曲跳转到拖动到的地方的value值的地方
    store.data.bgMusic.seek(event.detail.value);
  },
  //暂停与播放按钮icon的切换
  playOrPause(event){
    store.data.play_or_pause = event.currentTarget.dataset.play_or_pause;
    console.log(store.data.play_or_pause);
    if (store.data.play_or_pause == 1){ //由true切换为false 图标由暂停切换到播放按钮，表示当前歌曲由播放状态切换为暂停状态
      store.data.bgMusic.pause();          
    } else {                    //由false切换为true 图标由播放按钮切换到暂停按钮，表示当前歌曲由暂停状态，切换为播放
      store.data.bgMusic.play(); 
    }
  },
  //歌曲的切换
  songSwitching(event){ //direction取值由两个 -1 1， -1表示切换到上一首， 1表示切换到下一首
    let direction = event.currentTarget.dataset.direction;
    this.setData({
      direction: event.currentTarget.dataset.direction
    })
    // 如果暂停的时候切换歌曲，要将暂停状态设置为播放状态
    store.data.play_or_pause = 0;
    this.algorithmOfSongSwitching(direction)
    // 歌曲
  },
  algorithmOfSongSwitching(direction){
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
    //获取歌曲的url
    this.getSongUrl();
    //获取歌曲的封面
    this.getCoverOfTheCurrentSong();
  },
  //选择播放模式
  playBackMode(event){
    store.data.playback_mode = parseInt(event.currentTarget.dataset.mode);
    console.log(store.data.playback_mode);
  },
  //选择是否收藏
  isCollected(){
    this.setData({
      collect: !this.data.collect
    })  
  },
  //获取当前播放歌曲的封面  需要借助当前歌曲的在歌单中的位置current_song_index
  getCoverOfTheCurrentSong() {
    if (store.data.privileges.length > 0) {
      this.setData({
        song_id: store.data.privileges[store.data.currentSongIndex].id
      })
    }
    app.globalData.fly.get("/song/detail?ids=" + this.data.song_id).then(res => {
      store.data.current_song_cover = res.data.songs[0].al.picUrl;
      store.data.songs_info = res.data.songs;
      console.log(this.data.songs_info);
    }).catch(err => {
      console.log(err);
    })
  },
  //获取歌曲的url
  getSongUrl() {
    app.globalData.fly.get("/song/url?id=" + this.data.song_id).then(res => {
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
        store.data.bgMusic.onEnded(()=>{
          console.log("当前音乐播放结束");
          this.algorithmOfSongSwitching(1);
        })
      }else{        //会员歌曲自动切换
        // this.algorithmOfSongSwitching(this.data.direction);
      } 
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取歌曲的封面
    // this.getCoverOfTheCurrentSong();
    console.log(options);
    if(options.fromSingle === "true"){
      //从单曲点击进来的
      //1.将当前的歌曲存入到本地的privileges里面
      store.data.privileges = wx.getStorageSync("privileges");
      store.data.currentSongIndex = 0;
      this.setData({
        song_id: store.data.privileges[store.data.currentSongIndex].id
      })
      //获取歌曲的url
      this.getSongUrl();
      //获取歌曲的封面
      this.getCoverOfTheCurrentSong();
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})