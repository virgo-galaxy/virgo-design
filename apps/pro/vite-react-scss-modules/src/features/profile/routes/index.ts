export const loadProfilePage = () =>
  import('../pages/ProfilePage').then((module) => ({ default: module.ProfilePage }));
