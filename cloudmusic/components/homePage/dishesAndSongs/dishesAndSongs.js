import create from '../../../utils/create'
import store from '../../../store/index'
const app = new getApp();
create.Component(store, {
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    dish_list: [],      //存储新碟的数据
    song_list: [],      //存储新歌的数据
    toggle: 0,          // 0->切换到新碟 1->切换到新歌
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到新碟的详情页面
    goDishesDetail(event){
      console.log(event);
      wx.navigateTo({
        url: '/pages/homePageToNewDishes/homePageToNewDishes?id='+event.currentTarget.dataset.id,
      })
    },
    //获取新碟的数据
    getDishList() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("http://49.233.66.125:3000/top/album?offset=0&limit=6").then(res => {
        wx.hideLoading();
        this.setData({
          dish_list: res.data.albums
        })
      }).catch(err => {
        console.log(err);
      })
    },
    // 点击新歌后跳转到播放页面
    goToPlaySong(event){
      let privileges = wx.getStorageSync("privileges")
      privileges = privileges.filter(item=>{
        return item.id != event.currentTarget.dataset.privilege.id
      })
      privileges.unshift(event.currentTarget.dataset.privilege);
      wx.setStorageSync("privileges", privileges)
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/PlaySong/PlaySong?fromSingle=true',
      })
    },
    //获取新歌的数据
    getSongList(){
      app.globalData.fly.get("http://49.233.66.125:3000/top/song").then(res => {
        res.data.data = res.data.data.slice(0, 6);
        this.setData({
          song_list: res.data.data
        })
        console.log(this.data.song_list);
      }).catch(err => {
        console.log(err);
      })
    },
    //切换新碟和新歌选项
    toggleEvent(event){
      this.setData({
        toggle: event.currentTarget.dataset.index
      })
    },
    
  },
  ready: function () {
    //获取新碟的数据
    this.getDishList();
    //获取新歌的数据
    this.getSongList();
    console.log(store.data.privileges);
  }

})
