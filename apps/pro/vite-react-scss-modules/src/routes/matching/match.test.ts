import { describe, expect, it } from 'vitest';

import { taskDetailsPath, taskReturnPath } from '@/features/tasks';
import { demoAccounts } from '@/mock/fixtures/accounts';

import { type ProRouteConfig, proRouteConfig } from '../definitions/routes.config';
import { canVisitPage } from './access';
import { createProRouting, proRouting } from './match';

function sampleConfig(): ProRouteConfig {
  return {
    homePath: '/projects',
    loginPath: '/login',
    defaults: { sidebar: true, breadcrumb: true },
    redirects: [{ path: '/', to: '/projects' }],
    groups: [
      {
        id: 'work',
        labelKey: 'app.projects',
        icon: 'briefcase',
        routes: [
          { id: 'projects', path: '/projects', labelKey: 'app.projects', page: 'projects' },
          {
            id: 'project-detail',
            path: '/projects/:projectId',
            labelKey: 'app.projects',
            page: 'project-detail',
            display: { sidebar: false },
          },
          {
            id: 'new-project',
            path: '/projects/new',
            labelKey: 'app.projects',
            page: 'task-create',
          },
        ],
      },
    ],
    fallback: {
      id: 'not-found',
      path: '*',
      labelKey: 'app.projects',
      page: 'not-found',
      display: { sidebar: false },
    },
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
        expect(canVisitPage(user, route.page), `${user.account}: ${route.path}`).toBe(
          user.role === 'admin',
        );
      expect(canVisitPage(user, 'tasks')).toBe(true);
      expect(canVisitPage(user, 'projects')).toBe(true);
      expect(canVisitPage(user, 'task-create')).toBe(user.role !== 'member');
      expect(canVisitPage(user, 'project-handoff')).toBe(user.role !== 'member');
    }
    for (const route of showcaseRoutes) expect(canVisitPage(undefined, route.page)).toBe(false);
  });
  it('keeps business menus focused and matches standalone task and project routes', () => {
    expect(proRouting.groups.map((group) => group.id)).not.toEqual(
      expect.arrayContaining(['data', 'form']),
    );
    expect(proRouting.match('/work/task-cards')?.page).toBe('task-cards');
    expect(proRouting.match('/work/task-cards')?.display.sidebar).toBe(false);
    expect(
      proRouting.groups.find((group) => group.id === 'work')?.pages.map((page) => page.id),
    ).toEqual(['tasks', 'projects']);
    for (const [path, page] of [
      ['/work/tasks/new', 'task-create'],
      ['/work/tasks/example/edit', 'task-edit'],
      ['/work/tasks/example', 'task-details'],
      ['/work/projects/online-store', 'project-detail'],
      ['/work/projects/online-store/handoff', 'project-handoff'],
    ]) {
      expect(proRouting.match(path!)?.page).toBe(page);
      expect(proRouting.match(path!)?.display.sidebar).toBe(false);
    }
  });
  it('omits breadcrumbs for Result and Exception while allowing them on other pages', () => {
    for (const group of proRouteConfig.groups)
      for (const route of group.routes)
        expect(proRouting.match(route.path)?.display.breadcrumb).toBe(
          group.id !== 'result' && group.id !== 'exception',
        );
  });

  it('inherits each display flag independently and allows page overrides of group defaults', () => {
    const config = sampleConfig();
    config.defaults = { sidebar: false, breadcrumb: false };
    config.groups = [
      {
        ...config.groups[0]!,
        display: { sidebar: true },
        routes: [
          { id: 'projects', path: '/projects', labelKey: 'app.projects', page: 'projects' },
          {
            id: 'project-detail',
            path: '/detail',
            labelKey: 'app.projects',
            page: 'project-detail',
            display: { sidebar: false, breadcrumb: true },
          },
        ],
      },
    ];
    const routing = createProRouting(config);
    expect(routing.match('/projects')?.display).toEqual({ sidebar: true, breadcrumb: false });
    expect(routing.match('/detail')?.display).toEqual({ sidebar: false, breadcrumb: true });
    expect(routing.groups[0]?.pages.map((page) => page.id)).toEqual(['projects']);
  });

  it('keeps hidden pages routable and removes groups with no visible entries', () => {
    const config = sampleConfig();
    config.groups = [{ ...config.groups[0]!, display: { sidebar: false } }];
    const routing = createProRouting(config);
    expect(routing.groups).toEqual([]);
    expect(routing.match('/projects')?.page).toBe('projects');
    expect(routing.match('/projects')?.display.breadcrumb).toBe(true);
  });

  it('matches ranked static, parameter and fallback routes, including trailing slashes', () => {
    const routing = createProRouting(sampleConfig());
    expect(routing.match('/projects/new')?.id).toBe('new-project');
    expect(routing.match('/projects/VD-101/')?.params.projectId).toBe('VD-101');
    expect(routing.match('/projects/VD-101')?.group?.id).toBe('work');
    expect(routing.match('/missing/path')?.page).toBe('not-found');
    expect(routing.groups[0]?.pages.map((page) => page.path)).toEqual([
      '/projects',
      '/projects/new',
    ]);
  });

  it('does not create unresolved parameter or wildcard links in the fixed menu', () => {
    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        routes: [
          {
            id: 'project-detail',
            path: '/projects/:id',
            labelKey: 'app.projects',
            page: 'project-detail',
          },
          { id: 'files', path: '/files/*', labelKey: 'app.projects', page: 'tasks' },
        ],
      },
    ];
    const routing = createProRouting(config);
    expect(routing.groups).toEqual([]);
    expect(routing.match('/files/docs/readme')?.id).toBe('files');
    expect(routing.match('/projects/123')?.params.id).toBe('123');
  });

  it('retains optional child icons without inheriting the parent icon', () => {
    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        routes: [
          { id: 'projects', path: '/projects', labelKey: 'app.projects', page: 'projects' },
          { id: 'tasks', path: '/tasks', labelKey: 'app.projects', page: 'tasks', icon: 'receipt' },
        ],
      },
    ];
    const routing = createProRouting(config);
    expect(routing.groups[0]?.pages[0]?.icon).toBeUndefined();
    expect(routing.groups[0]?.pages[1]?.icon).toBe('receipt');
    expect(routing.match('/tasks')?.icon).toBe('receipt');
  });

  it('fills Exception pages and allows an individual page to override its group layout', () => {
    for (const code of ['403', '404', '500'])
      expect(proRouting.match(`/exception/${code}`)?.contentLayout).toBe('fill');
    for (const path of ['/result/success', '/result/error'])
      expect(proRouting.match(path)?.contentLayout).toBe('fill');
    expect(proRouting.match('/unmatched/path')?.contentLayout).toBe('fill');
    expect(proRouting.match('/unmatched/path')?.display.breadcrumb).toBe(false);
    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        contentLayout: 'fill',
        routes: [
          { id: 'projects', path: '/projects', labelKey: 'app.projects', page: 'projects' },
          {
            id: 'project-detail',
            path: '/detail',
            labelKey: 'app.projects',
            page: 'project-detail',
            contentLayout: 'flow',
          },
        ],
      },
    ];
    const routing = createProRouting(config);
    expect(routing.match('/projects')?.contentLayout).toBe('fill');
    expect(routing.match('/detail')?.contentLayout).toBe('flow');
  });
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
