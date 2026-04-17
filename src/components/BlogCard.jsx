import { motion } from 'framer-motion';

export function BlogCard({ post, onOpen }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30"
    >
      <p className="text-sm text-slate-400">{post.date}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{post.preview}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-200">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => onOpen(post)}
          className="self-start rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-cyan-300/40"
        >
          Read Post
        </button>
      </div>
    </motion.article>
  );
}
