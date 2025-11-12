<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { headerNavigation } from '@/data/navigation'

const logoImage = new URL('../Logos/2Brand Logos 2025.svg', import.meta.url).href
const navLinks = headerNavigation

const headerRef = ref<HTMLElement | null>(null)
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

let resizeObserver: ResizeObserver | null = null
let resizeListenerAttached = false

const updateHeaderHeight = () => {
  if (typeof window === 'undefined') {
    return
  }

  const height = headerRef.value?.offsetHeight ?? 0
  document.documentElement.style.setProperty('--app-header-height', `${height}px`)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  // Prevent body scroll when menu is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleRouteClick = () => {
  closeMobileMenu()
}

onMounted(async () => {
  updateHeaderHeight()
  checkMobile()

  if (typeof window === 'undefined') {
    return
  }

  if ('ResizeObserver' in window && headerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight()
      checkMobile()
    })
    resizeObserver.observe(headerRef.value)
  } else {
    window.addEventListener('resize', () => {
      updateHeaderHeight()
      checkMobile()
    })
    resizeListenerAttached = true
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null

  if (resizeListenerAttached && typeof window !== 'undefined') {
    window.removeEventListener('resize', updateHeaderHeight)
    resizeListenerAttached = false
  }

  // Clean up body scroll
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header ref="headerRef" class="header-wrapper">
    <div class="header-inner">
      <RouterLink to="/" class="brand">
        <img :src="logoImage" alt="India Bistro" class="logo-image" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="nav-links desktop-nav">
        <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          :to="{ name: link.name }"
          class="nav-link"
          exact-active-class="nav-link-active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-button"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation Overlay -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-menu-overlay"
          @click="closeMobileMenu"
        >
          <div class="mobile-menu-content" @click.stop>
            <div class="mobile-menu-header">
              <RouterLink to="/" class="mobile-brand" @click="handleRouteClick">
                <img :src="logoImage" alt="India Bistro" class="mobile-logo-image" />
              </RouterLink>
              <button
                class="mobile-close-button"
                @click="closeMobileMenu"
                aria-label="Close navigation menu"
              >
                <span class="close-line"></span>
                <span class="close-line"></span>
              </button>
            </div>

            <nav class="mobile-nav-links">
              <RouterLink
                v-for="(link, index) in navLinks"
                :key="link.name"
                :to="{ name: link.name }"
                class="mobile-nav-link"
                :style="{ '--index': index }"
                @click="handleRouteClick"
                exact-active-class="mobile-nav-link-active"
              >
                {{ link.label }}
              </RouterLink>
            </nav>

            <div class="mobile-menu-footer">
              <p class="mobile-menu-tagline">Authentic Indian Cuisine</p>
              <p class="mobile-menu-hours">Open Daily: 11:30 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 500;
  display: flex;
  justify-content: center;
  background: #AA8137;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  will-change: transform;
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

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  gap: clamp(2rem, 6vw, 0.25rem);
  align-items: center;
}

.nav-link {
  font-family: "FoundersGrotesk", sans-serif;
  font-size: clamp(16px, 1.4vw, 18px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(248, 222, 190, 0.95);
  position: relative;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
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

/* Mobile Menu Button */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background: rgba(247, 233, 226, 0.12);
  border: 1px solid rgba(247, 233, 226, 0.2);
  border-radius: 16px;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 1001;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mobile-menu-button:hover {
  background: rgba(247, 233, 226, 0.18);
  border-color: rgba(247, 233, 226, 0.35);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.mobile-menu-button:active {
  transform: scale(0.98);
}

.hamburger-line {
  width: 28px;
  height: 3px;
  background: linear-gradient(90deg, rgba(247, 233, 226, 0.95), rgba(247, 233, 226, 0.85));
  margin: 3px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.mobile-menu-button:hover .hamburger-line {
  background: linear-gradient(90deg, #F5F1E8, rgba(245, 241, 232, 0.9));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 17, 17, 0.92);
  backdrop-filter: blur(25px) saturate(1.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.mobile-menu-content {
  background: linear-gradient(145deg, #8D3A30 0%, #C86A3D 25%, #AA8137 50%, #5E6547 75%, #6C7B4F 100%);
  width: 100%;
  max-width: 420px;
  max-height: 85vh;
  border-radius: 28px;
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(247, 233, 226, 0.15),
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 2px solid rgba(247, 233, 226, 0.12);
  transform: translateZ(0);
  will-change: transform;
}

.mobile-menu-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent,
    rgba(247, 233, 226, 0.4) 15%,
    rgba(247, 233, 226, 0.6) 50%,
    rgba(247, 233, 226, 0.4) 85%,
    transparent
  );
  z-index: 10;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2.5rem 1.5rem;
  border-bottom: 1px solid rgba(247, 233, 226, 0.18);
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.15) 0%, rgba(17, 17, 17, 0.05) 100%);
  position: relative;
  backdrop-filter: blur(5px);
}

.mobile-menu-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 2.5rem;
  right: 2.5rem;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(247, 233, 226, 0.3) 30%,
    rgba(247, 233, 226, 0.5) 50%,
    rgba(247, 233, 226, 0.3) 70%,
    transparent
  );
}

.mobile-brand {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.mobile-brand:hover {
  transform: scale(1.02);
}

.mobile-logo-image {
  height: 48px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.mobile-close-button {
  width: 48px;
  height: 48px;
  background: rgba(247, 233, 226, 0.15);
  border: 1px solid rgba(247, 233, 226, 0.25);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.mobile-close-button:hover {
  background: rgba(247, 233, 226, 0.25);
  border-color: rgba(247, 233, 226, 0.4);
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.close-line {
  width: 24px;
  height: 3px;
  background: linear-gradient(90deg, rgba(247, 233, 226, 0.95), rgba(247, 233, 226, 0.85));
  position: absolute;
  transition: all 0.3s ease;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.close-line:first-child {
  transform: rotate(45deg);
}

.close-line:last-child {
  transform: rotate(-45deg);
}

.mobile-close-button:hover .close-line {
  background: linear-gradient(90deg, #F5F1E8, rgba(245, 241, 232, 0.9));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.mobile-nav-links {
  flex: 1;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

.mobile-nav-link {
  font-family: "Pitch", sans-serif;
  font-size: var(--font-size-base);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(247, 233, 226, 0.95);
  padding: 1.25rem 1.75rem;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  animation: slideInFromRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
  transform: translateX(60px) translateY(20px);
  animation-delay: calc(var(--index) * 0.08s);
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  font-feature-settings: "kern" 1, "liga" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(247, 233, 226, 0.12) 35%,
    rgba(247, 233, 226, 0.2) 50%,
    rgba(247, 233, 226, 0.12) 65%,
    transparent
  );
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1.75rem;
  right: 1.75rem;
  height: 2px;
  background: linear-gradient(90deg,
    transparent,
    rgba(245, 241, 232, 0.4) 50%,
    transparent
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-link:hover {
  background: rgba(247, 233, 226, 0.15);
  color: #F5F1E8;
  transform: translateX(12px) translateY(-2px);
  border-color: rgba(247, 233, 226, 0.3);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.mobile-nav-link:hover::before {
  left: 100%;
}

.mobile-nav-link:hover::after {
  transform: scaleX(1);
}

.mobile-nav-link:active {
  transform: translateX(8px) translateY(0);
  background: rgba(247, 233, 226, 0.22);
}

.mobile-nav-link-active {
  background: linear-gradient(135deg,
    rgba(247, 233, 226, 0.2) 0%,
    rgba(247, 233, 226, 0.12) 100%
  );
  color: #F5F1E8;
  font-weight: 600;
  border-color: rgba(247, 233, 226, 0.35);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.mobile-nav-link-active::after {
  transform: scaleX(1);
  background: linear-gradient(90deg,
    transparent,
    rgba(245, 241, 232, 0.6) 50%,
    transparent
  );
}

.mobile-menu-footer {
  padding: 2rem 2.5rem;
  border-top: 1px solid rgba(247, 233, 226, 0.18);
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.12) 0%, rgba(17, 17, 17, 0.08) 100%);
  text-align: center;
  position: relative;
  backdrop-filter: blur(5px);
}

.mobile-menu-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 2.5rem;
  right: 2.5rem;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(247, 233, 226, 0.25) 30%,
    rgba(247, 233, 226, 0.4) 50%,
    rgba(247, 233, 226, 0.25) 70%,
    transparent
  );
}

.mobile-menu-tagline {
  font-family: "SweetSansPro", sans-serif;
  font-size: 0.95rem;
  font-style: normal;
  font-weight: 500;
  color: rgba(247, 233, 226, 0.85);
  margin-bottom: 0.75rem;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.mobile-menu-hours {
  font-family: "PPMori", sans-serif;
  font-size: 0.85rem;
  color: rgba(247, 233, 226, 0.7);
  letter-spacing: 0.01em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Enhanced Transitions */
.mobile-menu-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
}

.mobile-menu-enter-from {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.mobile-menu-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.mobile-menu-enter-from .mobile-menu-content {
  transform: scale(0.8) translateY(40px) rotateX(8deg);
  opacity: 0;
  filter: blur(4px);
}

.mobile-menu-leave-to .mobile-menu-content {
  transform: scale(0.9) translateY(-20px) rotateX(-4deg);
  opacity: 0;
  filter: blur(2px);
}

/* Enhanced Animations */
@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(80px) translateY(30px) scale(0.95);
    filter: blur(2px);
  }
  60% {
    opacity: 0.9;
    transform: translateX(-5px) translateY(-2px) scale(1.02);
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
    filter: blur(0px);
  }
}

/* Responsive Design - Premium Quality */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .header-inner {
    padding: 1rem 1.75rem;
  }
}

@media (max-width: 640px) {
  .mobile-menu-overlay {
    padding: 1rem;
  }

  .mobile-menu-content {
    width: 95%;
    max-width: 380px;
    border-radius: 20px;
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(247, 233, 226, 0.12);
    margin: 0 auto;
  }

  .mobile-menu-header {
    padding: 2rem 2rem 1.25rem;
  }

  .mobile-menu-header::after {
    left: 2rem;
    right: 2rem;
  }

  .mobile-nav-links {
    padding: 1.5rem 2rem;
    gap: 0.125rem;
  }

  .mobile-nav-link {
    font-size: 1.15rem;
    padding: 1.125rem 1.5rem;
    border-radius: 14px;
    animation-delay: calc(var(--index) * 0.07s);
  }

  .mobile-nav-link::after {
    left: 1.5rem;
    right: 1.5rem;
  }

  .mobile-menu-footer {
    padding: 1.5rem 2rem;
  }

  .mobile-menu-footer::before {
    left: 2rem;
    right: 2rem;
  }

  .mobile-menu-tagline {
    font-size: 0.9rem;
  }

  .mobile-menu-hours {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .mobile-menu-overlay {
    padding: 0;
    align-items: stretch;
    justify-content: stretch;
  }

  .mobile-menu-content {
    width: 100%;
    height: 100vh;
    max-height: none;
    border-radius: 0;
    max-width: none;
    box-shadow: none;
    border: none;
    margin: 0;
  }

  .mobile-menu-content::before {
    display: none;
  }

  .mobile-menu-header {
    padding: 1.75rem 1.5rem 1.25rem;
    border-bottom: 1px solid rgba(247, 233, 226, 0.15);
    background: linear-gradient(180deg, rgba(17, 17, 17, 0.2) 0%, rgba(17, 17, 17, 0.1) 100%);
  }

  .mobile-menu-header::after {
    left: 1.5rem;
    right: 1.5rem;
  }

  .mobile-nav-links {
    padding: 1.25rem 1.5rem;
    flex: 1;
    overflow-y: auto;
  }

  .mobile-nav-link {
    font-size: 1.1rem;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    animation-delay: calc(var(--index) * 0.06s);
  }

  .mobile-nav-link::after {
    left: 1.25rem;
    right: 1.25rem;
  }

  .mobile-menu-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid rgba(247, 233, 226, 0.15);
    background: linear-gradient(180deg, rgba(17, 17, 17, 0.15) 0%, rgba(17, 17, 17, 0.1) 100%);
    margin-top: auto;
  }

  .mobile-menu-footer::before {
    left: 1.5rem;
    right: 1.5rem;
  }

  .mobile-menu-tagline {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .mobile-menu-hours {
    font-size: 0.75rem;
  }
}

@media (max-width: 360px) {
  .mobile-menu-header {
    padding: 1.5rem 1.25rem 1rem;
  }

  .mobile-nav-links {
    padding: 1rem 1.25rem;
  }

  .mobile-nav-link {
    font-size: 1rem;
    padding: 0.875rem 1.125rem;
  }

  .mobile-menu-footer {
    padding: 1rem 1.25rem;
  }
}

/* Landscape orientation fixes */
@media (max-height: 600px) and (orientation: landscape) {
  .mobile-menu-overlay {
    padding: 1rem;
  }

  .mobile-menu-content {
    max-height: 90vh;
    border-radius: 16px;
  }

  .mobile-menu-header {
    padding: 1.5rem 2rem 1rem;
  }

  .mobile-nav-links {
    padding: 1rem 2rem;
    gap: 0;
  }

  .mobile-nav-link {
    font-size: 1rem;
    padding: 0.875rem 1.25rem;
  }

  .mobile-menu-footer {
    padding: 1rem 2rem;
  }

  .mobile-menu-tagline {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  .mobile-menu-hours {
    font-size: 0.7rem;
  }
}
</style>
