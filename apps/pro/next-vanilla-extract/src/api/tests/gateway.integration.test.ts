import { createServer } from 'node:http';

import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});
describe('real Gateway mode', () => {
  it('enforces the Axios timeout against real network latency', async () => {
    const server = createServer((_request, response) => {
      setTimeout(() => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ code: 0, msg: 'success', data: {} }));
      }, 100);
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    try {
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Missing port');
      vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', `http://127.0.0.1:${address.port}/api/v1`);
      vi.resetModules();
      const { http } = await import('@/lib/http');
      await expect(http.get('/slow', { timeout: 15 })).rejects.toMatchObject({ kind: 'timeout' });
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
  it('does not start Mock and uses the same API against a real HTTP server', async () => {
    let received = '';
    const server = createServer((request, response) => {
      received = request.url ?? '';
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({ code: 0, msg: 'success', data: { name: 'Gateway profile' } }));
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    try {
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Missing port');
      vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', `http://127.0.0.1:${address.port}/api/v1`);
      vi.stubEnv('NEXT_PUBLIC_DEMO_API', 'false');
      vi.resetModules();
      const { getProfileIdentity } = await import('@/api/profile');
      expect((await getProfileIdentity()).name).toBe('Gateway profile');
      expect(received).toBe('/api/v1/profile/identity');
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });
});
