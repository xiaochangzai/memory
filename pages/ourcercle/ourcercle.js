// pages/ourcercle/ourcercle.js
import api from '../../utils/api.js';
import util from "../../utils/util.js";

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 9,
    info:{

    },
    progressNum:0,
    uploadInfo:{},
    uploadPaths:"",
    uploadding: false,
    publishList: []
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      id: options.id
    });
    this.getPhotosDetail();
    this.getPublishs();
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
    var uploadInfo = wx.getStorageSync("uploadInfo");
    this.setData({
      uploadInfo: uploadInfo
    });

    if (uploadInfo.uploadStart){
      // 先关闭菜单
      var menu = this.selectComponent("#menus");
      menu.hide();
      // 开始上传任务
      // 显示进度条
      this.setData({
        uploadding: true
      });
      util.uploadFiles({
        tempFiles: uploadInfo.tempFiles,
        success: (res)=>{
          var tempStr = "";
          res.forEach(function(item){
            tempStr += item.path;
            tempStr += ",";
          });
          tempStr = tempStr.slice(0,-1);
          this.setData({
            uploadPaths: tempStr
          });
          
          // 隐藏 进度条
          this.setData({
            uploadding: false
          });
          // 发表动态
          this.publish();
        },
        onProgress: (res)=>{
         
          this.setData({
            progressNum: res*100
          });
        }
      });

    }
    uploadInfo.uploadStart = false;
    // 清楚上传文件缓存
    wx.setStorageSync("uploadInfo", uploadInfo);
    
    // 删除逻辑代码=========================
    var delInfo = wx.getStorageSync("deleteInfo");
    if(delInfo != null){
      wx.setStorageSync("deleteInfo", null);
      var id = delInfo.ckId;
      var index = this.getIndexById(id);
      if(delInfo.paths.length == 0){
        // 完全删除
        this.data.publishList.remove(index);
      }else{
        // 删除一部分
        this.data.publishList[index].paths = delInfo.paths.split(",");
      }
      this.setData({
        publishList: this.data.publishList
      });

    }
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
   * 获取相册详细信息
   */
  getPhotosDetail: function(){
    wx.request({
      url: api.getPhotosDetail,
      data:{
        id: this.data.id
      },
      success: (res)=>{
        this.setData({
          info: res.data.result
        });
        }
    })
  },
  /**
   * 显示菜单
   */
  showMenu: function () {
    var menu = this.selectComponent("#menus");
    menu.show();
  },
  /**
   * 发表动态
   */
  publish: function(){
    wx.showLoading({
      title: '正在发布...',
    });
    wx.request({
      url: api.publish,
      data: {
        message: this.data.uploadInfo.message,
        location: this.data.uploadInfo.location,
        userId: app.globalData.openId,
        pidList: this.data.uploadInfo.pids,
        pid: this.data.id,
        paths: this.data.uploadPaths
      },
      success: (res)=>{
        console.log("发布成功！");
        console.log(res);
      },
      fail: (res)=>{
        console.log("发布失败！");
        console.log(res);
      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 获取此相册下的发布记录
   */
  getPublishs: function(){
    // 显示加载中...
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: api.getPublishs,
      data: {
        id: this.data.id,
        userId: app.globalData.openId
      },
      success: (res)=>{
        console.log("获取发布记录成功");
        console.log(res);
        if(res.data.state){
          this.setData({
            publishList: res.data.result
          });
        }
      },
      fail: ()=>{

      },
      complete: (res)=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 置顶
   */
  totop: function(e){
    var index = e.target.dataset.index;
    console.log(index);
    this.setData({
      publishList: this.data.publishList.move(index,0)
    });
  },
  /**
   * 删除
   */
  delete: function(e){

  },
  getIndexById: function(id){
    for (var i = 0; i < this.data.publishList.length; i++){
      var item = this.data.publishList[i];
      var id = item.vrId;
      if(id == item.vrId){
          return i;
      }
    }

    return null;
  }
})