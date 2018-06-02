// pages/photos/photos.js
import  util from "../../utils/util.js";
import api from "../../utils/api.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photosArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginCompnent = this.selectComponent("#authorieze");
    // console.log(loginCompnent);
    loginCompnent.show((userInfo) => {
      console.log("--------------");
      console.log(userInfo);
    });
    console.log("---------------");
    console.log(loginCompnent.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.login(()=>{
      this.getPhotosByUser();
    });
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
   * 创建相册
   */
  createPhotos: function(){
    wx.navigateTo({
      url: '../types/types',
    })
  },
  /**
   * 获取用户信息
   */
  agree: function(userInfo){
    app.globalData.userInfo = userInfo.detail.detail.userInfo;
  },
  /**
   * 获取用户相册
   */
  getPhotosByUser: function(){
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: api.getPhotosByUser,
      data: {
        userId: app.globalData.openId
      },
      success: (res)=>{
        console.log("获取用户相册信息成功！");
        console.log(res);
        if(res.data.state){
          // 
          this.setData({
            photosArr: res.data.result
          });

        }
      },
      fail: (res)=>{

      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  }
})