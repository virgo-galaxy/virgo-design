import { createContext } from 'react';

import type { ButtonSize } from '../../components/Button';
export const MenuSizeContext = createContext<ButtonSize>('medium');
export const menuClasses = (...values: (string | undefined | false)[]) =>
  values.filter(Boolean).join(' ');
