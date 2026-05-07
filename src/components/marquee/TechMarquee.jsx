import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { skills } from '../../data';

const items = skills.flatMap((group) => group.items);
const repeated = [...items, ...items, ...items];

export function TechMarquee() {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const directionRef = useRef(1);
  const x = useTransform(baseX, (value) => `${wrap(-25, -75, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionRef.current * 12 * (delta / 1000);
    if (velocityFactor.get() < 0) directionRef.current = -1;
    else if (velocityFactor.get() > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  useEffect(() => {
    if (!reduced) return undefined;
    baseX.set(0);
    return undefined;
  }, [baseX, reduced]);

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-8 sm:px-6 lg:px-8" aria-hidden="true">
      <div className="overflow-hidden border-y border-white/10 py-5 light:border-ink-900/10">
        <motion.div className="flex whitespace-nowrap" style={reduced ? undefined : { x }}>
          {repeated.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-6 font-mono text-base uppercase tracking-[0.18em] text-slate-400 light:text-slate-500"
            >
              {item}
              <span className="mx-6 text-phosphor-400/40">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
