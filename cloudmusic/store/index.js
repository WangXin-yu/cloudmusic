export default {
  data: {
    currentSongIndex: -1,    //当前播放的歌曲的下表
    current_song_cover: "",   //当前歌曲的封面
    songs_info:[],          //当前歌曲的信息
    privileges: [],         //存储歌曲列表的数组
    play_or_pause: 0,       //0表示暂停状态，1表示播放状态
    bgMusic: wx.getBackgroundAudioManager(), //创建背景音乐
    current_playback_progress:0,
    current_playback_progress_minutes:0,
    current_playback_progress_seconds:0,
    current_song_duration:0,
    current_song_duration_minutes:0,
    current_song_duration_seconds:0,
    playback_mode: 0,     //歌曲播放的模式 播放模式 0-列表循环 1-随机播放 2-单曲循环
  }
}