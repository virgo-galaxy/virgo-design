import { generatePath } from 'react-router';

import { type ProPageKey, routePaths } from './routes.config';
/** Application URL contract; parameters are always encoded as path segments. */
export function routePath(page: ProPageKey | 'login', params: Record<string, string> = {}) {
  return generatePath(
    routePaths[page],
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, encodeURIComponent(value)]),
    ),
  );
}
export function routeWithQuery(path: string, params: URLSearchParams) {
  return path + (params.size ? '?' + params.toString() : '');
}
