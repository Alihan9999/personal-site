import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OperatorConsole } from '../components/hero/OperatorConsole';
import { NowRunning } from '../components/sections/NowRunning';
import { ProjectsBento } from '../components/sections/ProjectsBento';
import { TechMarquee } from '../components/marquee/TechMarquee';
import { StackBento } from '../components/sections/StackBento';
import { WritingStrip } from '../components/sections/WritingStrip';
import { AboutBlock } from '../components/sections/AboutBlock';
import { ContactBlock } from '../components/sections/ContactBlock';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash, location.pathname]);

  return (
    <>
      <OperatorConsole />
      <NowRunning />
      <ProjectsBento />
      <TechMarquee />
      <StackBento />
      <WritingStrip />
      <AboutBlock />
      <ContactBlock />
    </>
  );
}
