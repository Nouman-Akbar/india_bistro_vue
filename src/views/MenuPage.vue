<script setup lang="ts">
import RichTextSection from '@/components/RichTextSection.vue'
import TabbedMenuSection from '@/components/TabbedMenuSection.vue'

// Asset URLs
const assets = {
  images: {
    chicken: new URL('../assets/images/chicken.jpg', import.meta.url).href
  },
  svgs: {
    sectionBg: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
  }
}

// Page Data Structure
const pageData = {
  richTextSection: {
    heading: 'A Journey Across India, One Plate at a Time',
    description: "Our menu travels from the rugged kitchens of Punjab to Kerala's backwaters, from Delhi's bustling streets to coastal Goa. Expect classics, regional specials, and modern surprises  all designed to be shared.",
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
  }
}
</script>

<template>
  <div class="menu-page">
    
    <!-- Rich Text Section -->
    <RichTextSection
      class="section"
      v-bind="pageData.richTextSection"
    />

    <!-- Tabbed Menu Section -->
    <TabbedMenuSection
      class="section"
      v-bind="pageData.tabbedMenuSection"
    />
    
  </div>
</template>

<style scoped>
.menu-page {
  width: 100%;
}
</style>
