import { type IconAnimation, iconAnimationCount } from './animation-contract.js';
import { iconAnimatedSvgSources, iconSvgSources } from './generated/assets.js';

export { iconSvgSources };

/** Matches the preview playback mode; animated exports run without React or JavaScript. */
export function getIconSvg(id: keyof typeof iconSvgSources, animated?: IconAnimation) {
  const count = iconAnimationCount(animated);
  const source = (iconAnimatedSvgSources as Readonly<Record<string, string | undefined>>)[id];
  return count && source
    ? source.replaceAll('repeatCount="indefinite"', `repeatCount="${count}"`)
    : iconSvgSources[id];
}
