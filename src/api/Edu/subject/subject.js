import request from '@/utils/request'
export  default {
  //心理医师查询列表
  addSubject() {
    return request({
      method: 'POST',
      url: `/eduService/edu-subject/addSubject`,
    })
  },
  getSubjectList(){
    return request({
    method: 'GET',
    url: `/eduService/edu-subject/getAllSubject`
  })
  }
}
