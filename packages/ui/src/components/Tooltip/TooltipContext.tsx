import { createContext, useContext, useMemo } from 'react';

import type { TooltipProviderProps } from './Tooltip.types';

type Presentation = { [Key in 'size' | 'arrow']: TooltipProviderProps[Key] };
const TooltipPresentationContext = createContext<Presentation>({
  size: undefined,
  arrow: undefined,
});

export function useTooltipPresentation() {
  return useContext(TooltipPresentationContext);
}

export function TooltipProvider({ children, size, arrow }: TooltipProviderProps) {
  const parent = useTooltipPresentation();
  const value = useMemo(
    () => ({ size: size ?? parent.size, arrow: arrow ?? parent.arrow }),
    [size, arrow, parent.size, parent.arrow],
  );
  return (
    <TooltipPresentationContext.Provider value={value}>
      {children}
    </TooltipPresentationContext.Provider>
  );
}
