import { motion } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SectionWrapper({ id, eyebrow, title, description, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.28em] text-cyan-300/70">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}
