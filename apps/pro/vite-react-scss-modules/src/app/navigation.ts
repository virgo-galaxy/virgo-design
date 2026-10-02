import {
  CircleCheckIcon,
  LayersIcon,
  LayoutIcon,
  TypeIcon,
  UserIcon,
  WidgetsIcon,
} from '@virgo-design/icons';
import type { ComponentType } from 'react';

interface NavigationPage {
  label: string;
  path: string;
}

interface NavigationGroup {
  label: string;
  icon: ComponentType;
  pages: NavigationPage[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Dashboard',
    icon: WidgetsIcon,
    pages: [
      { label: 'Workplace', path: '/dashboard/workplace' },
      { label: 'Analytics', path: '/dashboard/analytics' },
    ],
  },
  {
    label: 'Work',
    icon: LayersIcon,
    pages: [
      { label: 'Tasks', path: '/work/tasks' },
      { label: 'Projects', path: '/work/projects' },
    ],
  },
  {
    label: 'Data',
    icon: LayoutIcon,
    pages: [
      { label: 'Search Table', path: '/data/search-table' },
      { label: 'Data List', path: '/data/list' },
      { label: 'Detail', path: '/data/detail' },
    ],
  },
  {
    label: 'Form',
    icon: TypeIcon,
    pages: [
      { label: 'Basic Form', path: '/form/basic' },
      { label: 'Step Form', path: '/form/step' },
    ],
  },
  {
    label: 'Result',
    icon: CircleCheckIcon,
    pages: [
      { label: 'Success', path: '/result/success' },
      { label: 'Error', path: '/result/error' },
    ],
  },
  { label: 'Profile', icon: UserIcon, pages: [{ label: 'Profile', path: '/profile' }] },
];

export const navigationPages = navigationGroups.flatMap((group) =>
  group.pages.map((page) => ({ ...page, group: group.label })),
);
