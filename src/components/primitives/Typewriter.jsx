import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TYPE_MS = 55;
const ERASE_MS = 30;
const HOLD_MS = 2200;

export function Typewriter({ phrases, className = '' }) {
  const reduced = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(reduced ? phrases[phrases.length - 1] : '');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    if (reduced) {
      setText(phrases[phrases.length - 1]);
      return undefined;
    }
    let timer;
    const target = phrases[phraseIndex];
    if (phase === 'typing') {
      if (text.length < target.length) {
        timer = window.setTimeout(() => setText(target.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timer = window.setTimeout(() => setPhase('holding'), HOLD_MS);
      }
    } else if (phase === 'holding') {
      timer = window.setTimeout(() => setPhase('erasing'), 100);
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        timer = window.setTimeout(() => setText(target.slice(0, text.length - 1)), ERASE_MS);
      } else {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setPhase('typing');
      }
    }
    return () => window.clearTimeout(timer);
  }, [phase, phrases, phraseIndex, reduced, text]);

  return (
    <span className={`font-mono ${className}`} aria-live="polite">
      {text}
      {!reduced ? <span className="ml-0.5 inline-block w-2 animate-pulse text-phosphor-400">█</span> : null}
    </span>
  );
}
