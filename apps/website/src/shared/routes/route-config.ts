export const ROUTE_PATHS = {
  root: '/',
  foundations: '/foundations',
  foundationColors: '/foundations/colors',
  foundationTypography: '/foundations/typography',
  foundationLayout: '/foundations/layout',
  foundationShapeDepth: '/foundations/shape-depth',
  foundationMotion: '/foundations/motion',
  foundationIcons: '/foundations/icons',
  tokens: '/tokens',
  tokenColors: '/tokens/colors',
  tokenTypography: '/tokens/typography',
  components: '/components',
  componentRoutes: '/components/*',
  primitives: '/primitives',
  primitiveDetail: '/primitives/:slug',
} as const;

export const PRIMARY_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.foundations, label: 'navigation.foundations' },
  { path: ROUTE_PATHS.tokens, label: 'navigation.tokens' },
  { path: ROUTE_PATHS.primitives, label: 'navigation.primitives' },
  { path: ROUTE_PATHS.components, label: 'navigation.components' },
] as const;

export const FOUNDATION_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.foundationColors, label: 'foundationNavigation.colors' },
  { path: ROUTE_PATHS.foundationTypography, label: 'foundationNavigation.typography' },
  { path: ROUTE_PATHS.foundationLayout, label: 'foundationNavigation.layout' },
  { path: ROUTE_PATHS.foundationShapeDepth, label: 'foundationNavigation.shapeDepth' },
  { path: ROUTE_PATHS.foundationMotion, label: 'foundationNavigation.motion' },
  { path: ROUTE_PATHS.foundationIcons, label: 'foundationNavigation.icons' },
] as const;

export const TOKEN_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.tokenColors, label: 'tokenNavigation.colors' },
  { path: ROUTE_PATHS.tokenTypography, label: 'tokenNavigation.typography' },
] as const;
