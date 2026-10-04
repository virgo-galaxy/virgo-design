import type { IconAnimation } from '@virgo-design/icons';
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

export const iconManifest = [...monochromeManifest, ...brandIconManifest] as const;
export type IconId = (typeof iconManifest)[number]['id'];
export const iconComponents = { ...monochromeComponents, ...brandIconComponents } as const;
export const iconSvgSources = { ...monochromeSources, ...brandIconSvgSources } as const;

export function getIconSvg(id: IconId, animated?: IconAnimation) {
  return id === 'virgo-design-color' ? brandIconSvgSources[id] : getMonochromeSvg(id, animated);
}
