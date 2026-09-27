import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTE_PATHS } from '@/shared/routes/route-config';

const ColorsPage = lazy(() =>
  import('@/pages/colors/ColorsPage').then((module) => ({ default: module.ColorsPage })),
);
const TypographyPage = lazy(() =>
  import('@/pages/foundations/TypographyPage').then((module) => ({
    default: module.TypographyPage,
  })),
);
const LayoutPage = lazy(() =>
  import('@/pages/foundations/LayoutPage').then((module) => ({ default: module.LayoutPage })),
);
const ShapeDepthPage = lazy(() =>
  import('@/pages/foundations/ShapeDepthPage').then((module) => ({
    default: module.ShapeDepthPage,
  })),
);
const MotionPage = lazy(() =>
  import('@/pages/foundations/MotionPage').then((module) => ({ default: module.MotionPage })),
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
  import('@/app/relationships/DocumentationRelationships').then((module) => ({
    default: module.ComponentRelationships,
  })),
);
const PrimitiveRelationships = lazy(() =>
  import('@/app/relationships/DocumentationRelationships').then((module) => ({
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
  import('@/pages/foundations/IconsPage').then((module) => ({
    default: module.IconsPage,
  })),
);
const StandaloneExamplePage = lazy(() =>
  import('@/pages/examples/StandaloneExamplePage').then((module) => ({
    default: module.StandaloneExamplePage,
  })),
);

function ComponentsDocumentationRoute() {
  return (
    <ComponentsDocumentation
      renderFooter={(componentSlug) => <ComponentRelationships componentSlug={componentSlug} />}
    />
  );
}

function PrimitiveDocumentation() {
  return (
    <PrimitiveDetailPage
      renderFooter={(primitiveSlug) => <PrimitiveRelationships primitiveSlug={primitiveSlug} />}
    />
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<div aria-busy="true" />}>
      <Routes>
        <Route
          path={ROUTE_PATHS.root}
          element={<Navigate to={ROUTE_PATHS.foundationColors} replace />}
        />
        <Route
          path={ROUTE_PATHS.foundations}
          element={<Navigate to={ROUTE_PATHS.foundationColors} replace />}
        />
        <Route path={ROUTE_PATHS.foundationColors} element={<ColorsPage />} />
        <Route path={ROUTE_PATHS.foundationTypography} element={<TypographyPage />} />
        <Route path={ROUTE_PATHS.foundationLayout} element={<LayoutPage />} />
        <Route path={ROUTE_PATHS.foundationShapeDepth} element={<ShapeDepthPage />} />
        <Route path={ROUTE_PATHS.foundationMotion} element={<MotionPage />} />
        <Route path={ROUTE_PATHS.foundationIcons} element={<IconsPage />} />
        <Route
          path={ROUTE_PATHS.tokens}
          element={<Navigate to={ROUTE_PATHS.tokenColors} replace />}
        />
        <Route path={ROUTE_PATHS.tokenColors} element={<TokensColorPage />} />
        <Route path={ROUTE_PATHS.tokenTypography} element={<TokensTypographyPage />} />
        <Route path={ROUTE_PATHS.componentExample} element={<StandaloneExamplePage />} />
        <Route path={ROUTE_PATHS.componentRoutes} element={<ComponentsDocumentationRoute />} />
        <Route path={ROUTE_PATHS.primitives} element={<PrimitiveCataloguePage />} />
        <Route path={ROUTE_PATHS.primitiveDetail} element={<PrimitiveDocumentation />} />
      </Routes>
    </Suspense>
  );
}
