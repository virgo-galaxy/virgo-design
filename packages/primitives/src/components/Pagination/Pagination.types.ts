import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type PaginationItem = number | 'start-ellipsis' | 'end-ellipsis';

export interface PaginationState {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  range: readonly [number, number];
  items: readonly PaginationItem[];
  disabled: boolean;
  setPage: (page: number) => void;
  /** Changes the page size and returns to page one in one change notification. */
  setPageSize: (pageSize: number) => void;
}

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'onChange'
> {
  total: number;
  page?: number | undefined;
  defaultPage?: number | undefined;
  pageSize?: number | undefined;
  defaultPageSize?: number | undefined;
  onChange?: ((page: number, pageSize: number) => void) | undefined;
  disabled?: boolean | undefined;
  children: ReactNode | ((state: PaginationState) => ReactNode);
}

export interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  page: number;
  /** Only numbered items represent the current page, not previous/next or jump actions. */
  current?: boolean | undefined;
}
