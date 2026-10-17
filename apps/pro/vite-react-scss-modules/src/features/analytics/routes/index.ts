export const loadAnalyticsPage = () =>
  import('../pages/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage }));
