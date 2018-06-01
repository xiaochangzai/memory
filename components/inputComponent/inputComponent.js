// components/inputComponent/inputComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isFocus: false,
    value: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function(){
      this.setData({
        isShow: true,
        isFocus: true
      });
    },
    hide: function(){
      this.setData({
        isShow: false,
        isFocus: false
      });
    },
    send: function(){
      this.hide();
      this.triggerEvent("send", { value: this.data.value }, {});
    },
    /**
     * 输入
     */
    input: function(e){
      this.setData({
        value: e.detail.value
      });
    }
    
  }
})
