import { iconComponents } from '@virgo-design/icons/registry';

import { proRouting } from './routing';

/** The public registry resolves serializable icon IDs into optional React icons. */
export const navigationGroups = proRouting.groups.map((group) => ({
  ...group,
  icon: iconComponents[group.icon],
  pages: group.pages.map((page) => ({
    ...page,
    icon: page.icon ? iconComponents[page.icon] : undefined,
  })),
}));

export const navigationPages = navigationGroups.flatMap((group) =>
  group.pages.map((page) => ({ ...page, group: group.label })),
);
