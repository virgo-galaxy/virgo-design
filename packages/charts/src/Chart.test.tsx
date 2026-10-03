import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Chart } from './index';
const engine = vi.hoisted(() => {
  const chart = {
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
    dispatchAction: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  };
  return {
    chart,
    init: vi.fn(
      (_element: HTMLElement, _theme: null, _options: { renderer: string; height: number }) => {
        void _element;
        void _theme;
        void _options;
        return chart;
      },
    ),
  };
});
vi.mock('./engine/core', () => ({ init: engine.init }));
const data = [
  { date: 'Mon', a: 4, b: 0 },
  { date: 'Tue', a: null, b: -2 },
  { date: 'Wed', a: 6, b: 3 },
];
function Example({ source = data, renderer = 'svg' as 'svg' | 'canvas' }) {
  return (
    <Chart.Root data={source} title="Delivery" showData animated={false} renderer={renderer}>
      <Chart.Cartesian>
        <Chart.Grid />
        <Chart.XAxis dataKey="date" />
        <Chart.YAxis />
        <Chart.Area dataKey="a" name="Created" />
        <Chart.Line dataKey="b" name="Completed" />
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Cartesian>
    </Chart.Root>
  );
}
beforeEach(() => {
  vi.clearAllMocks();
});
describe('React ECharts integration', () => {
  it('keeps the declarative API and keyboard/focus inspection while delegating interaction', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const first = await screen.findByRole('button', { name: 'Mon: Created 4, Completed 0' });
    await waitFor(() => expect(engine.chart.setOption).toHaveBeenCalled());
    act(() => first.focus());
    expect(engine.chart.dispatchAction).toHaveBeenCalledWith({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: 0,
    });
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Tue: Created —, Completed -2' })).toHaveFocus();
    expect(engine.chart.dispatchAction).toHaveBeenCalledWith({
      type: 'showTip',
      seriesIndex: 1,
      dataIndex: 1,
    });
    await user.keyboard('{Escape}');
    expect(engine.chart.dispatchAction).toHaveBeenCalledWith({ type: 'hideTip' });
  });
  it('updates data through setOption on the same instance, then disposes on renderer change and unmount', async () => {
    const { rerender, unmount } = render(<Example />);
    await waitFor(() => expect(engine.chart.setOption).toHaveBeenCalled());
    const count = engine.init.mock.calls.length;
    rerender(<Example source={data.map((d) => ({ ...d, b: d.b + 4 }))} />);
    await waitFor(() =>
      expect(engine.chart.setOption.mock.calls.at(-1)?.[0].series[1].data[0].value).toBe(4),
    );
    expect(engine.init).toHaveBeenCalledTimes(count);
    rerender(<Example renderer="canvas" />);
    await waitFor(() => expect(engine.init).toHaveBeenCalledTimes(count + 1));
    expect(engine.init.mock.calls.at(-1)?.[2]).toMatchObject({ renderer: 'canvas' });
    expect(engine.chart.dispose).toHaveBeenCalledTimes(1);
    unmount();
    expect(engine.chart.dispose).toHaveBeenCalledTimes(2);
  });
  it('keeps native legend controls, zero values and raw data disclosure', async () => {
    render(<Example />);
    await waitFor(() => expect(engine.chart.setOption).toHaveBeenCalled());
    fireEvent.click(screen.getByRole('button', { name: 'Created' }));
    expect(screen.getByRole('button', { name: 'Created' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    await waitFor(() =>
      expect(engine.chart.setOption.mock.calls.at(-1)?.[0].legend.selected.Created).toBe(false),
    );
    fireEvent.click(screen.getByText('View chart data'));
    expect(screen.getByRole('table')).toHaveTextContent('Wed');
    expect(screen.getByRole('table')).toHaveTextContent('-2');
  });
  it('inherits renderer selection from Responsive', async () => {
    render(
      <Chart.Root data={data} title="Canvas">
        <Chart.Responsive renderer="canvas" height={120}>
          <Chart.Cartesian>
            <Chart.XAxis dataKey="date" />
            <Chart.Line dataKey="b" />
          </Chart.Cartesian>
        </Chart.Responsive>
      </Chart.Root>,
    );
    await waitFor(() => expect(engine.init).toHaveBeenCalled());
    expect(engine.init.mock.calls[0]?.[2]).toMatchObject({ renderer: 'canvas', height: 120 });
  });
  it('renders empty data without loading or initializing an engine', () => {
    render(
      <Chart.Root data={[{ a: null }]} title="Empty" empty="Nothing to plot">
        <Chart.Cartesian>
          <Chart.Line dataKey="a" />
        </Chart.Cartesian>
      </Chart.Root>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Nothing to plot');
    expect(engine.init).not.toHaveBeenCalled();
  });
  it('retains native Sparkline with no ECharts initialization', () => {
    const { container } = render(
      <Chart.Sparkline data={data} dataKey="b" xKey="date" title="Micro" area />,
    );
    expect(container.querySelector('[data-chart-engine="native"] svg')).toBeTruthy();
    expect(engine.init).not.toHaveBeenCalled();
  });
  it('keeps accessible polar percentages and outward selection through engine actions', async () => {
    render(
      <Chart.Root
        data={[
          { name: 'Alpha', v: 2 },
          { name: 'Beta', v: 1 },
        ]}
        title="Share"
      >
        <Chart.Donut dataKey="v" nameKey="name">
          <Chart.Tooltip />
        </Chart.Donut>
      </Chart.Root>,
    );
    const first = await screen.findByRole('button', { name: 'Alpha: 2 (67%)' });
    act(() => first.focus());
    expect(engine.chart.dispatchAction).toHaveBeenCalledWith({
      type: 'select',
      seriesIndex: 0,
      dataIndex: 0,
    });
  });
});
