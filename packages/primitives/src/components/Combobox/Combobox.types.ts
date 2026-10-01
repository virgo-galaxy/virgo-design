import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
export type ComboboxFilter = (text: string, query: string, keywords: readonly string[]) => boolean;
export interface ComboboxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Selected option value. An empty string represents no selection. */
  value?: string | undefined;
  /** Initial selected value. @default '' */
  defaultValue?: string | undefined;
  /** Called on option selection or explicit clear, not on typing. */
  onValueChange?: ((value: string) => void) | undefined;
  /** Current input text, independent of the selected value. */
  inputValue?: string | undefined;
  /** Initial input text for autocomplete usage. */
  defaultInputValue?: string | undefined;
  /** Called when input text changes or an option fills the input. */
  onInputValueChange?: ((value: string) => void) | undefined;
  /** Controlled popup state. */
  open?: boolean | undefined;
  /** Initial popup state. @default false */
  defaultOpen?: boolean | undefined;
  /** Called when the popup is requested to open or close. */
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** Disables input, selection and clear. */
  disabled?: boolean | undefined;
  /** Keeps the input focusable while preventing edits and selection. */
  readOnly?: boolean | undefined;
  /** Name of the hidden selected-value form control. */
  name?: string | undefined;
  /** Disable client filtering for consumer-owned or remote result lists. @default true */
  shouldFilter?: boolean | undefined;
  /** Custom synchronous filter; defaults to case-insensitive substring matching. */
  filter?: ComboboxFilter | undefined;
}
export type ComboboxInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue'
>;
export interface ComboboxContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Render in the document-body portal. @default true */
  portal?: boolean | undefined;
  /** Preferred logical popup placement; collision handling may flip or shift it. @default 'bottomStart' */
  placement?: 'bottomStart' | 'bottomEnd' | 'topStart' | 'topEnd' | undefined;
  /** Gap between input and popup in pixels. @default 4 */
  offset?: number | undefined;
}
export interface ComboboxOptionProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique, nonempty selected value. */
  value: string;
  /** Plain text used for filtering and filling the input. */
  textValue: string;
  /** Additional search terms. */
  keywords?: readonly string[] | undefined;
  /** Visible but not selectable or highlightable. */
  disabled?: boolean | undefined;
}
export type ComboboxEmptyProps = HTMLAttributes<HTMLDivElement>;
export interface ComboboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible group heading and accessible name. */
  label: ReactNode;
}
export type ComboboxClearProps = ButtonHTMLAttributes<HTMLButtonElement>;
