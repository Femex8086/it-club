import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function usePortfolioMotion(root) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const lenis = isMobile ? null : new Lenis({ smoothWheel: true, lerp: 0.06 });
    const tick = lenis ? (time) => lenis.raf(time * 1000) : null;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    const context = gsap.context(() => {
      gsap.from('.brand', { y: 14, opacity: 0, duration: 0.98, ease: 'power3.out' });
      gsap.from('.site-header nav a', { y: 12, opacity: 0, duration: 0.92, stagger: 0.11, ease: 'power3.out', delay: 0.14 });
      gsap.from('.hero-topline > *', { clipPath: 'inset(0 100% 0 0)', duration: 1.09, stagger: 0.15, ease: 'power3.inOut' });
      gsap.from('.hero-title .line-mask > span', { yPercent: 115, duration: 1.55, stagger: 0.19, ease: 'power4.out', delay: 0.18 });
      gsap.from('.hero-kicker', { clipPath: 'inset(0 100% 0 0)', duration: 1.09, ease: 'power3.inOut', delay: 0.22 });
      gsap.from('.hero-bottom > *', { y: 22, opacity: 0, duration: 1.09, stagger: 0.18, ease: 'power3.out', delay: 0.65 });
      gsap.from('.scroll-cue', { clipPath: 'inset(0 100% 0 0)', duration: 0.98, ease: 'power3.inOut', delay: 0.9 });
      gsap.utils.toArray('.fill-word').forEach((word) => gsap.fromTo(word, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: { trigger: word, start: 'top 78%', end: 'bottom 38%', scrub: true } }));
      gsap.utils.toArray('.section-heading, .team-intro h2, .events-title h2, .articles-title').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.32, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } }));
      gsap.from('.manifesto', { y: 36, opacity: 0, duration: 1.32, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto-wrap', start: 'top 75%' } });
      gsap.from('.stat', { y: 26, opacity: 0, duration: 1.03, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.stats-grid', start: 'top 86%' } });
      gsap.from('.projects-head h2', { y: 35, opacity: 0, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: '.projects-head', start: 'top 86%' } });
      gsap.from('.featured-copy > *', { y: 22, opacity: 0, duration: 1.09, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.featured-work', start: 'top 82%' } });
      if (isMobile) {
        gsap.fromTo('.featured-visual img', { opacity: 0.65, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: '.featured-work', start: 'top 90%' } });
      } else {
        gsap.fromTo('.featured-visual img', { clipPath: 'inset(0 100% 0 0)', scale: 1.04 }, { clipPath: 'inset(0 0 0 0)', scale: 1, duration: 1.44, ease: 'power3.inOut', scrollTrigger: { trigger: '.featured-work', start: 'top 82%' } });
      }
      gsap.from('.work-card', { y: 28, opacity: 0, duration: 1.21, stagger: 0.13, ease: 'power3.out', scrollTrigger: { trigger: '.work-grid', start: 'top 84%' } });
      if (isMobile) gsap.fromTo('.work-image img', { opacity: 0.65, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.work-grid', start: 'top 88%' } });
      else gsap.fromTo('.work-image img', { clipPath: 'inset(0 0 100% 0)', scale: 1.035 }, { clipPath: 'inset(0 0 0 0)', scale: 1, duration: 1.32, stagger: 0.11, ease: 'power3.inOut', scrollTrigger: { trigger: '.work-grid', start: 'top 82%' } });
      gsap.from('.event-item', { clipPath: 'inset(0 0 100% 0)', y: 18, duration: 1.03, stagger: 0.16, ease: 'power3.out', scrollTrigger: { trigger: '.event-list', start: 'top 82%' } });
      gsap.from('.article-card', { y: 26, opacity: 0, duration: 1.21, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.article-grid', start: 'top 84%' } });
      if (isMobile) gsap.fromTo('.article-card .article-image img', { opacity: 0.65, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.article-grid', start: 'top 88%' } });
      else gsap.fromTo('.article-card .article-image img', { clipPath: 'inset(0 0 100% 0)', scale: 1.035 }, { clipPath: 'inset(0 0 0 0)', scale: 1, duration: 1.32, stagger: 0.18, ease: 'power3.inOut', scrollTrigger: { trigger: '.article-grid', start: 'top 82%' } });
      gsap.from('.team-join-link', { x: 22, opacity: 0, duration: 1.03, ease: 'power3.out', scrollTrigger: { trigger: '.team-intro', start: 'top 84%' } });
      gsap.from('.join-copy > *', { y: 24, opacity: 0, duration: 1.09, stagger: 0.18, ease: 'power3.out', scrollTrigger: { trigger: '.join-layout', start: 'top 82%' } });
      gsap.from('.join-form label, .join-form .submit-button', { x: 22, opacity: 0, duration: 0.92, stagger: 0.13, ease: 'power2.out', scrollTrigger: { trigger: '.join-form', start: 'top 85%' } });
      gsap.from('.footer-wordmark span', { yPercent: 35, opacity: 0, duration: 1.26, stagger: 0.2, ease: 'power4.out', scrollTrigger: { trigger: '.footer-wordmark', start: 'top 92%' } });
      gsap.from('.footer-bottom > *', { y: 12, opacity: 0, duration: 0.86, stagger: 0.11, ease: 'power2.out', scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' } });
    }, root);
    const refresh = () => ScrollTrigger.refresh(); window.addEventListener('load', refresh, { once: true });
    return () => {
      window.removeEventListener('load', refresh);
      context.revert();
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
    };
  }, [root]);
}
