import layout from '@/layout'

export default {
  path: '/setting',
  name: 'settings',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/setting'),
    name: 'settings',
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
