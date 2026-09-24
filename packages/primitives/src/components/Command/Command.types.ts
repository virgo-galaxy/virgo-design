import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export type CommandFilter = (value: string, search: string, keywords: readonly string[]) => boolean;

export interface CommandProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  search?: string;
  defaultSearch?: string;
  onSearchChange?: (search: string) => void;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Disable built-in filtering while retaining the collection and keyboard protocol. */
  shouldFilter?: boolean;
  filter?: CommandFilter;
}

export type CommandRootProps = CommandProps;

export type CommandInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue'
>;

export type CommandListProps = HTMLAttributes<HTMLDivElement>;

export type CommandEmptyProps = HTMLAttributes<HTMLDivElement>;

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
}

export interface CommandItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  value: string;
  keywords?: readonly string[];
  disabled?: boolean;
  textValue?: string;
  onSelect?: (value: string) => void;
}

export type CommandSeparatorProps = HTMLAttributes<HTMLDivElement>;
