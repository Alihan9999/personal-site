import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/18 blur-3xl" />
        <div className="absolute right-[-8rem] top-28 h-80 w-80 rounded-full bg-indigo-500/12 blur-3xl" />
        <motion.div
          className="absolute left-[8%] top-40 h-40 w-40 rounded-full border border-cyan-300/20"
          animate={{ y: [0, -18, 0], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 text-sm uppercase tracking-[0.34em] text-cyan-300/80"
          >
            Infrastructure. Automation. Reliability.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Alihan Cakiralioglu
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="mt-6 max-w-3xl"
          >
            <p className="text-xl font-medium text-slate-100 sm:text-2xl">DevOps / Platform Engineer</p>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
              I build scalable infrastructure, automate systems, and design resilient platforms.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.2)] transition duration-300 hover:scale-[1.02] hover:bg-cyan-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Or get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.65 }}
          className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.5)] backdrop-blur-xl"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Core Focus', 'Platform engineering, release systems, and operational leverage'],
              ['Preferred Stack', 'AWS, Terraform, Jenkins, Azure DevOps, Splunk, Ansible'],
              ['Operating Model', 'Paved roads, self-service workflows, safe automation'],
              ['Delivery Style', 'Fast feedback, resilient systems, clear ownership'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
