import { useEffect, useRef } from 'react';
import * as THREE from 'three';
export default function ThreeScene({ active }) {
  const host = useRef(null), activeRef = useRef(active), frameRef = useRef(0), renderRef = useRef(null);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => {
    if (active && renderRef.current && !document.hidden) frameRef.current = requestAnimationFrame(renderRef.current);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);
  useEffect(() => {
    const container = host.current;
    if (!container) return undefined;
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5)); renderer.setSize(container.clientWidth, container.clientHeight); renderer.setClearColor(0x000000, 0); container.appendChild(renderer.domElement);
    const geometry = new THREE.IcosahedronGeometry(1.78, 1), base = geometry.attributes.position, positions = base.array.slice();
    const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0x1557d0, transparent: true, opacity: 0.72 })); scene.add(wire);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.095, 1), new THREE.MeshBasicMaterial({ color: 0x1557d0 })); scene.add(core);
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x111111, size: 0.035 })); scene.add(points);
    const resize = new ResizeObserver(() => { const w = container.clientWidth, h = container.clientHeight; if (!w || !h) return; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }); resize.observe(container);
    const started = performance.now(), colors = [new THREE.Color('#1557d0'), new THREE.Color('#ffd84d'), new THREE.Color('#1557d0')];
    function render(now) {
      if (!activeRef.current || document.hidden) { frameRef.current = 0; return; }
      frameRef.current = requestAnimationFrame(render);
      const t = (now - started) * 0.00028, attr = geometry.attributes.position;
      for (let i = 0; i < positions.length; i += 3) { const x = positions[i], y = positions[i + 1], z = positions[i + 2], wave = 1 + 0.06 * Math.sin(t * 1.8 + x * 2.1 + y * 1.7); attr.array[i] = x * wave; attr.array[i + 1] = y * wave; attr.array[i + 2] = z * wave; }
      attr.needsUpdate = true; geometry.computeVertexNormals();
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll)), segment = progress < 0.5 ? 0 : 1;
      const color = new THREE.Color().copy(colors[segment]).lerp(colors[segment + 1], segment ? (progress - 0.5) * 2 : progress * 2);
      wire.material.color.copy(color); core.material.color.copy(color); points.material.color.copy(color); wire.rotation.set(t * 0.7, t * 0.8, t * 0.3); points.rotation.copy(wire.rotation); core.position.y = Math.sin(t * 2) * 0.05;
      container.style.transform = 'translate3d(' + (Math.sin(progress * Math.PI * 2) * 13) + 'vw,' + ((progress - 0.5) * 18) + 'vh,0)';
      renderer.render(scene, camera);
    }
    renderRef.current = render;
    if (activeRef.current && !document.hidden) frameRef.current = requestAnimationFrame(render);
    const onVisibility = () => { if (!document.hidden && activeRef.current && !frameRef.current) frameRef.current = requestAnimationFrame(render); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { document.removeEventListener('visibilitychange', onVisibility); cancelAnimationFrame(frameRef.current); renderRef.current = null; resize.disconnect(); geometry.dispose(); wire.geometry.dispose(); wire.material.dispose(); core.geometry.dispose(); core.material.dispose(); points.material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div className="three-canvas" ref={host} />;
}
