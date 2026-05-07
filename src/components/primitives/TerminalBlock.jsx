export function TerminalBlock({ title = 'alihan@console:~', children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl light:bg-white/85 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/70 px-4 py-2 light:bg-slate-100/80">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-slate-400 light:text-slate-500">{title}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
