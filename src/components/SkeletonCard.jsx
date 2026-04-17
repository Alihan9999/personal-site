export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="h-4 w-24 rounded-full bg-white/10" />
      <div className="mt-4 h-6 w-3/4 rounded-full bg-white/10" />
      <div className="mt-4 h-4 w-full rounded-full bg-white/10" />
      <div className="mt-2 h-4 w-5/6 rounded-full bg-white/10" />
      <div className="mt-6 h-10 w-28 rounded-full bg-white/10" />
    </div>
  );
}
