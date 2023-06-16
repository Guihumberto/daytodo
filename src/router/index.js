// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/list',
        name: 'Period',
        component: () => import('@/views/List.vue'),
      },
      {
        path: '/list/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
    ],
  },
  {
    path: '/list',
    component: () => import('@/layouts/default/SistemLayout.vue'),
    children: [
      {
        path: '/list',
        name: 'Period',
        component: () => import('@/views/List.vue'),
      },
      {
        path: '/list/register/:id',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/test',
        name: 'Teste',
        component: () => import('@/views/Teste.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
