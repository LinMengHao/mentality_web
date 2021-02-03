import request from '@/utils/request'
export  default {
  //心理医师查询列表
  findAll(current, size, psychologistQuery){
    return request({
      method: 'POST',
      url: `/eduService/edu-psychologist/findAll/${current}/${size}`,
      data: psychologistQuery
  })
  },
  //获取信息
  getInfo(id){
    return request({
      method: 'GET',
      url: `/eduService/edu-psychologist/getById/${id}`
    })
  },
  //添加心理医师
  addPsychologist(eduPsychologist){
    return request({
      method: 'POST',
      url: `/eduService/edu-psychologist/addPsychologist`,
      data: eduPsychologist
    })
  },
  //修改心理医师
  updatePsychologist(eduPsychologist){
    return request({
      method: 'POST',
      url: `/eduService/edu-psychologist/updatePsychologist`,
      data: eduPsychologist
    })
  },
  //删除心理医师
  deletePsychologist(id){
    return request({
      method: 'DELETE',
      url:`/eduService/edu-psychologist/delete/${id}`
    })
  },
  //获取所有心理医师
  getAllList(){
    return request({
      method: 'GET',
      url: `/eduService/edu-psychologist/getAllList`
    })
  }
}


