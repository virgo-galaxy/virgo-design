/** Omit / false: static; true: once; positive integer: count; always: continuous. */
export type IconAnimation = boolean | number | 'always';

export type IconAnimationTrack = {
  path: number;
  attribute: 'd' | 'opacity' | 'transform';
  transform?: 'rotate' | 'translate' | 'scale';
  origin?: readonly [number, number];
  /** A drawing starts hidden and finishes in the canonical filled pose. */
  reveal?: boolean;
  values: readonly string[];
  times?: readonly number[];
};
export type IconAnimationDefinition = {
  duration: number;
  tracks: readonly IconAnimationTrack[];
};

export function iconAnimationCount(animated: IconAnimation | undefined) {
  if (animated === 'always') return 'indefinite';
  if (animated === true) return 1;
  return typeof animated === 'number' && Number.isSafeInteger(animated) && animated > 0
    ? animated
    : 0;
}
