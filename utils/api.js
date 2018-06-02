var urlHeader = "http://localhost:8090/memory/";
var urls = {
  getActives: urlHeader + "getActives.do", // 查询活动信息列表
  addPhotos: urlHeader + "addPhotos.do",  // 新建相册
  getPhotosDetail: urlHeader + "getPhotosDetail.do", // 获取相册详细信息 
  upload: urlHeader + "upload.do", // 上传图片接口
  getUserOpenId: urlHeader + "getUserOpenId.do", // 获取用户iopenId
  getPhotosByUser: urlHeader + "getPhotosByUser.do", // 获取用户的相册
  publish: urlHeader + "publish.do", // 发布相册图片
  getPublishs: urlHeader + "getPublishs.do" ,// 获取发布记录
  getPublishPhotos: urlHeader + "getPublishPhotos.do", // 获取发布的图片
  asyc: urlHeader + "asyc.do", // 同步
  addTop: urlHeader + "addTop.do", // 置顶
  deletePublish: urlHeader + "deletePublish.do", // 删除
  agree: urlHeader + "agree.do", // 点赞
  addComments: urlHeader + "addComments.do", // 评论
  getPublishLine: urlHeader + "getPublishLine.do", // 时刻
  getPublishDetail: urlHeader + "getPublishDetail.do", // 获取发布信息的详情
  getCommentsByPubId: urlHeader + "getCommentsByPubId.do", // 获取发布记录的评论信息
  deleteCommentById: urlHeader + "deleteCommentById.do" // 删除评论
};

module.exports = urls;
