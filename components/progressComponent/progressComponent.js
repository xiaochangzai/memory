// components/progressComponent/progressComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: String,
      value: "上传中请勿退出"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    progressNum:10,
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示
     */
    show: function(){
      this.setData({
        isShow: true
      });
    },
    /**
     * 隐藏
     */
    hide: function(){
      this.setData({
        isShow: false
      });
    },
    /**
     * 更新进度
     */
    updateProgress: function(progress){
      this.setData({
        progressNum: progress
      });
    }
  }
})
