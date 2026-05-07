import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-5 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/70">404 / not found</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
        That route does not exist.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
        The page you tried to reach is not in the routing table.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300"
      >
        Back to home
      </Link>
    </main>
  );
}
