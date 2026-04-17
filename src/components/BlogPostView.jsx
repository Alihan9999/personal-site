import { AnimatePresence, motion } from 'framer-motion';

export function BlogPostView({ post, onClose }) {
  return (
    <AnimatePresence>
      {post ? (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40"
            >
              Back
            </button>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
            >
              <p className="text-sm text-cyan-300/70">{post.date}</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">{post.title}</h2>
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
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
