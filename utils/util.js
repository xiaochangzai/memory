import api from "api.js";
Array.prototype.move = function (index1, index2) {
  var item = this[index1];
  this.splice(index1, 1);
  this.splice(index2, 0, item);
  return this;
}

Array.prototype.remove = function (index) {
  this.splice(index, 1);
  return this;
}

var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 上传图片
 */
var fileIndex = 0;
const uploadFiles = (obj)=>{
  var tempTasks = [];
  var progress = 0;
  var progressTotal ;
  var uploadedFilePaths = [];
  function uploadFile(tempFiles) {
    progressTotal = tempFiles.length * 100;
    var uploadTask = wx.uploadFile({
      url: api.upload,
      header: {
        "content-type": "multipart/form-data"
      },
      filePath: tempFiles[fileIndex].path,
      name: 'file',
      success: (res) => {
        var tempObj = JSON.parse(res.data);
        uploadedFilePaths.push({
          path: tempObj.path
        });
        
      },
      error: (res) => {
        console.log("上传文件失败！");
      },
      complete: () => {
        fileIndex ++ ;
        if(fileIndex < tempFiles.length){
          uploadFile(tempFiles);
        }
      }
    });

    uploadTask.onProgressUpdate((res) => {
      progress = 100* fileIndex + res.progress;
      var p = progress / progressTotal;
      if(obj && obj.onProgress){
        obj.onProgress(p);
      }
      if(p == 1){
        if(obj.success){
          obj.success(uploadedFilePaths);
        }
      }
      
    });
  }
  uploadFile(obj.tempFiles);
}

/**
 * 获取open Id 
 */
function getOpenId(fn) {
  console.log("-------------- 获取openId-----------");
  wx.request({
    url: api.getUserOpenId,
    data: {
      code: app.globalData.code
    },
    success: (res) => {
      var tempObj = JSON.parse(res.data.result);
      app.globalData.openId = tempObj.openid;
      if (fn) {
        fn();
      }
      // this.uploadUserInfo();
    }
  })
}

/**
   * 登陆
   */
function login(fn) {
  // 登陆
  console.log("---------------登陆------------");
  if (app.globalData.openId) {
    if (fn) {
      fn();
    }
  } else {
    wx.login({
      success: (res) => {
        console.log(res);
        app.globalData.code = res.code;
        getOpenId(fn);
      }
    })
  }

}

module.exports = {
  formatTime,
  uploadFiles,
  login
}
