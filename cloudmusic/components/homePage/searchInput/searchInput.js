const app = new getApp();
// components/homePage/searchInput.js
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
    show_popup: false, //控制输入框点击后的弹出层的显示
    hots: [], //获取热搜榜的数据
    input_value: "", //绑定popup输入框的值
    timer: 0,         //控制搜索的防抖事件
    show_search_suggestion: false,    //true显示搜索建议的面板
    search_suggestion_arr: [],        //搜索建议的数组
    history: [],      //存储搜索历史的数组
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击搜索进行搜索
    onSearch(e) {
      console.log(e);
    },
    //选中搜索框时弹出热搜榜界面
    onFocus() {
      this.setData({
        show_popup: true,
      })
    },
    //由弹出层界面返回首页界面
    goback() {
      this.setData({
        show_popup: false,
      })
    },
    // 获取热搜榜
    getHotRank() {
      app.globalData.fly.get("/search/hot/detail").then(res => {
        this.setData({
          hots: res.data.data
        })
        console.log(this.data.hots);
      }).catch(err => {
        console.log(err);
      })
    },
    //onConfirm 点击确定时将输入框的值传入到搜索详情页面
    onConfirm(){
      console.log("跳转到搜索详情页面")
      //input_value的值传给searchDetail并且存到本地
      if(!wx.getStorageSync("history")){
        wx.setStorageSync("history", []);
      }
      let history = wx.getStorageSync("history");
      let needPush = true;
      let location_with_same_value = 0;
      for(let i in history){
        if(history[i] == this.data.input_value){
          //已经有该搜索历史了
          needPush = false;
          location_with_same_value = i;
          break;
        }
      }
      if (needPush){
        history.push(this.data.input_value)
      }
      wx.setStorageSync("history", history);
      this.setData({
        history: history
      })
     
      wx.navigateTo({
        url: '/pages/searchDetail/searchDetail?key_words='+this.data.input_value
      })
    },
    //删除历史记录
    deleteHistory(){
      wx.setStorageSync("history", []);
      this.setData({
        history: wx.getStorageSync("history")
      })
      console.log(123);
    },
    //点击搜索建议跳转到搜索详情页面
    goToSearchDetail(e){
      if (!wx.getStorageSync("history")) {
        wx.setStorageSync("history", []);
      }
      let history = wx.getStorageSync("history");
      let needPush = true;
      let location_with_same_value = 0;
      for (let i in history) {
        if (history[i] == e.currentTarget.dataset.key_words) {
          //已经有该搜索历史了
          needPush = false;
          location_with_same_value = i;
          break;
        }
      }
      if (needPush) {
        history.push(e.currentTarget.dataset.key_words)
      }
      wx.setStorageSync("history", history);
      this.setData({
        history: history
      })
      wx.navigateTo({
        url: '/pages/searchDetail/searchDetail?key_words=' + e.currentTarget.dataset.key_words
      })
    },
    // 隐藏搜索建议输入框
    hideSearchSuggestions(){
      this.setData({
        show_search_suggestion: false
      })
    },
    // 防抖函数
    debounce(e) {
      this.setData({
        input_value: e.detail.value
      })
      if (this.data.timer) {
        clearTimeout(this.data.timer);
      }
      this.setData({
        timer: setTimeout(() => {
          //获取数据
          app.globalData.fly.get("/search/suggest?keywords=" + this.data.input_value).then(res => {
            if (res.data.result && res.data.result.songs){
              //得到数据后展示搜索建议的数据
              this.setData({
                show_search_suggestion: true,
                search_suggestion_arr: res.data.result.songs
              })
            }else{
              //得到数据后展示搜索建议的数据
              this.setData({
                show_search_suggestion: false
              })
            }
          }).catch(err=>{
            console.log(err);
            this.setData({
              show_search_suggestion: false
            })
          });

        }, 1000)
      })

    },
  },

  ready() {
    this.getHotRank();
     if(wx.getStorageSync("history")){
       this.setData({
         history: wx.getStorageSync("history")
       })
      }
  },
})