// pages/download/download.js
import api from '../../utils/api.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    photoList:[],
    selectAll: false,
    type:"",
    pid: 0,
    paths:"",
    unselectedPaths: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      type: options.type,
      pid: options.pid ? options.pid : 0
    });
    this.getPhotosList();
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
    var asycParms = wx.getStorageSync("asycParms");
    var progress = this.selectComponent("#progress");
    if (asycParms != null){
      debugger;
      wx.setStorageSync("asycParms", null);
      // 开始同步
      this.startAsyc();
      // 开始上传
      wx.request({
        url: api.asyc,
        data: asycParms,
        success: (res)=>{
          console.log("==============");
          console.log(res);
        },
        fail: ()=>{

        },
        complete: ()=>{
          // progress.updateProgress(100);
          // progress.hide();
        }
      })
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
   * 获取发布的图片
   */
  getPhotosList: function(){
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: api.getPublishPhotos,
      data:{
        id: this.data.id
      },
      success: (res)=>{
        if(res.data.state){
          var tempArr = [];
          res.data.paths.forEach((item)=>{
            tempArr.push({
              path: item,
              checked: false
            });

            this.setData({
              photoList: tempArr
            });
          });
        }
      },
      fail: ()=>{

      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 选择图片
   */
  toggleCheck: function(e){
    this.data.photoList[e.target.dataset.index].checked = !this.data.photoList[e.target.dataset.index].checked;
    this.setData({
      photoList: this.data.photoList
    });

    this.isCheckedAll();
  },
  /**
   * 全选
   */
  checkAll: function(){
    this.data.photoList.forEach((item)=>{
      item.checked = true;
    });
    this.setData({
      selectAll: true,
      photoList: this.data.photoList
    });
  },
  /**
   * 取消/返回
   */
  cancle: function(){
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 点击立即下载
   */
  downloadAll: function(){
    debugger;
    this.data.photoList.forEach((item)=>{
      if(item.checked){
        wx.downloadFile({
          url: item.path,
          success: (res)=>{
    
            wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: (res) => {
              debugger;
              console.log("下载成功！");
            },
            fail: () => {

            },
            complete: () => {

            }
          })
          }
        });
        
      }
      
    });
  },
  /**
   * 全部取消
   */
  unCheckAll: function(){
    this.data.photoList.forEach((item)=>{
      item.checked = false;
    });
    this.setData({
      selectAll: false,
      photoList: this.data.photoList
    });
  },
  /**
   * 判断是不是全选了
   */
  isCheckedAll: function(){
    var arr = this.data.photoList;
    for(var i=0; i < arr.length; i++){
      if(!arr[i].checked){
        this.setData({
          selectAll: false
        });
        return;
      }
    }

    this.setData({
      selectAll: true
    });
  },
  /**
   * 立即同步
   */
  asycAll: function(){
    this.getPaths();
     wx.navigateTo({
       url: `../selectPhotos/selectPhotos?id=${this.data.pid}&pid=${this.data.id}&paths=${this.data.paths}&type=asyc`,
     })
  },
  /**
   * 开始同步
   */
  startAsyc: function(){
    var progress = this.selectComponent("#progress");
    progress.show();
    var i = 0;
    var timmer = setInterval(()=>{
      if(i < 100){
        progress.updateProgress(i);
      }else{
        clearInterval(timmer);
        progress.hide();
      }
    },200);
  },
  /**
   * 删除
   */
  delete: function(){
    console.log("点击删除");
    this.getPaths();
    wx.request({
      url: api.deletePublish,
      data: {
        id: this.data.id,
        paths: this.data.unselectedPaths
      },
      success:(res)=>{
        wx.setStorageSync("deleteInfo", {
          paths: this.data.unselectedPaths,
          ckId: this.data.id
        });
        wx.showModal({
          title: '提示',
          content: '已成功删除10秒钟后生效',
          showCancel: false,
          success: ()=>{
            console.log("--------------");
            console.log("删除完毕！！！");
            wx.navigateBack({
              delta: 1
            });
          }
        });
      }
    });
  },
  /**
   * 获取选中的图片
   */
  getPaths: function(){
    var paths = "";
    var unselectedPaths = "";
    this.data.photoList.forEach((item) => {
      if (item.checked) {
        paths += (item.path + ",");
      }else{
        unselectedPaths += (item.path + ",");
      } 
    });
    paths = paths.slice(0, -1);
    unselectedPaths = unselectedPaths.slice(0,-1);

    this.setData({
      paths: paths,
      unselectedPaths: unselectedPaths
    });
  },
})