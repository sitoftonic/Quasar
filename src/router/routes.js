
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/Profile.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '*',
    redirect: 'login'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
