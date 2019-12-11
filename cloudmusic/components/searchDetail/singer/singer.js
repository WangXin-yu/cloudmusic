
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
    singer_data: [],
    loading_finished: false,
  },

  ready(){
    this.getSingerData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取歌手的综合信息
    getSingerData() {
      wx.showLoading({
        title: '加载zhong...',
      })
      app.globalData.fly.get("/search?keywords=" + this.data.key_words+"&type=100").then(res => {
        wx.hideLoading();
        if (res.data.result.artists){
          this.setData({
            singer_data: res.data.result.artists
          })
        }
        console.log(this.data.singer_data);
        this.setData({
          loading_finished: true
        })  
      }).catch(err => {
        console.log(err);
      })
    },
    // 跳转到歌手的详情页面
    goToSingeDetail(event) {
      wx.navigateTo({
        url: '/pages/singer/singerDetail/singerDetail?id=' + event.currentTarget.dataset.id,
      })
    },
  }
})
