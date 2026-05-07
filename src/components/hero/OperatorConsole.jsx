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

export function OperatorConsole() {
  return (
    <section className="relative px-5 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalBlock title="alihan@console:~ — kubectl get me -o wide">
            <div className="scanlines">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs sm:text-sm">
                <div className="text-slate-300 light:text-ink-700">
                  <span className="text-phosphor-400">~/alihan</span>
                  <span className="text-slate-500"> $ </span>
                  <span>kubectl get me -o wide</span>
                </div>
                <StatusDot status="live" label="live" />
              </div>

              <div className="mt-6">
                <StatusBoard />
              </div>

              <div className="mt-8 font-mono text-xs sm:text-sm">
                <div className="text-slate-300 light:text-ink-700">
                  <span className="text-phosphor-400">~/alihan</span>
                  <span className="text-slate-500"> $ </span>
                  <span>echo $MISSION</span>
                </div>
                <div className="mt-2 text-slate-500">{'>'}</div>
                <div className="-mt-5 pl-6 text-base text-slate-100 light:text-ink-900 sm:text-lg">
                  <Typewriter phrases={phrases} className="text-phosphor-400" />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-md bg-amber-400 px-5 py-3 font-mono text-sm font-medium text-graphite-950 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition hover:scale-[1.02] hover:bg-amber-300"
                >
                  $ ./view-projects.sh
                </Link>
                <Link
                  to="/#contact"
                  className="font-mono text-sm text-slate-400 transition hover:text-phosphor-400 light:text-slate-500"
                >
                  or # get-in-touch
                </Link>
              </div>
            </div>
          </TerminalBlock>
        </motion.div>
      </div>
    </section>
  );
}
