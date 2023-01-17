import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categorie/:slug',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/mot-cle/:slug',
      name: 'tag',
      component: () => import('../views/TagView.vue')
    },
    {
      path: '/:slug',
      name: 'post',
      component: () => import('../views/PostView.vue')
    }
  ]
})

export default router
