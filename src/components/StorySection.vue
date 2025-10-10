<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const motifSlots = Array.from({ length: 24 }, (_, index) => index)
const motifWidth = 64

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLHeadingElement | null>(null)
const textRef = ref<HTMLParagraphElement | null>(null)
const topMotifs = ref<SVGGElement[]>([])
const bottomMotifs = ref<SVGGElement[]>([])
const waveRefs = ref<SVGPathElement[]>([])

const registerTopMotif = (el: SVGGElement | null) => {
  if (el && !topMotifs.value.includes(el)) {
    topMotifs.value.push(el)
  }
}

const registerBottomMotif = (el: SVGGElement | null) => {
  if (el && !bottomMotifs.value.includes(el)) {
    bottomMotifs.value.push(el)
  }
}

const registerWave = (el: SVGPathElement | null) => {
  if (el && !waveRefs.value.includes(el)) {
    waveRefs.value.push(el)
  }
}

let cleanupFns: (() => void)[] = []

onMounted(() => {
  const locoScroll = (window as typeof window & { locoScroll?: any }).locoScroll
  const scroller = locoScroll ? '#main' : undefined

  const revealTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionRef.value,
      scroller,
      start: 'top 70%',
      once: true,
    },
  })

  revealTl
    .from(headingRef.value, { opacity: 0, y: -24, duration: 0.8 })
    .from(textRef.value, { opacity: 0, y: 24, duration: 1.2 }, '-=0.2')

  const motifTimeline = gsap.timeline({ repeat: -1, yoyo: true })
  const motifTargets = [...topMotifs.value, ...bottomMotifs.value]

  motifTimeline.to(motifTargets, {
    duration: 2.2,
    opacity: 1,
    scale: 1.08,
    rotate: 2,
    transformOrigin: '50% 50%',
    ease: 'sine.inOut',
    stagger: {
      amount: 4,
      from: 'edges',
    },
  })

  motifTimeline.to(
    motifTargets,
    {
      duration: 2.2,
      opacity: 0.7,
      scale: 0.92,
      rotate: -2,
      ease: 'sine.inOut',
      stagger: {
        amount: 4,
        from: 'center',
      },
    },
    0,
  )

  topMotifs.value.forEach((motif, index) => {
    gsap.set(motif, { transformOrigin: '50% 50%', opacity: 0.75, scale: 0.95, rotate: index % 2 === 0 ? 0 : 2 })
  })
  bottomMotifs.value.forEach((motif, index) => {
    gsap.set(motif, {
      transformOrigin: '50% 50%',
      opacity: 0.75,
      scale: 0.95,
      rotate: index % 2 === 0 ? 0 : -2,
    })
  })

  waveRefs.value.forEach(path => {
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  })

  const waveTween = gsap.to(waveRefs.value, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      scroller,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  cleanupFns = [
    () => revealTl.kill(),
    () => motifTimeline.kill(),
    () => waveTween.kill(),
  ]
})

onUnmounted(() => {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-[#7E3B2D]/95 text-center text-white py-24 lg:py-32"
    data-scroll
    data-scroll-section
  >
    <svg
      class="absolute inset-x-0 top-0 h-20 w-full text-[#D95D1C]"
      viewBox="0 0 1536 80"
      preserveAspectRatio="none"
    >
      <g
        v-for="slot in motifSlots"
        :key="`top-${slot}`"
        :transform="`translate(${slot * motifWidth} 0)`"
        :ref="el => registerTopMotif(el as SVGGElement | null)"
      >
        <polygon points="0,80 32,0 64,80" fill="currentColor" opacity="0.95" />
        <polygon points="32,80 64,0 96,80" fill="currentColor" opacity="0.72" />
      </g>
    </svg>

    <svg
      class="absolute inset-x-0 bottom-0 h-20 w-full text-[#D95D1C]"
      viewBox="0 0 1536 80"
      preserveAspectRatio="none"
    >
      <g
        v-for="slot in motifSlots"
        :key="`bottom-${slot}`"
        :transform="`translate(${slot * motifWidth} 0)`"
        :ref="el => registerBottomMotif(el as SVGGElement | null)"
      >
        <polygon points="0,0 32,80 64,0" fill="currentColor" opacity="0.95" />
        <polygon points="32,0 64,80 96,0" fill="currentColor" opacity="0.72" />
      </g>
    </svg>

    <div class="relative z-10 mx-auto max-w-3xl px-6" data-scroll data-scroll-speed="0.4">
      <h2 ref="headingRef" class="text-sm uppercase tracking-[0.35em] text-[#F6D7B0] mb-6">
        A Story on Every Plate
      </h2>
      <p ref="textRef" class="text-lg md:text-xl leading-relaxed tracking-wide text-[#FCE6D5]">
        At India Bistro, we celebrate India's endless culinary stories. From Delhi's fiery chaats to Kerala's coastal
        curries, every plate is a tribute to tradition, served with a refreshing twist. Step in, sit back, and taste
        India — all on one table.
      </p>
    </div>

    <div class="pointer-events-none absolute inset-0 opacity-45" aria-hidden="true">
      <svg class="h-full w-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          ref="registerWave"
          d="M0 300 C150 200 350 400 600 300 C850 200 1050 400 1200 300"
          stroke="rgba(249, 155, 64, 0.24)"
          stroke-width="2"
        />
        <path
          ref="registerWave"
          d="M0 360 C160 260 360 460 600 360 C840 260 1040 460 1200 360"
          stroke="rgba(255, 208, 123, 0.22)"
          stroke-width="2"
        />
        <path
          ref="registerWave"
          d="M0 420 C180 320 380 520 600 420 C820 320 1020 520 1200 420"
          stroke="rgba(255, 239, 204, 0.2)"
          stroke-width="2"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
section {
  background: radial-gradient(circle at center, #8b3f30 0%, #6c2e22 60%, #461a12 100%);
}

svg {
  overflow: visible;
}

polygon {
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.35));
}
</style>
