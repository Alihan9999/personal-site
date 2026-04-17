import { motion } from 'framer-motion';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ theme, onToggleTheme }) {
  return (
    <div className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-4 py-3 shadow-[0_12px_48px_rgba(15,23,42,0.35)] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left"
        >
          <span className="block text-sm font-semibold text-white">Alihan Cakiralioglu</span>
          <span className="block text-xs text-slate-400">DevOps / Platform Engineer</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </motion.header>
    </div>
  );
}
