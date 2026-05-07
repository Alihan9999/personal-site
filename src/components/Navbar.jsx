import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

const navItems = [
  { label: 'Projects', to: '/#projects', section: 'projects' },
  { label: 'Stack', to: '/#stack', section: 'stack' },
  { label: 'Writing', to: '/#writing', section: 'writing' },
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Contact', to: '/#contact', section: 'contact' },
];

const sectionIds = navItems.map((item) => item.section);

export function Navbar({ theme, onToggleTheme, onOpenPalette }) {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 36, mass: 0.4 });
  const activeSection = useActiveSection(sectionIds);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const platform = navigator.userAgentData?.platform ?? navigator.platform ?? '';
    setIsMac(/mac/i.test(platform));
  }, []);

  const onHome = location.pathname === '/';
  const activeKey = useMemo(() => (onHome ? activeSection : null), [activeSection, onHome]);
  const modKey = isMac ? '⌘' : 'Ctrl';

  return (
    <div className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-full border border-white/10 bg-graphite-900/70 px-4 py-3 shadow-[0_12px_48px_rgba(15,23,42,0.35)] backdrop-blur-xl light:bg-white/80"
      >
        <Link to="/" className="text-left">
          <span className="block text-sm font-semibold text-white light:text-ink-900">Alihan Cakiralioglu</span>
          <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
            devops/platform-engineer
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = activeKey === item.section;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative font-mono text-xs uppercase tracking-[0.16em] transition ${
                  active ? 'text-phosphor-400' : 'text-slate-300 hover:text-white light:text-slate-600 light:hover:text-ink-900'
                }`}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-phosphor-400"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open operator console"
            title="Open operator console"
            className="group hidden items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1.5 font-mono text-[0.7rem] text-amber-400 transition hover:border-amber-400/60 hover:bg-amber-400/15 hover:text-amber-300 sm:inline-flex"
          >
            <span className="text-phosphor-400 group-hover:text-phosphor-300">$</span>
            <kbd className="font-mono text-[0.7rem]">{modKey}</kbd>
            <kbd className="font-mono text-[0.7rem]">K</kbd>
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-amber-400/40 hover:text-white light:border-ink-900/10 light:bg-white/60 light:text-ink-700"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-amber-400"
          style={{ scaleX }}
        />
      </motion.header>
    </div>
  );
}
