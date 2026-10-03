import { matchRoutes } from 'react-router';

import {
  type ProContentLayout,
  type ProPageRoute,
  type ProRouteConfig,
  proRouteConfig,
  type ProRouteDisplay,
  type ProRouteGroup,
} from './routes.config';

export interface ResolvedProRoute extends ProPageRoute {
  display: ProRouteDisplay;
  contentLayout: ProContentLayout;
  group?: Pick<ProRouteGroup, 'id' | 'label' | 'icon'>;
}

/** Resolve policy once; route matching and navigation share the same descriptors. */
export function createProRouting(config: ProRouteConfig) {
  const routes: ResolvedProRoute[] = [
    ...config.groups.flatMap((group) =>
      group.routes.map((route) => ({
        ...route,
        group: { id: group.id, label: group.label, icon: group.icon },
        display: { ...config.defaults, ...group.display, ...route.display },
        contentLayout: route.contentLayout ?? group.contentLayout ?? 'flow',
      })),
    ),
    {
      ...config.fallback,
      display: { ...config.defaults, ...config.fallback.display },
      contentLayout: config.fallback.contentLayout ?? 'flow',
    },
  ];
  const groups = config.groups.flatMap((group) => {
    const pages = routes.filter(
      (route) =>
        route.group?.id === group.id &&
        route.display.sidebar &&
        !route.path.includes(':') &&
        !route.path.includes('*'),
    );
    return pages.length ? [{ id: group.id, label: group.label, icon: group.icon, pages }] : [];
  });
  const matchableRoutes = routes.map((route) => ({ path: route.path, handle: route }));

  return {
    routes,
    groups,
    match(pathname: string) {
      const match = matchRoutes(matchableRoutes, pathname)?.at(-1);
      return match ? { ...match.route.handle, params: match.params } : undefined;
    },
  };
}

export const proRouting = createProRouting(proRouteConfig);
