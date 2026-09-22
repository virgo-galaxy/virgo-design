import { createContext, useContext } from 'react';

export interface CheckboxGroupContextValue {
  disabled: boolean;
  name: string | undefined;
  values: readonly string[];
  toggleValue: (value: string, checked: boolean) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext() {
  return useContext(CheckboxGroupContext);
}
