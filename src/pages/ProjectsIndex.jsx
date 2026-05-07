import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { FilterBar } from '../components/primitives';
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

      <FilterBar options={projectFilters} value={filter} onChange={setFilter} className="mb-8" />

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
