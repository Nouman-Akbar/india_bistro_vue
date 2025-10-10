import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

const app = createApp(App)
app.use(MotionPlugin)
app.mount('#app')

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
  // Add any other options you need
});

locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#main', {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector('#main').style.transform ? 'transform' : 'fixed'
});

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();

gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section as HTMLElement, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section as HTMLElement,
      start: 'top 80%',
      end: 'top 50%',
      scroller: '#main',
      toggleActions: 'play none none reverse'
    }
  });
});
