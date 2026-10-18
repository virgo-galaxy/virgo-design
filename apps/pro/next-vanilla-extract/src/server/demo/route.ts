import 'server-only';

import { API_ERROR_CODES } from '@/api/gateway/constants';

import { requestUser } from './auth/session';
import { failure } from './http/response';
import { createDemoSandbox, demoRuntime, type DemoSandbox } from './runtime/context';

export type DemoHandler = (input: {
  request: Request;
  params: Record<string, string>;
}) => Response | Promise<Response>;

export const demoCookieName = 'virgo-pro-demo';
const lifetime = 8 * 60 * 60 * 1000;
const maximumSandboxes = 128;

export function demoCookieNameFor(request: Request) {
  return `${demoCookieName}-${new URL(request.url).port || 'default'}`;
}

function cookieFor(request: Request, id: string) {
  return `${demoCookieNameFor(request)}=${id}; Path=/api/v1; HttpOnly; SameSite=Lax; Max-Age=${lifetime / 1000}${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`;
}

function sandboxFor(request: Request) {
  const now = Date.now();
  for (const [id, sandbox] of demoRuntime.sandboxes)
    if (now - sandbox.touchedAt >= lifetime) demoRuntime.sandboxes.delete(id);
  const id = request.headers
    .get('cookie')
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(demoCookieNameFor(request) + '='))
    ?.slice(demoCookieNameFor(request).length + 1);
  let sandbox = id ? demoRuntime.sandboxes.get(id) : undefined;
  if (sandbox && id) {
    sandbox.touchedAt = now;
    demoRuntime.sandboxes.delete(id);
    demoRuntime.sandboxes.set(id, sandbox);
    return { sandbox, cookie: cookieFor(request, id) };
  }
  while (demoRuntime.sandboxes.size >= maximumSandboxes)
    demoRuntime.sandboxes.delete(demoRuntime.sandboxes.keys().next().value!);
  const nextId = crypto.randomUUID();
  sandbox = createDemoSandbox();
  demoRuntime.sandboxes.set(nextId, sandbox);
  return {
    sandbox,
    cookie: cookieFor(request, nextId),
  };
}

async function mutate<T>(sandbox: DemoSandbox, run: () => Promise<T>) {
  const previous = sandbox.mutations;
  let release!: () => void;
  sandbox.mutations = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await run();
  } finally {
    release();
  }
}

export function demoRoute(
  handler: DemoHandler,
  options: { public?: boolean; asset?: boolean } = {},
) {
  return async (
    request: Request,
    context: { params: Promise<Record<string, string>> },
  ): Promise<Response> => {
    if (process.env.NEXT_PUBLIC_DEMO_API !== 'true') return new Response(null, { status: 404 });
    const params = await context.params;
    if (options.asset) return handler({ request, params });
    const { sandbox, cookie } = sandboxFor(request);
    const run = () =>
      demoRuntime.context.run({ sandbox, changes: new Set() }, async () => {
        const response =
          !options.public && !requestUser(request)
            ? failure({
                status: 401,
                code: API_ERROR_CODES.AUTHENTICATION_REQUIRED,
                detail: 'Please sign in to continue',
              })
            : await handler({ request, params });
        response.headers.set('Cache-Control', 'private, no-store');
        response.headers.set('Vary', 'Cookie, Authorization');
        if (cookie) response.headers.append('Set-Cookie', cookie);
        const changes = demoRuntime.context.getStore()!.changes;
        if (changes.size) response.headers.set('x-virgo-demo-changes', [...changes].join(','));
        return response;
      });
    return ['GET', 'HEAD', 'OPTIONS'].includes(request.method) ? run() : mutate(sandbox, run);
  };
}
