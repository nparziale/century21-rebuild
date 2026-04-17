import { useEffect, useState } from 'react';

/**
 * Returns true when `prefers-reduced-motion: reduce` is active.
 * Wraps `matchMedia` with SSR-safe default.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return reduced;
}

/** Saver / low-bandwidth signal. Returns true when user asked for data saving. */
export function useDataSaver(): boolean {
  const [save, setSave] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    setSave(Boolean(nav.connection?.saveData));
  }, []);
  return save;
}
