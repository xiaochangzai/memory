// pages/radioComponent/radioComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isChek: false
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    toggleCheck: function () {
      this.setData({
        checked: !this.data.checked
      });

      this.triggerEvent("change",{
        checked: this.data.checked
      },{});
    }
  }
})
