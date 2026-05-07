import { motion } from 'framer-motion';
import { Card, Chip, SectionHeader } from '../primitives';
import { capabilities, skills } from '../../data';

export function StackBento() {
  return (
    <motion.section
      id="stack"
      className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        resource="stack.cm"
        status="Ready"
        age={`${skills.length + capabilities.length}/configmaps`}
        title="The toolchain I reach for."
        description="Cloud, CI/CD, observability, IaC, and the languages and runtimes that wire it all together."
      />
      <div className="grid grid-cols-12 gap-4">
        {skills.map((group) => (
          <Card key={group.category} variant="square" className="lg:col-span-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-amber-400">
              {group.category}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item} variant="skill">
                  {item}
                </Chip>
              ))}
            </div>
          </Card>
        ))}
        {capabilities.map((group) => (
          <Card key={group.category} variant="half" className="lg:col-span-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-phosphor-400">
              capability / {group.category.toLowerCase()}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300 light:text-ink-700">
              {group.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item} variant="skill">
                  {item}
                </Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
