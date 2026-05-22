import { motion } from 'framer-motion';
import { Card, SectionHeader } from '../primitives';
import { InfraDiagram } from '../InfraDiagram';

export function AboutBlock() {
  return (
    <motion.section
      id="about"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        resource="alihan.deploy"
        status="Ready"
        age="7y"
        title="Platform-first. People-aware."
        description="My work sits at the intersection of platform enablement, infrastructure reliability, and developer workflow design. Paved roads, safe automation, and interfaces that reduce cognitive load."
      />
      <div className="grid grid-cols-12 gap-4">
        <Card variant="half" className="lg:col-span-4 items-center justify-center p-0">
          <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-graphite-900">
            <picture className="block light:hidden">
              <source srcSet="/websitepic.avif" type="image/avif" />
              <source srcSet="/websitepic.webp" type="image/webp" />
              <img
                src="/websitepic.png"
                alt="Portrait of Alihan Cakiralioglu"
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <picture className="hidden light:block">
              <source srcSet="/websitepicLight.avif" type="image/avif" />
              <source srcSet="/websitepicLight.webp" type="image/webp" />
              <img
                src="/websitepicLight.png"
                alt="Portrait of Alihan Cakiralioglu"
                className="hidden h-auto w-full light:block"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,12,0.0)_55%,rgba(7,9,12,0.55)_100%)]"
              aria-hidden="true"
            />
          </div>
        </Card>
        <Card variant="half" className="lg:col-span-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-phosphor-400">
            $ cat ~/.bio
          </p>
          <div className="mt-4 space-y-4 text-base leading-8 text-slate-300 light:text-ink-700">
            <p>
              I&apos;m a DevOps / Platform Engineer focused on building infrastructure that other engineers
              actually want to use. I think of platforms as products: the right defaults, the smallest
              surface area, and a clear path from idea to production.
            </p>
            <p>
              Across 200+ applications, GitOps homelabs, CI/CD onboarding systems, and AI orchestration
              platforms, the common thread is the same — automate the boring parts, make the hard parts
              observable, and keep the team out of pager-duty whenever possible.
            </p>
          </div>
        </Card>
        <Card variant="full" className="lg:col-span-12">
          <InfraDiagram />
        </Card>
      </div>
    </motion.section>
  );
}
