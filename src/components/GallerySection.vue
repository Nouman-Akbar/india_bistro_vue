<script setup lang="ts">
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1555126634-785b58248b4d?q=80&w=2787&auto=format&fit=crop', alt: 'Noodles', class: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1569718212165-fb6926504f05?q=80&w=2800&auto=format&fit=crop', alt: 'Soup' },
  { src: 'https://images.unsplash.com/photo-1599557422855-731564125134?q=80&w=2787&auto=format&fit=crop', alt: 'Dim sum' },
  { src: 'https://images.unsplash.com/photo-1541544331-554835a4d204?q=80&w=2787&auto=format&fit=crop', alt: 'Restaurant interior', class: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1562859547-60335a092198?q=80&w=2787&auto=format&fit=crop', alt: 'Plated dish' },
  { src: 'https://images.unsplash.com/photo-1617054290196-43b48f935515?q=80&w=2787&auto-format&fit=crop', alt: 'Another dish' },
];
</script>

<template>
  <section class="py-20 sm:py-32 bg-background/95">
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
