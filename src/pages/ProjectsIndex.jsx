import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { projectFilters, projects } from '../data';

export function ProjectsIndex() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const visible = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((project) => project.tags.includes(filter));
  }, [filter]);

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-6 lg:px-8">
      <Link to="/" className="text-sm text-slate-400 transition hover:text-white">
        ← Home
      </Link>
      <div className="mt-8 mb-10 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.28em] text-cyan-300/70">All Projects</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Every shipped project, filterable.
        </h1>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {projectFilters.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === option
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
                : 'border border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-300/40'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-6 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isExpanded={expanded === project.slug}
              onOpen={() => setExpanded(project.slug)}
              onClose={() => setExpanded(null)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
