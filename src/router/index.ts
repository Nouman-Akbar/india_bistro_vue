import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutUsPage.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuPage.vue')
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import('../views/ReservationsPage.vue')
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/CareersPage.vue')
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/RecipesPage.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogNextPage.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryPage.vue')
    },
    {
      path: '/catering',
      name: 'catering',
      component: () => import('../views/CateringPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundPage.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (typeof window !== 'undefined') {
      const locoScroll = (window as { locoScroll?: { scrollTo?: (target: number, options?: Record<string, unknown>) => void } }).locoScroll
      if (locoScroll?.scrollTo) {
        locoScroll.scrollTo(0, { duration: 0, disableLerp: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    return { left: 0, top: 0 }
  }
})

export default router
