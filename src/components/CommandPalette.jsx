import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { autocomplete, commands, getCommand, parseInput } from '../commands/registry';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { posts, projects } from '../data';

const fuzzyMatch = (query, label) => {
  if (!query) return false;
  const q = query.toLowerCase();
  const l = label.toLowerCase();
  if (l.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < l.length && qi < q.length; i += 1) {
    if (l[i] === q[qi]) qi += 1;
  }
  return qi === q.length;
};

const buildFuzzyHits = (query, navigate, close) => {
  if (!query) return [];
  const items = [
    ...projects.map((p) => ({ label: `project · ${p.title}`, run: () => navigate(`/projects/${p.slug}`) })),
    ...posts.map((p) => ({ label: `post · ${p.title}`, run: () => navigate(`/posts/${p.slug}`) })),
    { label: 'jump · #projects', run: () => navigate('/#projects') },
    { label: 'jump · #stack', run: () => navigate('/#stack') },
    { label: 'jump · #writing', run: () => navigate('/#writing') },
    { label: 'jump · #about', run: () => navigate('/#about') },
    { label: 'jump · #contact', run: () => navigate('/#contact') },
  ];
  return items
    .filter((item) => fuzzyMatch(query, item.label))
    .slice(0, 6)
    .map((item) => ({
      ...item,
      run: () => {
        item.run();
        close();
      },
    }));
};

function ScrollbackEntry({ entry }) {
  return (
    <div className="mb-3 font-mono text-[0.85rem] leading-6">
      {entry.command !== null ? (
        <div className="flex gap-2 text-slate-300 light:text-ink-700">
          <span className="text-amber-400">$</span>
          <span>{entry.command}</span>
        </div>
      ) : null}
      {Array.isArray(entry.output)
        ? entry.output.map((line, idx) => (
            <div key={idx} className="whitespace-pre text-phosphor-400 light:text-phosphor-500">
              {line || ' '}
            </div>
          ))
        : entry.output
          ? <div className="whitespace-pre text-phosphor-400 light:text-phosphor-500">{entry.output}</div>
          : null}
    </div>
  );
}

const initialBanner = () => [
  {
    id: `boot-${Date.now()}`,
    command: null,
    output: ['operator-console v1 — type `help` to begin.'],
  },
];

export function CommandPalette({ open, onClose, theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [scrollback, setScrollback] = useState(initialBanner);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const { history, push: pushHistory } = useCommandHistory();

  const setTheme = (target) => {
    if ((theme === 'dark') === (target === 'light')) onToggleTheme();
  };

  const fuzzyHits = useMemo(
    () => buildFuzzyHits(input, navigate, onClose),
    [input, navigate, onClose],
  );

  useEffect(() => {
    if (!open) return;
    setInput('');
    setHistoryIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight });
  }, [scrollback]);

  const appendOutput = (command, output) =>
    setScrollback((current) => [
      ...current,
      { id: `${Date.now()}-${Math.random()}`, command, output: output ?? null },
    ]);

  const clearScrollback = () => setScrollback(initialBanner);

  const runRaw = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    pushHistory(trimmed);
    const { name, args } = parseInput(trimmed);
    const cmd = getCommand(name);
    if (!cmd) {
      const hits = buildFuzzyHits(trimmed, navigate, onClose);
      if (hits.length) {
        appendOutput(trimmed, [`fuzzy match: ${hits.length} result(s) below — press Enter on a row, or refine.`]);
        return;
      }
      appendOutput(trimmed, [`command not found: ${name} — try \`help\``]);
      return;
    }
    const ctx = {
      args,
      navigate,
      theme,
      setTheme,
      print: (out) => appendOutput(null, out),
      clear: clearScrollback,
      close: onClose,
      history,
    };
    const result = cmd.run(ctx);
    if (result === null || result === undefined) return;
    appendOutput(trimmed, result);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (input.trim() && !getCommand(parseInput(input).name) && fuzzyHits.length) {
        fuzzyHits[0].run();
        return;
      }
      runRaw(input);
      setInput('');
      setHistoryIndex(-1);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const candidates = autocomplete(input);
      if (candidates.length === 1) setInput(candidates[0]);
      else if (candidates.length > 1) appendOutput(null, [candidates.join('  ')]);
    } else if (event.key === 'ArrowUp') {
      if (history.length === 0) return;
      event.preventDefault();
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? '');
    } else if (event.key === 'ArrowDown') {
      if (history.length === 0) return;
      event.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? '');
      }
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
          aria-label="Operator console"
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-graphite-900/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] light:bg-white/95"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-graphite-900/80 px-3 py-2 light:border-ink-900/10 light:bg-ivory-50">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-400">
                operator-console
              </span>
              <span className="ml-auto hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 sm:inline">
                tab autocomplete · ↑↓ history · esc close
              </span>
            </div>

            <div
              ref={scrollAreaRef}
              className="max-h-[28rem] overflow-y-auto bg-graphite-950/60 px-4 py-4 light:bg-ivory-50/60"
            >
              {scrollback.map((entry) => (
                <ScrollbackEntry key={entry.id} entry={entry} />
              ))}

              {fuzzyHits.length && input.trim() && !getCommand(parseInput(input).name) ? (
                <div className="mb-3 font-mono text-[0.8rem]">
                  <div className="text-slate-500">// fuzzy hits — Enter to open the first</div>
                  {fuzzyHits.map((hit, idx) => (
                    <button
                      key={`${hit.label}-${idx}`}
                      type="button"
                      onClick={() => hit.run()}
                      className="block w-full rounded px-2 py-1 text-left text-phosphor-400 transition hover:bg-amber-400/10"
                    >
                      {hit.label}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center gap-2 font-mono text-[0.85rem]">
                <span className="text-amber-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    setHistoryIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none light:text-ink-900"
                  placeholder={`try \`help\` — ${commands.length} commands available`}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Console input"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
