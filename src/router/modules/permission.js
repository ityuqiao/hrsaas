import layout from '@/layout'

export default {
  path: '/permission',
  name: 'permissions',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    name: 'permissions',
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
