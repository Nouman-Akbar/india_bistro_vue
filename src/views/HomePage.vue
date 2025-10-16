<script setup lang="ts">
import StorySection from '../components/StorySection.vue'
import SliderSection from '../components/SliderSection.vue'
import ImageTextSection from '../components/ImageTextSection.vue'
import ImageContentSection from '../components/ImageContentSection.vue'
import { favouritesSection, specialtiesSection } from '../data/sliderSections'

// Asset URLs
const assets = {
  images: {
    brunaBlanco: new URL('../assets/images/bruna_branco.jpg', import.meta.url).href,
    chicken: new URL('../assets/images/chicken.jpg', import.meta.url).href,
    indiaMap: new URL('../assets/images/india_map.svg', import.meta.url).href,
  },
  svgs: {
    brownBorder: new URL('../assets/images/brown_story_section.svg', import.meta.url).href,
    greenBorder: new URL('../assets/images/green_story_section.svg', import.meta.url).href,
    diamond: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href,
    greenDiamondButton: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href
    }
}

// Page Data Structure
const pageData = {
  storySection1: {
    heading: '',
    text: "At India Bistro, we celebrate India's endless culinary stories. From Delhi's fiery chaats to Kerala's coastal curries, every plate is a tribute to tradition, served with a refreshing twist. Step in, sit back, and taste India — all on one table.",
    backgroundColor: '#8D3A30',
    headingColor: '#8D3A30',
    textColor: '#F7E9E2',
    borderImageSrc: assets.svgs.brownBorder,
    showTopBorder: true,
    showBottomBorder: true
  },

  sliderSection1: favouritesSection,

  imageTextSection1: {
    dishImageSrc: assets.images.brunaBlanco,
    heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imagePosition: 'right' as const,
    spacingBottomClasses: 'pt-20 pb-0 md:mb-[-15%] mb-0'
  },

  imageTextSection2: {
    dishImageSrc: assets.images.chicken,
    heading: '',
    diamondImageSrc: assets.svgs.diamond,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    imagePosition: 'left' as const,
    spacingBottomClasses: 'pt-2 pb-20 mb-0'
  },

  storySection2: {
    heading: 'A Living Culinary Canvas',
    text: "Our chefs are explorers—collectors of recipes, stories, and old secrets passed down through generations. From the sizzle of the Show Kitchen to the last spoonful of dessert, we invite you to taste India as we see it: bold, honest, and endlessly rich in flavour.",
    backgroundColor: '#5E6547',
    headingColor: '#F7E9E2',
    textColor: '#F7E9E2',
    borderImageSrc: assets.svgs.greenBorder,
    showTopBorder: true,
    showBottomBorder: true
  },

  sliderSection2: specialtiesSection,

  imageContentSection: {
    imageSrc: assets.images.indiaMap,
    imagePosition: 'left' as const,
    decoratorImageSrc: assets.svgs.diamond,
    heading: "India’s Culinary Mosaic, Served with Heart",
    subheading: "A journey through India’s kitchens—vibrant, soulful, and made to share",
    backgroundColor: '#F5F1E8',
    headingColor: '#2D2A26',
    subheadingColor: '#5A5550',
    buttons: [
      { text: 'Book a Table', link: '/reservations', backgroundImageSrc: assets.svgs.greenDiamondButton },
      { text: 'Order Online', link: '/menu', backgroundImageSrc: assets.svgs.greenDiamondButton },
      { text: 'View Menu', link: '/menu', backgroundImageSrc: assets.svgs.greenDiamondButton }
    ]
  }
}

</script>

<template>
  <div class="home-page">
    
    <!-- Image Content Section -->
    <ImageContentSection
      class="section"
      v-bind="pageData.imageContentSection"
    />
    
    <!-- Story Section 1 -->
    <StorySection 
      class="section"
      v-bind="pageData.storySection1"
    />

    <!-- Slider Section 1 -->
    <SliderSection 
      class="section"
      :section-data="pageData.sliderSection1"
    />

    <!-- Image Text Section 1 -->
    <ImageTextSection
      class="section"
      :dish-image-src="pageData.imageTextSection1.dishImageSrc"
      :heading="pageData.imageTextSection1.heading"
      :description="pageData.imageTextSection1.description"
      :image-position="pageData.imageTextSection1.imagePosition"
      :spacing_bottom_classes="pageData.imageTextSection1.spacingBottomClasses"
    />

    <!-- Image Text Section 2 -->
    <ImageTextSection
      class="section"
      :dish-image-src="pageData.imageTextSection2.dishImageSrc"
      :heading="pageData.imageTextSection2.heading"
      :diamondImageSrc="pageData.imageTextSection2.diamondImageSrc"
      :description="pageData.imageTextSection2.description"
      :image-position="pageData.imageTextSection2.imagePosition"
      :spacing_bottom_classes="pageData.imageTextSection2.spacingBottomClasses"
    />
      
    <!-- Story Section 2 -->
    <StorySection 
      class="section"
      v-bind="pageData.storySection2"
    />

    <!-- Slider Section 2 -->
    <SliderSection 
      class="section"
      :section-data="pageData.sliderSection2"
    />
    
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}
</style>
