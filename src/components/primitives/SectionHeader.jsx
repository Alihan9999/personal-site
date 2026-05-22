export function SectionHeader({ resource, status = 'Ready', age, title, description, action }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 light:border-ink-900/10">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
          <span>
            <span className="text-slate-600">NAME </span>
            <span className="text-amber-400">{resource}</span>
          </span>
          <span>
            <span className="text-slate-600">STATUS </span>
            <span className="text-phosphor-400">{status}</span>
          </span>
          {age ? (
            <span>
              <span className="text-slate-600">AGE </span>
              <span className="text-slate-300 light:text-ink-700">{age}</span>
            </span>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-5 max-w-3xl">
        <h2 className="font-mono text-[1.6rem] font-medium leading-[1.25] tracking-tight text-white sm:text-[1.9rem] light:text-ink-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg light:text-ink-700">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
