import layout from '@/layout'

export default {
  path: '/salarys',
  name: 'salarys',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/salarys'),
    meta: {
      title: '薪资',
      icon: 'money'
    }
  }]
}
