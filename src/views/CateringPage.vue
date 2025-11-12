<script setup lang="ts">
import { createLazyComponent } from '@/utils/lazyComponent'

const RichTextSection = createLazyComponent(() => import('@/components/RichTextSection.vue'))
const BannerSection = createLazyComponent(() => import('@/components/BannerSection.vue'))
const CateringDetailSection = createLazyComponent(() => import('@/components/CateringDetailSection.vue'))

const assets = {
  images: {
    diningRoom: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
    intimateSetup: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
    platedExperience: new URL('../assets/images/ib_nihari.jpg', import.meta.url).href,
    culinaryShowcase: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
    bannerImage: new URL('../assets/images/india_bistro_dining_view_small.jpg', import.meta.url).href
  },
  svgs: {
    brownDiamonds: new URL('../assets/images/brown_7_diamonds.svg', import.meta.url).href,
    decoration: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href,
    sectionBg: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    buttonGreen: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href,
    buttonOrange: new URL('../assets/images/button_orange_bg_diamond.svg', import.meta.url).href
  }
}

const pageData = {
  richTextSection: {
    heading: 'Private Dining & Events',
    description: "Host your next celebration the India Bistro way  authentic flavours, stylish spaces, and warm service. Whether it's an intimate gathering, a corporate lunch, or a festive party, our team will craft a bespoke menu and experience just for you.",
    decorationImageSrc: assets.svgs.brownDiamonds,
    sectionBgSrc: assets.svgs.sectionBg,
    bgColor: '#f4efe3',
    headingColor: '#2D2A26',
    descriptionColor: '#5A5550',
    button: {
      text: 'Enquire Now',
      link: '/contact',
      backgroundImageSrc: assets.svgs.buttonGreen
    }
  },
  bannerSection: {
    imageSrc: assets.images.bannerImage,
    imageAlt: 'India Bistro Catering Experience',
    alignment: 'left' as const,
    height: ''
  },
  detailSection: {
    sectionBgSrc: assets.svgs.sectionBg,
    heading: 'Designed for Memorable Gatherings',
    topDescription: 'Let our team orchestrate every detail to create an unforgettable experience:',
    bulletPoints: [
      'Bespoke menus crafted by our expert chefs',
      'Curated beverage pairings and signature cocktails',
      'Elegant tablescapes and ambient décor',
      'Live culinary counters and interactive stations',
      'Impeccable hospitality and dedicated event coordination'
    ],
    bottomDescription: 'Expect storytelling through food, impeccable hospitality, and a setting that feels inherently India Bistro.',
    dishImageSrc: assets.images.platedExperience,
    imagePosition: 'right' as const,
    backgroundColor: '#f4efe3',
    headingColor: '#2D2A26',
    textColor: '#5A5550',
    spacingBottomClasses: 'py-16 md:py-20'
  }
}
</script>

<template>
  <div class="catering-page">
    <!-- Top Brown Diamonds Decoration -->
    <!-- <div class="flex items-center justify-center py-8 md:py-12">
      <img :src="assets.svgs.brownDiamonds" alt="Decoration" class="h-6 w-auto" />
    </div> -->

    <!-- Rich Text Section with Button -->
    <RichTextSection
      class="section"
      v-bind="pageData.richTextSection"
    />

    <!-- Banner Section -->
    <BannerSection
      class="section"
      v-bind="pageData.bannerSection"
    />

    <!-- Main Detail Section with Diamond Bullets -->
    <CateringDetailSection
      class="section"
      v-bind="pageData.detailSection"
    />

    <!-- Bottom Brown Diamonds Decoration -->
    <!-- <div class="flex items-center justify-center py-8 md:py-12">
      <img :src="assets.svgs.brownDiamonds" alt="Decoration" class="h-6 w-auto" />
    </div> -->
  </div>
</template>

<style scoped>
.catering-page {
  width: 100%;
}
</style>
