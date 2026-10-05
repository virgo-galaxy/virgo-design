import { createContext } from 'react';

import type { ButtonSize } from '../../components/Button/Button.types';

export const ActionGroupSizeContext = createContext<ButtonSize | undefined>(undefined);
