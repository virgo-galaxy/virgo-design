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

export type ProContentLayout = 'flow' | 'fill';

export type ProPageKey =
  | 'workplace'
  | 'analytics'
  | 'tasks'
  | 'projects'
  | 'data-list'
  | 'detail'
  | 'basic-form'
  | 'step-form'
  | 'success'
  | 'error'
  | 'exception-403'
  | 'exception-404'
  | 'exception-500'
  | 'profile'
  | 'not-found';

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
  label: string;
  /** 可选的子路由图标；使用公共图标库的 IconId。不填写则不显示，不继承分组图标。 */
  icon?: IconId;
  /** 对应 Pro 页面表中的组件，不在配置中放 JSX。 */
  page: ProPageKey;
  /** 仅填写需要覆盖分组或默认值的字段。 */
  display?: Partial<ProRouteDisplay>;
  /** 内容布局：flow 为自然高度，fill 填满可用内容区域。页面覆盖分组，默认 flow。 */
  contentLayout?: ProContentLayout;
}

export interface ProRouteGroup {
  id: string;
  label: string;
  icon: IconId;
  /** 分组显示默认值，子页面可逐项覆盖；没有可见子项时不显示该侧栏分组。 */
  display?: Partial<ProRouteDisplay>;
  /** 子页面的默认内容布局。 */
  contentLayout?: ProContentLayout;
  routes: readonly ProPageRoute[];
}

export interface ProRouteConfig {
  homePath: `/${string}`;
  defaults: ProRouteDisplay;
  redirects: readonly { path: `/${string}`; to: `/${string}` }[];
  groups: readonly ProRouteGroup[];
  /** 未匹配地址的页面不放入侧栏。 */
  fallback: ProPageRoute;
}

export const proRouteConfig = {
  homePath: '/dashboard/workplace',
  defaults: {
    sidebar: true,
    breadcrumb: true,
  },
  redirects: [{ path: '/', to: '/dashboard/workplace' }],
  groups: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'gauge',
      routes: [
        {
          id: 'workplace',
          path: '/dashboard/workplace',
          label: 'Workplace',
          page: 'workplace',
        },
      ],
    },
    {
      id: 'visualization',
      label: 'Data Visualization',
      icon: 'chart-line',
      routes: [
        {
          id: 'analytics',
          path: '/dashboard/analytics',
          label: 'Analytics',
          page: 'analytics',
        },
      ],
    },
    {
      id: 'work',
      label: 'Work',
      icon: 'briefcase',
      routes: [
        { id: 'tasks', path: '/work/tasks', label: 'Tasks', page: 'tasks' },
        { id: 'projects', path: '/work/projects', label: 'Projects', page: 'projects' },
      ],
    },
    {
      id: 'data',
      label: 'Data',
      icon: 'database',
      routes: [
        { id: 'data-list', path: '/data/list', label: 'Data List', page: 'data-list' },
        { id: 'detail', path: '/data/detail', label: 'Detail', page: 'detail' },
      ],
    },
    {
      id: 'form',
      label: 'Form',
      icon: 'form',
      routes: [
        { id: 'basic-form', path: '/form/basic', label: 'Basic Form', page: 'basic-form' },
        { id: 'step-form', path: '/form/step', label: 'Step Form', page: 'step-form' },
      ],
    },
    {
      id: 'result',
      label: 'Result',
      icon: 'receipt',
      display: { breadcrumb: false },
      routes: [
        { id: 'success', path: '/result/success', label: 'Success', page: 'success' },
        { id: 'error', path: '/result/error', label: 'Error', page: 'error' },
      ],
    },
    {
      id: 'exception',
      label: 'Exception',
      contentLayout: 'fill',
      icon: 'circle-info',
      display: { breadcrumb: false },
      routes: [
        { id: 'exception-403', path: '/exception/403', label: '403', page: 'exception-403' },
        { id: 'exception-404', path: '/exception/404', label: '404', page: 'exception-404' },
        { id: 'exception-500', path: '/exception/500', label: '500', page: 'exception-500' },
      ],
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'user',
      routes: [{ id: 'profile', path: '/profile', label: 'Profile', page: 'profile' }],
    },
  ],
  fallback: {
    id: 'not-found',
    path: '*',
    label: 'Page not found',
    page: 'not-found',
    display: { sidebar: false, breadcrumb: false },
    contentLayout: 'fill',
  },
} as const satisfies ProRouteConfig;
