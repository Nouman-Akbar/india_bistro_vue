<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface DishItem {
  name: string
  description: string
  imageSrc: string
}

interface MenuCategory {
  id: string
  name: string
  dishes: DishItem[]
}

interface Props {
  categories: MenuCategory[]
  sectionBgSrc?: string
  bgColor?: string
  categoryDecorationSrc?: string
  cardDecorationSrc?: string
  decorationImageSrc?: string
  decorationColor?: string
  showViewFullMenuButton?: boolean
  showBottomDecoration?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sectionBgSrc: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  bgColor: '#f4efe3',
  decorationImageSrc: new URL('../assets/images/diamond_story_section.svg', import.meta.url).href,
  decorationColor: '#c85a3a',
  showViewFullMenuButton: true,
  showBottomDecoration: true
})

const section_bg_pattern = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
const bigBgIcon = new URL('../assets/images/Big BG Icon.svg', import.meta.url).href

// Tab SVG backgrounds
const tabBgActive = new URL('../assets/images/button_orange_bg_diamond.svg', import.meta.url).href
const tabBgInactive = new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href
const dishDiamond = new URL('../assets/images/dish_diamond.svg', import.meta.url).href
const buttonBackground = new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href
// const categoryDiamond = new URL('../assets/images/diamond_story_section.svg', import.meta.url).href

// Default menu data if no categories provided
const defaultCategories: MenuCategory[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    dishes: [
      {
        name: 'Samosa Chat',
        description: 'Crispy samosa pieces topped with chickpeas, yogurt, chutneys, and spices',
        imageSrc: new URL('../assets/images/samosa-chat.jpg', import.meta.url).href
      },
      {
        name: 'Paneer Tikka',
        description: 'Marinated cottage cheese cubes grilled in tandoor with vegetables',
        imageSrc: new URL('../assets/images/paneer-tikka.jpg', import.meta.url).href
      },
      {
        name: 'Aloo Tikki',
        description: 'Spiced potato patties served with chutney and yogurt',
        imageSrc: new URL('../assets/images/aloo-tikki.jpg', import.meta.url).href
      },
      {
        name: 'Hara Bhara Kebab',
        description: 'Spinach and pea patties, crisp outside and tender inside',
        imageSrc: new URL('../assets/images/aloo-tikki.jpg', import.meta.url).href
      },
      {
        name: 'Papdi Chaat',
        description: 'Crispy papdi topped with potatoes, chutneys and yogurt',
        imageSrc: new URL('../assets/images/samosa-chat.jpg', import.meta.url).href
      },
      {
        name: 'Dahi Puri',
        description: 'Hollow puris filled with spiced potatoes, chutneys and yogurt',
        imageSrc: new URL('../assets/images/samosa-chat.jpg', import.meta.url).href
      }
    ]
  },
  {
    id: 'main-course',
    name: 'Main Course',
    dishes: [
      {
        name: 'Butter Chicken',
        description: 'Tender chicken in creamy tomato and butter sauce with aromatic spices',
        imageSrc: new URL('../assets/images/butter-chicken.jpg', import.meta.url).href
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese cubes in rich, creamy tomato-based gravy',
        imageSrc: new URL('../assets/images/paneer-butter-masala.jpg', import.meta.url).href
      },
      {
        name: 'Lamb Rogan Josh',
        description: 'Traditional Kashmiri curry with tender lamb in aromatic gravy',
        imageSrc: new URL('../assets/images/rogan-josh.jpg', import.meta.url).href
      },
      {
        name: 'Dal Makhani',
        description: 'Creamy black lentils slow-cooked with butter and spices',
        imageSrc: new URL('../assets/images/dal-makhani.jpg', import.meta.url).href
      },
      {
        name: 'Chole',
        description: 'Punjabi style chickpea curry simmered with spices',
        imageSrc: new URL('../assets/images/dal-makhani.jpg', import.meta.url).href
      },
      {
        name: 'Palak Paneer',
        description: 'Cottage cheese simmered in smooth spinach gravy',
        imageSrc: new URL('../assets/images/paneer-butter-masala.jpg', import.meta.url).href
      }
    ]
  },
  {
    id: 'breads',
    name: 'Breads',
    dishes: [
      {
        name: 'Garlic Naan',
        description: 'Soft leavened bread topped with garlic butter and fresh herbs',
        imageSrc: new URL('../assets/images/garlic-naan.jpg', import.meta.url).href
      },
      {
        name: 'Butter Roti',
        description: 'Whole wheat flatbread brushed with butter',
        imageSrc: new URL('../assets/images/butter-roti.jpg', import.meta.url).href
      },
      {
        name: 'Paratha',
        description: 'Layered flatbread with ghee, crispy and flaky',
        imageSrc: new URL('../assets/images/paratha.jpg', import.meta.url).href
      },
      {
        name: 'Tandoori Roti',
        description: 'Whole wheat bread cooked in tandoor',
        imageSrc: new URL('../assets/images/butter-roti.jpg', import.meta.url).href
      },
      {
        name: 'Cheese Naan',
        description: 'Stuffed naan with gooey cheese',
        imageSrc: new URL('../assets/images/garlic-naan.jpg', import.meta.url).href
      },
      {
        name: 'Laccha Paratha',
        description: 'Multi-layered flaky paratha',
        imageSrc: new URL('../assets/images/paratha.jpg', import.meta.url).href
      }
    ]
  },
  {
    id: 'rice',
    name: 'Rice Specialties',
    dishes: [
      {
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice with marinated chicken, aromatic spices and herbs',
        imageSrc: new URL('../assets/images/chicken-biryani.jpg', import.meta.url).href
      },
      {
        name: 'Vegetable Pulao',
        description: 'Basmati rice cooked with mixed vegetables and aromatic spices',
        imageSrc: new URL('../assets/images/veg-pulao.jpg', import.meta.url).href
      },
      {
        name: 'Jeera Rice',
        description: 'Basmati rice tempered with cumin',
        imageSrc: new URL('../assets/images/veg-pulao.jpg', import.meta.url).href
      },
      {
        name: 'Mutton Biryani',
        description: 'Slow-cooked lamb layered with fragrant basmati rice',
        imageSrc: new URL('../assets/images/chicken-biryani.jpg', import.meta.url).href
      },
      {
        name: 'Peas Pulao',
        description: 'Fluffy basmati with sweet green peas',
        imageSrc: new URL('../assets/images/veg-pulao.jpg', import.meta.url).href
      },
      {
        name: 'Egg Fried Rice',
        description: 'Stir-fried rice with egg and aromatics',
        imageSrc: new URL('../assets/images/veg-pulao.jpg', import.meta.url).href
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    dishes: [
      {
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
        imageSrc: new URL('../assets/images/gulab-jamun.jpg', import.meta.url).href
      },
      {
        name: 'Rasmalai',
        description: 'Soft cottage cheese dumplings in creamy milk sauce with pistachios',
        imageSrc: new URL('../assets/images/rasmalai.jpg', import.meta.url).href
      },
      {
        name: 'Mango Kulfi',
        description: 'Traditional Indian ice cream with mango flavor',
        imageSrc: new URL('../assets/images/mango-kulfi.jpg', import.meta.url).href
      },
      {
        name: 'Kheer',
        description: 'Creamy rice pudding with cardamom and nuts',
        imageSrc: new URL('../assets/images/rasmalai.jpg', import.meta.url).href
      },
      {
        name: 'Jalebi',
        description: 'Crisp spiral sweets soaked in syrup',
        imageSrc: new URL('../assets/images/gulab-jamun.jpg', import.meta.url).href
      },
      {
        name: 'Chocolate Kulfi',
        description: 'Kulfi with rich chocolate flavor',
        imageSrc: new URL('../assets/images/mango-kulfi.jpg', import.meta.url).href
      }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    dishes: [
      {
        name: 'Mango Lassi',
        description: 'Creamy yogurt drink with mango pulp and cardamom',
        imageSrc: new URL('../assets/images/mango-lassi.jpg', import.meta.url).href
      },
      {
        name: 'Masala Chai',
        description: 'Traditional Indian spiced tea with milk and sweeteners',
        imageSrc: new URL('../assets/images/masala-chai.jpg', import.meta.url).href
      },
      {
        name: 'Fresh Lime Soda',
        description: 'Refreshing drink with fresh lime, soda water, and spices',
        imageSrc: new URL('../assets/images/lime-soda.jpg', import.meta.url).href
      },
      {
        name: 'Sweet Lassi',
        description: 'Classic yogurt drink, lightly sweetened',
        imageSrc: new URL('../assets/images/mango-lassi.jpg', import.meta.url).href
      },
      {
        name: 'Cold Coffee',
        description: 'Iced coffee with milk and a touch of sugar',
        imageSrc: new URL('../assets/images/mango-lassi.jpg', import.meta.url).href
      },
      {
        name: 'Sparkling Water',
        description: 'Chilled soda water with a slice of lime',
        imageSrc: new URL('../assets/images/lime-soda.jpg', import.meta.url).href
      }
    ]
  }
]

// Use provided categories or default ones
const categories = computed(() => props.categories.length > 0 ? props.categories : defaultCategories)

const activeTab = ref(categories.value[0]?.id || '')

type GlobalWindow = Window & {
  locoScroll?: { update?: () => void; updateElements?: () => void } | null
}

const syncCustomScroll = () => {
  if (typeof window === 'undefined') return
  const globalWindow = window as GlobalWindow
  const loco = globalWindow.locoScroll
  if (loco && typeof loco.update === 'function') {
    requestAnimationFrame(() => {
      loco.update?.()
      loco.updateElements?.()
    })
  } else {
    window.dispatchEvent(new Event('resize'))
  }
}

const setActiveTab = (categoryId: string) => {
  activeTab.value = categoryId
}

const activeCategoryDishes = computed(() => {
  const category = categories.value.find(cat => cat.id === activeTab.value)
  return category?.dishes || []
})

// Layout rows: repeatable pattern [image+text (img right)], [two text], [image+text (img left)], [two text]
type RowType = 'imageText' | 'twoText'
interface LayoutRow {
  type: RowType
  imageOn: 'left' | 'right'
  dishes: DishItem[]
}

const layoutRows = computed<LayoutRow[]>(() => {
  const items = activeCategoryDishes.value
  const rows: LayoutRow[] = []
  const pattern: Array<{ type: RowType; imageOn: 'left' | 'right'; take: number }> = [
    { type: 'imageText', imageOn: 'right', take: 1 },
    { type: 'twoText', imageOn: 'right', take: 2 },
    { type: 'imageText', imageOn: 'left', take: 1 },
    { type: 'twoText', imageOn: 'left', take: 2 }
  ]
  let index = 0
  let pIndex = 0
  while (index < items.length) {
    const step = pattern[pIndex % pattern.length]
    const slice = items.slice(index, index + step.take)
    if (slice.length === 0) break
    rows.push({ type: step.type, imageOn: step.imageOn, dishes: slice })
    index += slice.length
    pIndex += 1
  }
  return rows
})

watch(
  () => categories.value,
  (newCategories) => {
    if (!newCategories.length) {
      activeTab.value = ''
      return
    }

    if (!newCategories.some(category => category.id === activeTab.value)) {
      activeTab.value = newCategories[0].id
    }
  },
  { immediate: true }
)

watch(
  () => activeTab.value,
  async () => {
    await nextTick()
    syncCustomScroll()
  }
)
</script>

<template>
  <section
    class="relative w-full bg-repeat overflow-hidden pb-16 md:pb-20"
    :style="{
      'background-image': `url(${section_bg_pattern})`,
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'center'
    }"
  >
    <!-- Big BG Icon Overlay -->
    <div class="big-bg-icon-overlay">
      <img :src="bigBgIcon" alt="" class="big-bg-icon" />
    </div>
    <div class="relative mx-auto w-full max-w-6xl px-6 md:px-10">
      <!-- Tabs Wrapper -->
      <div class="tabs-wrapper">
        <!-- Tabs Navigation -->
        <div class="tabs-container flex items-center justify-center gap-4 overflow-x-auto whitespace-nowrap no-scrollbar mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="setActiveTab(category.id)"
          class="tab-button relative transition-all duration-300 flex-none"
          :class="{ 'active': activeTab === category.id }"
        >
          <span class="tab-bg" :class="{ 'active': activeTab === category.id }">
            <img
              :src="activeTab === category.id ? tabBgActive : tabBgInactive"
              alt="Tab Decoration"
              class="w-full h-full"
            />
          </span>
          <span class="tab-text">
            {{ category.name }}
          </span>
        </button>
        </div>
      </div>

      <!-- Category End Decoration -->
   

      <!-- Dishes Grid (patterned rows) -->
      <div class="flex flex-col gap-14 md:gap-20 max-w-4xl  mx-auto ">
        <template v-for="(row, rIdx) in layoutRows" :key="`row-${rIdx}`">
          <div
            v-if="row.type === 'imageText'"
            class="dish-card group"
            :class="{ 'reverse': row.imageOn === 'right' }"
          >
            <div class="dish-image-container">
              <img 
                :src="row.dishes[0].imageSrc" 
                :alt="row.dishes[0].name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="dish-content">
              <h3 class="dish-title">{{ row.dishes[0].name }}</h3>
              <p class="dish-description">{{ row.dishes[0].description }}</p>
              <div class="mt-6 flex items-center justify-center">
                <img :src="dishDiamond" alt="Decoration" class="h-6 w-auto opacity-90" />
              </div>
            </div>
          </div>
          <div v-else class="two-text-row">
            <div
              v-for="dish in row.dishes"
              :key="dish.name"
              class="two-text-card"
            >
              <h3 class="dish-title">{{ dish.name }}</h3>
              <p class="dish-description">{{ dish.description }}</p>
              <div class="mt-5 flex items-center justify-center">
                <img :src="dishDiamond" alt="Decoration" class="h-5 w-auto opacity-90" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- View Full Menu Button -->
      <a
        v-if="props.showViewFullMenuButton"
        class="cta-button"
        href="https://drive.google.com/file/d/1h2bltIsB_OulQEZASHMH99Vs54VN5WD5/view?usp=sharing"
        target="_blank"
        rel="noopener"
      >
        <span class="cta-button-bg">
          <img :src="buttonBackground" alt="Button background" />
        </span>
        <span class="cta-button-text">View Full Menu</span>
      </a>

      <!-- Bottom Section Decoration -->
      <div
        v-if="props.showBottomDecoration"
        class="mt-12 flex items-center justify-center"
      >
        <img
          :src="props.decorationImageSrc"
          alt="Decoration"
          class="h-6 w-auto opacity-90"
          :style="{ filter: `brightness(0) saturate(100%) invert(38%) sepia(47%) saturate(1234%) hue-rotate(337deg) brightness(92%) contrast(87%)` }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-button {
  position: relative;
  min-width: 140px;
  max-width: 200px;
  height: 50px;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
}

.tab-button:hover .tab-bg:not(.active) svg path {
  fill: #7a9d7a;
}

.tab-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tab-bg svg {
  width: 100%;
  height: 100%;
}

.tab-bg svg path {
  transition: fill 0.3s ease;
}

.tab-text {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
}

@media (min-width: 768px) {
  .tab-button {
    min-width: 200px;
  }
  
  .tab-text {
    font-size: 1rem;
    padding: 0 2rem;
  }
}

.dish-card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: transparent;
  max-width: 100%;
}

@media (min-width: 768px) {
  .dish-card {
    flex-direction: row;
    align-items: center;
  }
  .dish-card.reverse {
    flex-direction: row-reverse;
  }
}

.dish-image-container {
  flex-shrink: 0;
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
}

@media (min-width: 768px) {
  .dish-image-container {
    width: 360px;
    height: 250px;
  }
}

.dish-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 0;
}

@media (min-width: 768px) {
  .dish-content {
    padding: 0 0 0 3rem;
  }
  .dish-card.reverse .dish-content {
    padding: 0 3rem 0 0;
  }
}

.dish-title {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #000000;
  margin-bottom: 0.75rem;
}

@media (min-width: 768px) {
  .dish-title {
    font-size: 1.35rem;
  }
}

.dish-description {
  font-size: 0.875rem;
  line-height: 1.7;
  color: #333333;
  letter-spacing: 0.02em;
}

@media (min-width: 768px) {
  .dish-description {
    font-size: 0.95rem;
  }
}

.card-divider {
  margin-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* Two-text row layout */
.two-text-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .two-text-row {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.two-text-card {
  background: transparent;
  text-align: center;
}

/* Performance optimizations */
.dish-card {
  will-change: auto;
  contain: layout style paint;
}

.dish-image-container img {
  will-change: transform;
}

/* Big BG Icon Overlay */
.big-bg-icon-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  height: auto;
  z-index: 2;
  pointer-events: none;
  opacity: 1;
}

.big-bg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Ensure content is above the background overlay */
.relative {
  position: relative;
  z-index: 3;
}

/* Hide horizontal scrollbar for tabs on supported browsers */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Tabs wrapper - non-sticky */
.tabs-wrapper {
  position: relative;
  z-index: 50;
}

.cta-button {
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  align-self: center;
  margin: 8rem auto 0;
  width: 100%;
  max-width: 320px;
  display: block;
}

.cta-button-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-button-bg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cta-button-text {
  position: relative;
  display: block;
  width: 100%;
  padding: 0.95rem 2rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: #ffffff;
  text-align: center;
}
</style>
