<script setup lang="ts">
const galleryImages = [
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Noodles', class: 'row-span-2' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Soup' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Dim sum' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Restaurant interior', class: 'col-span-2 row-span-2' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Plated dish' },
  { src: 'https://images.pexels.com/photos/2425705/pexels-photo-2425705.jpeg', alt: 'Another dish' },
];

const bg_section = new URL('../assets/images/section_bg_pattern.svg', import.meta.url).href
</script>

<template>
  <section class="py-20 sm:py-32 bg-background/95" :style="{ '--bg-image': 'url(' + bg_section + ')' }">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-text">A Feast for the Eyes</h2>
        <p class="mt-4 max-w-2xl mx-auto text-lg text-text-muted">Discover the ambiance and culinary artistry of The Golden Dragon.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
        <div
          v-for="(image, index) in galleryImages"
          :key="index"
          :class="['group relative overflow-hidden rounded-lg', image.class]"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100 + index * 50,
              duration: 500,
              ease: 'easeOut',
            },
          }"
        >
          <img :src="image.src" :alt="image.alt" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div class="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </div>
  </section>
</template>
