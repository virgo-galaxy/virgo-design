import type { IconAnimationDefinition, IconAnimationTrack } from '../src/animation-contract.ts';
import type { IconDefinition, IconPath } from '../src/tooling.ts';

const pathSource = (path: IconPath, children = '') =>
  `<path d="${path.d}"${path.fillRule ? ` fill-rule="${path.fillRule}"` : ''}${children ? `>${children}</path>` : ' />'}`;
const trackSource = (track: IconAnimationTrack, duration: number) => {
  const element = track.attribute === 'transform' ? 'animateTransform' : 'animate';
  const splines = Array.from({ length: track.values.length - 1 }, () => '0.4 0 0.2 1').join(';');
  return `<${element} attributeName="${track.attribute}"${track.transform ? ` type="${track.transform}"` : ''} values="${track.values.join(';')}" keyTimes="${(track.times ?? [0, 0.35, 0.75, 1]).join(';')}" keySplines="${splines}" calcMode="spline" dur="${duration}ms" repeatCount="indefinite" begin="0s" fill="remove" />`;
};

/** A standalone derived SVG; the canonical source remains static, validated geometry. */
export function createAnimatedSvg(definition: IconDefinition, animation: IconAnimationDefinition) {
  const moving = definition.paths
    .map((path, index) => {
      const tracks = animation.tracks.filter((track) => track.path === index);
      const centered = tracks.find((track) => track.origin);
      const glyph = pathSource(
        path,
        tracks
          .filter((track) => !track.origin)
          .map((track) => trackSource(track, animation.duration))
          .join(''),
      );
      if (!centered) return glyph;
      const [x, y] = centered.origin!;
      return `<g transform="translate(${x} ${y})"><g>${trackSource(centered, animation.duration)}<g transform="translate(${-x} ${-y})">${glyph}</g></g></g>`;
    })
    .join('');
  const resting = definition.paths.map((path) => pathSource(path)).join('');
  const preference =
    '<style>[data-virgo-animated] > [data-virgo-rest]{display:none}@media (prefers-reduced-motion:reduce){[data-virgo-animated] > [data-virgo-motion]{display:none}[data-virgo-animated] > [data-virgo-rest]{display:inline}}</style>';
  return `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-virgo-animated="">${preference}<g data-virgo-motion="">${moving}</g><g data-virgo-rest="">${resting}</g></svg>`;
}
