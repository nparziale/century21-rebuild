import { useCallback, useEffect, useState } from 'react';

/**
 * Persistent string[] stored as JSON at `key`. Safe on SSR (returns [] until mount).
 * Returns { items, has, toggle, add, remove, clear }.
 */
export function useLocalStorageArray(key: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((x): x is string => typeof x === 'string'));
        }
      }
    } catch {
      /* ignore corrupted JSON */
    }
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      setItems(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable — swallow */
      }
    },
    [key],
  );

  const has = useCallback((id: string) => items.includes(id), [items]);

  const toggle = useCallback(
    (id: string) => {
      persist(items.includes(id) ? items.filter((x) => x !== id) : [...items, id]);
    },
    [items, persist],
  );

  const add = useCallback(
    (id: string) => {
      if (!items.includes(id)) persist([...items, id]);
    },
    [items, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(items.filter((x) => x !== id));
    },
    [items, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { items, has, toggle, add, remove, clear };
}
