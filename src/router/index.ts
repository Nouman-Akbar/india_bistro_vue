import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
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
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
