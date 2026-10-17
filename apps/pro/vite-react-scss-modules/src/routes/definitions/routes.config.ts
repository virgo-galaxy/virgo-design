import type { ParseKeys } from 'i18next';

import type { ProRouteIcon } from './icons';

export const routePaths = {
  root: '/',
  workplace: '/dashboard/workplace',
  analytics: '/visualization/analytics',
  tasks: '/work/tasks',
  projects: '/work/projects',
  'task-cards': '/work/task-cards',
  'task-create': '/work/tasks/new',
  'task-details': '/work/tasks/:id',
  'task-edit': '/work/tasks/:id/edit',
  'project-detail': '/work/projects/:projectId',
  'project-handoff': '/work/projects/:projectId/handoff',
  success: '/result/success',
  error: '/result/error',
  'exception-403': '/exception/403',
  'exception-404': '/exception/404',
  'exception-500': '/exception/500',
  profile: '/profile',
  'not-found': '*',
  login: '/login',
} as const;

export type RouteAccess = 'session' | 'manage' | 'admin';
export type ProContentLayout = 'flow' | 'fill';

export type ProPageKey = Exclude<keyof typeof routePaths, 'login' | 'root'>;

export interface ProRouteDisplay {
  sidebar: boolean;
  breadcrumb: boolean;
}

export interface ProPageRoute {
  id: string;
  path: `/${string}` | '*';
  labelKey: ParseKeys;
  icon?: ProRouteIcon;
  page: ProPageKey;
  activePage?: ProPageKey;
  display?: Partial<ProRouteDisplay>;
  access?: RouteAccess;
  deniedDestination?: 'home' | 'forbidden';
  contentLayout?: ProContentLayout;
}

export interface ProRouteGroup {
  id: string;
  labelKey: ParseKeys;
  icon: ProRouteIcon;
  display?: Partial<ProRouteDisplay>;
  access?: RouteAccess;
  deniedDestination?: 'home' | 'forbidden';
  contentLayout?: ProContentLayout;
  routes: readonly ProPageRoute[];
}

export interface ProRouteConfig {
  homePath: `/${string}`;
  defaults: ProRouteDisplay;
  loginPath: `/${string}`;
  redirects: readonly { path: `/${string}`; to: `/${string}` }[];
  groups: readonly ProRouteGroup[];
  fallback: ProPageRoute;
}

export const proRouteConfig = {
  homePath: routePaths.workplace,
  loginPath: routePaths.login,
  defaults: {
    sidebar: true,
    breadcrumb: true,
  },
  redirects: [{ path: routePaths.root, to: routePaths.workplace }],
  groups: [
    {
      id: 'dashboard',
      labelKey: 'app.dashboard',
      icon: 'gauge',
      routes: [
        {
          id: 'workplace',
          path: routePaths['workplace'],
          labelKey: 'app.workplace',
          page: 'workplace',
        },
      ],
    },
    {
      id: 'visualization',
      labelKey: 'app.visualization',
      icon: 'chart-line',
      routes: [
        {
          id: 'analytics',
          path: routePaths['analytics'],
          labelKey: 'app.analytics',
          page: 'analytics',
        },
      ],
    },
    {
      id: 'work',
      labelKey: 'app.work',
      icon: 'briefcase',
      routes: [
        { id: 'tasks', path: routePaths['tasks'], labelKey: 'app.tasks', page: 'tasks' },
        {
          id: 'projects',
          path: routePaths['projects'],
          labelKey: 'app.projects',
          page: 'projects',
        },
        {
          id: 'task-cards',
          path: routePaths['task-cards'],
          labelKey: 'app.tasks',
          page: 'task-cards',
          activePage: 'tasks',
          display: { sidebar: false },
        },
        {
          id: 'task-create',
          path: routePaths['task-create'],
          labelKey: 'tasks.newTask',
          page: 'task-create',
          activePage: 'tasks',
          access: 'manage',
          display: { sidebar: false },
        },
        {
          id: 'task-details',
          path: routePaths['task-details'],
          labelKey: 'tasks.taskDetails',
          page: 'task-details',
          activePage: 'tasks',
          display: { sidebar: false },
        },
        {
          id: 'task-edit',
          path: routePaths['task-edit'],
          labelKey: 'tasks.editTask',
          page: 'task-edit',
          activePage: 'tasks',
          access: 'manage',
          display: { sidebar: false },
        },
        {
          id: 'project-detail',
          path: routePaths['project-detail'],
          labelKey: 'tasks.workspace.projectDetails',
          page: 'project-detail',
          activePage: 'projects',
          display: { sidebar: false },
        },
        {
          id: 'project-handoff',
          path: routePaths['project-handoff'],
          labelKey: 'tasks.workspace.handoff',
          page: 'project-handoff',
          activePage: 'projects',
          access: 'manage',
          display: { sidebar: false },
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
      display: { breadcrumb: false },
      routes: [
        { id: 'success', path: routePaths['success'], labelKey: 'app.success', page: 'success' },
        { id: 'error', path: routePaths['error'], labelKey: 'app.error', page: 'error' },
      ],
    },
    {
      id: 'exception',
      access: 'admin',
      deniedDestination: 'home',
      labelKey: 'app.exception',
      contentLayout: 'fill',
      icon: 'circle-info',
      display: { breadcrumb: false },
      routes: [
        {
          id: 'exception-403',
          path: routePaths['exception-403'],
          labelKey: 'app.exception403',
          page: 'exception-403',
        },
        {
          id: 'exception-404',
          path: routePaths['exception-404'],
          labelKey: 'app.exception404',
          page: 'exception-404',
        },
        {
          id: 'exception-500',
          path: routePaths['exception-500'],
          labelKey: 'app.exception500',
          page: 'exception-500',
        },
      ],
    },
    {
      id: 'profile',
      labelKey: 'app.profile',
      icon: 'user',
      routes: [
        { id: 'profile', path: routePaths['profile'], labelKey: 'app.profile', page: 'profile' },
      ],
    },
  ],
  fallback: {
    id: 'not-found',
    path: routePaths['not-found'],
    labelKey: 'app.pageNotFound',
    page: 'not-found',
    display: { sidebar: false, breadcrumb: false },
    contentLayout: 'fill',
  },
} as const satisfies ProRouteConfig;
