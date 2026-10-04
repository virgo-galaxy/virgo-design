import { act, cleanup, render } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Statistic } from './index';

let time: number;
let sequence: number;
let frames: Map<number, FrameRequestCallback>;
let reduced: boolean;
let motionListeners: Set<() => void>;

beforeEach(() => {
  time = 0;
  sequence = 0;
  reduced = false;
  frames = new Map();
  motionListeners = new Set();
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++sequence, callback);
    return sequence;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return reduced;
    },
    addEventListener: (_type: string, listener: () => void) => motionListeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) => motionListeners.delete(listener),
  }));
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function advance(ms: number) {
  time += ms;
  const pending = [...frames.values()];
  frames.clear();
  act(() => pending.forEach((callback) => callback(time)));
}
const visible = (container: HTMLElement) => container.querySelector('[data-slot="number"]')!;

describe('Statistic numeric animation', () => {
  it('starts at zero, decelerates and ends at the exact target', () => {
    const { container } = render(<Statistic value={200} animation={{ duration: 800 }} />);
    expect(visible(container)).toHaveTextContent('0');
    expect(visible(container)).toHaveAttribute('aria-hidden', 'true');
    expect(visible(container).nextSibling).toHaveTextContent('200');
    advance(0);
    advance(200);
    const early = Number(visible(container).textContent);
    expect(early).toBeGreaterThan(100);
    expect(early).toBeLessThan(200);
    advance(400);
    expect(Number(visible(container).textContent) - early).toBeLessThan(early);
    advance(200);
    expect(visible(container)).toHaveTextContent(/^200$/);
    expect(frames.size).toBe(0);
  });

  it('decreases from the previous value and does not replay on unrelated renders', () => {
    const animation = { duration: 800, updateDuration: 400 };
    const { container, rerender } = render(<Statistic value={200} animation={animation} />);
    advance(0);
    advance(800);
    rerender(<Statistic value={150} animation={animation} />);
    expect(visible(container)).toHaveTextContent(/^200$/);
    advance(0);
    advance(100);
    expect(Number(visible(container).textContent)).toBeLessThan(175);
    expect(Number(visible(container).textContent)).toBeGreaterThanOrEqual(150);
    advance(300);
    expect(visible(container)).toHaveTextContent(/^150$/);
    rerender(<Statistic value={150} animation={animation} description="Updated context" />);
    expect(frames.size).toBe(0);
  });

  it('retargets an unfinished animation from the current displayed value', () => {
    const animation = { duration: 800, updateDuration: 400 };
    const { container, rerender } = render(<Statistic value={200} animation={animation} />);
    advance(0);
    advance(200);
    const before = visible(container).textContent;
    rerender(<Statistic value={40} animation={animation} />);
    expect(visible(container).textContent).toBe(before);
    expect(frames.size).toBe(1);
    advance(0);
    advance(400);
    expect(visible(container)).toHaveTextContent(/^40$/);
    expect(frames.size).toBe(0);
  });

  it('preserves the initial duration under StrictMode effect replay', () => {
    const { container } = render(
      <StrictMode>
        <Statistic value={200} animation={{ duration: 800, updateDuration: 100 }} />
      </StrictMode>,
    );
    expect(frames.size).toBe(1);
    advance(0);
    advance(400);
    expect(Number(visible(container).textContent)).toBeLessThan(200);
    advance(400);
    expect(visible(container)).toHaveTextContent(/^200$/);
  });

  it('supports a custom starting value, decimals and compound-slot formatting', () => {
    const { container } = render(
      <Statistic.Root>
        <Statistic.Value
          value={1.5}
          animation={{ from: 0.5, duration: 400 }}
          formatter={(value) => value.toFixed(1)}
        />
      </Statistic.Root>,
    );
    expect(visible(container)).toHaveTextContent(/^0.5$/);
    advance(0);
    advance(100);
    expect(Number(visible(container).textContent)).toBeGreaterThan(1);
    advance(300);
    expect(visible(container)).toHaveTextContent(/^1.5$/);
  });

  it('keeps the previous value through a loading cycle', () => {
    const { container, rerender } = render(<Statistic value={150} animation loading />);
    expect(container.querySelector('[data-slot="number"]')).toBeNull();
    expect(frames.size).toBe(0);
    rerender(<Statistic value={150} animation />);
    expect(visible(container)).toHaveTextContent(/^0$/);
    advance(0);
    advance(560);
    rerender(<Statistic value={100} animation loading />);
    expect(container.querySelector('[data-slot="number"]')).toBeNull();
    rerender(<Statistic value={100} animation />);
    expect(visible(container)).toHaveTextContent(/^150$/);
    advance(0);
    advance(360);
    expect(visible(container)).toHaveTextContent(/^100$/);
  });

  it('skips motion when requested, including a preference change mid-animation', () => {
    reduced = true;
    const { container, rerender } = render(<Statistic value={150} animation />);
    expect(visible(container)).toHaveTextContent(/^150$/);
    expect(frames.size).toBe(0);
    reduced = false;
    rerender(<Statistic value={50} animation />);
    advance(0);
    advance(50);
    expect(frames.size).toBe(1);
    act(() => {
      reduced = true;
      motionListeners.forEach((listener) => listener());
    });
    expect(visible(container)).toHaveTextContent(/^50$/);
    expect(frames.size).toBe(0);
  });

  it('cancels frames and media subscriptions on unmount or animation disable', () => {
    const { container, rerender, unmount } = render(<Statistic value={150} animation />);
    rerender(<Statistic value={150} animation={false} />);
    expect(visible(container)).toHaveTextContent(/^150$/);
    expect(frames.size).toBe(0);
    expect(motionListeners.size).toBe(0);
    rerender(<Statistic value={200} animation />);
    expect(frames.size).toBe(1);
    unmount();
    expect(frames.size).toBe(0);
    expect(motionListeners.size).toBe(0);
  });

  it('retains static content and respects zero-duration numeric updates', () => {
    const { container, rerender } = render(<Statistic value="256 items" animation />);
    expect(container.querySelector('dd')).toHaveTextContent('256 items');
    expect(frames.size).toBe(0);
    rerender(<Statistic value={-1.5} suffix="%" animation={{ duration: 0, updateDuration: 0 }} />);
    expect(visible(container)).toHaveTextContent(/^-1.5$/);
    expect(frames.size).toBe(0);
    rerender(<Statistic value={0} suffix="%" animation={{ duration: 0, updateDuration: 0 }} />);
    expect(visible(container)).toHaveTextContent(/^0$/);
    expect(frames.size).toBe(0);
  });
});
