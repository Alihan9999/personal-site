import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePointerCapability } from '../../hooks/usePointerCapability';

const SPRING = { damping: 22, stiffness: 320, mass: 0.4 };

export function MagneticCursor() {
  const reduced = useReducedMotion();
  const pointer = usePointerCapability();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  useEffect(() => {
    if (reduced || pointer === 'coarse') return undefined;
    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [pointer, reduced, x, y]);

  if (reduced || pointer === 'coarse') return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-6 w-6 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full text-phosphor-400" fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    </motion.div>
  );
}
