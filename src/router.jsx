import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CommandPalette } from './components/CommandPalette';
import { Navbar } from './components/Navbar';
import { useTheme } from './theme/useTheme';
import { Home } from './pages/Home';
import { ProjectsIndex } from './pages/ProjectsIndex';
import { PostsIndex } from './pages/PostsIndex';
import { PostView } from './pages/PostView';
import { NotFound } from './pages/NotFound';
import { findPostBySlug } from './data';

function RootLayout() {
  const { theme, toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if (event.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] text-slate-100 transition-colors duration-300 light:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.10),_transparent_24%),linear-gradient(180deg,_#e2e8f0_0%,_#f8fafc_50%,_#e2e8f0_100%)] light:text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] light:bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)]" />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <main key={location.pathname}>
          <Outlet />
        </main>
      </AnimatePresence>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <ProjectsIndex /> },
      { path: '/posts', element: <PostsIndex /> },
      {
        path: '/posts/:slug',
        loader: ({ params }) => {
          const post = findPostBySlug(params.slug);
          if (!post) {
            throw new Response('Not found', { status: 404 });
          }
          return post;
        },
        element: <PostView />,
        errorElement: <NotFound />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
