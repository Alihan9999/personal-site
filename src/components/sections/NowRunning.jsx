import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, StatusDot } from '../primitives';
import { buildAge, buildCommit, currentFocus, homelabUptime, posts } from '../../data';

export function NowRunning() {
  const recentPost = posts[0];

  return (
    <motion.section
      id="now"
      className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
        <span className="text-slate-600">$ </span>
        watch -n 5 status
      </p>
      <div className="grid grid-cols-12 gap-4">
        <Card variant="wide" className="lg:col-span-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
              currently shipping
            </p>
            <StatusDot status="live" label={currentFocus.status} />
          </div>
          <p className="mt-4 text-xl text-white light:text-ink-900">{currentFocus.title}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
            region: {currentFocus.region}
          </p>
        </Card>
        <Card variant="square" className="lg:col-span-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">homelab uptime</p>
          <p className="mt-3 font-mono text-3xl text-phosphor-400">{homelabUptime()}</p>
          <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
            since bootstrap
          </p>
        </Card>
        <Card variant="square" className="lg:col-span-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">last deploy</p>
          <p className="mt-3 font-mono text-base text-amber-400">personal-site@{buildCommit}</p>
          <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
            {buildAge()}
          </p>
        </Card>
        <Card variant="full" className="lg:col-span-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                most recent post
              </p>
              <p className="mt-2 text-base text-white light:text-ink-900">{recentPost.title}</p>
            </div>
            <Link
              to={`/posts/${recentPost.slug}`}
              className="font-mono text-xs text-phosphor-400 transition hover:text-amber-400"
            >
              read →
            </Link>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
