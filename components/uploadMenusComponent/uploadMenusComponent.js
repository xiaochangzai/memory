// pages/uploadMenusComponent/uploadMenusComponent.js
import api from "../../utils/api.js";
import util from "../../utils/util.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid:{
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示
     */
    show(){
      this.setData({
        isShow: true
      });
    },
    /**
     * 隐藏
     */
    hide(){
      this.setData({
        isShow: false
      });
    },
    /**
     * 关闭
     */
    close(){
      this.hide();
    },
    /**
     * 选择照片
     */
    selectPhotos(){
      wx.chooseImage({
        sourceType: ['album'],
        success: (res)=> {
          this.toUploadPage(res.tempFiles, "image");
        },
      })
    },
    /**
     * 拍照
     */
    takePicthers(){
     
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'],
        success: (res)=> {
          this.toUploadPage(res.tempFiles, "image");
        },
      })
    },
    /**
     * 拍视频
     */
    takeVidio(){
      console.log("========= 点击拍视频！ ==========");
      debugger;
      wx.chooseVideo({
        count:1,
        sourceType: ["camera"],
        compressed: true,
        maxDuration: 60,
        success: (res)=>{
          this.toUploadPage(res.tempFiles, "video");
        },
        fail: (res)=>{
          console.log(" 拍摄失败");
        },
        complete: (res)=>{
          console.log("完毕");
        }
      })    
    },
    /**
     * 选择视频
     */
    selectVidios(){
      wx.chooseVideo({
        count: 3,
        sourceType: ["album"],
        success: (res) => {
          this.toUploadPage(res.tempFiles, "video");
        }
      })
    },
    /**
     * 跳转到上传界面
     */
    toUploadPage(tempFiles,type){
      wx.setStorageSync("tempFiles", {
        type: type,
        tempFiles: tempFiles
      });

      wx.navigateTo({
        url: '../uploadImage/uploadImage?id=' + this.data.pid,
      })
    }
  }
})
