import type { ComponentType } from 'react';

import { BreadcrumbPage } from '../pages/breadcrumb/BreadcrumbPage';
import { ButtonPage } from '../pages/button/ButtonPage';
import { CheckboxPage } from '../pages/checkbox/CheckboxPage';
import { DropdownPage } from '../pages/dropdown/DropdownPage';
import { InputPage } from '../pages/input/InputPage';
import { LayoutPage } from '../pages/layout/LayoutPage';
import { PaginationPage } from '../pages/pagination/PaginationPage';
import { RadioPage } from '../pages/radio/RadioPage';
import { SegmentedControlPage } from '../pages/segmented-control/SegmentedControlPage';
import { SelectPage } from '../pages/select/SelectPage';
import { SurfacePage } from '../pages/surface/SurfacePage';
import { SwitchPage } from '../pages/switch/SwitchPage';
import { TabsPage } from '../pages/tabs/TabsPage';

export type ComponentGroupId = 'general' | 'layout' | 'navigation' | 'data-entry';

export const componentGroups = [
  {
    id: 'general',
    label: 'General',
  },
  {
    id: 'layout',
    label: 'Layout',
  },
  {
    id: 'navigation',
    label: 'Navigation',
  },
  {
    id: 'data-entry',
    label: 'Data Entry',
  },
] as const satisfies ReadonlyArray<{
  id: ComponentGroupId;
  label: string;
}>;

export type ComponentRoute = {
  group: ComponentGroupId;
  id:
    | 'button'
    | 'surface'
    | 'layout'
    | 'input'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'segmented-control'
    | 'tabs'
    | 'pagination'
    | 'dropdown'
    | 'breadcrumb';
  index: string;
  name: string;
  category: string;
  path: string;
  status: 'stable' | 'review';
  version: string;
  Component: ComponentType;
};

export const componentRoutes = [
  {
    id: 'button',
    group: 'general',
    index: '01',
    name: 'Button',
    category: 'Actions',
    path: '/components/button',
    status: 'stable',
    version: 'V1.0.0',
    Component: ButtonPage,
  },
  {
    id: 'surface',
    group: 'general',
    index: '02',
    name: 'Surface',
    category: 'Appearance',
    path: '/components/surface',
    status: 'stable',
    version: 'V1.0.0',
    Component: SurfacePage,
  },
  {
    id: 'layout',
    group: 'layout',
    index: '03',
    name: 'Layout',
    category: 'Structure',
    path: '/components/layout',
    status: 'stable',
    version: 'V1.0.0',
    Component: LayoutPage,
  },
  {
    id: 'breadcrumb',
    group: 'navigation',
    index: '04',
    name: 'Breadcrumb',
    category: 'Navigation',
    path: '/components/breadcrumb',
    status: 'stable',
    version: 'V1.0.0',
    Component: BreadcrumbPage,
  },
  {
    id: 'dropdown',
    group: 'navigation',
    index: '05',
    name: 'Dropdown',
    category: 'Navigation',
    path: '/components/dropdown',
    status: 'stable',
    version: 'V1.0.0',
    Component: DropdownPage,
  },
  {
    id: 'pagination',
    group: 'navigation',
    index: '06',
    name: 'Pagination',
    category: 'Navigation',
    path: '/components/pagination',
    status: 'stable',
    version: 'V1.0.0',
    Component: PaginationPage,
  },
  {
    id: 'tabs',
    group: 'navigation',
    index: '07',
    name: 'Tabs',
    category: 'Navigation',
    path: '/components/tabs',
    status: 'stable',
    version: 'V1.0.0',
    Component: TabsPage,
  },
  {
    id: 'checkbox',
    group: 'data-entry',
    index: '08',
    name: 'Checkbox',
    category: 'Forms',
    path: '/components/checkbox',
    status: 'stable',
    version: 'V1.0.0',
    Component: CheckboxPage,
  },
  {
    id: 'input',
    group: 'data-entry',
    index: '09',
    name: 'Input',
    category: 'Forms',
    path: '/components/input',
    status: 'stable',
    version: 'V1.0.0',
    Component: InputPage,
  },
  {
    id: 'radio',
    group: 'data-entry',
    index: '10',
    name: 'Radio',
    category: 'Forms',
    path: '/components/radio',
    status: 'stable',
    version: 'V1.0.0',
    Component: RadioPage,
  },
  {
    id: 'segmented-control',
    group: 'data-entry',
    index: '11',
    name: 'Segmented Control',
    category: 'Forms',
    path: '/components/segmented-control',
    status: 'stable',
    version: 'V1.0.0',
    Component: SegmentedControlPage,
  },
  {
    id: 'select',
    group: 'data-entry',
    index: '12',
    name: 'Select',
    category: 'Forms',
    path: '/components/select',
    status: 'stable',
    version: 'V1.0.0',
    Component: SelectPage,
  },
  {
    id: 'switch',
    group: 'data-entry',
    index: '13',
    name: 'Switch',
    category: 'Forms',
    path: '/components/switch',
    status: 'stable',
    version: 'V1.0.0',
    Component: SwitchPage,
  },
] as const satisfies ReadonlyArray<ComponentRoute>;
