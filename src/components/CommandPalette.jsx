import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { posts, projects } from '../data';

function buildActions({ navigate, onClose, onToggleTheme, theme }) {
  const jumps = [
    { id: 'jump-projects', label: 'Jump to Projects', kbd: 'Home', run: () => navigate('/#projects') },
    { id: 'jump-writing', label: 'Jump to Writing', kbd: 'Home', run: () => navigate('/#writing') },
    { id: 'jump-stack', label: 'Jump to Stack', kbd: 'Home', run: () => navigate('/#stack') },
    { id: 'jump-about', label: 'Jump to About', kbd: 'Home', run: () => navigate('/#about') },
    { id: 'jump-contact', label: 'Jump to Contact', kbd: 'Home', run: () => navigate('/#contact') },
  ];
  const routes = [
    { id: 'route-projects', label: 'Open all projects', kbd: 'Route', run: () => navigate('/projects') },
    { id: 'route-posts', label: 'Open all writing', kbd: 'Route', run: () => navigate('/posts') },
  ];
  const projectActions = projects.map((p) => ({
    id: `project-${p.slug}`,
    label: `Project · ${p.title}`,
    kbd: 'Project',
    run: () => navigate(`/projects#${p.slug}`),
  }));
  const postActions = posts.map((p) => ({
    id: `post-${p.slug}`,
    label: `Post · ${p.title}`,
    kbd: 'Post',
    run: () => navigate(`/posts/${p.slug}`),
  }));
  const settings = [
    {
      id: 'toggle-theme',
      label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      kbd: 'Setting',
      run: () => onToggleTheme(),
    },
  ];
  return [...jumps, ...routes, ...projectActions, ...postActions, ...settings].map((action) => ({
    ...action,
    run: () => {
      action.run();
      onClose();
    },
  }));
}

const fuzzyMatch = (query, label) => {
  if (!query) return true;
  const q = query.toLowerCase();
  const l = label.toLowerCase();
  if (l.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < l.length && qi < q.length; i += 1) {
    if (l[i] === q[qi]) qi += 1;
  }
  return qi === q.length;
};

export function CommandPalette({ open, onClose, theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(
    () => buildActions({ navigate, onClose, onToggleTheme, theme }),
    [navigate, onClose, onToggleTheme, theme],
  );

  const filtered = useMemo(
    () => actions.filter((action) => fuzzyMatch(query, action.label)).slice(0, 8),
    [actions, query],
  );

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      filtered[activeIndex]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-graphite-950/80 p-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-graphite-900/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] light:bg-white/95"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-graphite-900/80 px-3 py-2 light:border-ink-900/10 light:bg-ivory-50">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="search projects, posts, or jump to a section..."
                className="w-full bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none light:text-ink-900"
                aria-label="Search commands"
              />
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 sm:inline">
                ↑↓ ⏎ esc
              </span>
            </div>
            <ul className="max-h-[24rem] overflow-y-auto p-2">
              {filtered.length ? (
                filtered.map((action, index) => {
                  const active = index === activeIndex;
                  return (
                    <li key={action.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => action.run()}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          active
                            ? 'bg-amber-400/10 text-white light:text-ink-900'
                            : 'text-slate-300 light:text-ink-700'
                        }`}
                      >
                        <span>{action.label}</span>
                        <span
                          className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${
                            active ? 'text-amber-400' : 'text-slate-500'
                          }`}
                        >
                          {action.kbd}
                        </span>
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-6 text-center font-mono text-sm text-slate-500">no matches</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
