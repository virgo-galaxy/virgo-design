import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  children: ReactNode;

  /** Controlled active tab value. */
  value?: string | undefined;

  /** Initial active tab value for uncontrolled usage. */
  defaultValue?: string | undefined;

  /** Called whenever the active tab changes. */
  onValueChange?: ((value: string) => void) | undefined;
}

export type TabListProps = HTMLAttributes<HTMLDivElement>;

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Value that associates this tab with its panel. */
  value: string;
}

export interface TabPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  /** Value of the tab that controls this panel. */
  value: string;
}
