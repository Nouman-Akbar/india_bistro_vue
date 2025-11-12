<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Component } from 'vue'
import { gsap } from 'gsap'

/**
 * Marker format expected by the map overlay layer.
 * id: unique identifier for events and programmatic control
 * stateName: label rendered inside the card
 * x/y: coordinates relative to svg viewBox (0-823, 0-910)
 * shortText: supporting copy for the callout
 * imageUrl?: optional thumbnail inside the card
 * link?: optional CTA href
 */
export interface Marker {
  id: string | number
  stateName: string
  x: number
  y: number
  shortText: string
  imageUrl?: string
  link?: string
}

interface Button {
  text: string
  link?: string
  backgroundImageSrc?: string
}

interface Props {
  imagePath?: string
  markers?: Marker[]
  mapWidth?: number
  mapHeight?: number
  heading?: string
  subheading?: string
  description?: string
  items?: string[]
  decoratorImageSrc?: string
  backgroundColor?: string
  headingColor?: string
  subheadingColor?: string
  descriptionColor?: string
  cardTemplate?: Component
  buttons?: Button[]
  loadingComplete?: boolean
}

const defaultMapImage = new URL('../assets/images/india_map.svg', import.meta.url).href
const sectionBgPattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url)

const props = withDefaults(defineProps<Props>(), {
  imagePath: '',
  markers: () => [],
  mapWidth: 823,
  mapHeight: 910,
  heading: '',
  subheading: '',
  description: '',
  items: () => [],
  decoratorImageSrc: '',
  backgroundColor: '#F5F1E8',
  headingColor: '#2D2A26',
  subheadingColor: '#5A5550',
  descriptionColor: '#5A5550',
  cardTemplate: undefined,
  buttons: () => [],
  loadingComplete: true
})

const emit = defineEmits<{
  (e: 'marker-open', id: Marker['id']): void
  (e: 'marker-close', id: Marker['id']): void
}>()

const mapRef = ref<HTMLDivElement | null>(null)
const mapBounds = ref({ width: 0, height: 0 })
const openMarkerId = ref<Marker['id'] | null>(null)

const MAP_VIEWBOX = { width: 823, height: 910 }
const pointerRatio = ref({ x: 0.5, y: 0.5 })
const latestPointerViewBox = ref({ x: MAP_VIEWBOX.width / 2, y: MAP_VIEWBOX.height / 2 })
const markerOverrides = ref<Record<string, { x: number; y: number }>>({})
const markerRefs = ref<HTMLElement[]>([])
const markerIntroPlayed = ref(false)
const prefersReducedMotion = ref(false)
let reduceMotionQuery: MediaQueryList | null = null
let reduceMotionListenerType: 'event' | 'listener' | null = null
let gsapContext: gsap.Context | null = null

if (typeof window !== 'undefined') {
  reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = reduceMotionQuery.matches
}
const fallbackPulseSpots: Array<{ id: string; x: number; y: number; label: string }> = [
  { id: 'gujarat', x: 238, y: 470, label: 'Gujarat' },
  { id: 'delhi', x: 425, y: 255, label: 'Delhi' },
  { id: 'kerala', x: 450, y: 790, label: 'Kerala' }
]

const cardDimensions = {
  width: 240,
  height: 150,
  offset: 24,
  minWidth: 200,
  minHeight: 150
}

let resizeObserver: ResizeObserver | null = null
let closeTimer: number | null = null

const displayMarkers = computed<Marker[]>(() =>
  props.markers.map((marker) => {
    const override = markerOverrides.value[String(marker.id)]
    return override
      ? {
          ...marker,
          x: override.x,
          y: override.y
        }
      : marker
  })
)

const hasMarkers = computed(() => displayMarkers.value.length > 0)
const resolvedImagePath = computed(() => props.imagePath || defaultMapImage)
const contentItems = computed(() => props.items?.filter(Boolean) ?? [])
const hasButtons = computed(() => props.buttons?.length > 0)
const resolvedSubheading = computed(() => props.subheading || props.description || '')
const resolvedSubheadingColor = computed(() => props.subheadingColor || props.descriptionColor)

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const updateMapBounds = () => {
  if (!mapRef.value) return
  const rect = mapRef.value.getBoundingClientRect()
  mapBounds.value = { width: rect.width, height: rect.height }
}

const handlePointerMove = (event: PointerEvent) => {
  if (!mapRef.value) return
  const rect = mapRef.value.getBoundingClientRect()
  const xRatio = clamp((event.clientX - rect.left) / (rect.width || 1), 0, 1)
  const yRatio = clamp((event.clientY - rect.top) / (rect.height || 1), 0, 1)
  pointerRatio.value = { x: xRatio, y: yRatio }
  latestPointerViewBox.value = {
    x: Math.round(xRatio * MAP_VIEWBOX.width),
    y: Math.round(yRatio * MAP_VIEWBOX.height)
  }
}

const resetPointerShadow = () => {
  pointerRatio.value = { x: 0.5, y: 0.5 }
  latestPointerViewBox.value = {
    x: Math.round(0.5 * MAP_VIEWBOX.width),
    y: Math.round(0.5 * MAP_VIEWBOX.height)
  }
}

const pointerShadowVars = computed(() => ({
  '--shadow-x': `${((pointerRatio.value.x - 0.5) * 14).toFixed(2)}px`,
  '--shadow-y': `${((pointerRatio.value.y - 0.5) * 18).toFixed(2)}px`
}))

const getMarkerPixels = (coords: { x: number; y: number }) => {
  const width = mapBounds.value.width || props.mapWidth
  const height = mapBounds.value.height || props.mapHeight
  return {
    x: (coords.x / MAP_VIEWBOX.width) * width,
    y: (coords.y / MAP_VIEWBOX.height) * height
  }
}

const getMarkerWrapperStyle = (marker: Marker) => {
  const { x, y } = getMarkerPixels(marker)
  return {
    left: `${x}px`,
    top: `${y}px`
  }
}

const getMarkerStyle = (marker: Marker, index: number) => {
  const { x, y } = getMarkerPixels(marker)
  return {
    left: `${x}px`,
    top: `${y}px`
  }
}

const getCardPlacement = (marker: Marker) => {
  const { x, y } = getMarkerPixels(marker)
  const width = mapBounds.value.width || props.mapWidth
  const height = mapBounds.value.height || props.mapHeight

  const cardWidth = clamp(
    cardDimensions.width,
    cardDimensions.minWidth,
    Math.max(width - 32, cardDimensions.minWidth)
  )
  const cardHeight = clamp(
    cardDimensions.height,
    cardDimensions.minHeight,
    Math.max(height - 32, cardDimensions.minHeight)
  )

  let left = x + cardDimensions.offset
  let placement: 'left' | 'right' = 'right'

  if (left + cardWidth > width) {
    left = x - cardWidth - cardDimensions.offset
    placement = 'left'
  }

  left = clamp(left, 0, Math.max(width - cardWidth, 0))

  const clampedCenterY = clamp(y, cardHeight / 2, Math.max(height - cardHeight / 2, cardHeight / 2))
  const arrowOffset = clamp(y - clampedCenterY, -cardHeight / 2 + 12, cardHeight / 2 - 12)

  return {
    placement,
    style: {
      left: `${left}px`,
      top: `${clampedCenterY}px`,
      width: `${cardWidth}px`,
      minWidth: `${cardDimensions.minWidth}px`,
      '--card-arrow-offset': `${arrowOffset}px`
    }
  }
}

const isActive = (id: Marker['id']) => openMarkerId.value === id

const cancelCloseTimer = () => {
  if (closeTimer) {
    window.clearTimeout(closeTimer)
    closeTimer = null
  }
}

const closeMarker = () => {
  if (openMarkerId.value === null) return
  const closingId = openMarkerId.value
  openMarkerId.value = null
  emit('marker-close', closingId)
}

const scheduleClose = (markerId: Marker['id']) => {
  cancelCloseTimer()
  closeTimer = window.setTimeout(() => {
    if (openMarkerId.value === markerId) {
      closeMarker()
    }
    closeTimer = null
  }, 160)
}

const openMarker = (marker: Marker) => {
  if (openMarkerId.value === marker.id) return
  openMarkerId.value = marker.id
  emit('marker-open', marker.id)
}

const handleMarkerEnter = (marker: Marker) => {
  cancelCloseTimer()
  openMarker(marker)
}

const handleMarkerLeave = (markerId: Marker['id']) => {
  scheduleClose(markerId)
}

const handleMarkerClick = (marker: Marker) => {
  cancelCloseTimer()
  if (openMarkerId.value === marker.id) {
    closeMarker()
  } else {
    openMarker(marker)
  }
}

const handleMarkerKeydown = (event: KeyboardEvent, marker: Marker) => {
  if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
    event.preventDefault()
    handleMarkerClick(marker)
  }
}

const handleFocusOut = (event: FocusEvent, markerId: Marker['id']) => {
  const related = event.relatedTarget as Node | null
  if (related && mapRef.value?.contains(related)) {
    return
  }
  scheduleClose(markerId)
}

const handleGlobalPointer = (event: PointerEvent) => {
  if (!mapRef.value) return
  if (!mapRef.value.contains(event.target as Node)) {
    closeMarker()
  }
}

const getPulseStyle = (spot: { x: number; y: number }) => {
  const { x, y } = getMarkerPixels(spot)
  return {
    left: `${x}px`,
    top: `${y}px`
  }
}

const setMarkerRef = (el: Element | null, index: number) => {
  if (el) {
    markerRefs.value[index] = el as HTMLElement
  } else {
    markerRefs.value.splice(index, 1)
  }
}

const resetMarkerIntro = (hideMarkers = false) => {
  markerIntroPlayed.value = false
  if (hideMarkers && markerRefs.value.length) {
    gsap.set(markerRefs.value, { opacity: 0, y: 0, scale: 1 })
  }
  if (gsapContext) {
    gsapContext.revert()
    gsapContext = null
  }
}

const runMarkerIntro = () => {
  if (markerIntroPlayed.value) return
  if (!markerRefs.value.length) return
  if (!mapRef.value) return
  markerIntroPlayed.value = true

  if (prefersReducedMotion.value) {
    gsap.set(markerRefs.value, { opacity: 1 })
    gsap.set(markerRefs.value, { clearProps: 'transform' })
    return
  }

  if (gsapContext) {
    gsapContext.revert()
  }
  gsapContext = gsap.context(() => {
    gsap.fromTo(
      markerRefs.value,
      { y: -200, opacity: 0, scale: 0.6 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: 'bounce.out',
        stagger: 0.12,
        onComplete(this: gsap.core.Tween) {
          const target = this.targets()[0] as HTMLElement
          gsap.set(target, { clearProps: 'transform' })
        }
      }
    )
  }, mapRef.value)
}

const scheduleMarkerIntro = () => {
  if (!props.loadingComplete) return
  nextTick(() => {
    if (!markerRefs.value.length) return
    runMarkerIntro()
  })
}

const updateReduceMotionPreference = (event?: MediaQueryListEvent) => {
  if (typeof window === 'undefined') return
  if (event) {
    prefersReducedMotion.value = event.matches
    return
  }
  prefersReducedMotion.value = reduceMotionQuery?.matches ?? false
}

const setMarkerPosition = (markerId: Marker['id'], coords: Partial<Pick<Marker, 'x' | 'y'>>) => {
  const marker = displayMarkers.value.find((item) => item.id === markerId)
  if (!marker) return
  const nextX = coords.x ?? marker.x
  const nextY = coords.y ?? marker.y
  markerOverrides.value = {
    ...markerOverrides.value,
    [String(markerId)]: { x: nextX, y: nextY }
  }
  logMarkerCoordinates()
}

const resetMarkerOverrides = () => {
  markerOverrides.value = {}
  logMarkerCoordinates()
}

const logMarkerCoordinates = () => {
  const rows = displayMarkers.value.map((marker) => ({
    id: marker.id,
    state: marker.stateName,
    x: marker.x,
    y: marker.y
  }))
  if (rows.length === 0) {
    console.info?.('[InteractiveMapSection] No markers to display.')
    return
  }
  console.table?.(rows)
}

const highlightState = (markerId: Marker['id']) => {
  const marker = displayMarkers.value.find((item) => item.id === markerId)
  if (marker) {
    cancelCloseTimer()
    openMarker(marker)
  }
}

const getPointerViewBoxCoords = () => ({ ...latestPointerViewBox.value })

defineExpose({
  highlightState,
  getPointerViewBoxCoords,
  setMarkerPosition,
  resetMarkerOverrides,
  logMarkerCoordinates
})

type DebugWindow = typeof window & {
  __IBMapDebug__?: {
    getPointerCoords: () => { x: number; y: number }
    highlightState: typeof highlightState
    setMarkerPosition: typeof setMarkerPosition
    resetMarkerOverrides: typeof resetMarkerOverrides
    logMarkerCoordinates: typeof logMarkerCoordinates
    listMarkers: () => Array<{ id: Marker['id']; x: number; y: number }>
  }
}

const attachDevConsoleHelper = () => {
  if (typeof window === 'undefined') return
  const globalRef = window as DebugWindow
  globalRef.__IBMapDebug__ = {
    getPointerCoords: () => ({ ...latestPointerViewBox.value }),
    highlightState,
    setMarkerPosition,
    resetMarkerOverrides,
    logMarkerCoordinates,
    listMarkers: () =>
      displayMarkers.value.map((marker) => ({ id: marker.id, x: marker.x, y: marker.y }))
  }
  if (import.meta.env?.DEV !== false) {
    console.info?.(
      '[InteractiveMapSection] Hover the map and run __IBMapDebug__.getPointerCoords() for live coords, ' +
        '__IBMapDebug__.logMarkerCoordinates() to list all markers, or __IBMapDebug__.setMarkerPosition(id, { x, y }) to preview edits.'
    )
  }
}

const detachDevConsoleHelper = () => {
  if (typeof window === 'undefined') return
  const globalRef = window as DebugWindow
  if (globalRef.__IBMapDebug__) {
    delete globalRef.__IBMapDebug__
  }
}

onMounted(() => {
  updateMapBounds()
  if (mapRef.value) {
    resizeObserver = new ResizeObserver(updateMapBounds)
    resizeObserver.observe(mapRef.value)
  }
  window.addEventListener('pointerdown', handleGlobalPointer)
  attachDevConsoleHelper()
  logMarkerCoordinates()
  if (typeof window !== 'undefined') {
    if (!reduceMotionQuery) {
      reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    }
    updateReduceMotionPreference()
    if ('addEventListener' in reduceMotionQuery) {
      reduceMotionQuery.addEventListener('change', updateReduceMotionPreference)
      reduceMotionListenerType = 'event'
    } else if ('addListener' in reduceMotionQuery) {
      reduceMotionQuery.addListener(updateReduceMotionPreference)
      reduceMotionListenerType = 'listener'
    }
  }
  if (props.loadingComplete) {
    scheduleMarkerIntro()
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('pointerdown', handleGlobalPointer)
  detachDevConsoleHelper()
  cancelCloseTimer()
  if (reduceMotionQuery) {
    if (reduceMotionListenerType === 'event') {
      reduceMotionQuery.removeEventListener('change', updateReduceMotionPreference)
    } else if (reduceMotionListenerType === 'listener') {
      reduceMotionQuery.removeListener(updateReduceMotionPreference)
    }
    reduceMotionListenerType = null
  }
  resetMarkerIntro()
})

watch(
  () => displayMarkers.value,
  (nextMarkers) => {
    if (openMarkerId.value === null) return
    const stillExists = nextMarkers.some((marker) => marker.id === openMarkerId.value)
    if (!stillExists) {
      closeMarker()
    }
  },
  { deep: true }
)

watch(
  () => props.loadingComplete,
  (isComplete) => {
    if (isComplete) {
      if (!markerIntroPlayed.value) {
        scheduleMarkerIntro()
      }
    } else {
      resetMarkerIntro(true)
    }
  },
  { immediate: true }
)

watch(
  () => displayMarkers.value.length,
  () => {
    if (!markerIntroPlayed.value && props.loadingComplete) {
      scheduleMarkerIntro()
    }
  }
)
</script>

<template>
  <section
    class="relative w-full bg-repeat py-20 overflow-hidden"
    style="margin: 0;"
    :style="{
      'background-image': `url(${sectionBgPattern})`,
      'background-color': props.backgroundColor
    }"
  >
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>
    <div class="relative mx-auto flex w-full max-w-7xl flex-col gap-0 px-6 md:px-10">
      <div class="flex flex-col gap-12 md:gap-16 md:flex-row">
        <div class="w-full md:w-1/2 flex items-center justify-center">
          <div
            ref="mapRef"
            class="map-surface"
            :style="{ aspectRatio: `${props.mapWidth} / ${props.mapHeight}` }"
            @pointermove="handlePointerMove"
            @pointerleave="resetPointerShadow"
          >
            <img :src="resolvedImagePath" alt="Map of India" class="map-image" />

            <template v-if="hasMarkers">
              <div
                v-for="(marker, index) in displayMarkers"
                :key="marker.id"
                class="marker-container"
              >
                <button
                  type="button"
                  class="marker-point"
                  :class="{ 'marker-point--active': isActive(marker.id) }"
                  :style="getMarkerStyle(marker, index)"
                  :ref="(el) => setMarkerRef(el, index)"
                  aria-haspopup="dialog"
                  :aria-expanded="String(isActive(marker.id))"
                  :aria-label="`Show details for ${marker.stateName}`"
                  tabindex="0"
                  @mouseenter="handleMarkerEnter(marker)"
                  @focus="handleMarkerEnter(marker)"
                  @mouseleave="handleMarkerLeave(marker.id)"
                  @blur="handleFocusOut($event, marker.id)"
                  @click="handleMarkerClick(marker)"
                  @keydown="handleMarkerKeydown($event, marker)"
                >
                  <span class="sr-only">{{ marker.stateName }}</span>
                </button>

                <Transition name="marker-card">
                  <div
                    v-if="isActive(marker.id)"
                    class="marker-card"
                    :class="[`marker-card--${getCardPlacement(marker).placement}`]"
                    :style="[getCardPlacement(marker).style, pointerShadowVars]"
                    role="dialog"
                    :aria-label="`${marker.stateName} details`"
                    @mouseenter="cancelCloseTimer"
                    @mouseleave="handleMarkerLeave(marker.id)"
                  >
                    <component
                      v-if="props.cardTemplate"
                      :is="props.cardTemplate"
                      :marker="marker"
                    />
                    <slot v-else name="cardTemplate" :marker="marker">
                      <div class="card-body">
                        <p class="card-title">{{ marker.stateName }}</p>
                        <p class="card-text">
                          {{ marker.shortText }}
                        </p>
                        <img
                          v-if="marker.imageUrl"
                          :src="marker.imageUrl"
                          :alt="marker.stateName"
                          class="card-image"
                        />
                        <a
                          v-if="marker.link"
                          :href="marker.link"
                          class="card-link"
                        >
                          Explore this region »
                        </a>
                      </div>
                    </slot>
                  </div>
                </Transition>
              </div>
            </template>

            <template v-else>
              <div
                v-for="spot in fallbackPulseSpots"
                :key="spot.id"
                class="pulse-point"
                :style="getPulseStyle(spot)"
                :aria-label="spot.label"
              />
              <p class="no-data-label">No data</p>
            </template>
          </div>
        </div>

        <div class="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center md:text-left text-center gap-8">
          <slot name="content">
            <div class="flex flex-col gap-6 md:items-start items-center md:text-left text-center">
              <div v-if="props.decoratorImageSrc" class="flex justify-center md:justify-start">
                <img :src="props.decoratorImageSrc" alt="" class="h-6" />
              </div>

              <slot name="heading">
                <h2
                  v-if="props.heading"
                  class="text-2xl md:text-4xl font-semibold uppercase tracking-wider leading-tight"
                  :style="{ color: props.headingColor }"
                >
                  {{ props.heading }}
                </h2>
              </slot>

              <slot name="subheading">
                <p
                  v-if="resolvedSubheading"
                  class="text-base md:text-lg leading-relaxed max-w-md"
                  :style="{ color: resolvedSubheadingColor }"
                >
                  {{ resolvedSubheading }}
                </p>
              </slot>

              <slot name="list">
                <ul v-if="contentItems.length" class="flex flex-col gap-3 text-sm md:text-base text-[#5A5550]">
                  <li v-for="item in contentItems" :key="item" class="flex items-start gap-2">
                    <span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#B66C3B]" />
                    <span class="text-left">{{ item }}</span>
                  </li>
                </ul>
              </slot>

              <slot name="buttons">
                <div v-if="hasButtons" class="flex flex-col gap-4 w-auto max-w-full">
                  <a
                    v-for="(button, index) in props.buttons"
                    :key="index"
                    :href="button.link || '#'"
                    class="relative inline-flex items-start justify-center px-8 py-3 text-white font-semibold text-sm uppercase tracking-wider transition-transform duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span
                      v-if="button.backgroundImageSrc"
                      class="absolute inset-0 w-full h-full"
                    >
                      <img :src="button.backgroundImageSrc" :alt="button.text || 'Button Background'" class="w-full h-full object-contain" />
                    </span>
                    <span class="relative z-10">{{ button.text }}</span>
                  </a>
                </div>
              </slot>

              <slot />

              <div v-if="props.decoratorImageSrc" class="flex justify-center md:justify-start">
                <img :src="props.decoratorImageSrc" alt="" class="h-6" />
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 820px;
  z-index: 1;
  pointer-events: none;
}

.big-bg-icon {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.map-surface {
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: 1.5rem;
  overflow: hidden;

}

.map-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.marker-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.marker-point {
  position: absolute;
  width: clamp(0.7rem, 1.6vw, 0.95rem);
  height: clamp(0.7rem, 1.6vw, 0.95rem);
  border: 2px solid #fff;
  background: #bc2f1b;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 0.2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 12px rgba(82, 11, 3, 0.45);
  cursor: pointer;
  pointer-events: auto;
  opacity: 0;
  transform-origin: center;
  will-change: transform, opacity;
}

.marker-point:hover,
.marker-point:focus-visible,
.marker-point--active {
  transform: translate(-50%, -50%) rotate(45deg) scale(1.08);
  box-shadow: 0 10px 18px rgba(82, 11, 3, 0.55);
}

.marker-card {
  position: absolute;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: #5e6547;
  color: #f7e9e2;
  box-shadow: var(--shadow-x, 0px) calc(var(--shadow-y, 18px)) 26px rgba(20, 22, 16, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: auto;
  transform: translateY(-50%);
}

.marker-card::before {
  content: '';
  position: absolute;
  top: calc(50% + var(--card-arrow-offset, 0px));
  width: 14px;
  height: 14px;
  background: inherit;
  border: inherit;
  transform: translateY(-50%) rotate(45deg);
}

.marker-card--right::before {
  left: -7px;
}

.marker-card--left::before {
  right: -7px;
}

.marker-card-enter-from,
.marker-card-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateY(8px) scale(0.96);
}

.marker-card-enter-active,
.marker-card-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-title {
  font-size: 0.65rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(247, 233, 226, 0.8);
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #f7e9e2;
}

.card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-link {
  align-self: flex-start;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #f4c49a;
  text-decoration: none;
  border-bottom: 1px solid rgba(244, 196, 154, 0.4);
  padding-bottom: 0.2rem;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.card-link:hover {
  color: #ffe0bf;
  border-color: rgba(255, 224, 191, 0.8);
}

.pulse-point {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(216, 102, 38, 0.9);
  transform: translate(-50%, -50%);
  animation: pulse 1.6s ease infinite;
}

.no-data-label {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #5a5550;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.7);
  }
  70% {
    opacity: 0.1;
    transform: translate(-50%, -50%) scale(1.8);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.4);
  }
}
</style>
