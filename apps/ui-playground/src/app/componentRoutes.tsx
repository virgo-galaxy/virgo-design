import type { ComponentType } from 'react';

import { BreadcrumbPage } from '../pages/breadcrumb/BreadcrumbPage';
import { ButtonPage } from '../pages/button/ButtonPage';
import { CheckboxPage } from '../pages/checkbox/CheckboxPage';
import { InputPage } from '../pages/input/InputPage';
import { LayoutPage } from '../pages/layout/LayoutPage';
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
    version: 'V1',
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
    version: 'V1',
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
    version: 'V1',
    Component: LayoutPage,
  },
  {
    id: 'tabs',
    group: 'navigation',
    index: '04',
    name: 'Tabs',
    category: 'Navigation',
    path: '/components/tabs',
    status: 'stable',
    version: 'V1',
    Component: TabsPage,
  },
  {
    id: 'breadcrumb',
    group: 'navigation',
    index: '05',
    name: 'Breadcrumb',
    category: 'Navigation',
    path: '/components/breadcrumb',
    status: 'stable',
    version: 'V1',
    Component: BreadcrumbPage,
  },
  {
    id: 'input',
    group: 'data-entry',
    index: '06',
    name: 'Input',
    category: 'Forms',
    path: '/components/input',
    status: 'stable',
    version: 'V1',
    Component: InputPage,
  },
  {
    id: 'select',
    group: 'data-entry',
    index: '07',
    name: 'Select',
    category: 'Forms',
    path: '/components/select',
    status: 'stable',
    version: 'V1',
    Component: SelectPage,
  },
  {
    id: 'checkbox',
    group: 'data-entry',
    index: '08',
    name: 'Checkbox',
    category: 'Forms',
    path: '/components/checkbox',
    status: 'stable',
    version: 'V1',
    Component: CheckboxPage,
  },
  {
    id: 'radio',
    group: 'data-entry',
    index: '09',
    name: 'Radio',
    category: 'Forms',
    path: '/components/radio',
    status: 'stable',
    version: 'V1',
    Component: RadioPage,
  },
  {
    id: 'switch',
    group: 'data-entry',
    index: '10',
    name: 'Switch',
    category: 'Forms',
    path: '/components/switch',
    status: 'stable',
    version: 'V1',
    Component: SwitchPage,
  },
  {
    id: 'segmented-control',
    group: 'data-entry',
    index: '11',
    name: 'Segmented Control',
    category: 'Forms',
    path: '/components/segmented-control',
    status: 'stable',
    version: 'V1',
    Component: SegmentedControlPage,
  },
] as const satisfies ReadonlyArray<ComponentRoute>;
