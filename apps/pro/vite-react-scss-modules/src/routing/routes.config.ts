/**
 * Pro 路由配置：App、Sidebar 与 Breadcrumb 共用这一份配置。
 *
 * 路由、侧栏和面包屑共用这份业务配置；公共组件只负责展示与交互。
 * icon 和 page 都是字符串，由 Pro 的图标表、页面表映射到组件，配置可转为 JSON。
 *
 * display 的继承顺序：页面 > 分组 > defaults。
 * sidebar 与 breadcrumb 独立：不在侧栏中显示的页面，也可以有面包屑。
 * 最终面包屑显隐 = Settings.showBreadcrumb && 路由配置允许显示。
 * 因此 Result、Exception 不会被全局面包屑开关重新打开。
 */

import type { IconId } from '@virgo-design/icons/metadata';
import type { ParseKeys } from 'i18next';
export const routePaths = {
  root: '/',
  workplace: '/dashboard/workplace',
  analytics: '/dashboard/analytics',
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
  /** 是否出现在侧栏；false 只移除导航入口，不禁用路由访问。 */
  sidebar: boolean;
  /** 是否允许显示面包屑；仍受 Settings 的全局开关控制。 */
  breadcrumb: boolean;
}

export interface ProPageRoute {
  id: string;
  /** 支持参数路径和通配符；这类页面由业务数据生成入口，不放入固定菜单或页面搜索。 */
  path: `/${string}` | '*';
  /** 用于菜单、面包屑和浏览器标题。 */
  labelKey: ParseKeys;
  /** 可选的子路由图标；使用公共图标库的 IconId。不填写则不显示，不继承分组图标。 */
  icon?: IconId;
  /** 对应 Pro 页面表中的组件，不在配置中放 JSX。 */
  page: ProPageKey;
  activePage?: ProPageKey;
  /** 仅填写需要覆盖分组或默认值的字段。 */
  display?: Partial<ProRouteDisplay>;
  access?: RouteAccess;
  deniedDestination?: 'home' | 'forbidden';
  /** 内容布局：flow 为自然高度，fill 填满可用内容区域。页面覆盖分组，默认 flow。 */
  contentLayout?: ProContentLayout;
}

export interface ProRouteGroup {
  id: string;
  labelKey: ParseKeys;
  icon: IconId;
  /** 分组显示默认值，子页面可逐项覆盖；没有可见子项时不显示该侧栏分组。 */
  display?: Partial<ProRouteDisplay>;
  access?: RouteAccess;
  deniedDestination?: 'home' | 'forbidden';
  /** 子页面的默认内容布局。 */
  contentLayout?: ProContentLayout;
  routes: readonly ProPageRoute[];
}

export interface ProRouteConfig {
  homePath: `/${string}`;
  defaults: ProRouteDisplay;
  loginPath: `/${string}`;
  redirects: readonly (
    | { path: `/${string}`; to: `/${string}` }
    | { path: `/${string}`; legacy: 'tasks' | 'project' | 'handoff' }
  )[];
  groups: readonly ProRouteGroup[];
  /** 未匹配地址的页面不放入侧栏。 */
  fallback: ProPageRoute;
}

export const proRouteConfig = {
  homePath: routePaths.workplace,
  loginPath: routePaths.login,
  defaults: {
    sidebar: true,
    breadcrumb: true,
  },
  redirects: [
    { path: routePaths.root, to: routePaths.workplace },
    { path: '/form/basic', to: routePaths['task-create'] },
    { path: '/data/list', legacy: 'tasks' },
    { path: '/data/detail', legacy: 'project' },
    { path: '/form/step', legacy: 'handoff' },
  ],
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
