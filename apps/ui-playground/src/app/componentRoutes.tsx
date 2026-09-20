import type { ComponentType } from 'react';

import { ButtonPage } from '../pages/button/ButtonPage';
import { CheckboxPage } from '../pages/checkbox/CheckboxPage';
import { InputPage } from '../pages/input/InputPage';
import { RadioPage } from '../pages/radio/RadioPage';
import { SegmentedControlPage } from '../pages/segmented-control/SegmentedControlPage';
import { SelectPage } from '../pages/select/SelectPage';
import { SwitchPage } from '../pages/switch/SwitchPage';
import { TabsPage } from '../pages/tabs/TabsPage';

export type ComponentGroupId = 'general' | 'navigation' | 'data-entry';

export const componentGroups = [
  {
    id: 'general',
    label: 'General',
  },
  {
    id: 'data-entry',
    label: 'Data Entry',
  },
  {
    id: 'navigation',
    label: 'Navigation',
  },
] as const satisfies ReadonlyArray<{
  id: ComponentGroupId;
  label: string;
}>;

export type ComponentRoute = {
  group: ComponentGroupId;
  id:
    'button' | 'input' | 'select' | 'checkbox' | 'radio' | 'switch' | 'segmented-control' | 'tabs';
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
    id: 'input',
    group: 'data-entry',
    index: '02',
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
    index: '03',
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
    index: '04',
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
    index: '05',
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
    index: '06',
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
    index: '07',
    name: 'Segmented Control',
    category: 'Forms',
    path: '/components/segmented-control',
    status: 'stable',
    version: 'V1',
    Component: SegmentedControlPage,
  },
  {
    id: 'tabs',
    group: 'navigation',
    index: '08',
    name: 'Tabs',
    category: 'Navigation',
    path: '/components/tabs',
    status: 'stable',
    version: 'V1',
    Component: TabsPage,
  },
] as const satisfies ReadonlyArray<ComponentRoute>;
