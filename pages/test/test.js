// pages/test/test.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false
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
   * 上传图片
   */
  uploadFile: function(){

    util.uploadFiles({
      onProgress: (progress)=>{
        console.log(" 显示进度： " + progress);
      },
      success: (res)=>{
        console.log(" 所有的图片都上传完成！");
        console.log(res);
      }
    });
    
  },
  /**
   * 显示菜单
   */
  showMenu: function(){
    var menu = this.selectComponent("#menus");
    menu.show();
  },
  /**
   * 改变回调
   */
  radioChange: function(res){
    console.log("发生改变！");
    console.log(res);
  },
  /**
   * 上传
   */
  upload: function(){
    var progress = this.selectComponent("#progress");
    progress.show();
    var i = 0;
    var timmer = setInterval(()=>{
      progress.updateProgress(i++);
    },50);
  },
  /**
   * 聚焦
   */
  focusOn: function(){
    var input = this.selectComponent("#input");
    input.show();
  },
  /**
   * 发送
   */
  send: function(value){
    console.log("点击发送！");
    console.log(value);
  }
})