<script setup lang="ts">
import { ref } from 'vue'
import { ChefHat, Flame, Leaf } from 'lucide-vue-next'

const categories = ref([
  {
    name: 'Starters',
    icon: ChefHat,
    items: [
      { name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes and peas', price: '£5.99' },
      { name: 'Pakora', description: 'Deep-fried vegetable fritters with mint chutney', price: '£6.49' },
      { name: 'Chicken Tikka', description: 'Marinated chicken pieces grilled to perfection', price: '£7.99' },
      { name: 'Paneer Tikka', description: 'Grilled cottage cheese with aromatic spices', price: '£7.49' }
    ]
  },
  {
    name: 'Main Course',
    icon: Flame,
    items: [
      { name: 'Butter Chicken', description: 'Tender chicken in creamy tomato sauce', price: '£12.99' },
      { name: 'Lamb Rogan Josh', description: 'Slow-cooked lamb in aromatic curry', price: '£14.99' },
      { name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy', price: '£10.99' },
      { name: 'Biryani', description: 'Fragrant basmati rice with your choice of protein', price: '£13.99' },
      { name: 'Tandoori Mixed Grill', description: 'Assorted grilled meats and vegetables', price: '£16.99' },
      { name: 'Dal Makhani', description: 'Black lentils in creamy butter sauce', price: '£9.99' }
    ]
  },
  {
    name: 'Vegetarian Specials',
    icon: Leaf,
    items: [
      { name: 'Chana Masala', description: 'Chickpeas in spiced tomato gravy', price: '£9.49' },
      { name: 'Aloo Gobi', description: 'Cauliflower and potatoes with aromatic spices', price: '£8.99' },
      { name: 'Baingan Bharta', description: 'Roasted eggplant mash with spices', price: '£9.99' },
      { name: 'Malai Kofta', description: 'Vegetable dumplings in creamy sauce', price: '£10.49' }
    ]
  }
])
</script>

<template>
  <div class="menu-page">
    <div class="menu-hero">
      <h1 class="menu-title">Our Menu</h1>
      <p class="menu-subtitle">Authentic Indian Cuisine Crafted with Love</p>
    </div>

    <div class="menu-container">
      <div 
        v-for="category in categories" 
        :key="category.name" 
        class="menu-category"
        data-scroll
        data-scroll-speed="0.5"
      >
        <div class="category-header">
          <component :is="category.icon" class="category-icon" :size="32" />
          <h2 class="category-name">{{ category.name }}</h2>
        </div>
        
        <div class="menu-items">
          <div 
            v-for="item in category.items" 
            :key="item.name" 
            class="menu-item"
          >
            <div class="item-info">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
            </div>
            <span class="item-price">{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0f0a 0%, #2d1810 100%);
  padding: clamp(3rem, 8vw, 6rem) 0;
}

.menu-hero {
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 5rem);
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

.menu-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #f4e0c8;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.menu-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(244, 224, 200, 0.8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5rem);
}

.menu-category {
  background: rgba(167, 113, 58, 0.1);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 16px;
  padding: clamp(2rem, 4vw, 3rem);
  backdrop-filter: blur(10px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(244, 224, 200, 0.3);
}

.category-icon {
  color: #A7713A;
}

.category-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 600;
  color: #f4e0c8;
  letter-spacing: 0.05em;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.25rem;
  background: rgba(26, 15, 10, 0.4);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(167, 113, 58, 0.2);
  transform: translateX(8px);
}

.item-info {
  flex: 1;
}

.item-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 0.5rem;
}

.item-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  color: rgba(244, 224, 200, 0.7);
  line-height: 1.6;
}

.item-price {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  color: #A7713A;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .menu-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .item-price {
    align-self: flex-start;
  }
}
</style>
