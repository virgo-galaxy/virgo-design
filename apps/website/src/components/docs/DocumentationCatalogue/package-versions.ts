import { version as chartsVersion } from '../../../../../../packages/charts/package.json';
import { version as colorsVersion } from '../../../../../../packages/colors/package.json';
import { version as fontsVersion } from '../../../../../../packages/fonts/package.json';
import { version as iconsVersion } from '../../../../../../packages/icons/package.json';
import { version as primitivesVersion } from '../../../../../../packages/primitives/package.json';
import { version as themesVersion } from '../../../../../../packages/themes/package.json';
import { version as tokensVersion } from '../../../../../../packages/tokens/package.json';
import { version as uiVersion } from '../../../../../../packages/ui/package.json';

export const packageVersions = {
  '@virgo-design/charts': chartsVersion,
  '@virgo-design/colors': colorsVersion,
  '@virgo-design/fonts': fontsVersion,
  '@virgo-design/icons': iconsVersion,
  '@virgo-design/primitives': primitivesVersion,
  '@virgo-design/themes': themesVersion,
  '@virgo-design/tokens': tokensVersion,
  '@virgo-design/ui': uiVersion,
} as const;
