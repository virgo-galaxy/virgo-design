import { describe, expect, it } from 'vitest';

import { type ProRouteConfig, proRouteConfig } from './routes.config';
import { createProRouting, proRouting } from './routing';

function sampleConfig(): ProRouteConfig {
  return {
    homePath: '/projects',
    defaults: { sidebar: true, breadcrumb: true },
    redirects: [{ path: '/', to: '/projects' }],
    groups: [
      {
        id: 'work',
        label: 'Work',
        icon: 'briefcase',
        routes: [
          { id: 'projects', path: '/projects', label: 'Projects', page: 'projects' },
          {
            id: 'project-detail',
            path: '/projects/:projectId',
            label: 'Project detail',
            page: 'detail',
            display: { sidebar: false },
          },
          { id: 'new-project', path: '/projects/new', label: 'New project', page: 'basic-form' },
        ],
      },
    ],
    fallback: {
      id: 'not-found',
      path: '*',
      label: 'Page not found',
      page: 'not-found',
      display: { sidebar: false },
    },
  };
}

describe('configured Pro routing', () => {
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
          { id: 'projects', path: '/projects', label: 'Projects', page: 'projects' },
          {
            id: 'detail',
            path: '/detail',
            label: 'Detail',
            page: 'detail',
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
          { id: 'detail', path: '/projects/:id', label: 'Project', page: 'detail' },
          { id: 'files', path: '/files/*', label: 'Files', page: 'data-list' },
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
          { id: 'projects', path: '/projects', label: 'Projects', page: 'projects' },
          { id: 'tasks', path: '/tasks', label: 'Tasks', page: 'tasks', icon: 'receipt' },
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
    expect(proRouting.match('/result/success')?.contentLayout).toBe('flow');
    expect(proRouting.match('/unmatched/path')?.contentLayout).toBe('fill');
    expect(proRouting.match('/unmatched/path')?.display.breadcrumb).toBe(false);
    const config = sampleConfig();
    config.groups = [
      {
        ...config.groups[0]!,
        contentLayout: 'fill',
        routes: [
          { id: 'projects', path: '/projects', label: 'Projects', page: 'projects' },
          {
            id: 'detail',
            path: '/detail',
            label: 'Detail',
            page: 'detail',
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
