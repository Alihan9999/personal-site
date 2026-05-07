import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chip } from './primitives';
import { navigateWithTransition } from '../lib/navigateWithTransition';

export function ProjectCard({ project }) {
  const navigate = useNavigate();
  const onActivate = () => navigateWithTransition(navigate, `/projects/${project.slug}`);

  return (
    <motion.article
      layout
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      }}
      role="link"
      tabIndex={0}
      style={{ viewTransitionName: `project-${project.slug}`, cursor: 'pointer' }}
      aria-label={`Open ${project.title} case study`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(8,15,30,0.28)] transition hover:border-amber-400/40 light:bg-white/70"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-phosphor-400">
            project / {project.tags[0]?.toLowerCase()}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white light:text-ink-900">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300 light:text-ink-700">{project.description}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <Chip key={item} variant="tech">
            {item}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Chip key={tag} variant="tag">
            {tag}
          </Chip>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <p className="font-mono text-xs text-amber-400 transition group-hover:text-amber-300">
          $ open {project.slug} →
        </p>
      </div>
    </motion.article>
  );
}
