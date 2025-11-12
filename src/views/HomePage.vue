<script setup lang="ts">
import { favouritesSection, specialtiesSection } from '../data/sliderSections'
import { createLazyComponent } from '@/utils/lazyComponent'

const StorySection = createLazyComponent(() => import('../components/StorySection.vue'))
const StorySectionCanvas = createLazyComponent(() => import('../components/StorySectionCanvas.vue'))
const SliderSection = createLazyComponent(() => import('../components/SliderSection.vue'))
const SliderSectionNoButton = createLazyComponent(() => import('../components/SliderSectionNoButton.vue'))
const DoubleImageTextSection = createLazyComponent(() => import('../components/DoubleImageTextSection.vue'))
const ImageContentSection = createLazyComponent(() => import('../components/ImageContentSection.vue'))
const InteractiveMapSection = createLazyComponent(() => import('../components/InteractiveMapSection.vue'))
const HomePopup = createLazyComponent(() => import('../components/HomePopup.vue'))

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
  popupData: {
      heading: "We’re now open in Leeds! Reserve your table at India Bistro UK today and enjoy the best Indian food in town.",
      buttonText: 'BOOK A TABLE',
      buttonLink: '/contact',
      buttonBackgroundSrc: new URL('../assets/images/button_orange_bg_diamond.svg', import.meta.url).href,
      patternSrc: new URL('../assets/images/home_popup_pattern.svg', import.meta.url).href,
      backgroundColor: '#8D3A30',
      textColor: '#FFFFFF'
  },
  storySection1: {
    heading: '',
    text: "Celebrate the rich tapestry of Indian cuisine, from Delhi’s Street chaats to Kerala’s coastal curries. Every dish is prepared using traditional recipes with a contemporary twist for a true Indian dining experience in the UK.",
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
    heading: 'More Than Just Food A Celebration of India ON Every Plate, a Passage Through India',
    description: [
      "India is not a single story it's millions of them, simmering in bustling kitchens, whispered in ancient recipes, carried across coasts, mountains, and cities.",
      "At India Bistro, we gather these stories from smoky tandoors in the North to coastal spice trails in the South and reimagine them for today's table.",
      "Every dish is a piece of our homeland's living, breathing culinary map: soulful, unexpected, and meant to be shared."
    ],
    imagePosition: 'right' as const,
    spacingBottomClasses: 'pt-20 pb-0 mb-0'
  },

  imageTextSection2: {
    dishImageSrc: assets.images.chicken,
    heading: '',
    diamondImageSrc: assets.svgs.diamond,
    description: [
      "Our kitchen is where heritage meets curiosity the warmth of your grandmother's curry, the crunch of a street-side chaat, the comfort of a meal that feels like home, yet surprises you every time.This is more than just dining.",
      "This is India generous, diverse, alive served on a plate."
    ],
    imagePosition: 'left' as const,
    spacingBottomClasses: 'pt-2 pb-20 mb-0'
  },

  storySection2: {
    heading: 'A Living Culinary Canvas',
    text: "Our chefs are explorers collectors of recipes, stories, and old secrets passed down through generations. From the sizzle of the Show Kitchen to the last spoonful of dessert, we invite you to taste India as we see it: bold, honest, and endlessly rich in flavour.",
    backgroundColor: '#5E6547',
    headingColor: '#F7E9E2',
    textColor: '#F7E9E2',
    borderImageSrc: assets.svgs.greenBorder,
    showTopBorder: true,
    showBottomBorder: true
  },

  sliderSection2: specialtiesSection,

  sliderSectionNoButton: {
    name: "no_button_section",
    heading: "What Our Guests Say",
    section_color: "#D2691E",
    show_arrows: true,
    blocks: [
      {
        block_image: new URL('../assets/images/gallery/Rectangle 31.svg', import.meta.url).href,
        block_heading: "@Rushi Gokani",
        block_description: "Fragrant basmati rice layered with tender lamb, saffron and fried onions."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 32.svg', import.meta.url).href,
        block_heading: "@Chandni",
        block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 33.svg', import.meta.url).href,
        block_heading: "@Tirth Joshi",
        block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
        block_heading: "@Anitket Biswas",
        block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 36.svg', import.meta.url).href,
        block_heading: "@Tirth Joshi",
        block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
        block_heading: "@Rushi Gokani",
        block_description: "Fresh catch of the day in coconut milk with curry leaves and mustard seeds."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
        block_heading: "@For_yu",
        block_description: "Fresh catch of the day in coconut milk with curry leaves and mustard seeds."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 34.svg', import.meta.url).href,
        block_heading: "@Hacker_2134",
        block_description: "Assorted meats and vegetables cooked in our traditional clay oven."
      },
      {
        block_image: new URL('../assets/images/gallery/Rectangle 37.svg', import.meta.url).href,
        block_heading: "@Fruis",
        block_description: "Fresh catch of the day in coconut milk with curry leaves and mustard seeds."
      }
    ]
  },

  imageContentSection: {
    imageSrc: assets.images.indiaMap,
    imagePosition: 'left' as const,
    decoratorImageSrc: assets.svgs.diamond,
    heading: "India’s Culinary Mosaic, Served with Heart",
    subheading: "A journey through India’s kitchens vibrant, soulful, and made to share",
    backgroundColor: '#F5F1E8',
    headingColor: '#2D2A26',
    subheadingColor: '#5A5550',
    buttons: [
      { text: 'Book a Table', link: '/reservations', backgroundImageSrc: assets.svgs.greenDiamondButton },
      { text: 'Order Online', link: '/menu', backgroundImageSrc: assets.svgs.greenDiamondButton },
      { text: 'View Menu', link: '/menu', backgroundImageSrc: assets.svgs.greenDiamondButton }
    ]
  },

  interactiveMapSection: {
    heading: "Discover India's Culinary Heritage",
    subheading: "A journey through India’s kitchens vibrant, soulful, and made to share",
    description: "A journey through India’s kitchens vibrant, soulful, and made to share",
  
    decoratorImageSrc: assets.svgs.diamond,
    backgroundColor: '#F5F1E8',
    headingColor: '#2D2A26',
    subheadingColor: '#5A5550',
    descriptionColor: '#5A5550',
    buttons: [
      { text: 'Book a Table', link: '/reservations', backgroundImageSrc: assets.svgs.greenDiamondButton },
      { text: 'Order Online', link: '/menu', backgroundImageSrc: assets.svgs.greenDiamondButton },
      { text: 'View Menu', link: '/menu', backgroundImageSrc: assets.svgs.greenDiamondButton }
    ],
    markers: [
      {
        id: 'punjab',
        stateName: 'Punjab',
        x: 220,
        y: 190,
        shortText: 'Land of Butter Chicken & Makki di Roti'
      },
      {
        id: 'gujarat',
        stateName: 'Gujarat',
        x: 100,
        y: 430,
        shortText: 'Dhokla, Fafda & Sweet Treasures'
      },
      {
        id: 'kerala',
        stateName: 'Kerala',
        x: 230,
        y: 820,
        shortText: 'Coconut Curry & Appam Paradise'
      },
      {
        id: 'bengal',
        stateName: 'West Bengal',
        x: 560,
        y: 430,
        shortText: 'Macher Jhol & Sweet Mishti'
      },
      {
        id: 'rajasthan',
        stateName: 'Rajasthan',
        x: 200,
        y: 320,
        shortText: 'Dal Baati Churma & Royal Feasts'
      }
    ]
  }
}

</script>

<template>
  <div class="home-page page-content">
    <!-- Popup Modal -->
    <HomePopup v-bind="pageData.popupData" />

    <InteractiveMapSection
      class="section"
      v-bind="pageData.interactiveMapSection"
    />

    <!-- Image Content Section -->
    <!-- <ImageContentSection
      class="section"
      v-bind="pageData.imageContentSection"
    /> -->
    
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

    <!-- Combined Image Text Section (exact layout) -->
    <DoubleImageTextSection
      class="section"
      :section-one="pageData.imageTextSection1"
      :section-two="pageData.imageTextSection2"
    />
      
    <!-- Story Section 2 (Canvas variant with stars) -->
    <StorySectionCanvas
      class="section"
      v-bind="pageData.storySection2"
      :decorator-image-src="assets.svgs.diamond"
    />

    <!-- Slider Section No Button -->
    <SliderSectionNoButton
      class="section"
      :section-data="pageData.sliderSectionNoButton"
    />

    <!-- Interactive Map Section -->
   
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}

/* Remove gaps between sections */
.section {
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}

/* Ensure no gaps between any sections */
.home-page > * {
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}
</style>
