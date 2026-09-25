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
const PlaceholderPage = lazy(() =>
  import('@/pages/placeholder/PlaceholderPage').then((module) => ({
    default: module.PlaceholderPage,
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
const PrimitivesPlayground = lazy(() =>
  import('@/features/playground/primitives/PrimitivesPlayground').then((module) => ({
    default: module.PrimitivesPlayground,
  })),
);
const UIPlayground = lazy(() =>
  import('@/features/playground/ui/UIPlayground').then((module) => ({
    default: module.UIPlayground,
  })),
);

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
        <Route
          path={ROUTE_PATHS.tokens}
          element={<Navigate to={ROUTE_PATHS.tokenColors} replace />}
        />
        <Route path={ROUTE_PATHS.tokenColors} element={<TokensColorPage />} />
        <Route path={ROUTE_PATHS.tokenTypography} element={<TokensTypographyPage />} />
        <Route path={ROUTE_PATHS.components} element={<PlaceholderPage />} />
        <Route path={ROUTE_PATHS.resources} element={<PlaceholderPage />} />
        <Route path={ROUTE_PATHS.playgroundPrimitives} element={<PrimitivesPlayground />} />
        <Route path={ROUTE_PATHS.playgroundUi} element={<UIPlayground />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.foundationColors} replace />} />
      </Routes>
    </Suspense>
  );
}
