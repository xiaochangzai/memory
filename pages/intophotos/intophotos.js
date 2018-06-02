// pages/intophotos/intophotos.js
import api from '../../utils/api.js';
import util from '../../utils/util.js';
import dateUtil from '../../utils/dateUtil.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 5,
    detail: {},
    comments:[],
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.login(()=>{
      if (options.id) {
        this.setData({
          id: options.id
        });
      }
      this.getPublishDetail();
      this.getComments();
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
   * 获取发布详情
   */
  getPublishDetail: function(){
    wx.request({
      url: api.getPublishDetail,
      data: {
        id: this.data.id,
        userId: app.globalData.openId
        },
      success: (res)=>{
        if(res.data.state){
          this.setData({
            detail: res.data.result
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{

      }
    })
  },
  /**
   * 获得焦点
   */
  talkfocus: function(){
    var input = this.selectComponent("#input");
    input.show();
  },
  /**
   * 发送
   */
  send: function(e){
    wx.showLoading({
      title: '发送中...',
    });
    wx.request({
      url: api.addComments,
      data:{
        userId: app.globalData.openId,
        pubId: this.data.id,
        content: e.detail.value,
        parentId: 0
      },
      success: (res)=>{
        wx.showToast({
          title: '评论成功',
        });
        console.log("评论成功！",res);
        this.data.comments.unshift({
          vrId: res.data.result,
          nickName: app.globalData.userInfo.nickName,
          userId: app.globalData.openId,
          headImg: app.globalData.avatarUrl,
          createTime: dateUtil.CurentTime(),
          content: e.detail.value,
          parentId: 0
        });

        this.setData({
          comments: this.data.comments
        });
      },
      fail: ()=>{},
      complete: ()=>{
        wx.hideLoading();
      }
    })
  },
  /**
   * 获取评论列表
   */
  getComments: function(){
    wx.request({
      url: api.getCommentsByPubId,
      data: {
        id: this.data.id,
        userId: app.globalData.openId
      },
      success: (res)=>{
        console.log("获取评论列表");
        console.log(res);
        this.setData({
          comments: res.data.result
        });
      },
      fail: ()=>{},
      complete: ()=>{}
    })
  },
  /**
   * 删除
   */
  delete: function(e){
    wx.showModal({
      title: '提示',
      content: '是否删除该条评论',
      success: (res)=>{
        if(res.cancel) return;
        console.log(res);
        var index = e.target.dataset.index;
        wx.request({
          url: api.deleteCommentById,
          data:{
            id: this.data.comments[index].vrId
          },
          success: (res)=>{
            console.log("删除成功！");
            console.log(res);
            wx.showToast({
              title: '删除成功'
            });
            // 移除
            this.data.comments.remove(index);
            this.setData({
              comments: this.data.comments
            });
          }
        })
      },
      fail: ()=>{

      }
    });
    
  },
  /**
   * 点赞
   */
  agree: function(){
    this.data.detail.agreed = true;
    this.data.detail.agreeNum = this.data.detail.agreeNum + 1;
    this.setData({
      detail: this.data.detail
    });
    wx.request({
      url: api.agree,
      data: {
        userId: app.globalData.openId,
        pubId: this.data.id,
        agreeFlag: true
      },
      success: (res)=>{
        console.log("点赞成功!");
        console.log(res);
      },
      fail: ()=>{},
      complete: ()=>{

      }
    })
  },
  /**
   * 分享
   */
  share: function(){
    var path = this.data.detail.paths[0];
   
    wx.navigateTo({
      url: `../share/share?path=${path}&id=${this.data.id}&name=${this.data.detail.name}`,
    });
  },
  /**
   * 显示菜单
   */
  show: function () {
    this.setData({
      showModal: true
    });
  },
  hide: function () {
    this.setData({
      showModal: false
    });
  },
  showSubmenu: function () {
    this.show();
  },
  closeModal: function () {
    this.hide();
  },
  /**
     * 原图下载
     */
  downLoadPhotos: function () {
    wx.navigateTo({
      url: '../download/download?id=' + this.data.id + "&type=download",
    })
  },
  /**
     * 删除
     */
  delete: function () {
    wx.navigateTo({
      url: '../download/download?id=' + this.data.id + "&type=delete",
    })
  },
})