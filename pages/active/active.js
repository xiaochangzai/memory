// pages/active/active.js
import api from '../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actives:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActives();
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
   * 查询活动信息列表
   */
  getActives: function(){
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: api.getActives,
      data:{},
      success: (res)=>{
        console.log("====== 获取信息列表成功！ ======");
        console.log(res);
        this.setData({
          actives: res.data.result
        });
      },
      complete: ()=>{
        wx.hideLoading();
      }
    })
  }
})