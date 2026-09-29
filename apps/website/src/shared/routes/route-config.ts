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
  componentExample: '/examples/:exampleId',
  primitives: '/primitives',
  primitiveDetail: '/primitives/:slug',
} as const;

export const PRIMARY_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.foundations, label: 'app.navigation.foundations' },
  { path: ROUTE_PATHS.tokens, label: 'app.navigation.tokens' },
  { path: ROUTE_PATHS.primitives, label: 'app.navigation.primitives' },
  { path: ROUTE_PATHS.components, label: 'app.navigation.components' },
] as const;

export const FOUNDATION_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.foundationColors, label: 'foundations.navigation.colors' },
  { path: ROUTE_PATHS.foundationTypography, label: 'foundations.navigation.typography' },
  { path: ROUTE_PATHS.foundationLayout, label: 'foundations.navigation.layout' },
  { path: ROUTE_PATHS.foundationShapeDepth, label: 'foundations.navigation.shapeDepth' },
  { path: ROUTE_PATHS.foundationMotion, label: 'foundations.navigation.motion' },
  { path: ROUTE_PATHS.foundationIcons, label: 'foundations.navigation.icons' },
] as const;

export const TOKEN_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.tokenColors, label: 'tokens.navigation.colors' },
  { path: ROUTE_PATHS.tokenTypography, label: 'tokens.navigation.typography' },
] as const;
