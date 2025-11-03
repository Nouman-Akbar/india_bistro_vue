import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutUsPage from '../views/AboutUsPage.vue'
import MenuPage from '../views/MenuPage.vue'
import ReservationsPage from '../views/ReservationsPage.vue'
import RecipesPage from '../views/RecipesPage.vue'
import ContactPage from '../views/ContactPage.vue'
import BlogPage from '../views/BlogPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
import CateringPage from '../views/CateringPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUsPage
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuPage
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: ReservationsPage
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesPage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPage
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryPage
    },
    {
      path: '/catering',
      name: 'catering',
      component: CateringPage
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
