import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogCard } from '../components/BlogCard';
import { blogFilters, posts } from '../data';

export function PostsIndex() {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    if (filter === 'All') return posts;
    return posts.filter((post) => post.tags.includes(filter));
  }, [filter]);

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-6 lg:px-8">
      <Link to="/" className="text-sm text-slate-400 transition hover:text-white">
        ← Home
      </Link>
      <div className="mt-8 mb-10 max-w-3xl">
        <p className="mb-3 text-sm uppercase tracking-[0.28em] text-cyan-300/70">All Writing</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Architecture notes, operating lessons, and the occasional rant.
        </h1>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {blogFilters.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === option
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
                : 'border border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-300/40'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 lg:grid-cols-3">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </motion.div>
    </main>
  );
}
