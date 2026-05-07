import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePointerCapability } from '../../hooks/usePointerCapability';

const GLYPHS = '01░▒▓<>{}[]()/$|*+-=#@';

export function CodeRain() {
  const reduced = useReducedMotion();
  const pointer = usePointerCapability();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns = [];
    const fontSize = pointer === 'coarse' ? 16 : 18;
    const stepMs = pointer === 'coarse' ? 1000 / 10 : 1000 / 18;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      const colCount = Math.ceil(width / fontSize);
      columns = Array.from({ length: colCount }, () => Math.random() * height);
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTick = 0;
    let raf = 0;
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (document.visibilityState !== 'visible') return;
      if (t - lastTick < stepMs) return;
      lastTick = t;

      ctx.fillStyle = 'rgba(7, 9, 12, 0.18)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px JetBrains Mono, ui-monospace, monospace`;
      ctx.fillStyle = pointer === 'coarse' ? 'rgba(52, 211, 154, 0.18)' : 'rgba(52, 211, 154, 0.32)';

      for (let i = 0; i < columns.length; i += 1) {
        const x = i * fontSize;
        const y = columns[i];
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(ch, x, y);
        if (y > height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i] = y + fontSize * 0.85;
        }
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [pointer, reduced]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] mix-blend-screen"
    />
  );
}
