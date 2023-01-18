import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import Nprogress from 'nprogress'
import GraphQLservice from '@/services/GraphQLservice'
import GStore from '@/stores/index'

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
      component: () => import('../views/PostView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach(() => {
  Nprogress.start();
})

router.afterEach(() => {
  Nprogress.done();
})

export default router
