<script setup lang="ts">
import { ref, computed } from 'vue'

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
  decorationColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionBgSrc: new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href,
  bgColor: '#f4efe3',
  decorationColor: '#c85a3a'
})

// Tab SVG backgrounds
const tabBgActive = new URL('../assets/images/button_orange_bg_diamond.svg', import.meta.url).href
const tabBgInactive = new URL('../assets/images/button_green_bg_diamond.svg', import.meta.url).href
const dishDiamond = new URL('../assets/images/dish_diamond.svg', import.meta.url).href
const categoryDiamond = new URL('../assets/images/diamond_story_section.svg', import.meta.url).href

const activeTab = ref(props.categories[0]?.id || '')

const setActiveTab = (categoryId: string) => {
  activeTab.value = categoryId
}

const activeCategoryDishes = computed(() => {
  const category = props.categories.find(cat => cat.id === activeTab.value)
  return category?.dishes || []
})
</script>

<template>
  <section
    :class="`relative w-full bg-repeat bg-[length:600px] py-16 md:py-20`"
    :style="{ 
      backgroundImage: `url(${props.sectionBgSrc})`,
      backgroundColor: props.bgColor
    }"
  >
    <div class="relative mx-auto w-full max-w-4xl px-6 md:px-10">
      <!-- Tabs Navigation -->
      <div class="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <button
          v-for="category in props.categories"
          :key="category.id"
          @click="setActiveTab(category.id)"
          class="tab-button relative transition-all duration-300"
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

      <!-- Category End Decoration -->
      <div class="mb-10 flex items-center justify-center">
        <img 
          :src="props.categoryDecorationSrc || categoryDiamond" 
          alt="Decoration" 
          class="h-5 w-auto opacity-90 md:h-6"
        />
      </div>

      <!-- Dishes Grid -->
      <div class="flex flex-col gap-12 md:gap-16">
        <div
          v-for="dish in activeCategoryDishes"
          :key="dish.name"
          class="dish-card group"
        >
          <!-- Dish Image -->
          <div class="dish-image-container">
            <img 
              :src="dish.imageSrc" 
              :alt="dish.name"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <!-- Dish Content -->
          <div class="dish-content">
            <h3 class="dish-title">
              {{ dish.name }}
            </h3>

            <p class="dish-description">
              {{ dish.description }}
            </p>

            <!-- Card End Decoration -->
            <div class="mt-6 flex items-center justify-center">
              <img 
                :src="dishDiamond" 
                alt="Decoration" 
                class="h-6 w-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section Decoration -->
      <div class="mt-16 flex items-center justify-center gap-1">
        <svg 
          v-for="i in 7" 
          :key="i" 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          :fill="props.decorationColor"
          class="opacity-90"
        >
          <rect x="6" y="0" width="8" height="8" transform="rotate(45 6 6)" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-button {
  position: relative;
  min-width: 140px;
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
    min-width: 160px;
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
    width: 320px;
    height: 240px;
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

/* Performance optimizations */
.dish-card {
  will-change: auto;
  contain: layout style paint;
}

.dish-image-container img {
  will-change: transform;
}
</style>
