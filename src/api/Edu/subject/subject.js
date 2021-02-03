import request from '@/utils/request'
export  default {
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
