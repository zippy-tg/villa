import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis
const lenis = new Lenis({
  syncTouch: true,
  touchMultiplier: 1.5
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu-overlay')
const menuLinks = document.querySelectorAll('.mobile-menu-overlay a')

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active')
})

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active')
  })
})

// Navigation background on scroll
const nav = document.querySelector('nav')
ScrollTrigger.create({
  start: 'top -50',
  end: 99999,
  toggleClass: {className: 'scrolled', targets: nav}
})

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Hero Text Animation
  const masterHeroTl = gsap.timeline();
  
  masterHeroTl.to('.hero-label', { opacity: 1, duration: 1, ease: 'power2.out' }, 0)
    .to('.word', { 
      y: '0%', 
      duration: 0.8, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }, 0.2)
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.8)
    .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.0);


  // Hero Image Apple-style Blur & Zoom on scroll down
  gsap.to('.hero-bg-image', {
    scale: 1.15,
    filter: 'blur(12px)',
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.5
    }
  });

  // The Feeling Section Reveal - Apple Style Scrub
  const feelingLines = gsap.utils.toArray('.feeling-line');
  
  gsap.to(feelingLines, {
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: '.feeling-section',
      start: 'top 25%',
      end: '+=100%', 
      scrub: 0.5,
      pin: true
    }
  });

  // Universal Horizontal Scroll for Included Strip
  let mm = gsap.matchMedia();
  mm.add("all", () => {
    gsap.to('.included-item', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.included-section',
        start: 'top 60%'
      }
    });

    const strip = document.querySelector('.included-strip');
    if (strip) {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
        ease: "none",
        scrollTrigger: {
          trigger: '.included-pin-wrapper',
          pin: true,
          scrub: 1,
          start: 'center center',
          end: () => "+=" + strip.scrollWidth,
          invalidateOnRefresh: true
        }
      });
    }
  });

  // The Space Details
  gsap.to('.space-content', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.space-section', start: 'top 75%' }
  });
  
  gsap.to('.space-visual', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.space-section', start: 'top 65%' }
  });

  // Space image parallax scrub zoom
  gsap.fromTo('.space-image', 
    { scale: 1.25 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: '.space-visual',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    }
  );

  // How it works steps
  gsap.to('.step', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.how-grid',
      start: 'top 80%'
    }
  });
  
  gsap.to('.how-footer', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.how-footer',
      start: 'top 90%'
    }
  });

  // Testimonial
  gsap.to('.testimonial-content', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.testimonial-section',
      start: 'top 75%'
    }
  });

  // Contact
  gsap.to('.contact-info', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-section', start: 'top 75%' }
  });
  
  gsap.to('form', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-section', start: 'top 75%' }
  });
  
});

// Form Handling
const form = document.getElementById('contact-form');
const successMessage = document.querySelector('.form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    successMessage.style.display = 'block';
  });
}
