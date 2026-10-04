import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { iconAnimationCount } from './AnimatedPaths';
import type { IconAnimation } from './animation-contract';
import { iconSvgSources } from './assets';
import { CodeIcon, TrashIcon } from './index';
import { iconManifest } from './metadata';
import { iconComponents } from './registry';
import { validateIconSvg } from './tooling';

describe('optional native icon animations', () => {
  it.each([
    ['arrow-up', '0 -2.5'],
    ['arrow-down', '0 2.5'],
    ['arrow-left', '-2.5 0'],
    ['arrow-right', '2.5 0'],
  ] as const)('%s bounces along its own direction without rotating', (id, peak) => {
    const Icon = iconComponents[id];
    const { container } = render(<Icon animated="always" />);
    const motion = container.querySelector('animateTransform');
    expect(motion).toHaveAttribute('type', 'translate');
    expect(motion).toHaveAttribute('repeatCount', 'indefinite');
    const poses = motion!.getAttribute('values')!.split(';');
    expect(poses[1]).toBe(peak);
    expect(poses[0]).toBe('0 0');
    expect(poses.at(-1)).toBe('0 0');
    const [x, y] = poses[1]!.split(' ').map(Number);
    const [reboundX, reboundY] = poses[2]!.split(' ').map(Number);
    expect(x! * reboundX! + y! * reboundY!).toBeLessThan(0);
  });
  it.each(iconManifest.filter((icon) => icon.animated))(
    '$id keeps static geometry and supports once, counted and continuous playback',
    (icon) => {
      const Icon = iconComponents[icon.id];
      const source = validateIconSvg(iconSvgSources[icon.id]);
      const { container, rerender } = render(<Icon size={20} />);
      const paths = () =>
        Array.from(container.querySelectorAll('path'), (path) => path.getAttribute('d'));
      expect(paths()).toEqual(source.paths.map((path) => path.d));
      expect(container.querySelector('animate, animateTransform')).toBeNull();
      for (const [animated, count] of [
        [true, '1'],
        [3, '3'],
        ['always', 'indefinite'],
      ] as const) {
        rerender(<Icon size={20} animated={animated} />);
        expect(paths()).toEqual(source.paths.map((path) => path.d));
        const nodes = container.querySelectorAll('animate, animateTransform');
        expect(nodes.length).toBeGreaterThan(0);
        for (const node of nodes) {
          expect(node).toHaveAttribute('repeatCount', count);
          expect(node).toHaveAttribute('calcMode', 'spline');
          expect(node).toHaveAttribute('fill', 'remove');
          const poses = node.getAttribute('values')!.split(';');
          if (icon.id === 'check' || icon.id === 'close') {
            expect(poses.at(-1)).toBe(node.parentElement?.getAttribute('d'));
          } else expect(poses[0]).toBe(poses.at(-1));
        }
        expect(container.querySelector('svg')).toHaveAttribute('width', '20');
        expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
        expect(container.querySelector('svg')).not.toHaveAttribute('animated');
      }
      rerender(<Icon size={24} animated={false} />);
      expect(container.querySelector('animate, animateTransform, g')).toBeNull();
      expect(paths()).toEqual(source.paths.map((path) => path.d));
    },
  );
  it('keeps invalid counts static and distinguishes an enabled animation from a count', () => {
    for (const value of [undefined, false, 0, 0.5, -1, 1.5, NaN, Infinity])
      expect(iconAnimationCount(value)).toBe(0);
    for (const value of [0, 0.5, -1, 1.5, NaN, Infinity]) {
      const { container, unmount } = render(<TrashIcon animated={value} />);
      expect(container.querySelector('animateTransform')).toBeNull();
      unmount();
    }
  });
  it('animates meaningful parts separately and preserves native props and SVG refs', () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(
      <CodeIcon animated ref={ref} aria-label="Code" className="custom" />,
    );
    expect(ref.current).toBe(container.querySelector('svg'));
    expect(ref.current).toHaveClass('custom');
    expect(ref.current).not.toHaveAttribute('aria-hidden');
    expect(container.querySelectorAll('path')).toHaveLength(3);
    expect(container.querySelectorAll('animateTransform')).toHaveLength(2);
    expect(container.querySelector('animate')).toHaveAttribute('attributeName', 'opacity');
  });
  it('inherits valid external timing and easing and rejects invalid overrides', () => {
    const style = vi.spyOn(globalThis, 'getComputedStyle');
    const cases = [
      ['2s', 'cubic-bezier(0.3, 0.1, 0.4, 1)', '2000ms', '0.3 0.1 0.4 1'],
      ['180ms', 'cubic-bezier(0.4, 2, 0.2, 1)', '180ms', '0.4 0 0.2 1'],
      ['-1s', 'bad', '1400ms', '0.4 0 0.2 1'],
    ];
    try {
      for (const [duration, curve, expectedDuration, expectedCurve] of cases) {
        style.mockReturnValue({
          getPropertyValue: (name: string) => (name === '--virgo-icon-duration' ? duration : curve),
        } as CSSStyleDeclaration);
        const { container, unmount } = render(<TrashIcon animated />);
        expect(container.querySelector('animateTransform')).toHaveAttribute(
          'dur',
          expectedDuration,
        );
        expect(container.querySelector('animateTransform')).toHaveAttribute(
          'keySplines',
          Array(3).fill(expectedCurve).join(';'),
        );
        unmount();
      }
    } finally {
      style.mockRestore();
    }
  });
  it('server renders the static pose without starting motion', () => {
    const source = renderToStaticMarkup(<TrashIcon animated="always" />);
    expect(source).not.toContain('<animate');
    expect(source).toContain('data-icon-animation="off"');
  });
  it('responds to reduced-motion changes and unsubscribes on unmount', () => {
    let reduced = true;
    const listeners = new Set<() => void>();
    const query = {
      get matches() {
        return reduced;
      },
      addEventListener: vi.fn((_event: string, callback: () => void) => listeners.add(callback)),
      removeEventListener: vi.fn((_event: string, callback: () => void) =>
        listeners.delete(callback),
      ),
    };
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => query),
    );
    const { container, unmount } = render(<TrashIcon animated="always" />);
    expect(container.querySelector('animateTransform')).toBeNull();
    act(() => {
      reduced = false;
      listeners.forEach((callback) => callback());
    });
    expect(container.querySelector('animateTransform')).toHaveAttribute(
      'repeatCount',
      'indefinite',
    );
    act(() => {
      reduced = true;
      listeners.forEach((callback) => callback());
    });
    expect(container.querySelector('animateTransform')).toBeNull();
    unmount();
    expect(listeners.size).toBe(0);
    vi.unstubAllGlobals();
  });
});

// An unsupported static icon must not advertise an animation prop.
type StaticProps = Parameters<typeof iconComponents.plus>[0];
type HasAnimated = 'animated' extends keyof StaticProps ? true : false;
const staticContract: HasAnimated = false;
const animationContract: IconAnimation = 'always';
it('keeps the public animation type opt-in', () => {
  expect(staticContract).toBe(false);
  expect(animationContract).toBe('always');
});

// Direction remains intrinsic to each named Chevron; no override or partial playback API.
type ChevronProps = Parameters<(typeof iconComponents)['chevron-down']>[0];
// SVG's native bidi attribute remains a generic string, not an icon direction enum.
const nativeDirection: string extends NonNullable<ChevronProps['direction']> ? true : false = true;
const progressOverride: 'progress' extends keyof ChevronProps ? true : false = false;
it('keeps Chevron animation API uniform with the other supported icons', () => {
  expect(nativeDirection).toBe(true);
  expect(progressOverride).toBe(false);
});
