import {
  Table as TableRoot,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableViewport,
} from './Table';
import { TableFilter } from './TableFilter';
import { TableSearch } from './TableSearch';
import { TableSelection } from './TableSelection';
import { TableSortButton } from './TableSortButton';

export const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Viewport: TableViewport,
  SortButton: TableSortButton,
  Filter: TableFilter,
  Search: TableSearch,
  Selection: TableSelection,
});
export type {
  TableCaptionProps,
  TableCellProps,
  TableDensity,
  TableFilterOption,
  TableFilterProps,
  TableFixedCellProps,
  TableHeaderControls,
  TableHeaderSortControl,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSearchProps,
  TableSectionProps,
  TableSelectionAction,
  TableSelectionOption,
  TableSelectionProps,
  TableSortButtonProps,
  TableSortDirection,
  TableSortMode,
  TableViewportProps,
} from './Table.types';
