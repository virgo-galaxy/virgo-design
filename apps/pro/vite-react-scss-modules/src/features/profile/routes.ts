// Public route entry: each page keeps its existing lazy loading boundary.
export const loadProfilePage = () =>
  import('./ProfilePage').then((module) => ({ default: module.ProfilePage }));
