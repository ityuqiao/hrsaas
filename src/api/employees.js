import request from '@/utils/request'

export function getStaffSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
