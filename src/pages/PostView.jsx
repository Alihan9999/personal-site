import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PostView() {
  const post = useLoaderData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [post.slug]);

  return (
    <main className="mx-auto max-w-4xl px-5 pb-28 pt-32 sm:px-6 lg:px-8">
      <Link to="/posts" className="text-sm text-slate-400 transition hover:text-white">
        ← All Writing
      </Link>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
      >
        <p className="text-sm text-cyan-300/70">{post.date}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{post.title}</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-10 max-w-none">
          {post.body.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-base leading-8 text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.article>
    </main>
  );
}
