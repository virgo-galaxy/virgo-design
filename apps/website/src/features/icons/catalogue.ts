import type { IconAnimation } from '@virgo-design/icons';
import {
  artworkIconComponents,
  artworkIconManifest,
  artworkIconSvgSources,
} from '@virgo-design/icons/artwork';
import {
  getIconSvg as getMonochromeSvg,
  iconSvgSources as monochromeSources,
} from '@virgo-design/icons/assets';
import {
  brandIconComponents,
  brandIconManifest,
  brandIconSvgSources,
} from '@virgo-design/icons/brands';
import { iconManifest as monochromeManifest } from '@virgo-design/icons/metadata';
import { iconComponents as monochromeComponents } from '@virgo-design/icons/registry';

export const iconManifest = [
  ...monochromeManifest,
  ...brandIconManifest,
  ...artworkIconManifest,
] as const;
export type IconId = (typeof iconManifest)[number]['id'];
export const iconComponents = {
  ...monochromeComponents,
  ...brandIconComponents,
  ...artworkIconComponents,
} as const;
export const iconSvgSources = {
  ...monochromeSources,
  ...brandIconSvgSources,
  ...artworkIconSvgSources,
} as const;

export function getIconSvg(id: IconId, animated?: IconAnimation) {
  if (id === 'grok-bot') return artworkIconSvgSources[id];
  return id === 'virgo-design-color' ? brandIconSvgSources[id] : getMonochromeSvg(id, animated);
}
