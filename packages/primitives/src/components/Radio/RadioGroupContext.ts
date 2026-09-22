import { createContext, useContext } from 'react';

export type RadioGroupContextValue = {
  disabled: boolean;
  name: string;
  value: string | undefined;
  selectValue: (value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
