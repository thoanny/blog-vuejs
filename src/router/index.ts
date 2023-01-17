import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

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
      props: true,
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/mot-cle/:slug',
      name: 'tag',
      props: true,
      component: () => import('../views/TagView.vue')
    },
    {
      path: '/:slug',
      name: 'post',
      props: true,
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
