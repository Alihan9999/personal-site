import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Chip, SectionHeader } from '../primitives';
import { posts } from '../../data';

export function WritingStrip() {
  const recent = posts.slice(0, 3);
  return (
    <motion.section
      id="writing"
      className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <span id="blog" className="sr-only" aria-hidden="true" />
      <SectionHeader
        resource="posts.log"
        status="Ready"
        age={`${posts.length}/total`}
        title="Notes on infrastructure, delivery, and platform thinking."
        description="Architecture decisions, operating lessons, and an occasional rant."
        action={
          <Link
            to="/posts"
            className="font-mono text-xs text-phosphor-400 transition hover:text-amber-400"
          >
            $ tail -f →
          </Link>
        }
      />
      <div className="grid grid-cols-12 gap-4">
        {recent.map((post) => (
          <Card key={post.slug} variant="compact" interactive className="lg:col-span-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
              {post.date}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-white light:text-ink-900">{post.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 light:text-ink-700">{post.preview}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Chip key={tag} variant="ghost">
                  {tag}
                </Chip>
              ))}
            </div>
            <Link
              to={`/posts/${post.slug}`}
              className="mt-5 inline-block font-mono text-xs text-amber-400 transition hover:text-amber-300"
            >
              $ cat {post.slug}.md →
            </Link>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
