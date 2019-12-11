const app = new getApp();
Component({
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
    user_data:[],
    loading_finished: false,
  },

  ready(){
    this.getUserData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取歌手的综合信息
    getUserData() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/search?keywords=" + this.data.key_words +"&type=1002").then(res => {
        wx.hideLoading();
        if (res.data.result.userprofiles){
          this.setData({
            user_data: res.data.result.userprofiles
          })
        }
        this.setData({
          loading_finished: true
        })
      }).catch(err => {
        console.log(err);
      })
    },

  }
})
