import { motion } from 'framer-motion';
import { SectionHeader, TerminalBlock } from '../primitives';
import { contactLinks } from '../../data';

export function ContactBlock() {
  return (
    <motion.section
      id="contact"
      className="mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-6 lg:px-8 lg:pt-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeader
        resource="endpoints.ing"
        status="Ready"
        age={`${contactLinks.length}/exposed`}
        title="Open ports for platform conversations."
        description="Engineering systems, developer experience, infrastructure strategy. Reach me on whichever channel you prefer."
      />
      <TerminalBlock title="alihan@console:~ — kubectl get endpoints">
        <div className="hidden sm:block">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr className="text-left text-[0.7rem] uppercase tracking-[0.16em] text-slate-500 light:text-ink-700/70">
                <th className="py-2 pr-6 font-medium">NAME</th>
                <th className="py-2 pr-6 font-medium">PROTOCOL</th>
                <th className="py-2 pr-6 font-medium">PORT</th>
                <th className="py-2 pr-6 font-medium">ENDPOINT</th>
              </tr>
            </thead>
            <tbody>
              {contactLinks.map((link) => (
                <tr key={link.label} className="border-t border-white/10 light:border-ink-900/10">
                  <td className="py-3 pr-6 text-amber-400">{link.label.toLowerCase()}</td>
                  <td className="py-3 pr-6 text-slate-300 light:text-ink-700">{link.protocol}</td>
                  <td className="py-3 pr-6 text-slate-300 light:text-ink-700">{link.port}</td>
                  <td className="py-3 pr-6">
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="rounded text-phosphor-400 transition hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
                    >
                      {link.href.replace(/^mailto:/, '').replace(/^https?:\/\//, '')} →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="flex flex-col gap-4 font-mono text-sm sm:hidden">
          {contactLinks.map((link) => (
            <li
              key={link.label}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-4 light:border-ink-900/10 light:bg-white/60"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-amber-400">{link.label.toLowerCase()}</span>
                <span className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500 light:text-ink-700/70">
                  {link.protocol} :{link.port}
                </span>
              </div>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="mt-3 inline-block break-all rounded text-phosphor-400 transition hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
              >
                {link.href.replace(/^mailto:/, '').replace(/^https?:\/\//, '')} →
              </a>
            </li>
          ))}
        </ul>
      </TerminalBlock>
    </motion.section>
  );
}
