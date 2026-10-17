import { proRouting, routeIcons } from '@/routes';

export const navigationGroups = proRouting.groups.map((group) => ({
  ...group,
  icon: routeIcons[group.icon],
  pages: group.pages.map((page) => ({
    ...page,
    icon: page.icon ? routeIcons[page.icon] : undefined,
  })),
}));
