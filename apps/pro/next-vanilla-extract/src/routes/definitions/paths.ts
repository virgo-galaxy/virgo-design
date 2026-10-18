import type { ProRouteKey } from './routes.config';

export function routePattern(key: string) {
  const segments = key.split('.').map((segment) => segment.replace(/^\[([^\]]+)\]$/, ':$1'));

  return '/' + segments.join('/');
}

export function routePath(key: ProRouteKey, params: Record<string, string> = {}) {
  return routePattern(key).replace(/:([^/]+)/g, (_, name: string) => {
    const value = params[name];
    if (value === undefined) throw new Error(`Missing route parameter: ${name}`);
    return encodeURIComponent(value);
  });
}

export function routeWithQuery(path: string, params: URLSearchParams) {
  return path + (params.size ? '?' + params.toString() : '');
}
