import request from '@/utils/request'
export  default {
  //添加章节
  addVideo(Video){
    return request({
      url:`/eduService/edu-video/addVideo`,
      method:'POST',
      data:Video
    })
  },
  //修改章节
  updateVideo(Video){
    return request({
      url:`/eduService/edu-video/updateVideo`,
      method:'POST',
      data:Video
    })
  },
  //根据id查询
  getVideo(VideoId){
    return request({
      url:`/eduService/edu-video/getVideoById/${VideoId}`,
      method:'GET'
    })
  },
  deleteVideo(VideoId){
    return request({
      url:`/eduService/edu-video/deleteVideo/${VideoId}`,
      method:'DELETE'
    })
  }
}
