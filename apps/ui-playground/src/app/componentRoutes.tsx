import type { ComponentType } from 'react';

import { ButtonPage } from '../pages/button/ButtonPage';
import { CheckboxPage } from '../pages/checkbox/CheckboxPage';
import { InputPage } from '../pages/input/InputPage';
import { RadioPage } from '../pages/radio/RadioPage';
import { SelectPage } from '../pages/select/SelectPage';

export type ComponentGroupId = 'general' | 'data-entry';

export const componentGroups = [
  {
    id: 'general',
    label: 'General',
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
  id: 'button' | 'input' | 'select' | 'checkbox' | 'radio';
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
] as const satisfies ReadonlyArray<ComponentRoute>;
