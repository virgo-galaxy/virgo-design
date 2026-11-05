import { LayersIcon, LayoutIcon, PaletteIcon, SplineIcon, TypeIcon } from '@virgo-design/icons';

import { ROUTE_PATHS } from '@/shared/routes/route-config';

export const tokenNavigationGroups = [
  {
    id: 'foundations',
    label: 'tokens.navigation.foundations',
    description: 'tokens.overview.foundationsDescription',
    items: [
      {
        path: ROUTE_PATHS.tokenFoundationTypography,
        label: 'tokens.foundations.typography.title',
        description: 'tokens.overview.typographyDescription',
        Icon: TypeIcon,
      },
      {
        path: ROUTE_PATHS.tokenFoundationLayout,
        label: 'tokens.foundations.layout.title',
        description: 'tokens.overview.layoutDescription',
        Icon: LayoutIcon,
      },
      {
        path: ROUTE_PATHS.tokenFoundationShapeDepth,
        label: 'tokens.foundations.shapeDepth.title',
        description: 'tokens.overview.shapeDepthDescription',
        Icon: LayersIcon,
      },
      {
        path: ROUTE_PATHS.tokenFoundationMotion,
        label: 'tokens.foundations.motion.title',
        description: 'tokens.overview.motionDescription',
        Icon: SplineIcon,
      },
    ],
  },
  {
    id: 'semantic',
    label: 'tokens.navigation.semantic',
    description: 'tokens.overview.semanticDescription',
    items: [
      {
        path: ROUTE_PATHS.tokenColors,
        label: 'tokens.colors.title',
        description: 'tokens.overview.colorsDescription',
        Icon: PaletteIcon,
      },
      {
        path: ROUTE_PATHS.tokenTypography,
        label: 'tokens.typography.title',
        description: 'tokens.overview.semanticTypographyDescription',
        Icon: TypeIcon,
      },
    ],
  },
] as const;
