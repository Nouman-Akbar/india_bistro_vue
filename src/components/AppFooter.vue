<script setup lang="ts">
import { Facebook, Instagram, Twitter } from 'lucide-vue-next';
import DragonIcon from './icons/DragonIcon.vue';
</script>

<template>
  <footer class="bg-black text-text-muted">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <DragonIcon class="h-8 w-8 text-accent" />
            <span class="text-xl font-serif font-bold text-text">The Golden Dragon</span>
          </div>
          <p class="max-w-sm">A culinary journey into the heart of China, where ancient recipes are reborn with a modern twist.</p>
        </div>
        <div>
          <h4 class="font-bold text-text tracking-wider uppercase mb-4">Hours</h4>
          <ul class="space-y-2">
            <li>Mon - Fri: 12pm - 10pm</li>
            <li>Sat - Sun: 11am - 11pm</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-text tracking-wider uppercase mb-4">Contact</h4>
          <ul class="space-y-2">
            <li>123 Dragon St, Chinatown</li>
            <li>(123) 456-7890</li>
            <li>contact@goldendragon.com</li>
          </ul>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-sm">&copy; 2025 The Golden Dragon. All Rights Reserved.</p>
        <div class="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" class="hover:text-accent transition-colors"><Twitter size="20" /></a>
          <a href="#" class="hover:text-accent transition-colors"><Instagram size="20" /></a>
          <a href="#" class="hover:text-accent transition-colors"><Facebook size="20" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>
