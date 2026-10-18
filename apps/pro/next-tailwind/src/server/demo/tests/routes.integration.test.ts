import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET as accounts } from '@/app/api/v1/(demo)/auth/demo-accounts/route';
import { POST as login } from '@/app/api/v1/(demo)/auth/login/route';
import { POST as logout } from '@/app/api/v1/(demo)/auth/logout/route';
import { GET as session } from '@/app/api/v1/(demo)/auth/session/route';
import { POST as reset } from '@/app/api/v1/(demo)/demo/reset/route';
import { GET as task, PATCH as updateTask } from '@/app/api/v1/(demo)/tasks/[id]/route';
import { GET as tasks, POST as createTask } from '@/app/api/v1/(demo)/tasks/route';

type Handler = typeof login;

function browser() {
  let cookie = '';
  let token = '';
  return {
    get cookie() {
      return cookie;
    },
    get token() {
      return token;
    },
    set token(value: string) {
      token = value;
    },
    async request(
      handler: Handler,
      method: string,
      path: string,
      body?: unknown,
      params: Record<string, string> = {},
    ) {
      const response = await handler(
        new Request(`http://localhost/api/v1${path}`, {
          method,
          headers: {
            Cookie: cookie,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        }),
        { params: Promise.resolve(params) },
      );
      cookie = response.headers.get('set-cookie')?.split(';')[0] ?? cookie;
      return response;
    },
    async signIn(account = 'admin') {
      const response = await this.request(login, 'POST', '/auth/login', {
        account,
        password: 'virgo123',
      });
      const result = await response.json();
      token = result.data.accessToken;
      expect(response.status).toBe(200);
      return result.data;
    },
  };
}

const draft = {
  title: 'Server task',
  description: '',
  status: 'todo',
  priority: 'high',
  project: 'online-store',
  module: 'online-store-1',
  assignee: 'ava',
  dueDate: '2026-10-06',
  estimateHours: 3,
};

beforeEach(() => vi.stubEnv('NEXT_PUBLIC_DEMO_API', 'true'));
afterEach(() => vi.unstubAllEnvs());

describe('native demo API without MSW', () => {
  it('keeps simultaneous Pro instances on different ports in distinct browser cookies', async () => {
    const cookies = await Promise.all(
      [6305, 6306].map(async (port) => {
        const response = await accounts(
          new Request(`http://localhost:${port}/api/v1/auth/demo-accounts`),
          { params: Promise.resolve({}) },
        );
        return response.headers.get('set-cookie')!.split(';')[0]!;
      }),
    );
    expect(cookies.map((cookie) => cookie.split('=')[0])).toEqual([
      'virgo-pro-demo-6305',
      'virgo-pro-demo-6306',
    ]);
    const response = await login(
      new Request('http://localhost:6305/api/v1/auth/login', {
        method: 'POST',
        headers: { Cookie: cookies.join('; '), 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: 'admin', password: 'virgo123' }),
      }),
      { params: Promise.resolve({}) },
    );
    expect(response.status).toBe(200);
    expect(response.headers.get('set-cookie')!.split(';')[0]).toBe(cookies[0]);
  });

  it('issues a browser-scoped HttpOnly cookie and keeps API responses private and uncached', async () => {
    const visitor = browser();
    const response = await visitor.request(accounts, 'GET', '/auth/demo-accounts');
    expect((await response.json()).data.accounts).toHaveLength(25);
    expect(response.headers.get('set-cookie')).toContain('HttpOnly; SameSite=Lax');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    expect(response.headers.get('x-request-id')).toBeTruthy();
    expect((await visitor.request(tasks, 'GET', '/tasks')).status).toBe(401);
    await visitor.signIn();
    expect((await visitor.request(tasks, 'GET', '/tasks')).status).toBe(200);
  });

  it('isolates two browsers and refuses a token copied without its browser cookie', async () => {
    const first = browser(),
      second = browser();
    await Promise.all([first.signIn(), second.signIn()]);
    const originalToken = second.token;
    second.token = first.token;
    expect((await second.request(tasks, 'GET', '/tasks')).status).toBe(401);
    second.token = originalToken;
    const created = await first.request(createTask, 'POST', '/tasks', draft);
    const saved = (await created.json()).data;
    expect(created.status).toBe(201);
    expect(created.headers.get('x-virgo-demo-changes')).toContain('tasks');
    expect(
      (await first.request(task, 'GET', `/tasks/${saved.id}`, undefined, { id: saved.id })).status,
    ).toBe(200);
    expect(
      (await second.request(task, 'GET', `/tasks/${saved.id}`, undefined, { id: saved.id })).status,
    ).toBe(404);
  });

  it('retains edits across requests and logout, while preserving the existing role permissions', async () => {
    const visitor = browser();
    await visitor.signIn();
    const initial = (await (await visitor.request(tasks, 'GET', '/tasks')).json()).data;
    const id = initial.items[0].id;
    expect(
      (
        await visitor.request(
          updateTask,
          'PATCH',
          `/tasks/${id}`,
          { title: 'Saved on server' },
          { id },
        )
      ).status,
    ).toBe(200);
    await visitor.request(logout, 'POST', '/auth/logout');
    expect(
      (await (await visitor.request(session, 'GET', '/auth/session')).json()).data.authenticated,
    ).toBe(false);
    await visitor.signIn();
    expect(
      (await (await visitor.request(task, 'GET', `/tasks/${id}`, undefined, { id })).json()).data
        .title,
    ).toBe('Saved on server');
    await visitor.signIn('hana');
    expect((await visitor.request(createTask, 'POST', '/tasks', draft)).status).toBe(403);
    expect((await visitor.request(reset, 'POST', '/demo/reset')).status).toBe(403);
  });

  it('serializes simultaneous writes without losing records or reusing IDs', async () => {
    const visitor = browser();
    await visitor.signIn();
    const before = (await (await visitor.request(tasks, 'GET', '/tasks')).json()).data.total;
    const responses = await Promise.all(
      Array.from({ length: 6 }, (_, i) =>
        visitor.request(createTask, 'POST', '/tasks', { ...draft, title: `Concurrent ${i}` }),
      ),
    );
    const saved = await Promise.all(
      responses.map(async (response) => {
        expect(response.status).toBe(201);
        return (await response.json()).data;
      }),
    );
    expect(new Set(saved.map((item) => item.id)).size).toBe(6);
    expect((await (await visitor.request(tasks, 'GET', '/tasks')).json()).data.total).toBe(
      before + 6,
    );
  });

  it('resets only the current browser data and revokes all of its demo logins', async () => {
    const first = browser(),
      second = browser();
    await first.signIn();
    await second.signIn();
    const secondTask = (await (await second.request(createTask, 'POST', '/tasks', draft)).json())
      .data;
    const firstTask = (await (await first.request(createTask, 'POST', '/tasks', draft)).json())
      .data;
    await first.request(reset, 'POST', '/demo/reset');
    expect((await first.request(tasks, 'GET', '/tasks')).status).toBe(401);
    await first.signIn();
    expect(
      (await first.request(task, 'GET', `/tasks/${firstTask.id}`, undefined, { id: firstTask.id }))
        .status,
    ).toBe(404);
    expect(
      (
        await second.request(task, 'GET', `/tasks/${secondTask.id}`, undefined, {
          id: secondTask.id,
        })
      ).status,
    ).toBe(200);
  });

  it('does not expose demo endpoints when the demo feature is disabled', async () => {
    vi.stubEnv('NEXT_PUBLIC_DEMO_API', 'false');
    const response = await browser().request(accounts, 'GET', '/auth/demo-accounts');
    expect(response.status).toBe(404);
    expect(response.headers.has('set-cookie')).toBe(false);
  });
});
