import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      props: (route) => ({ previous: route.query.previous, next: route.query.next }),
      component: HomeView
    },
    {
      path: '/categorie/:slug',
      name: 'category',
      props: (route) => ({ slug: route.params.slug, previous: route.query.previous, next: route.query.next }),
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/mot-cle/:slug',
      name: 'tag',
      props: (route) => ({ slug: route.params.slug, previous: route.query.previous, next: route.query.next }),
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
