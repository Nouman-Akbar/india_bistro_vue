<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const containerRef = ref<HTMLElement | null>(null)
const router = useRouter()
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

let scroll: LocomotiveScrollInstance | null = null
let removeScrollListener: (() => void) | undefined
const containerSelector = '#main'
const handleScrollTriggerRefresh = () => {
  scroll?.update()
}
const onScrollUpdate = () => {
  ScrollTrigger.update()
}

const initializeLocomotiveScroll = async () => {
  const container = containerRef.value

  if (!container) {
    console.warn('[LocomotiveScroll] Container `#main` not found.')
    return
  }

  const { default: LocomotiveScroll } = await import('locomotive-scroll')
  const locoOptions = {
    el: container,
    smooth: true,
    multiplier: 1,
    lerp: 0.08,
    smoothMobile: true
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

  if (container) {
    container.style.transform = 'translate3d(0px, 0px, 0px)'
    container.style.willChange = 'auto'
    container.scrollTop = 0
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
let hasMounted = false
let removeBeforeGuard: (() => void) | undefined
let removeAfterGuard: (() => void) | undefined

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
  gsap.registerPlugin(ScrollTrigger)
  await rebuildScroll({ ensureDestroy: false })
  hasMounted = true

  removeBeforeGuard = router.beforeEach((to, from, next) => {
    pendingNavigation = true
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    destroyLocomotiveScroll()
    next()
  })

  const RELOAD_MARKER = '__ib_auto_reload__'

  removeAfterGuard = router.afterEach((to) => {
    const markerValue = sessionStorage.getItem(RELOAD_MARKER)

    if (markerValue === to.fullPath) {
      sessionStorage.removeItem(RELOAD_MARKER)
      return
    }

    sessionStorage.setItem(RELOAD_MARKER, to.fullPath)
    setTimeout(() => {
      window.location.reload()
    }, 80)
  })

})

onUnmounted(() => {
  removeBeforeGuard?.()
  removeAfterGuard?.()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  destroyLocomotiveScroll()
})
</script>

<template>
  <div
    ref="containerRef"
    class="bg-background font-sans"
    id="main"
    data-scroll-container
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 351 27"  fill="none">
      <clipPath id="curvedDiamond" clipPathUnits="userSpaceOnUse">
        <path d="M276.519 54C281.345 44.94 288.288 38.1 293.232 33.9C298.351 29.58 302.529 27.24 303 27C302.47 26.7 298.292 24.3 293.232 20.1C288.23 15.96 281.286 9.06 276.519 0H26.4809C21.6555 9.06 14.7116 15.9 9.7685 20.1C4.64886 24.42 0.470771 26.76 0 27C0.529617 27.3 4.70771 29.7 9.7685 33.9C14.7704 38.04 21.7143 44.94 26.4809 54H276.519Z" fill="currentColor"/>
      </clipPath>
    </svg>
    
    <AppHeader />
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
</template>

<style>
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
