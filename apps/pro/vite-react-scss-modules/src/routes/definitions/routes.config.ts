import type { ParseKeys } from 'i18next';

import type { ProRouteIcon } from './icons';

export type RouteAccess = 'session' | 'manage' | 'admin';
export type ProContentLayout = 'flow' | 'fill';

interface ProRouteMeta {
  labelKey: ParseKeys;
  icon?: ProRouteIcon;
  menu?: boolean;
  breadcrumb?: boolean;
  access?: RouteAccess;
  deniedDestination?: 'home' | 'forbidden';
  contentLayout?: ProContentLayout;
}

export interface ProPageRoute extends ProRouteMeta {
  key: string;
  activeMenu?: string;
}

export interface ProRouteGroup extends ProRouteMeta {
  id: string;
  icon: ProRouteIcon;
  routes: readonly ProPageRoute[];
}

export interface ProRouteConfig {
  home: string;
  login: string;
  defaults: { menu: boolean; breadcrumb: boolean };
  redirects: readonly { path: `/${string}`; to: string }[];
  groups: readonly ProRouteGroup[];
  fallback: ProPageRoute;
}

export const proRouteConfig = {
  home: 'dashboard.workplace',
  login: 'login',
  defaults: {
    menu: true,
    breadcrumb: true,
  },
  redirects: [{ path: '/', to: 'dashboard.workplace' }],
  groups: [
    {
      id: 'dashboard',
      labelKey: 'app.dashboard',
      icon: 'gauge',
      routes: [{ key: 'dashboard.workplace', labelKey: 'app.workplace' }],
    },
    {
      id: 'visualization',
      labelKey: 'app.visualization',
      icon: 'chart-line',
      routes: [{ key: 'visualization.analytics', labelKey: 'app.analytics' }],
    },
    {
      id: 'work',
      labelKey: 'app.work',
      icon: 'briefcase',
      routes: [
        { key: 'work.tasks', labelKey: 'app.tasks' },
        { key: 'work.projects', labelKey: 'app.projects' },
        {
          key: 'work.task-cards',
          labelKey: 'app.tasks',
          activeMenu: 'work.tasks',
          menu: false,
        },
        {
          key: 'work.tasks.new',
          labelKey: 'tasks.newTask',
          activeMenu: 'work.tasks',
          access: 'manage',
          menu: false,
        },
        {
          key: 'work.tasks.[id]',
          labelKey: 'tasks.taskDetails',
          activeMenu: 'work.tasks',
          menu: false,
        },
        {
          key: 'work.tasks.[id].edit',
          labelKey: 'tasks.editTask',
          activeMenu: 'work.tasks',
          access: 'manage',
          menu: false,
        },
        {
          key: 'work.projects.[projectId]',
          labelKey: 'tasks.workspace.projectDetails',
          activeMenu: 'work.projects',
          menu: false,
        },
        {
          key: 'work.projects.[projectId].handoff',
          labelKey: 'tasks.workspace.handoff',
          activeMenu: 'work.projects',
          access: 'manage',
          menu: false,
        },
      ],
    },
    {
      id: 'result',
      access: 'admin',
      deniedDestination: 'home',
      labelKey: 'app.result',
      contentLayout: 'fill',
      icon: 'receipt',
      breadcrumb: false,
      routes: [
        { key: 'result.success', labelKey: 'app.success' },
        { key: 'result.error', labelKey: 'app.error' },
      ],
    },
    {
      id: 'exception',
      access: 'admin',
      deniedDestination: 'home',
      labelKey: 'app.exception',
      contentLayout: 'fill',
      icon: 'circle-info',
      breadcrumb: false,
      routes: [
        { key: 'exception.403', labelKey: 'app.exception403' },
        { key: 'exception.404', labelKey: 'app.exception404' },
        { key: 'exception.500', labelKey: 'app.exception500' },
      ],
    },
    {
      id: 'profile',
      labelKey: 'app.profile',
      icon: 'user',
      routes: [{ key: 'profile', labelKey: 'app.profile' }],
    },
  ],
  fallback: {
    key: 'not-found',
    labelKey: 'app.pageNotFound',
    menu: false,
    breadcrumb: false,
    contentLayout: 'fill',
  },
} as const satisfies ProRouteConfig;

export type ProRouteKey =
  (typeof proRouteConfig.groups)[number]['routes'][number]['key'] | typeof proRouteConfig.login;
