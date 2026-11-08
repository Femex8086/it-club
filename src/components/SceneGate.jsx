import { lazy, Suspense, useEffect, useState } from 'react';
const ThreeScene = lazy(() => import('./ThreeScene.jsx'));
const staticScene = <svg className="scene-fallback" viewBox="0 0 520 520" role="img" aria-label="Abstract line drawing representing a student-built digital object"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="M260 30 450 140v220L260 470 70 360V140z"/><path d="M260 30v220l190 110M260 250 70 140m190 110v220M70 140l190-110 190 110-190 110zM70 360l190-110 190 110-190 110z"/><circle cx="260" cy="250" r="156" strokeDasharray="3 9"/><circle cx="260" cy="250" r="98" strokeDasharray="2 7"/></g><circle cx="260" cy="250" r="7" fill="currentColor"/></svg>;
export default function SceneGate() {
  const [enabled, setEnabled] = useState(false), [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const low = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (reduce || low || window.innerWidth < 760 || !('IntersectionObserver' in window)) return undefined;
    const testCanvas = document.createElement('canvas');
    let webgl = false;
    try { webgl = Boolean(testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')); } catch { webgl = false; }
    if (!webgl) return undefined;
    const el = document.querySelector('.hero-scene');
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEnabled(true); setVisible(true); } }, { rootMargin: '160px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div className="hero-scene" aria-hidden="true">{enabled ? <Suspense fallback={staticScene}><ThreeScene active={visible} /></Suspense> : staticScene}</div>;
}
