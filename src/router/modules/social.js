import layout from '@/layout'

export default {
  path: '/social',
  name: 'social',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
