<script setup lang="ts">
const menuLinks = [
  { label: 'Menu', href: '#' },
  { label: 'Reservations', href: '#' },
  { label: 'Recipes', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Follow Us', href: '#' },
  { label: 'Privacy Policy', href: '#' },
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

const addressLines = [
  'India Bistro 29258',
  'All rights reserved.',
]

const footerImage = new URL('../assets/images/footer-brand.jpg', import.meta.url).href
</script>

<template>
  <footer class="footer" data-scroll-section>
    <div class="footer-grid" data-scroll data-scroll-speed="0.15">
      <div class="footer-cell footer-cell--brand">
        <img :src="footerImage" alt="India Bistro ambience" class="footer-image" />
        <div class="footer-brand-overlay">
          <span class="footer-brand-title">India Bistro</span>
          <span class="footer-brand-sub">A warm welcome to India</span>
        </div>
      </div>

      <div class="footer-cell footer-cell--menu">
        <h3 class="footer-heading">Explore</h3>
        <ul class="footer-menu">
          <li v-for="item in menuLinks" :key="item.label" class="footer-menu-item">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </div>

      <div class="footer-cell footer-cell--contact">
        <h3 class="footer-heading">Contact</h3>
        <div class="footer-contact-groups">
          <div v-for="block in contactItems" :key="block.heading" class="footer-contact-block">
            <h4>{{ block.heading }}</h4>
            <p v-html="block.body.replace(/\n/g, '<br>')"></p>
          </div>
        </div>
      </div>

      <div class="footer-cell footer-cell--address">
        <h3 class="footer-heading">Our House</h3>
        <p class="footer-address">
          29258 Spice Market Avenue<br />
          Old Town, Jaipur<br />
          Rajasthan, India 302001
        </p>
        <div class="footer-address-meta">
          <span v-for="line in addressLines" :key="line">{{ line }}</span>
        </div>
      </div>
    </div>

    <div class="footer-pattern" aria-hidden="true">
      <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="footer-diamond" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="60" height="60" fill="none" />
            <polygon points="30,4 56,30 30,56 4,30" fill="rgba(248, 184, 120, 0.8)" />
            <polygon points="30,18 42,30 30,42 18,30" fill="rgba(252, 212, 162, 0.95)" />
          </pattern>
        </defs>
        <rect width="1440" height="180" fill="url(#footer-diamond)" />
      </svg>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #a8713b 0%, #935f2b 45%, #7a4a1b 100%);
  color: #fce6d5;
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 5vw, 4rem);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: stretch;
}

.footer-cell {
  position: relative;
  background: rgba(19, 10, 4, 0.18);
  border: 1px solid rgba(255, 221, 180, 0.16);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.footer-cell--brand {
  padding: 0;
  border: none;
  box-shadow: none;
  background: none;
}

.footer-image {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  filter: sepia(30%) saturate(110%);
}

.footer-brand-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.75rem;
  background: linear-gradient(180deg, rgba(18, 8, 2, 0) 30%, rgba(18, 8, 2, 0.68) 100%);
  gap: 0.4rem;
}

.footer-brand-title {
  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  font-size: clamp(1.75rem, 5vw, 2.6rem);
  letter-spacing: 0.25em;
}

.footer-brand-sub {
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.65rem;
  color: rgba(255, 235, 210, 0.7);
}

.footer-heading {
  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.85rem;
  margin-bottom: 1.2rem;
}

.footer-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  column-count: 2;
  column-gap: 1.75rem;
}

.footer-menu-item {
  break-inside: avoid;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.footer-menu-item a {
  color: inherit;
  text-decoration: none;
  position: relative;
}

.footer-menu-item a::before {
  content: '◆';
  color: rgba(248, 184, 120, 0.9);
  margin-right: 0.6rem;
  font-size: 0.65rem;
}

.footer-menu-item a:hover,
.footer-menu-item a:focus-visible {
  color: #ffe7c9;
}

.footer-contact-groups {
  display: grid;
  gap: 1.5rem;
}

.footer-contact-block h4 {
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-bottom: 0.4rem;
  font-size: 0.78rem;
  color: rgba(255, 235, 210, 0.8);
}

.footer-contact-block p {
  font-size: 0.88rem;
  line-height: 1.6;
  color: rgba(255, 240, 225, 0.85);
}

.footer-address {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 235, 210, 0.78);
  margin-bottom: 1.5rem;
}

.footer-address-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 235, 210, 0.6);
}

.footer-pattern svg {
  width: 100%;
  height: auto;
}

@media (max-width: 640px) {
  .footer {
    padding-inline: 1.25rem;
  }

  .footer-image {
    min-height: 180px;
  }

  .footer-menu {
    column-gap: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer {
    scroll-behavior: auto;
  }

  .footer-menu-item a::before,
  .footer-menu-item a,
  .footer {
    transition: none;
  }
}
</style>
