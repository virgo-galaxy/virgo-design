// Public route entry: each page keeps its existing lazy loading boundary.
export const loadAnalyticsPage = () =>
  import('../pages/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage }));
