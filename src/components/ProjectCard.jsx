import { AnimatePresence, motion } from 'framer-motion';

export function ProjectCard({ project, isExpanded, onOpen, onClose }) {
  return (
    <>
      <motion.article
        layout
        whileHover={{ y: -6, scale: 1.01 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(8,15,30,0.28)] transition hover:border-cyan-300/30"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              GitHub
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Live Demo
            </a>
          ) : null}
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/12"
          >
            More Details
          </button>
        </div>
      </motion.article>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/75 p-4 backdrop-blur-md sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              layoutId={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/95 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/70">Project Snapshot</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200"
                >
                  Close
                </button>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">{project.details}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm leading-6 text-slate-200">{metric}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
