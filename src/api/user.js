import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminService/user/login',
    method: 'post',
    data:data
  })
}

export function getInfo(token) {
  return request({
    url: '/adminService/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
