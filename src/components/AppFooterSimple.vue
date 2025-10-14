<script setup lang="ts">
import { RouterLink } from 'vue-router'

const menuLinks = [
  { label: 'Menu', path: '/menu' },
  { label: 'Reservations', path: '/reservations' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Contact', path: '/contact' }
]

const contactItems = [
  {
    heading: 'Find us',
    body: 'India Bistro, Leeds\n+44 (0) 1111 111 111',
  },
  {
    heading: 'Coming soon',
    body: 'India Bistro, Paddington\n+44 (0) 1111 111 111',
  },
]
</script>

<template>
  <footer class="footer" data-scroll-section>
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-heading">India Bistro</h3>
        <p class="footer-text">Authentic Indian cuisine crafted with love and tradition.</p>
      </div>

      <div class="footer-section">
        <h3 class="footer-heading">Explore</h3>
        <nav class="footer-nav">
          <RouterLink 
            v-for="link in menuLinks" 
            :key="link.label" 
            :to="link.path"
            class="footer-link"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>

      <div class="footer-section">
        <h3 class="footer-heading">Contact</h3>
        <div class="footer-contact">
          <div v-for="item in contactItems" :key="item.heading" class="contact-block">
            <h4>{{ item.heading }}</h4>
            <p>{{ item.body }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 India Bistro. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #1a0f0a 0%, #0d0705 100%);
  border-top: 1px solid rgba(167, 113, 58, 0.3);
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(1.5rem, 3vw, 2rem);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-heading {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.footer-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: rgba(244, 224, 200, 0.7);
  line-height: 1.6;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: rgba(244, 224, 200, 0.7);
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #A7713A;
  transform: translateX(4px);
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-block h4 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  font-weight: 600;
  color: #A7713A;
  margin-bottom: 0.5rem;
}

.contact-block p {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.4vw, 0.95rem);
  color: rgba(244, 224, 200, 0.7);
  line-height: 1.6;
  white-space: pre-line;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem) 0;
  border-top: 1px solid rgba(244, 224, 200, 0.2);
  text-align: center;
}

.footer-bottom p {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.4vw, 0.95rem);
  color: rgba(244, 224, 200, 0.5);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
