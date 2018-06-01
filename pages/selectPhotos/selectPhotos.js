// pages/selectPhotos/selectPhotos.js
import api from "../../utils/api.js";
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allSelected: true,
    photosList: [],
    id: 0,
    pids:"",
    pid:"", // publishId
    paths:"",
    type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger;
    this.setData({
      id: options.id,
      pid: options.pid ? options.pid : "",  // publishId
      paths: options.paths ? options.paths : "",
      type: options.type ? options.type: ""
    });
    this.getPhotosByUser();
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
   * 用户点击了确认
   */
  submitPhotos: function(){
    var tempArr = [];
    this.data.photosList.forEach((item)=>{
      if(item.checked){
        tempArr.push({
          vrId: item.vrId,
          checked: true,
          name: item.name
        });
      }
    });

    wx.setStorageSync("selelctedPhotos", tempArr);
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 获取用户所有相册
   */
  getPhotosByUser: function(){
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: api.getPhotosByUser,
      data: {
        userId: "oFWIb0dvIrGLxx8__oevz-HplnKw"
      },
      success: (res)=>{
        if (res.data.state) {
          var tempIndex = -1;
          res.data.result.forEach((item,index)=>{
            item.checked = false;
            if(item.vrId == this.data.id){
              tempIndex = index;
            }
          });
          // 去除自己
          res.data.result.splice(tempIndex,1);
          this.setData({
            photosList: res.data.result
          });
        }
      },
      fail: (res)=>{
        
      },
      complete: (res)=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 状态发生改变
   */
  radioChange: function(res){
    var index = res.target.dataset.index;
    var checked = res.detail.checked
    this.data.photosList[index].checked = checked;
    this.setData({
      photosList: this.data.photosList
    });
  },
  /**
   * 立即同步
   */
  asycSoon: function(){
    // 计算pids
    this.getPids();
    wx.showLoading({
      title: '正在同步...',
    })
    debugger;
    wx.setStorageSync("asycParms", {
      paths: this.data.paths,
      pids: this.data.pids,
      pid: this.data.pid,
      userId: app.globalData.openId
    });
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 获取pids
   */
  getPids: function(){
    var tempStr = "";
    this.data.photosList.forEach((item)=>{
      if(item.checked){
        tempStr += (item.vrId + ",")
      }
      
    });
    tempStr.slice(0, -1);
    this.setData({
      pids: tempStr
    });
  }
})