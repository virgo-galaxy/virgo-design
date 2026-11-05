import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageSkeleton } from '@/components/loading/PageSkeleton';
import { StandaloneExamplePage } from '@/pages/examples/StandaloneExamplePage';
import { ROUTE_PATHS } from '@/shared/routes/route-config';

import { RouteSkeleton } from './RouteSkeleton';

const ThemesPage = lazy(() =>
  import('@/pages/themes/ThemesPage').then((module) => ({ default: module.ThemesPage })),
);

const ChartsPage = lazy(() =>
  import('@/features/charts/ChartsPage').then((module) => ({ default: module.ChartsPage })),
);
const ColorsPage = lazy(() =>
  import('@/pages/colors/ColorsPage').then((module) => ({ default: module.ColorsPage })),
);
const TypographyPage = lazy(() =>
  import('@/pages/tokens/foundations/TypographyPage').then((module) => ({
    default: module.TypographyPage,
  })),
);
const LayoutPage = lazy(() =>
  import('@/pages/tokens/foundations/LayoutPage').then((module) => ({
    default: module.LayoutPage,
  })),
);
const ShapeDepthPage = lazy(() =>
  import('@/pages/tokens/foundations/ShapeDepthPage').then((module) => ({
    default: module.ShapeDepthPage,
  })),
);
const MotionPage = lazy(() =>
  import('@/pages/tokens/foundations/MotionPage').then((module) => ({
    default: module.MotionPage,
  })),
);
const TokensDocumentation = lazy(() =>
  import('@/pages/tokens/TokensDocumentation').then((module) => ({
    default: module.TokensDocumentation,
  })),
);
const TokensOverviewPage = lazy(() =>
  import('@/pages/tokens/TokensOverviewPage').then((module) => ({
    default: module.TokensOverviewPage,
  })),
);
const PrimitiveCataloguePage = lazy(() =>
  import('@/features/primitives/PrimitiveCataloguePage').then((module) => ({
    default: module.PrimitiveCataloguePage,
  })),
);
const PrimitiveDetailPage = lazy(() =>
  import('@/features/primitives/PrimitiveDetailPage').then((module) => ({
    default: module.PrimitiveDetailPage,
  })),
);
const ComponentRelationships = lazy(() =>
  import('../relationships/DocumentationRelationships').then((module) => ({
    default: module.ComponentRelationships,
  })),
);
const PrimitiveRelationships = lazy(() =>
  import('../relationships/DocumentationRelationships').then((module) => ({
    default: module.PrimitiveRelationships,
  })),
);
const TokensColorPage = lazy(() =>
  import('@/pages/tokens/TokensColorPage').then((module) => ({ default: module.TokensColorPage })),
);
const TokensTypographyPage = lazy(() =>
  import('@/pages/tokens/TokensTypographyPage').then((module) => ({
    default: module.TokensTypographyPage,
  })),
);
const ComponentsDocumentation = lazy(() =>
  import('@/features/components/ComponentsDocumentation').then((module) => ({
    default: module.ComponentsDocumentation,
  })),
);
const IconsPage = lazy(() =>
  import('@/pages/icons/IconsPage').then((module) => ({
    default: module.IconsPage,
  })),
);

function ComponentsDocumentationRoute() {
  return (
    <ComponentsDocumentation
      renderRelationships={(componentSlug) => (
        <Suspense fallback={<PageSkeleton variant="section" />}>
          <ComponentRelationships componentSlug={componentSlug} />
        </Suspense>
      )}
    />
  );
}

function PrimitiveDocumentation() {
  return (
    <PrimitiveDetailPage
      renderRelationships={(primitiveSlug) => (
        <Suspense fallback={<PageSkeleton variant="section" />}>
          <PrimitiveRelationships primitiveSlug={primitiveSlug} />
        </Suspense>
      )}
    />
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Routes>
        <Route path={ROUTE_PATHS.root} element={<Navigate to={ROUTE_PATHS.colors} replace />} />
        <Route path={ROUTE_PATHS.themes} element={<ThemesPage />} />
        <Route path={ROUTE_PATHS.charts} element={<ChartsPage />} />
        <Route path={ROUTE_PATHS.colors} element={<ColorsPage />} />
        <Route path={ROUTE_PATHS.icons} element={<IconsPage />} />
        <Route path={`${ROUTE_PATHS.icons}/:iconId`} element={<IconsPage />} />
        <Route path={ROUTE_PATHS.tokens} element={<TokensDocumentation />}>
          <Route index element={<TokensOverviewPage />} />
          <Route path={ROUTE_PATHS.tokenFoundationTypography} element={<TypographyPage />} />
          <Route path={ROUTE_PATHS.tokenFoundationLayout} element={<LayoutPage />} />
          <Route path={ROUTE_PATHS.tokenFoundationShapeDepth} element={<ShapeDepthPage />} />
          <Route path={ROUTE_PATHS.tokenFoundationMotion} element={<MotionPage />} />
          <Route path={ROUTE_PATHS.tokenColors} element={<TokensColorPage />} />
          <Route path={ROUTE_PATHS.tokenTypography} element={<TokensTypographyPage />} />
        </Route>
        <Route path={ROUTE_PATHS.componentExample} element={<StandaloneExamplePage />} />
        <Route path={ROUTE_PATHS.componentRoutes} element={<ComponentsDocumentationRoute />} />
        <Route path={ROUTE_PATHS.primitives} element={<PrimitiveCataloguePage />} />
        <Route path={ROUTE_PATHS.primitiveDetail} element={<PrimitiveDocumentation />} />
      </Routes>
    </Suspense>
  );
}
