import request from '@/utils/request'
export  default {
  //心理课程查询列表
  findAll(current, size, courseQuery){
    return request({
      method: 'POST',
      url: `/eduService/edu-course/findAll/${current}/${size}`,
      data: courseQuery
    })
  },
  //根据id获取课程基本信息
  getCourseInfoById(id){
    return request({
      method: 'GET',
      url: `/eduService/edu-course/getCourseInfo/${id}`
    })
  },
  //添加课程基本信息
  addCourseInfo(courseInfoVo){
    return request({
      method: 'POST',
      url: `/eduService/edu-course/addCourseInfo`,
      data: courseInfoVo
    })
  },
  //修改课程基本信息
  updateCourseInfo(courseInfoVo){
    return request({
      method: 'POST',
      url: `/eduService/edu-course/updateCourseInfo`,
      data: courseInfoVo
    })
  },
  //课程整体信息
  publishCourse(id){
    return request({
      methodL: 'POST',
      url: `/eduService/edu-course/publishCourse/${id}`
    })
  },
  //
  getPublishCourseInfo(id){
    return request({
      methodL: 'GET',
      url: `/eduService/edu-course/getCoursePublishInfo/${id}`
    })
  }
}
