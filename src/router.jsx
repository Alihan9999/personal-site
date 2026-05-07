import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CommandPalette } from './components/CommandPalette';
import { MagneticCursor } from './components/primitives';
import { Navbar } from './components/Navbar';
import { useTheme } from './theme/useTheme';
import { Home } from './pages/Home';
import { ProjectsIndex } from './pages/ProjectsIndex';
import { ProjectView } from './pages/ProjectView';
import { PostsIndex } from './pages/PostsIndex';
import { PostView } from './pages/PostView';
import { NotFound } from './pages/NotFound';
import { findPostBySlug, findProjectBySlug } from './data';

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.10),_transparent_30%),linear-gradient(180deg,_#07090c_0%,_#131922_45%,_#07090c_100%)] text-slate-100 transition-colors duration-300 light:bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.08),_transparent_28%),linear-gradient(180deg,_#fbf9f4_0%,_#ffffff_50%,_#f3efe6_100%)] light:text-ink-900">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(110,231,168,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,168,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] light:bg-[linear-gradient(rgba(20,22,26,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(20,22,26,0.04)_1px,transparent_1px)]" />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      {location.pathname.startsWith('/projects/') ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <AnimatePresence mode="wait">
          <main key={location.pathname}>
            <Outlet />
          </main>
        </AnimatePresence>
      )}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <MagneticCursor />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <ProjectsIndex /> },
      {
        path: '/projects/:slug',
        loader: ({ params }) => {
          const project = findProjectBySlug(params.slug);
          if (!project) {
            throw new Response('Not found', { status: 404 });
          }
          return project;
        },
        element: <ProjectView />,
        errorElement: <NotFound />,
      },
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
