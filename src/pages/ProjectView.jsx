import { useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chip, MetadataFooter, SectionHeader } from '../components/primitives';
import { navigateWithTransition } from '../lib/navigateWithTransition';
import { projects } from '../data';

function CaseStudySection({ label, children }) {
  return (
    <section className="mt-12">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-phosphor-400">{label}</p>
      <div className="mt-4 max-w-3xl space-y-4 text-base leading-8 text-slate-300 light:text-ink-700">
        {children}
      </div>
    </section>
  );
}

export function ProjectView() {
  const project = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.slug]);

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const meta = project.meta ?? {};
  const metaItems = [
    meta.uptime ? { key: 'uptime', value: meta.uptime } : null,
    meta.replicas ? { key: 'replicas', value: meta.replicas } : null,
    meta.lastDeploy ? { key: 'last-deploy', value: meta.lastDeploy } : null,
  ].filter(Boolean);

  return (
    <main className="mx-auto max-w-5xl px-5 pb-28 pt-32 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Link to="/projects" className="font-mono text-xs text-slate-400 transition hover:text-phosphor-400">
          ← all projects
        </Link>
      </div>

      <motion.div
        style={{ viewTransitionName: `project-${project.slug}` }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.35)] light:bg-white/70"
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-amber-400">
          project / {project.tags[0]?.toLowerCase() ?? 'platform'}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl light:text-ink-900">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 light:text-ink-700">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Chip key={t} variant="tech">
              {t}
            </Chip>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-amber-400/40 bg-amber-400/10 px-4 py-2 font-mono text-sm text-amber-400 transition hover:bg-amber-400/20"
            >
              $ git clone →
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-phosphor-400/40 bg-phosphor-400/10 px-4 py-2 font-mono text-sm text-phosphor-400 transition hover:bg-phosphor-400/20"
            >
              $ open --demo →
            </a>
          ) : null}
        </div>

        <MetadataFooter items={metaItems} className="mt-6" />
      </motion.div>

      {project.problem ? (
        <CaseStudySection label="// problem">
          <p>{project.problem}</p>
        </CaseStudySection>
      ) : null}

      {project.architecture?.length ? (
        <CaseStudySection label="// architecture">
          <ul className="list-none space-y-3 pl-0">
            {project.architecture.map((line, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-mono text-phosphor-400">·</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}

      {project.outcome?.length ? (
        <CaseStudySection label="// outcome">
          <ul className="list-none space-y-3 pl-0">
            {project.outcome.map((line, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-mono text-amber-400">→</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}

      {project.tradeoffs?.length ? (
        <CaseStudySection label="// tradeoffs">
          <ul className="list-none space-y-3 pl-0">
            {project.tradeoffs.map((line, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-mono text-slate-500">⚠</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}

      {!project.problem ? (
        <CaseStudySection label="// detail">
          <p>{project.details}</p>
        </CaseStudySection>
      ) : null}

      <CaseStudySection label="// metrics">
        <div className="grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-200 light:bg-white/70 light:text-ink-700"
            >
              {metric}
            </div>
          ))}
        </div>
      </CaseStudySection>

      <div className="mt-20">
        <SectionHeader
          resource="related.svc"
          status="Ready"
          age={`${related.length}/peers`}
          title="Other projects."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((peer) => (
            <button
              key={peer.slug}
              type="button"
              onClick={() => navigateWithTransition(navigate, `/projects/${peer.slug}`)}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-amber-400/40 light:bg-white/70"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-phosphor-400">
                project / {peer.tags[0]?.toLowerCase() ?? 'platform'}
              </p>
              <p className="mt-3 text-base font-semibold text-white light:text-ink-900">{peer.title}</p>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300 light:text-ink-700">
                {peer.description}
              </p>
              <p className="mt-4 font-mono text-xs text-amber-400 transition group-hover:text-amber-300">
                $ open {peer.slug} →
              </p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
