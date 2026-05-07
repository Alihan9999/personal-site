import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Chip, MetadataFooter, SectionHeader } from '../primitives';
import { navigateWithTransition } from '../../lib/navigateWithTransition';
import { featuredProjects } from '../../data';

const variantOrder = ['featured', 'half', 'tall', 'tall'];

function ProjectTile({ project, variant }) {
  const navigate = useNavigate();
  const meta = project.meta ?? {};
  const items = [
    meta.uptime ? { key: 'uptime', value: meta.uptime } : null,
    meta.replicas ? { key: 'replicas', value: meta.replicas } : null,
    meta.lastDeploy ? { key: 'last-deploy', value: meta.lastDeploy } : null,
  ].filter(Boolean);

  const onActivate = () => navigateWithTransition(navigate, `/projects/${project.slug}`);

  return (
    <Card
      variant={variant}
      interactive
      as="div"
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
      className="text-slate-100 light:text-ink-900"
      aria-label={`Open ${project.title} case study`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-phosphor-400">
            project / {project.tags[0]?.toLowerCase()}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white light:text-ink-900">{project.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300 light:text-ink-700">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((t) => (
          <Chip key={t} variant="tech">
            {t}
          </Chip>
        ))}
      </div>

      <p className="mt-5 font-mono text-xs text-amber-400 transition group-hover:text-amber-300">
        $ open {project.slug} →
      </p>

      <MetadataFooter items={items} />
    </Card>
  );
}

export function ProjectsBento() {
  return (
    <motion.section
      id="projects"
      className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        resource="projects.svc"
        status="Ready"
        age={`${featuredProjects.length}/featured`}
        title="Selected work — platforms with measurable operational leverage."
        description="The strongest work is usually the least visible: fewer manual handoffs, faster releases, infrastructure that scales without drama."
        action={
          <Link
            to="/projects"
            className="font-mono text-xs text-phosphor-400 transition hover:text-amber-400"
          >
            $ get all →
          </Link>
        }
      />
      <div className="grid grid-cols-12 auto-rows-[minmax(0,_auto)] gap-4">
        {featuredProjects.map((project, index) => (
          <ProjectTile
            key={project.slug}
            project={project}
            variant={variantOrder[index] ?? 'tall'}
          />
        ))}
      </div>
    </motion.section>
  );
}
