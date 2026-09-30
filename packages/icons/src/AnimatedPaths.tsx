import { useEffect, useRef, useSyncExternalStore } from 'react';

import {
  type IconAnimation,
  iconAnimationCount,
  type IconAnimationDefinition,
} from './animation-contract.js';
import type { IconPath } from './tooling.js';

let reducedMotionQuery: MediaQueryList | undefined;
function motionQuery() {
  if (typeof window === 'undefined' || !window.matchMedia) return undefined;
  return (reducedMotionQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)'));
}
function subscribeMotion(callback: () => void) {
  const query = motionQuery();
  query?.addEventListener('change', callback);
  return () => query?.removeEventListener('change', callback);
}
const getReducedMotion = () => motionQuery()?.matches ?? false;
const getServerReducedMotion = () => true;
export { iconAnimationCount } from './animation-contract.js';

/** Native SVG animation: no third-party player or global animation stylesheet. */
export function AnimatedPaths({
  paths,
  animation,
  animated,
}: {
  paths: readonly IconPath[];
  animation: IconAnimationDefinition;
  animated: IconAnimation;
}) {
  const group = useRef<SVGGElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerReducedMotion);
  const count = iconAnimationCount(animated);
  useEffect(() => {
    if (reduced || !count || !group.current) return;
    const styles = getComputedStyle(group.current);
    const configuredDuration = styles.getPropertyValue('--virgo-icon-duration').trim();
    const match = configuredDuration.match(/^(\d+(?:\.\d+)?)(ms|s)$/);
    const requestedDuration = match
      ? Number(match[1]) * (match[2] === 's' ? 1000 : 1)
      : animation.duration;
    const duration = Number.isFinite(requestedDuration)
      ? Math.max(1, requestedDuration)
      : animation.duration;
    const easing = styles
      .getPropertyValue('--vd-easing-standard')
      .match(/cubic-bezier\(([^)]+)\)/)?.[1];
    const spline = easing?.split(',').map(Number);
    const curve =
      spline?.length === 4 &&
      spline.every((value) => Number.isFinite(value) && value >= 0 && value <= 1)
        ? spline.join(' ')
        : '0.4 0 0.2 1';
    const nodes = group.current.querySelectorAll<SVGAnimationElement>('animate, animateTransform');
    for (const node of nodes) {
      node.setAttribute('dur', `${Math.max(1, duration)}ms`);
      node.setAttribute(
        'keySplines',
        Array.from(
          { length: node.getAttribute('values')!.split(';').length - 1 },
          () => curve,
        ).join(';'),
      );
      node.beginElement?.();
    }
  }, [animated, animation, count, reduced]);
  return (
    <g ref={group} data-icon-animation={reduced || !count ? 'off' : String(animated)}>
      {paths.map((path, index) => {
        const tracks =
          reduced || !count ? [] : animation.tracks.filter((track) => track.path === index);
        const renderTrack = (track: (typeof tracks)[number]) => {
          const common = {
            attributeName: track.attribute,
            values: track.values.join(';'),
            keyTimes: (track.times ?? [0, 0.35, 0.75, 1]).join(';'),
            keySplines: Array.from({ length: track.values.length - 1 }, () => '0.4 0 0.2 1').join(
              ';',
            ),
            calcMode: 'spline' as const,
            dur: `${animation.duration}ms`,
            repeatCount: count,
            begin: 'indefinite',
            fill: 'remove' as const,
          };
          return track.attribute === 'transform' ? (
            <animateTransform key={track.attribute} {...common} type={track.transform!} />
          ) : (
            <animate key={track.attribute} {...common} />
          );
        };
        const centered = tracks.find((track) => track.origin);
        const glyph = (
          <path key={index} d={path.d} fillRule={path.fillRule}>
            {tracks.filter((track) => !track.origin).map(renderTrack)}
          </path>
        );
        if (!centered) return glyph;
        const [x, y] = centered.origin!;
        return (
          <g key={index} transform={`translate(${x} ${y})`}>
            <g>
              {renderTrack(centered)}
              <g transform={`translate(${-x} ${-y})`}>{glyph}</g>
            </g>
          </g>
        );
      })}
    </g>
  );
}
