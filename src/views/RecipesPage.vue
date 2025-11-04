<script setup lang="ts">
import { ref } from 'vue'
import { Clock, Users, ChefHat } from 'lucide-vue-next'

const recipes = ref([
  {
    id: 1,
    name: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
    prepTime: '30 mins',
    cookTime: '45 mins',
    servings: 4,
    difficulty: 'Medium',
    description: 'A rich and creamy tomato-based curry with tender chicken pieces.',
    ingredients: [
      '500g chicken breast, cubed',
      '2 tbsp butter',
      '1 cup heavy cream',
      '400g tomato puree',
      '2 tbsp garam masala',
      '1 tbsp ginger-garlic paste',
      'Salt to taste'
    ]
  },
  {
    id: 2,
    name: 'Palak Paneer',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    description: 'Cottage cheese cubes in a smooth spinach gravy with aromatic spices.',
    ingredients: [
      '300g paneer, cubed',
      '500g fresh spinach',
      '2 onions, chopped',
      '2 tomatoes, chopped',
      '1 tbsp garam masala',
      '1 tsp cumin seeds',
      'Cream for garnish'
    ]
  },
  {
    id: 3,
    name: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    prepTime: '40 mins',
    cookTime: '60 mins',
    servings: 6,
    difficulty: 'Hard',
    description: 'Fragrant basmati rice layered with marinated chicken and aromatic spices.',
    ingredients: [
      '500g basmati rice',
      '750g chicken pieces',
      '1 cup yogurt',
      '2 onions, sliced',
      '4 tbsp biryani masala',
      'Saffron strands',
      'Fresh mint and coriander'
    ]
  }
])

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    'Easy': '#4ade80',
    'Medium': '#fbbf24',
    'Hard': '#f87171'
  }
  return colors[difficulty] || '#A7713A'
}
</script>

<template>
  <div class="recipes-page">
    <div class="recipes-hero">
      <h1 class="page-title">Traditional Recipes</h1>
      <p class="page-subtitle">Bring the Taste of India to Your Kitchen</p>
    </div>

    <div class="recipes-container">
      <div 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        class="recipe-card"
        data-scroll
        data-scroll-speed="0.4"
      >
        <div class="recipe-image-wrapper">
          <img :src="recipe.image" :alt="recipe.name" class="recipe-image" />
          <div class="recipe-difficulty" :style="{ backgroundColor: getDifficultyColor(recipe.difficulty) }">
            {{ recipe.difficulty }}
          </div>
        </div>
        
        <div class="recipe-content">
          <h3 class="recipe-name">{{ recipe.name }}</h3>
          <p class="recipe-description">{{ recipe.description }}</p>
          
          <div class="recipe-meta">
            <div class="meta-item">
              <Clock :size="18" />
              <span>{{ recipe.prepTime }} + {{ recipe.cookTime }}</span>
            </div>
            <div class="meta-item">
              <Users :size="18" />
              <span>{{ recipe.servings }} servings</span>
            </div>
            <div class="meta-item">
              <ChefHat :size="18" />
              <span>{{ recipe.difficulty }}</span>
            </div>
          </div>

          <div class="recipe-ingredients">
            <h4>Ingredients:</h4>
            <ul>
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipes-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0f0a 0%, #2d1810 100%);
  padding: clamp(3rem, 8vw, 6rem) 0;
}

.recipes-hero {
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 5rem);
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

.page-title {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #f4e0c8;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(244, 224, 200, 0.8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.recipes-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);
}

.recipe-card {
  background: rgba(167, 113, 58, 0.1);
  border: 1px solid rgba(244, 224, 200, 0.2);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(167, 113, 58, 0.3);
}

.recipe-image-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.1);
}

.recipe-difficulty {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a0f0a;
  backdrop-filter: blur(10px);
}

.recipe-content {
  padding: clamp(1.5rem, 3vw, 2rem);
}

.recipe-name {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(1.5rem, 3vw, 1.85rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 0.75rem;
}

.recipe-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: rgba(244, 224, 200, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(244, 224, 200, 0.2);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  color: rgba(244, 224, 200, 0.8);
}

.meta-item svg {
  color: #A7713A;
}

.recipe-ingredients h4 {
  font-family: 'PPMori', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  font-weight: 600;
  color: #f4e0c8;
  margin-bottom: 0.75rem;
}

.recipe-ingredients ul {
  list-style: none;
  padding: 0;
}

.recipe-ingredients li {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  color: rgba(244, 224, 200, 0.7);
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.recipe-ingredients li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #A7713A;
  font-weight: bold;
}

@media (max-width: 768px) {
  .recipes-container {
    grid-template-columns: 1fr;
  }
}
</style>
