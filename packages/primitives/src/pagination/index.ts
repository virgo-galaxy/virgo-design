import { Pagination as PaginationRoot, PaginationItem } from './Pagination';

export const Pagination = Object.assign(PaginationRoot, { Item: PaginationItem });
export type {
  PaginationItem,
  PaginationItemProps,
  PaginationProps,
  PaginationState,
} from './Pagination.types';
