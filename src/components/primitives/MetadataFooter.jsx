export function MetadataFooter({ items = [], className = '' }) {
  if (!items.length) return null;
  return (
    <div
      className={`mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/5 pt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 light:border-ink-900/10 light:text-slate-500 ${className}`}
    >
      {items.map(({ key, value }) => (
        <span key={key} className="inline-flex items-center gap-1.5">
          <span className="text-slate-600 light:text-slate-400">{key}:</span>
          <span className="text-slate-300 light:text-ink-700">{value}</span>
        </span>
      ))}
    </div>
  );
}
