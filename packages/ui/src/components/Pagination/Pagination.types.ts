import type { PaginationProps as PrimitivePaginationProps } from '@virgo-design/primitives';
import type { ReactNode } from 'react';

export interface PaginationLabels {
  navigation: string;
  previous: string;
  next: string;
  page: (page: number) => string;
  jumpBackward: string;
  jumpForward: string;
  pageSize: string;
  itemsPerPage: (pageSize: number) => string;
  jumpTo: string;
  pageUnit: string;
  total: (total: number, range: readonly [number, number]) => ReactNode;
}

export interface PaginationProps extends Omit<PrimitivePaginationProps, 'children'> {
  /** Alignment within the available width. @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** Enables total, page size and quick jump together. Individual flags take precedence. */
  showAll?: boolean;
  showTotal?: boolean | ((total: number, range: readonly [number, number]) => ReactNode);
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  /** Positive integer choices; the current page size is always included. */
  pageSizeOptions?: readonly number[];
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  /** Visible copy and accessible names; defaults to English. */
  labels?: Partial<PaginationLabels>;
}
