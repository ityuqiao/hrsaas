import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

export function editDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
