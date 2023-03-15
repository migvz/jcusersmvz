import { createRouter, createWebHistory } from 'vue-router'
import AllUsers from '../views/AllUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: AllUsers
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/AllUsers.vue')
    }
  ]
})

export default router
