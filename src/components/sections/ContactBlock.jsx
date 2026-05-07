import { motion } from 'framer-motion';
import { SectionHeader, TerminalBlock } from '../primitives';
import { contactLinks } from '../../data';

export function ContactBlock() {
  return (
    <motion.section
      id="contact"
      className="mx-auto max-w-7xl px-5 pb-28 pt-12 sm:px-6 lg:px-8"
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse font-mono text-sm">
            <thead>
              <tr className="text-left text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
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
                      className="text-phosphor-400 transition hover:text-amber-400"
                    >
                      {link.href.replace(/^mailto:/, '').replace(/^https?:\/\//, '')} →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TerminalBlock>
    </motion.section>
  );
}
