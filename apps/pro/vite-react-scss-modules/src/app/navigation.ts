import {
  ArrowRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  DashboardIcon,
  GaugeIcon,
  LayersIcon,
  LayoutIcon,
  SearchIcon,
  SettingsIcon,
  TypeIcon,
  UserIcon,
} from '@virgo-design/icons';
import type { ComponentType } from 'react';

interface NavigationPage {
  label: string;
  path: string;
  icon: ComponentType;
}

interface NavigationGroup {
  label: string;
  pages: NavigationPage[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Dashboard',
    pages: [
      { label: 'Workplace', path: '/dashboard/workplace', icon: DashboardIcon },
      { label: 'Analytics', path: '/dashboard/analytics', icon: GaugeIcon },
    ],
  },
  {
    label: 'Work',
    pages: [
      { label: 'Tasks', path: '/work/tasks', icon: CircleCheckIcon },
      { label: 'Projects', path: '/work/projects', icon: LayersIcon },
    ],
  },
  {
    label: 'Data',
    pages: [
      { label: 'Search Table', path: '/data/search-table', icon: SearchIcon },
      { label: 'Data List', path: '/data/list', icon: LayoutIcon },
      { label: 'Detail', path: '/data/detail', icon: TypeIcon },
    ],
  },
  {
    label: 'Form',
    pages: [
      { label: 'Basic Form', path: '/form/basic', icon: TypeIcon },
      { label: 'Step Form', path: '/form/step', icon: ArrowRightIcon },
    ],
  },
  {
    label: 'Result',
    pages: [
      { label: 'Success', path: '/result/success', icon: CircleCheckIcon },
      { label: 'Error', path: '/result/error', icon: CircleXIcon },
    ],
  },
  { label: 'Profile', pages: [{ label: 'Profile', path: '/profile', icon: UserIcon }] },
  { label: 'Settings', pages: [{ label: 'Settings', path: '/settings', icon: SettingsIcon }] },
];

export const navigationPages = navigationGroups.flatMap((group) =>
  group.pages.map((page) => ({ ...page, group: group.label })),
);
