import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyHeadSnapshot } from '../seo/applyHead.ts';
import { computeHeadForClient } from '../seo/routeHead.ts';

export function useRouteHead(): void {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    applyHeadSnapshot(computeHeadForClient(pathname));
  }, [pathname]);
}
