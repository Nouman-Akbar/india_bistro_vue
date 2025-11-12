import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

export const useGsap = () => {
  if (!isRegistered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    isRegistered = true
  }

  return { gsap, ScrollTrigger }
}

export { gsap, ScrollTrigger }
