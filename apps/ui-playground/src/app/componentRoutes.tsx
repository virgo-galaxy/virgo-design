import type { ComponentType } from 'react';

import { ButtonPage } from '../pages/button/ButtonPage';
import { InputPage } from '../pages/input/InputPage';
import { SelectPage } from '../pages/select/SelectPage';

export type ComponentRoute = {
  id: 'button' | 'input' | 'select';
  index: string;
  name: string;
  category: string;
  path: string;
  status: string;
  Component: ComponentType;
};

export const componentRoutes = [
  {
    id: 'button',
    index: '01',
    name: 'Button',
    category: 'Actions',
    path: '/components/button',
    status: 'V1',
    Component: ButtonPage,
  },
  {
    id: 'input',
    index: '02',
    name: 'Input',
    category: 'Forms',
    path: '/components/input',
    status: 'REVIEW',
    Component: InputPage,
  },
  {
    id: 'select',
    index: '03',
    name: 'Select',
    category: 'Forms',
    path: '/components/select',
    status: 'REVIEW',
    Component: SelectPage,
  },
] as const satisfies ReadonlyArray<ComponentRoute>;
