// Public route entry: each page keeps its existing lazy loading boundary.
export const loadProfilePage = () =>
  import('../pages/ProfilePage').then((module) => ({ default: module.ProfilePage }));
