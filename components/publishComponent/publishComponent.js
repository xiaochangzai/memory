// pages/publishComponent/publishComponent.js
import api from '../../utils/api.js';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info:{
      type: Object,
      value: {
        createTime:"",
        headImg:"",
        location:"",
        message:"",
        nickName:"",
        paths:"",
        userId:"",
        vrId:""
      }
    },
    pid:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    pathSize:0
  },
  ready: function () {
    this.getPathSize();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    show: function(){
      this.setData({
        showModal: true
      });
    },
    hide: function(){
      this.setData({
        showModal: false
      });
    },
    showSubmenu: function(){
      this.show();
    },
    closeModal: function(){
      this.hide();
    },
    calculateSize: function(){
        var pathArr = this.data.item.paths.split(",");
        console.log(pathArr);
        return 1;
    },
    /**
     * 计算有几个图片
     */
    getPathSize: function(){
      var tempArr = this.data.info.paths;
      console.log(tempArr.length);
      var temp = 0;
      if(tempArr.length == 1){
        temp = 1;
      }else if(tempArr.length < 5){
        temp = 2;
      }else if(tempArr.length <= 9){
        temp = 3;
      }else{
        temp = 3;
      }
      console.log(tempArr.length+" == :  " + temp);
      this.setData({
        pathSize: temp
      });
      
    },
    /**
     * 原图下载
     */
    downLoadPhotos: function(){
      wx.navigateTo({
        url: '../download/download?id=' + this.data.info.vrId + "&type=download",
      })
    },
    /**
     * 同步到其他相册
     */
    asycToOther: function(){
      wx.navigateTo({
        url: '../download/download?id=' + this.data.info.vrId + "&type=asyc&pid=" + this.data.pid,
      })
    },
    /**
     * 置顶
     */
    addTop: function(){
      wx.request({
        url: api.addTop,
        data: {
          id: this.data.info.vrId
        },
        success: (res)=>{
          wx.showToast({
            title: '操作成功！',
          })
        },
        fail: ()=>{
          console.log("置顶失败！");
          wx.showToast({
            title: '操作失败！',
          })
        },
        complete: ()=>{

        }
      });

      this.triggerEvent("totop",{},{});
      this.hide();
    },
    /**
     * 删除
     */
    delete: function(){
      wx.navigateTo({
        url: '../download/download?id=' + this.data.info.vrId + "&type=delete",
      })
    },
    /**
     * 点赞
     */
    agree: function(){
      if(!this.data.info.agreed){
        wx.request({
          url: api.agree,
          data: {
            userId: app.globalData.openId,
            pubId: this.data.info.vrId,
            agreeFlag: true
          },
          success: (res)=>{
            console.log("点赞成功！");
            console.log(res);
            this.data.info.agreed = true;
            this.data.info.agreeNum += 1;
            this.setData({
              info: this.data.info
            });
            wx.showToast({
              title: '点赞成功！'
            });
          },
          fail: ()=>{

          },
          complete: ()=>{

          }

        })
      }
    },
    /**
     * 点击评论
     */
    talk: function(){
      console.log("点击评论了");
      var input = this.selectComponent("#input");
      input.show();
    },
    send: function(e){
      console.log("用户点击发送！");
      console.log(e);
      //发送请求
      wx.request({
        url: api.addComments,
        data: {
          userId: app.globalData.openId,
          pubId: this.data.info.vrId,
          content: e.detail.value,
          parentId: 0
        },
        success: (res)=>{
          console.log("============>");
          console.log(res);
        },
        fail: ()=>{

        },
        complete: ()=>{

        }
      })
    }
  }
  
})
