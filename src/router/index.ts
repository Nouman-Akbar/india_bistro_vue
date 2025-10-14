import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MenuPage from '../views/MenuPage.vue'
import ReservationsPage from '../views/ReservationsPage.vue'
import RecipesPage from '../views/RecipesPage.vue'
import ContactPage from '../views/ContactPage.vue'

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
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
