import { AnimatePresence, motion } from 'framer-motion';

const actions = [
  { label: 'Jump to Projects', href: '#projects' },
  { label: 'Jump to Blog', href: '#blog' },
  { label: 'Jump to About', href: '#about' },
  { label: 'Jump to Contact', href: '#contact' },
];

export function CommandPalette({ open, onClose }) {
  const runAction = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 p-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
              Quick navigation
            </div>
            <div className="mt-3 space-y-2">
              {actions.map((action) => (
                <button
                  key={action.href}
                  type="button"
                  onClick={() => runAction(action.href)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/[0.04]"
                >
                  <span>{action.label}</span>
                  <span className="text-slate-500">Enter</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
