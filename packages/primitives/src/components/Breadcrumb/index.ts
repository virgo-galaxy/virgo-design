import { Breadcrumb as BreadcrumbRoot, BreadcrumbItem } from './Breadcrumb';

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
});
export type {
  BreadcrumbCurrentItemProps,
  BreadcrumbItemProps,
  BreadcrumbLinkItemProps,
  BreadcrumbProps,
} from './Breadcrumb.types';
