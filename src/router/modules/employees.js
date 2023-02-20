import layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    name: 'employees',
    meta: {
      title: '员工',
      icon: 'people'
    }
  },
  {
    path: 'detail/:id',
    component: () => import('@/views/employees/components/detail.vue'),
    name: 'detail',
    hidden: true,
    meta: {
      title: '员工详情'
    }
  },
  {
    path: 'print/:id',
    name: 'print',
    component: () => import('@/views/employees/components/print.vue'),
    hidden: true,
    meta: {
      title: '打印',
      icon: 'people'
    }
  }]
}
