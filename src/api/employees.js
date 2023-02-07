import request from '@/utils/request'

export function getStaffSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getStaffList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function deleteStaff(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

export function addStaff(data) {
  return request({
    url: '/sys/user',
    data,
    method: 'POST'
  })
}

export function importStaff(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

export function saveUserDetailById(data) {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

export function assignRoles(data) {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data
  })
}
