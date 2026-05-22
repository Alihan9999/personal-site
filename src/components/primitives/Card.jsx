import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const variantClass = {
  featured:
    'col-span-12 lg:col-span-7 row-span-2 lg:row-span-3 p-6 sm:p-8 rounded-[1.75rem]',
  wide: 'col-span-12 lg:col-span-7 row-span-2 p-6 rounded-[1.5rem]',
  tall: 'col-span-12 sm:col-span-6 lg:col-span-3 row-span-2 p-5 rounded-[1.5rem]',
  compact: 'col-span-12 sm:col-span-6 lg:col-span-4 row-span-1 p-5 rounded-[1.5rem]',
  square: 'col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 p-5 rounded-[1.5rem]',
  half: 'col-span-12 lg:col-span-5 row-span-2 p-6 rounded-[1.5rem]',
  full: 'col-span-12 row-span-1 p-5 rounded-[1.5rem]',
};

export function Card({
  variant = 'compact',
  as: Tag = 'article',
  children,
  className = '',
  interactive = false,
  ...rest
}) {
  const reduced = useReducedMotion();
  const base =
    'group relative flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(8,15,30,0.28)] transition light:bg-white/70 light:border-ink-900/10';
  const hover = interactive
    ? 'cursor-pointer hover:border-amber-400/40 hover:bg-white/[0.06] focus-within:border-amber-400/60 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2'
    : '';
  const Component = Tag === 'article' ? motion.article : motion[Tag] ?? motion.div;
  const motionProps = interactive && !reduced ? { whileHover: { y: -4 } } : {};
  return (
    <Component
      layout
      className={`${base} ${variantClass[variant]} ${hover} ${className}`}
      {...motionProps}
      {...rest}
    >
      {children}
    </Component>
  );
}
