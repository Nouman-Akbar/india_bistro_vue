# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript compilation and Vite build)
- **Type checking**: `vue-tsc` (included in build process)
- **Preview production build**: `npm run preview`
- **Run tests**: `npm run test` (currently no tests configured)

## Project Architecture

This is a modern Vue 3 restaurant website built with TypeScript and Vite, following a performance-oriented architecture with advanced animations and scrolling capabilities.

### Core Technology Stack

- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety throughout the application
- **Vite** as the build tool and development server
- **Tailwind CSS** with custom design system and extended theme
- **Vue Router 4** with lazy-loaded routes and custom scroll behavior

### Animation and Scrolling System

- **GSAP** with ScrollTrigger for professional scroll-based animations
- **Locomotive Scroll** for enhanced scrolling experience with smooth behavior
- **@vueuse/motion** for simpler Vue-integrated animations
- **Intersection Observer API** for efficient scroll-triggered effects

### Project Structure

```
src/
├── components/       # Reusable Vue components
│   ├── # Layout: AppHeader.vue, AppFooter.vue
│   ├── # Content Sections: BannerSection.vue, ImageTextSection.vue, StorySection.vue
│   ├── # Interactive: SliderSection.vue, TabbedMenuSection.vue
│   └── # Special: ModelViewer.vue, GalleryParallax.vue, About3DShowcase.vue
├── views/           # Page-level components (lazy-loaded)
├── data/            # TypeScript data definitions and configurations
├── router/          # Vue Router configuration
├── utils/           # Utility functions and composables
├── assets/          # Static assets (images, SVGs, fonts)
├── Fonts/           # Custom font files
└── Logos/           # Brand logo assets
```

### Key Architectural Patterns

**Component Architecture**:
- Views (`src/views/`) are top-level page components mapped to routes
- Components (`src/components/`) are reusable UI elements
- Uses `createLazyComponent` helper for performance-optimized lazy loading

**State Management**:
- No Pinia/Vuex - relies on Vue 3's built-in reactivity system
- Component state managed with `ref()` and `reactive()`
- Communication through props and custom events
- Custom composables in `utils/` for shared logic

**Routing Configuration**:
- `src/router/index.ts` with `createWebHistory` for clean URLs
- All routes use lazy loading for better performance
- Custom scroll behavior integration with Locomotive Scroll
- Catch-all route for 404 handling

### Design System

**Typography System**:
- Custom fonts: PPMori, Pitch, SweetSansPro, FoundersGrotesk, F37Britain
- Comprehensive CSS variables in `:root` with responsive typography scales
- Clamp() functions for fluid typography across screen sizes
- Consistent text classes for uniform styling

**Styling Architecture**:
- Tailwind CSS with extended theme configuration
- Global styles in `src/style.css`
- Component-scoped styles for specific implementations
- Dark theme support with custom color palette
- Mobile-first responsive design approach

### Performance Optimizations

- **Lazy Loading**: Route-level and component-level lazy loading
- **Code Splitting**: Automatic splitting by Vite
- **Asset Optimization**: Vite's built-in image and asset optimization
- **Animation Performance**: Efficient scroll-based animations with Intersection Observer
- **Bundle Optimization**: Tree-shaking and dead code elimination

### Animation Guidelines

When working with animations:

1. **Use GSAP** for complex scroll-based animations with ScrollTrigger
2. **Prefer Locomotive Scroll** for page scrolling and integrate with router
3. **Use @vueuse/motion** for simple Vue-integrated animations
4. **Respect reduced motion preferences** with `@media (prefers-reduced-motion)`
5. **Intersection Observer** for efficient scroll-triggered effects

### Development Best Practices

**Vue 3 Patterns**:
- Always use `<script setup>` syntax with Composition API
- Leverage TypeScript interfaces for props and component data
- Use `ref()` for primitive values, `reactive()` for objects
- Prefer composables over mixins for shared logic

**File Organization**:
- Keep components focused and single-responsibility
- Use descriptive component names following PascalCase convention
- Group related components in subdirectories when appropriate
- Maintain clean import paths with `@` alias for `src/`

**Styling Conventions**:
- Use Tailwind utility classes for most styling needs
- Create custom CSS classes for repeated design patterns
- Maintain consistent spacing, typography, and color usage
- Test responsive design at all viewport sizes

### Testing and Quality

- TypeScript compilation provides static type checking
- Run `npm run build` to verify production-ready code
- Test animations and scroll behavior across different browsers
- Verify accessibility features and reduced motion support