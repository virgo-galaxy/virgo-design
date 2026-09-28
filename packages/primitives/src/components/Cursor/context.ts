import { createContext, useContext } from 'react';

import type { CursorPointer } from './Cursor.types';

export const CursorContext = createContext<CursorPointer | null>(null);
export function useCursorPointer() {
  return useContext(CursorContext);
}
