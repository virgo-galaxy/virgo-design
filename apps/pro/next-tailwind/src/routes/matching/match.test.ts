import { describe, expect, it } from 'vitest';

import { taskDetailsPath, taskReturnPath } from '@/features/tasks';
import { demoAccounts } from '@/mock/fixtures/accounts';

import { routePath } from '../definitions/paths';
import type { ProRouteConfig } from '../definitions/routes.config';
import { canVisitRoute } from './access';
import { createProRouting, proRouting } from './match';

function sampleConfig(): ProRouteConfig {
  return {
    home: 'projects',
    login: 'login',
    defaults: { menu: true, breadcrumb: true },
    redirects: [{ path: '/', to: 'projects' }],
    groups: [
      {
        id: 'work',
        labelKey: 'app.projects',
        icon: 'briefcase',
        routes: [
          { key: 'projects', labelKey: 'app.projects' },
          { key: 'projects.[projectId]', labelKey: 'app.projects', menu: false },
          { key: 'projects.new', labelKey: 'app.projects' },
        ],
      },
    ],
    fallback: { key: 'not-found', labelKey: 'app.pageNotFound', menu: false },
  };
}

describe('configured Pro routing', () => {
  it('keeps result and exception showcase routes exclusive to Admin for every business account', () => {
    const showcaseRoutes = proRouting.routes.filter((route) =>
      ['result', 'exception'].includes(route.group?.id ?? ''),
    );

    expect(showcaseRoutes).toHaveLength(5);

    for (const user of demoAccounts) {
      for (const route of showcaseRoutes)
        expect(canVisitRoute(user, route.key), `${user.account}: ${route.path}`).toBe(
          user.role === 'admin',
        );

      expect(canVisitRoute(user, 'work.tasks')).toBe(true);
      expect(canVisitRoute(user, 'work.projects')).toBe(true);
      expect(canVisitRoute(user, 'work.tasks.new')).toBe(user.role !== 'member');
      expect(canVisitRoute(user, 'work.projects.[projectId].handoff')).toBe(user.role !== 'member');
    }

    for (const route of showcaseRoutes) expect(canVisitRoute(undefined, route.key)).toBe(false);
  });

  it('keeps work menus focused and selects the owning menu for hidden task and project routes', () => {
    expect(
      proRouting.groups.find((group) => group.id === 'work')?.pages.map((page) => page.key),
    ).toEqual(['work.tasks', 'work.projects']);

    const cases = [
      ['/work/task-cards', 'work.task-cards', 'work.tasks'],
      ['/work/tasks/new', 'work.tasks.new', 'work.tasks'],
      ['/work/tasks/example/edit', 'work.tasks.[id].edit', 'work.tasks'],
      ['/work/tasks/example', 'work.tasks.[id]', 'work.tasks'],
      ['/work/projects/online-store', 'work.projects.[projectId]', 'work.projects'],
      ['/work/projects/online-store/handoff', 'work.projects.[projectId].handoff', 'work.projects'],
    ] as const;

    for (const [path, key, activeMenu] of cases)
      expect(proRouting.match(path)).toMatchObject({ key, activeMenu, menu: false });
  });

  it('inherits menu and breadcrumb settings independently and allows route overrides', () => {
    const config = sampleConfig();
    config.defaults = { menu: false, breadcrumb: false };
    config.groups = [
      {
        ...config.groups[0]!,
        menu: true,
        routes: [
          { key: 'projects', labelKey: 'app.projects' },
          { key: 'detail', labelKey: 'app.projects', menu: false, breadcrumb: true },
        ],
      },
    ];

    const routing = createProRouting(config);

    expect(routing.match('/projects')).toMatchObject({ menu: true, breadcrumb: false });
    expect(routing.match('/detail')).toMatchObject({ menu: false, breadcrumb: true });
    expect(routing.groups[0]?.pages.map((page) => page.key)).toEqual(['projects']);
  });

  it('keeps hidden routes reachable and removes groups with no visible menu entries', () => {
    const config = sampleConfig();
    config.groups = [{ ...config.groups[0]!, menu: false }];

    const routing = createProRouting(config);

    expect(routing.groups).toEqual([]);
    expect(routing.match('/projects')).toMatchObject({ key: 'projects', breadcrumb: true });
  });

  it('matches static, parameter and fallback routes with static priority and trailing slashes', () => {
    const routing = createProRouting(sampleConfig());

    expect(routing.match('/projects/new')?.key).toBe('projects.new');
    expect(routing.match('/projects/VD-101/')).toMatchObject({
      key: 'projects.[projectId]',
      params: { projectId: 'VD-101' },
      group: { id: 'work' },
    });
    expect(routing.match('/missing/path')?.key).toBe('not-found');
    expect(routing.groups[0]?.pages.map((page) => page.path)).toEqual([
      '/projects',
      '/projects/new',
    ]);
  });

  it('excludes unresolved parameter and fallback URLs from fixed menu links', () => {
    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        routes: [{ key: 'projects.[id]', labelKey: 'app.projects' }],
      },
    ];
    config.fallback.menu = true;

    const routing = createProRouting(config);

    expect(routing.groups).toEqual([]);
    expect(routing.match('/projects/123')?.params.id).toBe('123');
    expect(routing.match('/missing')?.key).toBe('not-found');
  });

  it('retains optional route icons without inheriting the group icon', () => {
    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        routes: [
          { key: 'projects', labelKey: 'app.projects' },
          { key: 'tasks', labelKey: 'app.tasks', icon: 'receipt' },
        ],
      },
    ];

    const routing = createProRouting(config);

    expect(routing.groups[0]?.pages[0]?.icon).toBeUndefined();
    expect(routing.groups[0]?.pages[1]?.icon).toBe('receipt');
    expect(routing.match('/tasks')?.icon).toBe('receipt');
  });

  it('omits breadcrumbs and fills Result and Exception routes while preserving layout overrides', () => {
    for (const route of proRouting.routes)
      if (route.group)
        expect(route.breadcrumb, route.key).toBe(
          route.group.id !== 'result' && route.group.id !== 'exception',
        );

    for (const path of [
      '/exception/403',
      '/exception/404',
      '/exception/500',
      '/result/success',
      '/result/error',
      '/unmatched/path',
    ])
      expect(proRouting.match(path)).toMatchObject({ contentLayout: 'fill', breadcrumb: false });

    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        contentLayout: 'fill',
        routes: [
          { key: 'projects', labelKey: 'app.projects' },
          { key: 'detail', labelKey: 'app.projects', contentLayout: 'flow' },
        ],
      },
    ];

    const routing = createProRouting(config);

    expect(routing.match('/projects')?.contentLayout).toBe('fill');
    expect(routing.match('/detail')?.contentLayout).toBe('flow');
  });
});

it('builds links from directory keys while encoding dynamic values as single path segments', () => {
  const id = 'task/1?draft#details';
  const path = routePath('work.tasks.[id].edit', { id });

  expect(routePath('dashboard.workplace')).toBe('/dashboard/workplace');
  expect(routePath('visualization.analytics')).toBe('/visualization/analytics');
  expect(path).toBe('/work/tasks/task%2F1%3Fdraft%23details/edit');
  expect(proRouting.match(path)?.params.id).toBe(id);
  expect(routePath('work.projects.[projectId].handoff', { projectId: 'Online Store' })).toBe(
    '/work/projects/Online%20Store/handoff',
  );
});

it('returns task details to allowed business or result routes without accepting external targets', () => {
  for (const path of [
    '/result/success',
    '/result/error',
    '/work/projects/online-store',
    '/work/tasks?project=Online+Store',
  ]) {
    expect(taskReturnPath(path)).toBe(path);
    expect(
      new URL(taskDetailsPath('task-1', path), 'https://example.test').searchParams.get('returnTo'),
    ).toBe(path);
  }

  for (const path of [
    'https://example.test',
    '//example.test',
    '/result/unknown',
    '/result/success/../../login',
    '/login',
  ])
    expect(taskReturnPath(path)).toBe('/work/tasks');
});
