import { matchRoutes } from 'react-router';

import {
  type ProContentLayout,
  type ProPageRoute,
  type ProRouteConfig,
  proRouteConfig,
  type ProRouteDisplay,
  type ProRouteGroup,
  type RouteAccess,
} from '../definitions/routes.config';

export interface ResolvedProRoute extends ProPageRoute {
  display: ProRouteDisplay;
  contentLayout: ProContentLayout;
  access: RouteAccess;
  deniedDestination: 'home' | 'forbidden';
  group?: Pick<ProRouteGroup, 'id' | 'labelKey' | 'icon'>;
}

export function createProRouting(config: ProRouteConfig) {
  const routes: ResolvedProRoute[] = [
    ...config.groups.flatMap((group) =>
      group.routes.map((route) => ({
        ...route,
        group: { id: group.id, labelKey: group.labelKey, icon: group.icon },
        display: { ...config.defaults, ...group.display, ...route.display },
        access: route.access ?? group?.access ?? 'session',
        deniedDestination: route.deniedDestination ?? group?.deniedDestination ?? 'forbidden',
        contentLayout: route.contentLayout ?? group.contentLayout ?? 'flow',
      })),
    ),
    {
      ...config.fallback,
      display: { ...config.defaults, ...config.fallback.display },
      access: config.fallback.access ?? 'session',
      deniedDestination: config.fallback.deniedDestination ?? 'forbidden',
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

    return pages.length
      ? [{ id: group.id, labelKey: group.labelKey, icon: group.icon, pages }]
      : [];
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
