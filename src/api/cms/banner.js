import request from '@/utils/request'
export default{
      //1 修改banner
  updateBanner(banner){
    return request({
      url: `/cms/bannerAdmin/update`,
      method: 'post',
      data: banner
    })
  },

  //2 添加banner
  addBanner(banner){
    return request({
      url: `/cms/bannerAdmin/addBanner`,
      method: 'post',
      data: banner
    })
  },

  //3 删除banner
  deleteBannerById(id){
    return request({
      url: `/cms/bannerAdmin/delete/${id}`,
      method: 'delete'
    })
  },

  //4 分页查询banner
  //current 当前页    limit 每页记录数
  getBannerList(page,limit){
    return request({
      url: `/cms/bannerAdmin/pageBanner/${page}/${limit}`,
      method: 'get'
    })
  },

  //5.根据课程id查询banner
  getBannerInfo(id){
    return request({
      url: `/cms/bannerAdmin/get/${id}`,
      method: 'get'
    })
  },
}