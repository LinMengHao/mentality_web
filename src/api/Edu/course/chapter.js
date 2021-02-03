import request from '@/utils/request'
export  default {
  //心理课程查询列表
  getAllChapterVideo(courseId){
    return request({
      method: 'GET',
      url: `/eduService/edu-chapter/getChapterVideo/${courseId}`,
    })
  },
//添加章节
  addChapter(chapter){
    return request({
      url:`/eduService/edu-chapter/addChapter`,
      method:'POST',
      data:chapter
    })
  },
  //修改章节
  updateChapter(chapter){
    return request({
      url:`/eduService/edu-chapter/updateChapter`,
      method:'POST',
      data:chapter
    })
  },
  //根据id查询
  getChapter(chapterId){
    return request({
      url:`/eduService/edu-chapter/getChapterById/${chapterId}`,
      method:'GET'
    })
  },
  deleteChapter(chapterId){
    return request({
      url:`/eduService/edu-chapter/deleteChapter/${chapterId}`,
      method:'DELETE'
    })
  }
}
