<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { faker } from '@faker-js/faker';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const menuItems = ref<MenuItem[]>([]);

onMounted(() => {
  const imagePool = [
    'https://images.unsplash.com/photo-1563245372-f21724557952?q=80&w=2794&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1625937329935-287034AD4286?q=80&w=2787&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1623786438426-561594700a85?q=80&w=2815&auto=format&fit=crop',
  ];
  for (let i = 0; i < 3; i++) {
    menuItems.value.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(10),
      price: faker.commerce.price({ min: 15, max: 40, dec: 0, symbol: '$' }),
      image: imagePool[i],
    });
  }
});
</script>

<template>
  <section class="py-20 sm:py-32 bg-background">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-text">Signature Dishes</h2>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-text-muted">Crafted with passion, from our kitchen to your table.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <div 
          v-for="(item, index) in menuItems" 
          :key="item.id"
          class="group"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 150, duration: 500 } }"
        >
          <div class="overflow-hidden rounded-lg">
            <img :src="item.image" :alt="item.name" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
          </div>
          <div class="mt-6">
            <div class="flex justify-between items-baseline">
              <h3 class="text-xl font-bold font-serif text-text">{{ item.name }}</h3>
              <p class="text-xl font-bold text-accent">{{ item.price }}</p>
            </div>
            <p class="mt-2 text-text-muted">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
