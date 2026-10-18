import { routePattern } from '../definitions/paths';
import {
  type ProContentLayout,
  type ProPageRoute,
  type ProRouteConfig,
  proRouteConfig,
  type ProRouteGroup,
  type RouteAccess,
} from '../definitions/routes.config';

export interface ResolvedProRoute extends ProPageRoute {
  path: string;
  menu: boolean;
  breadcrumb: boolean;
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
        path: routePattern(route.key),
        group: { id: group.id, labelKey: group.labelKey, icon: group.icon },
        menu: route.menu ?? group.menu ?? config.defaults.menu,
        breadcrumb: route.breadcrumb ?? group.breadcrumb ?? config.defaults.breadcrumb,
        access: route.access ?? group.access ?? 'session',
        deniedDestination: route.deniedDestination ?? group.deniedDestination ?? 'forbidden',
        contentLayout: route.contentLayout ?? group.contentLayout ?? 'flow',
      })),
    ),
    {
      ...config.fallback,
      path: '*',
      menu: config.fallback.menu ?? config.defaults.menu,
      breadcrumb: config.fallback.breadcrumb ?? config.defaults.breadcrumb,
      access: config.fallback.access ?? 'session',
      deniedDestination: config.fallback.deniedDestination ?? 'forbidden',
      contentLayout: config.fallback.contentLayout ?? 'flow',
    },
  ];

  const groups = config.groups.flatMap((group) => {
    const pages = routes.filter(
      (route) =>
        route.group?.id === group.id &&
        route.menu &&
        !route.path.includes(':') &&
        !route.path.includes('*'),
    );

    return pages.length
      ? [{ id: group.id, labelKey: group.labelKey, icon: group.icon, pages }]
      : [];
  });

  const matchableRoutes = routes
    .filter((route) => route.path !== '*')
    .sort((a, b) => {
      const score = (path: string) =>
        path.split('/').reduce((total, segment) => total + (segment.startsWith(':') ? 1 : 10), 0);
      return score(b.path) - score(a.path);
    });

  return {
    routes,
    groups,
    match(pathname: string) {
      const segments = pathname.replace(/\/+$/, '').split('/');
      for (const route of matchableRoutes) {
        const pattern = route.path.split('/');
        if (pattern.length !== segments.length) continue;
        const params: Record<string, string> = {};
        if (
          pattern.every((segment, i) => {
            if (segment.startsWith(':')) {
              try {
                params[segment.slice(1)] = decodeURIComponent(segments[i]!);
              } catch {
                return false;
              }
              return true;
            }
            return segment.toLowerCase() === segments[i]?.toLowerCase();
          })
        )
          return { ...route, params };
      }
      const fallback = routes.find((route) => route.path === '*');
      return fallback ? { ...fallback, params: {} as Record<string, string> } : undefined;
    },
  };
}

export const proRouting = createProRouting(proRouteConfig);
