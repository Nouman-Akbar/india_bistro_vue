<script setup lang="ts">
import { createLazyComponent } from '@/utils/lazyComponent'
const EnhancedRichTextSection = createLazyComponent(() => import('@/components/EnhancedRichTextSection.vue'))
const TabbedMenuSection = createLazyComponent(() => import('@/components/TabbedMenuSection.vue'))

// Asset URLs
const assets = {
  images: {
    chicken: new URL('../assets/images/chicken.jpg', import.meta.url).href
  },
  svgs: {
    sectionBg: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
    buttonBg: new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href
  }
}

// Page Data Structure
const pageData = {
  richTextSection: {
    heading: 'FOOD PHILOSOPHY',
    paragraphs: [
      `At India Bistro, food takes center stage celebrated, not just served. Our culinary philosophy is rooted in authenticity, yet driven by reinvention. Every dish is a tribute to India's diverse food heritage, reimagined for today's diner.`,

      `Our chefs have journeyed from the spice-laden coasts of Kerala to the rugged kitchens of Punjab, collecting recipes, stories, and techniques along the way. What emerges on our plates is a modern mosaic of regional Indian flavours revived with finesse and presented with care.`,

      `India Bistro strikes a fine balance between the comforting and the curious. Whether it's a soulful nihari slow-cooked overnight or a crisp palak chaat layered with tamarind chutney and bursts of pomegranate, every bite carries a sense of place without being weighed down or trying too hard to impress.`,

      `In a world where Indian food is often lost to excess, too heavy, too oily, too complicated, we bring a refreshing perspective: bold, honest, and beautifully Indian.`
    ],
    sectionBgSrc: assets.svgs.sectionBg,
    bgColor: '#f4efe3',
    headingColor: '#000000',
    descriptionColor: '#000000',
    decorationColor: '#c85a3a'
  },

  tabbedMenuSection: {
    sectionBgSrc: assets.svgs.sectionBg,
    bgColor: '#f4efe3',
    decorationColor: '#c85a3a',
    showViewFullMenuButton: false,
    showBottomDecoration: false,
    categories: [
      {
        id: 'appetizers',
        name: 'Appetizers',
        dishes: [
          {
            name: 'Kathal Ki Haleem',
            description: "Our Hyderabadi classic, now reinvented for vegetarians (yup, no mutton). Tender baby jackfruit slow cooked with spices, caramelized onions, fried cashews, crispy ginger, dahi. And a squeeze of nimbu.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Khadak Daal',
            description: "Whole black lentils soaked in tomato puree, butter, and cream, and simmered on low heat for hours. Served with patience and precision, but it rewards you with Daal's pure comfort.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Aloo Tikki',
            description: 'Spiced potato patties with chutneys and yogurt.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Paneer Tikka',
            description: 'Marinated paneer cubes char-grilled with peppers and onions.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Hara Bhara Kebab',
            description: 'Crisp spinach and pea kebabs, tender inside.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Papdi Chaat',
            description: 'Crispy papdi with potatoes, chutneys, and yogurt.',
            imageSrc: assets.images.chicken
          }
        ]
      },
      {
        id: 'staples',
        name: 'Staples',
        dishes: [
          {
            name: 'Guntur Butter Chicken',
            description: "Cooked low in a silkily rich tomato sauce, infused with the heat of Guntur chillies and finished with a dollop of cream. A bold twist on an old favourite.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Shadab Chicken Biryani',
            description: "Straight from the heart of India's biryani capital. Tender chicken marinated with yoghurt, mint, coriander and spices, layered with fragrant basmati rice and saffron.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Dal Makhani',
            description: 'Creamy black lentils slow cooked overnight.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Chole',
            description: 'Punjabi style chickpea curry simmered with spices.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Palak Paneer',
            description: 'Paneer simmered in smooth spinach gravy.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Jeera Rice',
            description: 'Basmati rice tempered with cumin.',
            imageSrc: assets.images.chicken
          }
        ]
      },
      {
        id: 'mains',
        name: 'Mains',
        dishes: [
          {
            name: 'Chicken Chettinad',
            description: "Fiery, fragrant, and packed with flavour. Chicken simmered in a peppery coconut-tomato gravy with curry leaves, fennel and black stone cloves. A bold favourite from Tamil Nadu's spice coast.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Malai Chingri',
            description: "Bengali royalty on a plate. King prawns bathed in a rich, aromatic malai gravy. This Gujarati favourite is a love letter to indulgent, which owes to think of it, describes the city perfectly.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Lamb Rogan Josh',
            description: 'Traditional Kashmiri curry with tender lamb.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Paneer Butter Masala',
            description: 'Cottage cheese in a rich tomato-butter gravy.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Veg Korma',
            description: 'Mixed vegetables in a creamy cashew gravy.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Grilled Fish Tikka',
            description: 'Marinated fish fillets grilled to perfection.',
            imageSrc: assets.images.chicken
          }
        ]
      },
      {
        id: 'desserts',
        name: 'Desserts',
        dishes: [
          {
            name: 'Gulab Jamun',
            description: "Soft, golden dumplings soaked in fragrant rose syrup. A classic Indian sweet that melts in your mouth.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Kulfi',
            description: "Traditional Indian ice cream, dense and creamy, flavored with cardamom and pistachios.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Rasmalai',
            description: 'Cottage cheese patties in sweetened milk.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Jalebi',
            description: 'Crispy spirals soaked in saffron syrup.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Kheer',
            description: 'Creamy rice pudding with cardamom and nuts.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Mango Shrikhand',
            description: 'Hung curd whipped with mango and saffron.',
            imageSrc: assets.images.chicken
          }
        ]
      },
      {
        id: 'drinks',
        name: 'Drinks',
        dishes: [
          {
            name: 'Mango Lassi',
            description: "Smooth yogurt drink blended with sweet mango pulp and a hint of cardamom.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Masala Chai',
            description: "Aromatic black tea brewed with warming spices, milk, and a touch of sweetness.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Sweet Lassi',
            description: 'Classic yogurt drink, lightly sweetened.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Cold Coffee',
            description: 'Iced coffee with milk and sugar.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Fresh Lime Soda',
            description: 'Sparkling lime and soda with a pinch of salt.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Sparkling Water',
            description: 'Chilled soda water with a slice of lime.',
            imageSrc: assets.images.chicken
          }
        ]
      }
    ]
  },

  chefSpecialSection: {
    heading: "BEVERAGE PHILOSOPHY",
    paragraphs: [
      "At India Bistro, we believe in heightening the culinary experience with drinks, tailored by our specialist bartenders to be rightly paired with your meal preferences."
    ],
    sectionBgSrc: assets.svgs.sectionBg,
    bgColor: '#f4efe3',
    headingColor: '#000000',
    descriptionColor: '#000000',
    decorationColor: '#c85a3a'
  },

  additionalMenuSection: {
    sectionBgSrc: assets.svgs.sectionBg,
    bgColor: '#f4efe3',
    decorationColor: '#c85a3a',
    showViewFullMenuButton: true,
    showBottomDecoration: true,
    categories: [
      {
        id: 'mains',
        name: 'Main Courses',
        dishes: [
          {
            name: 'Palak Paneer',
            description: 'Paneer simmered in smooth spinach gravy.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Jeera Rice',
            description: 'Basmati rice tempered with cumin.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Chicken Chettinad',
            description: "Fiery, fragrant, and packed with flavour. Chicken simmered in a peppery coconut-tomato gravy with curry leaves, fennel and black stone cloves. A bold favourite from Tamil Nadu's spice coast.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Malai Chingri',
            description: "Bengali royalty on a plate. King prawns bathed in a rich, aromatic malai gravy. This Gujarati favourite is a love letter to indulgent, which owes to think of it, describes the city perfectly.",
            imageSrc: assets.images.chicken
          }
        ]
      },
      {
        id: 'desserts',
        name: 'Beverages',
        dishes: [
          {
            name: 'Lamb Rogan Josh',
            description: 'Traditional Kashmiri curry with tender lamb.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Paneer Butter Masala',
            description: 'Cottage cheese in a rich tomato-butter gravy.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Veg Korma',
            description: 'Mixed vegetables in a creamy cashew gravy.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Grilled Fish Tikka',
            description: 'Marinated fish fillets grilled to perfection.',
            imageSrc: assets.images.chicken
          },
          {
            name: 'Gulab Jamun',
            description: "Soft, golden dumplings soaked in fragrant rose syrup. A classic Indian sweet that melts in your mouth.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Kulfi',
            description: "Traditional Indian ice cream, dense and creamy, flavored with cardamom and pistachios.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Mango Lassi',
            description: "Smooth yogurt drink blended with sweet mango pulp and a hint of cardamom.",
            imageSrc: assets.images.chicken
          },
          {
            name: 'Masala Chai',
            description: "Aromatic black tea brewed with warming spices, milk, and a touch of sweetness.",
            imageSrc: assets.images.chicken
          }
        ]
      }
    ]
  }
}
</script>

<template>
  <div class="menu-page page-content">
    
    <!-- Rich Text Section -->
    <EnhancedRichTextSection
      class="section"
      v-bind="pageData.richTextSection"
      max-width="6xl"
    />

    <!-- Tabbed Menu Section -->
    <TabbedMenuSection
      class="section"
      v-bind="pageData.tabbedMenuSection"
    />

    <!-- Additional Rich Text Section -->
    <EnhancedRichTextSection
      class="section"
      v-bind="pageData.chefSpecialSection"
      max-width="6xl"
    />

    <!-- Additional Tabbed Menu Section -->
    <TabbedMenuSection
      class="section"
      v-bind="pageData.additionalMenuSection"
    />

    <!-- View Full Menu Button -->

  </div>
</template>

<style scoped>
.menu-page {
  width: 100%;
}
</style>
