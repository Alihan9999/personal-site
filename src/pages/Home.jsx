import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BlogCard } from '../components/BlogCard';
import { OperatorConsole } from '../components/hero/OperatorConsole';
import { ProjectCard } from '../components/ProjectCard';
import { SectionWrapper } from '../components/SectionWrapper';
import { FilterBar } from '../components/primitives';
import { blogFilters, capabilities, contactLinks, posts, projectFilters, projects, skills } from '../data';

export function Home() {
  const [projectFilter, setProjectFilter] = useState('All');
  const [blogFilter, setBlogFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setExpandedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const visibleProjects = useMemo(() => {
    if (projectFilter === 'All') return projects;
    return projects.filter((project) => project.tags.includes(projectFilter));
  }, [projectFilter]);

  const visiblePosts = useMemo(() => {
    if (blogFilter === 'All') return posts;
    return posts.filter((post) => post.tags.includes(blogFilter));
  }, [blogFilter]);

  return (
    <>
      <OperatorConsole />

      <SectionWrapper
        id="projects"
        eyebrow="Selected Work"
        title="Platform engineering projects with measurable operational leverage."
        description="The strongest work is usually the least visible: fewer manual handoffs, faster releases, and infrastructure that scales without drama."
      >
        <FilterBar
          options={projectFilters}
          value={projectFilter}
          onChange={setProjectFilter}
          className="mb-8"
        />

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid gap-6 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                isExpanded={expandedProject === project.slug}
                onOpen={() => setExpandedProject(project.slug)}
                onClose={() => setExpandedProject(null)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </SectionWrapper>

      <SectionWrapper
        id="writing"
        eyebrow="Writing"
        title="Notes on infrastructure, delivery systems, and platform thinking."
        description="A lightweight blog surface for technical writing, architecture notes, and operating lessons learned."
      >
        {/* anchor alias for backward compatibility with #blog deep-links */}
        <span id="blog" className="sr-only" aria-hidden="true" />
        <FilterBar
          options={blogFilters}
          value={blogFilter}
          onChange={setBlogFilter}
          className="mb-8"
        />

        <motion.div layout className="grid gap-6 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper
        id="about"
        eyebrow="About"
        title="I focus on systems that scale operationally, not just technically."
        description="My work sits at the intersection of platform enablement, infrastructure reliability, and developer workflow design. I care about paved roads, safe automation, and interfaces that reduce cognitive load for engineering teams."
      >
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                Core Expertise
              </h3>
              <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Platform Focus</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {skills.map((group) => (
                <div
                  key={group.category}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(8,15,30,0.2)]"
                >
                  <h3 className="text-xl font-semibold text-white light:text-slate-950">{group.category}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 light:bg-white/70 light:text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(8,15,30,0.22)]">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                  Technical Toolkit
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 light:text-slate-600">
                  Supporting tools and technologies I use across automation, internal platforms, developer
                  workflows, and systems integration.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {capabilities.map((group) => (
                <div
                  key={group.category}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5 light:bg-white/60"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/70">{group.category}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300 light:text-slate-600">
                    {group.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 light:bg-white/80 light:text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="contact"
        eyebrow="Contact"
        title="Interested in platform engineering, DevOps, or infrastructure strategy?"
        description="Open to conversations about engineering systems, developer experience, and scalable platform design."
        className="pb-28"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-[0_24px_60px_rgba(8,15,30,0.25)]">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] light:bg-white/80 light:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
