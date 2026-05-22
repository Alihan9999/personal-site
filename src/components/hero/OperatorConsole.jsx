import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StatusDot } from '../primitives/StatusDot';
import { TerminalBlock } from '../primitives/TerminalBlock';
import { Typewriter } from '../primitives/Typewriter';
import { StatusBoard } from './StatusBoard';

const phrases = [
  'building scalable infrastructure',
  'automating delivery pipelines',
  "designing platforms that don't page you at 3am",
];

const BOOT_KEY = 'op-console-booted';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
};

const blockVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function OperatorConsole() {
  const [shouldBoot] = useState(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem(BOOT_KEY) !== '1';
  });

  useEffect(() => {
    if (!shouldBoot) return undefined;
    const id = window.setTimeout(() => {
      sessionStorage.setItem(BOOT_KEY, '1');
    }, 2400);
    return () => window.clearTimeout(id);
  }, [shouldBoot]);

  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex -translate-y-1/2 select-none justify-center"
      >
        <span className="font-mono text-[clamp(7rem,17vw,16rem)] font-bold leading-none tracking-[-0.05em] text-phosphor-400/[0.07] light:text-ink-900/[0.05]">
          ALIHAN
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial={shouldBoot ? 'hidden' : 'visible'}
          animate="visible"
        >
          <TerminalBlock title="alihan@console:~ — kubectl get me -o wide">
            <div className="scanlines">
              <motion.div
                variants={blockVariants}
                className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs sm:text-sm"
              >
                <div className="text-slate-300 light:text-ink-700">
                  <span className="text-phosphor-400">~/alihan</span>
                  <span className="text-slate-500 light:text-ink-700/70"> $ </span>
                  <span>kubectl get me -o wide</span>
                </div>
                <StatusDot status="live" label="live" />
              </motion.div>

              <motion.div variants={blockVariants} className="mt-5">
                <StatusBoard boot={shouldBoot} />
              </motion.div>

              <motion.div variants={blockVariants} className="mt-6 font-mono text-xs sm:text-sm">
                <div className="text-slate-300 light:text-ink-700">
                  <span className="text-phosphor-400">~/alihan</span>
                  <span className="text-slate-500 light:text-ink-700/70"> $ </span>
                  <span>echo $MISSION</span>
                </div>
                <div className="mt-2 text-slate-500 light:text-ink-700/70">{'>'}</div>
                <div className="-mt-5 pl-6 text-base text-slate-100 light:text-ink-900 sm:text-lg">
                  <Typewriter phrases={phrases} className="text-phosphor-400" />
                </div>
              </motion.div>

              <motion.div
                variants={blockVariants}
                className="mt-7 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-md bg-amber-400 px-5 py-3 font-mono text-sm font-medium text-graphite-950 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition hover:bg-amber-300 hover:shadow-[0_0_44px_rgba(245,158,11,0.45)] focus-visible:outline-2 focus-visible:outline-amber-300 focus-visible:outline-offset-2"
                >
                  $ ./view-projects.sh
                </Link>
                <Link
                  to="/#contact"
                  className="rounded font-mono text-sm text-slate-400 transition hover:text-phosphor-400 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-4 light:text-ink-700"
                >
                  or # get-in-touch
                </Link>
              </motion.div>
            </div>
          </TerminalBlock>
        </motion.div>
      </div>
    </section>
  );
}
