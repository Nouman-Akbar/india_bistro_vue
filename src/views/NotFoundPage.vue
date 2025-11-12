<script setup lang="ts">
import { RouterLink } from 'vue-router'

const suggestedRoutes = [
  { label: 'Back to Home', name: 'home' },
  { label: 'View Menu', name: 'menu' },
  { label: 'Make a Reservation', name: 'reservations' },
  { label: 'Contact Us', name: 'contact' }
]
</script>

<template>
  <section class="not-found">
    <div class="not-found__content">
      <p class="eyebrow">404 — Page Missing</p>
      <h1>Looks like this table isn’t set.</h1>
      <p class="description">
        The link you opened doesn’t exist anymore. Pick a route below and we’ll guide you back
        to a live page.
      </p>
      <div class="cta-group">
        <RouterLink
          v-for="route in suggestedRoutes"
          :key="route.name"
          :to="{ name: route.name }"
          class="cta-link"
        >
          {{ route.label }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(4rem, 10vw, 8rem) 1rem;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.04), transparent 55%);
  text-align: center;
}

.not-found__content {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 0.75rem;
  color: rgba(247, 226, 197, 0.75);
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  color: #f4e0c8;
  line-height: 1.1;
}

.description {
  color: rgba(247, 226, 197, 0.75);
  line-height: 1.8;
}

.cta-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.cta-link {
  border: 1px solid rgba(247, 226, 197, 0.4);
  padding: 0.75rem 1.75rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.75rem;
  color: #f7e2c5;
  transition: background 0.3s ease, color 0.3s ease;
}

.cta-link:hover,
.cta-link:focus-visible {
  background: #f0993b;
  border-color: #f0993b;
  color: #120802;
}
</style>
