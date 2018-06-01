// pages/uploadImage/uploadImage.js
import api from '../../utils/api.js';
import util from '../../utils/util.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFiles:[],
    fileType: "",
    syncTit: "同步到其他相册",
    id: 0,
    message:"",
    location: "油松商务大厦",
    pids:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    util.login();
    var tempFiles = wx.getStorageSync("tempFiles");
    this.setData({
      fileType: tempFiles.type,
      tempFiles: tempFiles.tempFiles
    });
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
    console.log("又显示了");
    var selelctedPhotos = wx.getStorageSync("selelctedPhotos");
    if(selelctedPhotos != null){
      var tempStr = "";
      var tempPids = "";
      selelctedPhotos.forEach((item)=>{
        tempStr += item.name;
        tempStr += "/";
        tempPids += item.vrId;
        tempPids += ",";
      });
      tempStr = tempStr.slice(0,-1);
      tempPids += this.data.id;
      this.setData({
        syncTit: tempStr,
        pids: tempPids
      });
    }else{

    }
    console.log("==============");
    console.log(selelctedPhotos);
    wx.setStorageSync("selelctedPhotos", null);
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
   * 用户点击删除照片
   */
  deleteImage: function(e){
    console.log('用户点击删除照片！');
    console.log(e);
    var index = e.target.dataset.index;
    console.log(index);

    // 截取数组
    this.data.tempFiles.splice(index,1);
    this.setData({
      tempFiles: this.data.tempFiles
    });
  },
  /**
   * 继续添加照片
   */
  addPhotos: function(){
    if(this.data.tempFiles.length >=8){
        return;
    }
    if(this.data.fileType == "image"){
      wx.chooseImage({
        count: 8 - this.data.tempFiles.length,
        success: (res)=> {
          this.setData({
            tempFiles: this.data.tempFiles.concat(res.tempFiles)
          });
        },
        fail: (res)=>{

        },
        complete: (res)=>{

        }
      })
    }

    if(this.fileType == "video"){

    }
  },
  /**
   * 用户点击 同步到其他相册
   */
  asycOtherPhotos: function(){
    wx.navigateTo({
      url: '../selectPhotos/selectPhotos?id=' + this.data.id
    })
  },
  /**
   * 开始上传
   */
  start: function(fn){
    debugger;
    wx.setStorageSync("uploadInfo", {
      uploadStart: true,
      tempFiles: this.data.tempFiles,
      location: this.data.location,
      pids: this.data.pids,
      message: this.data.message
    });
    // 返回
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 输入留言
   */
  inputMessage: function(e){
    this.setData({
      message: e.detail.value
    });
  }
})