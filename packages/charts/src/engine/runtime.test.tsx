import { act, render, waitFor } from '@testing-library/react';
import type { EChartsType } from 'echarts';
import { useMemo, useRef } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

import { useChartRuntime, useReducedMotion } from './runtime';
import { useChartTheme } from './theme';

afterEach(() => vi.unstubAllGlobals());
it('observes motion and semantic theme changes without replacing the instance', async () => {
  const media = new EventTarget() as EventTarget & { matches: boolean };
  media.matches = false;
  vi.stubGlobal('matchMedia', () => media);
  const chart = { setOption: vi.fn(), resize: vi.fn(), dispose: vi.fn() };
  const init = vi.fn(() => chart as unknown as EChartsType);
  function Harness({ size }: { size: number }) {
    const ref = useRef<HTMLDivElement>(null),
      theme = useChartTheme(ref),
      reduced = useReducedMotion();
    const option = useMemo(
      () => (theme ? { animation: !reduced, textStyle: { fontSize: theme.fontSize } } : null),
      [theme, reduced],
    );
    useChartRuntime({ ref, init, renderer: 'svg', height: 100, option });
    return <div ref={ref} style={{ fontSize: size }} />;
  }
  const { rerender, unmount } = render(<Harness size={12} />);
  await waitFor(() =>
    expect(chart.setOption.mock.calls.at(-1)?.[0]).toMatchObject({
      animation: true,
      textStyle: { fontSize: 12 },
    }),
  );
  act(() => {
    media.matches = true;
    media.dispatchEvent(new Event('change'));
  });
  await waitFor(() => expect(chart.setOption.mock.calls.at(-1)?.[0].animation).toBe(false));
  rerender(<Harness size={18} />);
  await waitFor(() => expect(chart.setOption.mock.calls.at(-1)?.[0].textStyle.fontSize).toBe(18));
  expect(init).toHaveBeenCalledTimes(1);
  unmount();
  expect(chart.dispose).toHaveBeenCalledOnce();
});
it('resizes through ResizeObserver and cleans the observer and ready callback', () => {
  const chart = { setOption: vi.fn(), resize: vi.fn(), dispose: vi.fn() };
  const init = vi.fn(() => chart as unknown as EChartsType),
    disconnect = vi.fn(),
    observe = vi.fn(),
    cleanup = vi.fn();
  let notify = () => {};
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: () => void) {
        notify = callback;
      }
      observe = observe;
      disconnect = disconnect;
    },
  );
  vi.stubGlobal('requestAnimationFrame', (callback: () => void) => {
    callback();
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  function Harness() {
    const ref = useRef<HTMLDivElement>(null);
    useChartRuntime({
      ref,
      init,
      renderer: 'svg',
      height: 120,
      option: { series: [] },
      onReady: () => cleanup,
    });
    return <div ref={ref} />;
  }
  const { unmount } = render(<Harness />);
  act(notify);
  expect(observe).toHaveBeenCalledOnce();
  expect(chart.resize).toHaveBeenCalledWith({ width: 640, height: 120 });
  unmount();
  expect(disconnect).toHaveBeenCalledOnce();
  expect(cleanup).toHaveBeenCalledOnce();
  expect(chart.dispose).toHaveBeenCalledOnce();
});

it('refreshes presentation when the root theme style changes without recreating ECharts', async () => {
  const compute = window.getComputedStyle.bind(window);
  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
    const css = compute(element);
    return {
      getPropertyValue: (name: string) => css.getPropertyValue(name),
      color: css.color,
      fontFamily: css.fontFamily,
      fontSize: document.documentElement.dataset.virgoTheme === 'soft' ? '15px' : '12px',
    } as CSSStyleDeclaration;
  });
  const chart = { setOption: vi.fn(), resize: vi.fn(), dispose: vi.fn() };
  const init = vi.fn(() => chart as unknown as EChartsType);
  function Harness() {
    const ref = useRef<HTMLDivElement>(null);
    const theme = useChartTheme(ref);
    const option = useMemo(
      () => (theme ? { textStyle: { fontSize: theme.fontSize } } : null),
      [theme],
    );
    useChartRuntime({ ref, init, renderer: 'svg', height: 100, option });
    return <div ref={ref} />;
  }
  const { unmount } = render(<Harness />);
  await waitFor(() => expect(chart.setOption.mock.calls.at(-1)?.[0].textStyle.fontSize).toBe(12));
  act(() => {
    document.documentElement.dataset.virgoTheme = 'soft';
  });
  await waitFor(() => expect(chart.setOption.mock.calls.at(-1)?.[0].textStyle.fontSize).toBe(15));
  expect(init).toHaveBeenCalledOnce();
  unmount();
  delete document.documentElement.dataset.virgoTheme;
  vi.restoreAllMocks();
});
