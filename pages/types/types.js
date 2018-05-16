// pages/types/types.js
import api from "../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [{
      name:"朋友",
      selected: false,
      title:"我们的圈子"
    }, {
      name: "个人",
      selected: false,
      title:"我的相册"
      }, {
        name: "家人",
        selected: false,
        title: "我们这一家人"
    }, {
      name: "宝宝",
      selected: false,
      title: "宝宝成长日记"
      }, {
        name: "同学",
        selected: false
    }, {
      name: "同事",
      selected: false
      }, {
        name: "情侣",
        selected: false
    }, {
      name: "萌宠",
      selected: false
      }, {
        name: "组织",
        selected: false
    }, {
      name: "摄影",
      selected: false
      }, {
        name: "粉丝",
        selected: false
    }, {
      name: "其它",
      selected: false,
      currentIndex: -1
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 点击了某个标签
   */
  selectTag: function(e){
    console.log(e);
    var index = e.target.dataset.index;
    if(this.data.currentIndex >= 0){
      this.data.typeArr[this.data.currentIndex].selected = false;
    }
    this.data.typeArr[index].selected = true;

    this.setData({
      typeArr: this.data.typeArr,
      currentIndex: index
    });
  },
  /**
   * 创建相册
   */
  createPhotos: function(){
    if(this.data.currentIndex < 0){
      return;
    }
    var item = this.data.typeArr[this.data.currentIndex];
    wx.request({
      url: api.addPhotos,
      data: {
        name: item.title,
        coverImage: "sdadasdasd",
        userId: "asasdfsdf",
        tag: item.name
      },
      success: (res)=>{
        console.log("创建相册成功！");
        console.log(res);
        wx.navigateTo({
          url: '../ourcercle/ourcercle?id=' + res.data.id,
        })
      }
    })
  }
})