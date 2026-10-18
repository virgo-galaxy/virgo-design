import { generatePath } from 'react-router';

import type { ProRouteKey } from './routes.config';

export function routePattern(key: string) {
  const segments = key.split('.').map((segment) => segment.replace(/^\[([^\]]+)\]$/, ':$1'));

  return '/' + segments.join('/');
}

export function routePath(key: ProRouteKey, params: Record<string, string> = {}) {
  return generatePath(routePattern(key), params);
}

export function routeWithQuery(path: string, params: URLSearchParams) {
  return path + (params.size ? '?' + params.toString() : '');
}
