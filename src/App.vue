<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useGsap } from '@/utils/gsap'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import LoadingScreen from './components/LoadingScreen.vue'

const containerRef = ref<HTMLElement | null>(null)
const { ScrollTrigger } = useGsap()
type LocomotiveScrollModule = typeof import('locomotive-scroll')
type LocomotiveScrollInstance = InstanceType<LocomotiveScrollModule> & {
  scroll?: {
    instance?: {
      scroll?: {
        y?: number
      }
    }
  }
}
type GlobalWindow = Window & {
  locoScroll?: LocomotiveScrollInstance | null
  __gsapLocoProxySetup?: boolean
}

type SmoothingConfig = {
  multiplier: number
  lerp: number
  smooth: boolean
}

const containerSelector = '#main'
let scroll: LocomotiveScrollInstance | null = null
let removeScrollListener: (() => void) | undefined
let resizeObserver: ResizeObserver | null = null
let mediaPreferenceCleanup: (() => void) | null = null
let windowResizeRaf: number | null = null
let isScrollTriggerTicking = false
const MAX_CONTAINER_ATTEMPTS = 5

const handleScrollTriggerRefresh = () => {
  scroll?.update()
}
const computeSmoothingOptions = (): SmoothingConfig => {
  if (typeof window === 'undefined') {
    return { multiplier: 1, lerp: 0.08, smooth: true }
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches

  if (prefersReducedMotion) {
    return { multiplier: 0.75, lerp: 0.22, smooth: false }
  }

  if (prefersCoarsePointer) {
    return { multiplier: 0.92, lerp: 0.12, smooth: true }
  }

  return { multiplier: 1.12, lerp: 0.075, smooth: true }
}
const onScrollUpdate = () => {
  if (isScrollTriggerTicking) {
    return
  }

  isScrollTriggerTicking = true
  requestAnimationFrame(() => {
    ScrollTrigger.update()
    isScrollTriggerTicking = false
  })
}
const handleWindowResize = () => {
  if (windowResizeRaf) {
    cancelAnimationFrame(windowResizeRaf)
  }

  windowResizeRaf = requestAnimationFrame(() => {
    refreshScrollState(0)
    windowResizeRaf = null
  })
}
const attachMediaPreferenceListeners = () => {
  if (typeof window === 'undefined' || mediaPreferenceCleanup) {
    return
  }

  const mediaQueries = ['(prefers-reduced-motion: reduce)', '(pointer: coarse)'].map((query) =>
    window.matchMedia(query)
  )

  const handlePreferenceChange = () => {
    rebuildScroll()
  }

  const unsubscribers = mediaQueries.map((media) => {
    if ('addEventListener' in media) {
      media.addEventListener('change', handlePreferenceChange)
      return () => media.removeEventListener('change', handlePreferenceChange)
    }

    media.addListener(handlePreferenceChange)
    return () => media.removeListener(handlePreferenceChange)
  })

  mediaPreferenceCleanup = () => {
    unsubscribers.forEach((unsubscribe) => unsubscribe())
    mediaPreferenceCleanup = null
  }
}
const detachMediaPreferenceListeners = () => {
  mediaPreferenceCleanup?.()
  mediaPreferenceCleanup = null
}

const waitForContainer = async (attempt = 0): Promise<HTMLElement | null> => {
  if (containerRef.value) {
    return containerRef.value
  }

  if (attempt >= MAX_CONTAINER_ATTEMPTS) {
    return null
  }

  await nextTick()
  await new Promise(resolve => requestAnimationFrame(resolve))
  return waitForContainer(attempt + 1)
}

const initializeLocomotiveScroll = async () => {
  const container = containerRef.value ?? (await waitForContainer())

  if (!container) {
    console.warn('[LocomotiveScroll] Container `#main` not found after multiple attempts.')
    return
  }

  const smoothing = computeSmoothingOptions()
  const { default: LocomotiveScroll } = await import('locomotive-scroll')
  const locoOptions = {
    el: container,
    smooth: smoothing.smooth,
    multiplier: smoothing.multiplier,
    lerp: smoothing.lerp,
    smoothMobile: smoothing.smooth,
    smartphone: {
      smooth: smoothing.smooth
    },
    tablet: {
      smooth: smoothing.smooth
    }
  } as Record<string, unknown>

  scroll = new LocomotiveScroll(locoOptions as any) as LocomotiveScrollInstance
  const globalWindow = window as GlobalWindow
  globalWindow.locoScroll = scroll

  if (!globalWindow.__gsapLocoProxySetup) {
    ScrollTrigger.scrollerProxy(containerSelector, {
      scrollTop(value) {
        if (typeof value === 'number') {
          scroll?.scrollTo(value, { duration: 0, disableLerp: true })
          return
        }

        return scroll?.scroll?.instance?.scroll?.y ?? 0
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      pinType: container.style.transform ? 'transform' : 'fixed'
    })

    globalWindow.__gsapLocoProxySetup = true
  }

  removeScrollListener = scroll.on('scroll', onScrollUpdate)

  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  resizeObserver = new ResizeObserver(() => refreshScrollState(0))
  resizeObserver.observe(container)

  ScrollTrigger.removeEventListener('refresh', handleScrollTriggerRefresh)
  ScrollTrigger.addEventListener('refresh', handleScrollTriggerRefresh)
  ScrollTrigger.refresh()
}

const destroyLocomotiveScroll = () => {
  const globalWindow = window as GlobalWindow
  const container = containerRef.value

  if (scroll) {
    removeScrollListener?.()
    scroll.destroy()
  }

  removeScrollListener = undefined
  scroll = null
  globalWindow.locoScroll = null
  ScrollTrigger.removeEventListener('refresh', handleScrollTriggerRefresh)

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (container) {
    container.style.transform = 'translate3d(0px, 0px, 0px)'
    container.style.willChange = 'auto'
    container.scrollTop = 0
  }

  if (windowResizeRaf) {
    cancelAnimationFrame(windowResizeRaf)
    windowResizeRaf = null
  }

  document.documentElement.classList.remove('has-scroll-init', 'has-scroll-smooth', 'has-scroll-scrolling', 'has-scroll-dragging')
  document.body.classList.remove('has-scroll-init', 'has-scroll-smooth', 'has-scroll-scrolling', 'has-scroll-dragging')
}

const resetScrollPosition = () => {
  const globalWindow = window as GlobalWindow
  const loco = globalWindow.locoScroll
  const container = containerRef.value

  if (container) {
    container.style.transform = 'translate3d(0px, 0px, 0px)'
    container.style.willChange = 'auto'
    container.scrollTop = 0
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

  if (loco?.scrollTo) {
    loco.scrollTo(0, { duration: 0, disableLerp: true })
  } else {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}

const refreshScrollState = (delay = 0) => {
  const execute = () => {
    if (!scroll) {
      return
    }

    requestAnimationFrame(() => {
      scroll?.update()
      ScrollTrigger.refresh()
    })
  }

  if (delay > 0) {
    setTimeout(execute, delay)
  } else {
    execute()
  }
}

let rebuildPromise: Promise<void> | null = null
let pendingNavigation = false

const rebuildScroll = (options: { ensureDestroy?: boolean } = {}) => {
  if (rebuildPromise) {
    return rebuildPromise
  }

  const { ensureDestroy = true } = options

  rebuildPromise = (async () => {
    if (ensureDestroy) {
      destroyLocomotiveScroll()
    }

    await nextTick()
    await initializeLocomotiveScroll()
    resetScrollPosition()
    refreshScrollState(50)
    refreshScrollState(250)
    refreshScrollState(600)
  })()
    .finally(() => {
      rebuildPromise = null
      pendingNavigation = false
    })

  return rebuildPromise
}

const handleBeforeLeave = () => {
  if (!pendingNavigation) {
    pendingNavigation = true
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  destroyLocomotiveScroll()
}

const handleAfterEnter = () => {
  if (pendingNavigation) {
    rebuildScroll({ ensureDestroy: false })
  } else {
    refreshScrollState(50)
  }
}

onMounted(async () => {
  await rebuildScroll({ ensureDestroy: false })
  attachMediaPreferenceListeners()

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleWindowResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleWindowResize)
  }

  detachMediaPreferenceListeners()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  destroyLocomotiveScroll()
})
</script>

<template>
  <div class="app-shell base-surface font-sans">
    <LoadingScreen />
    <AppHeader />
    <div
      ref="containerRef"
      class="app-scroll-container base-surface font-sans"
      id="main"
      data-scroll-container
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 351 27"  fill="none">
        <clipPath id="curvedDiamond" clipPathUnits="userSpaceOnUse">
          <path d="M276.519 54C281.345 44.94 288.288 38.1 293.232 33.9C298.351 29.58 302.529 27.24 303 27C302.47 26.7 298.292 24.3 293.232 20.1C288.23 15.96 281.286 9.06 276.519 0H26.4809C21.6555 9.06 14.7116 15.9 9.7685 20.1C4.64886 24.42 0.470771 26.76 0 27C0.529617 27.3 4.70771 29.7 9.7685 33.9C14.7704 38.04 21.7143 44.94 26.4809 54H276.519Z" fill="currentColor"/>
        </clipPath>
      </svg>
      <main data-scroll-section>
        <RouterView v-slot="{ Component }">
          <Transition
            name="page"
            mode="out-in"
            @before-leave="handleBeforeLeave"
            @after-enter="handleAfterEnter"
          >
            <component :is="Component" :key="$route.path" />
          </Transition>
        </RouterView>
      </main>
      <AppFooter data-scroll-section />
    </div>
  </div>
</template>

<style>
.app-shell {
  position: relative;
  min-height: 100vh;
}

.app-scroll-container {
  min-height: 100vh;
  padding-top: var(--app-header-height, 96px);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>
