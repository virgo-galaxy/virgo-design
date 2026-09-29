import { colorStudioEnUS } from '@/features/color-studio/locales/en-US';
import { colorStudioZhCN } from '@/features/color-studio/locales/zh-CN';
import { foundationColorExportEnUS } from '@/features/foundation-color-export/locales/en-US';
import { foundationColorExportZhCN } from '@/features/foundation-color-export/locales/zh-CN';
import { paletteGalleryEnUS } from '@/features/palette-gallery/locales/en-US';
import { paletteGalleryZhCN } from '@/features/palette-gallery/locales/zh-CN';
import { layoutEnUS } from '@/layout/locales/en-US';
import { layoutZhCN } from '@/layout/locales/zh-CN';
import { foundationColorsEnUS } from '@/pages/colors/locales/en-US';
import { foundationColorsZhCN } from '@/pages/colors/locales/zh-CN';
import { foundationsEnUS } from '@/pages/foundations/locales/en-US';
import { foundationsZhCN } from '@/pages/foundations/locales/zh-CN';
import { tokensEnUS } from '@/pages/tokens/locales/en-US';
import { tokensZhCN } from '@/pages/tokens/locales/zh-CN';

import type { LocaleOf } from './locale-types';

export const enUS = {
  app: layoutEnUS,
  foundations: {
    ...foundationsEnUS,
    ...foundationColorsEnUS,
    ...colorStudioEnUS,
    ...paletteGalleryEnUS,
    ...foundationColorExportEnUS,
  },
  tokens: tokensEnUS,
} as const;

export const zhCN = {
  app: layoutZhCN,
  foundations: {
    ...foundationsZhCN,
    ...foundationColorsZhCN,
    ...colorStudioZhCN,
    ...paletteGalleryZhCN,
    ...foundationColorExportZhCN,
  },
  tokens: tokensZhCN,
} satisfies LocaleOf<typeof enUS>;
