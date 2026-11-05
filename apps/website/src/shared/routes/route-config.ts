export const ROUTE_PATHS = {
  root: '/',
  colors: '/colors',
  fonts: '/fonts',
  tokens: '/tokens',
  tokenFoundationTypography: '/tokens/foundations/typography',
  tokenFoundationLayout: '/tokens/foundations/layout',
  tokenFoundationShapeDepth: '/tokens/foundations/shape-depth',
  tokenFoundationMotion: '/tokens/foundations/motion',
  tokenColors: '/tokens/semantic/colors',
  tokenTypography: '/tokens/semantic/typography',
  charts: '/charts',
  themes: '/themes',
  icons: '/icons',
  components: '/components',
  componentRoutes: '/components/*',
  componentExample: '/examples/:exampleId',
  primitives: '/primitives',
  primitiveDetail: '/primitives/:slug',
} as const;

export const DESIGN_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.colors, label: 'app.navigation.colors' },
  { path: ROUTE_PATHS.fonts, label: 'app.navigation.fonts' },
  { path: ROUTE_PATHS.tokens, label: 'app.navigation.tokens' },
  { path: ROUTE_PATHS.themes, label: 'app.navigation.themes' },
  { path: ROUTE_PATHS.icons, label: 'app.navigation.icons' },
] as const;

export const DEVELOPMENT_NAVIGATION_ITEMS = [
  { path: ROUTE_PATHS.primitives, label: 'app.navigation.primitives' },
  { path: ROUTE_PATHS.components, label: 'app.navigation.components' },
  { path: ROUTE_PATHS.charts, label: 'app.navigation.charts' },
] as const;

export function getPrimaryNavigationItems(pathname: string) {
  const isDevelopment = DEVELOPMENT_NAVIGATION_ITEMS.some(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  );
  return isDevelopment ? DEVELOPMENT_NAVIGATION_ITEMS : DESIGN_NAVIGATION_ITEMS;
}
