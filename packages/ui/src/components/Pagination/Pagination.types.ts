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
  /** Selection suffix appended to the total when selectedCount is positive. */
  selected?: (count: number) => ReactNode;
  total: (total: number, range: readonly [number, number]) => ReactNode;
}

export interface PaginationProps extends Omit<PrimitivePaginationProps, 'children'> {
  /** Density of page items, page-size selection and quick jump. @default 'small' */
  size?: 'mini' | 'small' | 'medium' | 'large' | undefined;
  /** Alignment within the available width. @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** Enables total, page size and quick jump together. Individual flags take precedence. */
  showAll?: boolean;
  /** Selected items across pages; appended to the visible total. Omitted or zero hides the suffix. @default 0 */
  selectedCount?: number;
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
