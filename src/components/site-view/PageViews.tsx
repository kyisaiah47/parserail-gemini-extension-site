'use client';
import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useSiteView } from './SiteViewProvider';

/** The BODY switch of a route. It registers the route's Simple composition with the provider, so the
 * chrome shows Simple only where the body does. Console renders until the provider reads a Simple
 * choice, and always on a route with no Simple composition. */
export default function PageViews({ consoleView, simpleView }: { consoleView: ReactNode; simpleView?: ReactNode }) {
  const ctx = useSiteView();
  const path = usePathname();
  const has = simpleView !== undefined;
  const register = ctx?.registerSimple;
  useEffect(() => (has && register ? register(path) : undefined), [path, has, register]);
  return ctx?.view === 'simple' && has ? simpleView : consoleView;
}

