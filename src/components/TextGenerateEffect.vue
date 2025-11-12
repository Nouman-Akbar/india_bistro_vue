<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useGsap } from '@/utils/gsap'

const props = withDefaults(
  defineProps<{
    words: string
    className?: string
    filter?: boolean
    duration?: number
    stagger?: number
  }>(),
  {
    className: '',
    filter: true,
    duration: 0.2,
    stagger: 0.02
  }
)

const { gsap } = useGsap()
const containerRef = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)
let observer: IntersectionObserver | null = null

const wordList = computed(() =>
  props.words
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
)

const getSpans = () => {
  if (!containerRef.value) return null
  return containerRef.value.querySelectorAll<HTMLSpanElement>('span')
}

const hideWords = () => {
  const spans = getSpans()
  if (!spans || !spans.length) return

  gsap.set(spans, {
    opacity: 0,
    filter: props.filter ? 'blur(10px)' : 'none'
  })
}

const animateWords = () => {
  const spans = getSpans()
  if (!spans || !spans.length) return

  gsap.to(spans, {
    opacity: 1,
    filter: props.filter ? 'blur(0px)' : 'none',
    duration: props.duration,
    stagger: props.stagger,
    ease: 'power1.out'
  })
}

const setupObserver = async () => {
  await nextTick()
  const container = containerRef.value
  if (!container) return

  hideWords()

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    animateWords()
    return
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.value) {
            hasAnimated.value = true
            animateWords()
            if (observer && containerRef.value) {
              observer.unobserve(containerRef.value)
            }
          }
        })
      },
      { threshold: 0.25 }
    )
  }

  if (observer) {
    observer.disconnect()
    observer.observe(container)
  }
}

onMounted(() => {
  setupObserver()
})

watch(
  () => props.words,
  () => {
    hasAnimated.value = false
    setupObserver()
  }
)

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div :class="['text-generate-effect', className]">
    <div ref="containerRef" class="text-generate-effect__words">
      <span
        v-for="(word, index) in wordList"
        :key="`${word}-${index}`"
        class="inline-block"
      >
        {{ word }}<span aria-hidden="true">&nbsp;</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.text-generate-effect__words {
  display: inline;
}

.text-generate-effect__words span {
  white-space: pre;
}
</style>
