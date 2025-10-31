<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Logo import
const logoImage = new URL('../Logos/India Bistro-05.png', import.meta.url).href

const navLinks = [
  { name: 'About Us', path: '#' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Menu', path: '/menu' },
  { name: 'Private Dining', path: '#' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' }
]
</script>

<template>
  <header class="header-wrapper">
    <div class="header-inner">
      <RouterLink to="/" class="brand">
      <img :src="logoImage" alt="India Bistro" class="logo-image" />
    </RouterLink>
      <nav class="nav-links">
        <template v-for="link in navLinks" :key="link.name">
          <RouterLink
            v-if="link.path !== '#'"
            :to="link.path"
            class="nav-link"
            active-class="nav-link-active"
          >
            {{ link.name }}
          </RouterLink>
          <a
            v-else
            :href="link.path"
            class="nav-link"
          >
            {{ link.name }}
          </a>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  background: #AA8137;
  /* border-top: 4px solid #1c1310;
  border-bottom: 1px solid rgba(22, 9, 4, 0.55); */
}

.header-inner {
  width: min(1280px, 94%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(0.9rem, 1.6vw, 1.15rem) clamp(2rem, 4vw, 3rem);
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  height: clamp(1.5rem, 6vw, 3rem);
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.brand:hover .logo-image {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: clamp(2rem, 6vw, 0.25rem);
  align-items: center;
}

.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.68rem, 1.4vw, 0.78rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(248, 222, 190, 0.95);
  position: relative;
  transition: color 0.25s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 1px;
  background-color: rgba(247, 226, 197, 0.7);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.35s ease;
}

.nav-link:hover,
.nav-link:focus {
  color: #fff0dc;
}

.nav-link:hover::after,
.nav-link:focus::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link-active {
  color: #fff0dc;
}

.nav-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1.5rem;
  }

  .nav-links {
    gap: 1.5rem;
  }

  .nav-link {
    letter-spacing: 0.28em;
    font-size: 0.7rem;
  }
}

@media (max-width: 640px) {
  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 1.25rem;
    row-gap: 0.75rem;
  }

  .brand {
    letter-spacing: 0.26em;
  }
}
</style>
