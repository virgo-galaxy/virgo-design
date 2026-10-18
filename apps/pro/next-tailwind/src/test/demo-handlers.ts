/// <reference types="vite/client" />
import type { RequestHandler } from 'msw';
import { http } from 'msw';

import { demoCookieNameFor } from '@/server/demo/route';

const routes = import.meta.glob('../app/api/v1/**/route.ts', { eager: true });

type NativeHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> },
) => Promise<Response>;

export const handlers: RequestHandler[] = Object.entries(routes)
  .filter(([file]) => file.includes('/(demo)/'))
  .sort(([a], [b]) => Number(a.includes('[')) - Number(b.includes('[')))
  .flatMap(([file, module]) => {
    const path =
      '/api/v1/' +
      file
        .split('/(demo)/')[1]!
        .replace('/route.ts', '')
        .replace(/\[([^\]]+)\]/g, ':$1');
    return Object.entries(module as Record<string, unknown>)
      .filter(([method]) => ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].includes(method))
      .map(([method, handler]) =>
        http[method.toLowerCase() as 'get'](path, ({ request, params }) => {
          const headers = new Headers(request.headers);
          headers.set('Cookie', `${demoCookieNameFor(request)}=test-browser`);
          return (handler as NativeHandler)(new Request(request, { headers }), {
            params: Promise.resolve(params as Record<string, string>),
          });
        }),
      );
  });
