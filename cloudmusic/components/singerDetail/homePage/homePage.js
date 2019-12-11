const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    singer_id:{
      type: Number,
      value: 0
    },
    singer_info:{
      type: Object,
      value: ()=>{},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading_finished: false,
    introduction: [],   //歌手的详细介绍
    show_popup: false,   //弹出更多信息
  },
  
  ready(){
    // 获取歌手的详细信息
    this.getSingerDesc();
    this.getSingeraccount();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取歌手的描述
    getSingerDesc() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/artist/desc?id=" + this.data.singer_id).then(res => {
        wx.hideLoading();
        if (res.data.briefDesc){
          this.setData({
            briefDesc: res.data.briefDesc
          })
        }
        if (res.data.introduction.length > 0){
          this.setData({
            introduction: res.data.introduction
          })
        }
        this.setData({
          loading_finished: true
        })
      }).catch(err => {
        console.log(err);
      })
    },
    // 点击more跳转到歌曲的组件面
    goToSongs(){
      let item = "歌曲"
      this.triggerEvent('goToSongs', item)
    },
    //点击more查看更多基本信息
    goToInformationDetail(){
      this.setData({
        show_popup: true
      })
    },
    //获取歌手用户数据
    getSingeraccount(){
      app.globalData.fly.get("/user/detail?uid=" + this.data.singer_info.accountId).then(res=>{
      }).catch(err=>{
        console.log(err);
      })
    }
  }
})
