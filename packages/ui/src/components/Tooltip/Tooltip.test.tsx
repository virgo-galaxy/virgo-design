import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tooltip } from './index';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Tooltip UI', () => {
  it.each([false, true])(
    'preserves ordinary exit and skips it only for smooth handoff (%s)',
    (smoothTransition) => {
      vi.useFakeTimers();
      const original = window.getComputedStyle;
      vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
        const style = original(element, pseudo);
        if (element.getAttribute('role') === 'tooltip')
          Object.defineProperties(style, {
            animationName: { value: 'tooltip-exit', configurable: true },
            animationDuration: { value: '0.12s', configurable: true },
            animationDelay: { value: '0s', configurable: true },
          });
        return style;
      });
      render(
        <>
          <Tooltip smoothTransition={smoothTransition} openDelay={0}>
            <Tooltip.Trigger>First</Tooltip.Trigger>
            <Tooltip.Content>First description</Tooltip.Content>
          </Tooltip>
          <Tooltip smoothTransition={smoothTransition} openDelay={0}>
            <Tooltip.Trigger>Second</Tooltip.Trigger>
            <Tooltip.Content>Second description</Tooltip.Content>
          </Tooltip>
        </>,
      );
      fireEvent.pointerEnter(screen.getByRole('button', { name: 'First' }));
      const firstPanel = screen.getByRole('tooltip');
      fireEvent.pointerLeave(screen.getByRole('button', { name: 'First' }));
      act(() => vi.advanceTimersByTime(151));
      expect(firstPanel).toBeInTheDocument();
      expect(firstPanel).toHaveAttribute('data-state', 'closed');
      fireEvent.pointerEnter(screen.getByRole('button', { name: 'Second' }));
      if (smoothTransition) {
        expect(firstPanel).not.toBeInTheDocument();
        expect(screen.getAllByRole('tooltip', { hidden: true })).toHaveLength(1);
      } else {
        expect(firstPanel).toBeInTheDocument();
        expect(firstPanel).toHaveAttribute('aria-hidden', 'true');
        expect(firstPanel).toHaveAttribute('inert');
        expect(firstPanel).toHaveStyle({ pointerEvents: 'none' });
        act(() => vi.advanceTimersByTime(120));
        expect(firstPanel).not.toBeInTheDocument();
      }
      expect(screen.getByRole('tooltip')).toHaveTextContent('Second description');
    },
  );
  it('uses Virgo Button by default, renders semantic color and arrow, and syncs theme/RTL', async () => {
    const { container, rerender } = render(
      <div data-theme="dark">
        <Tooltip defaultOpen>
          <Tooltip.Trigger size="small" style={{ direction: 'rtl' }}>
            Details
          </Tooltip.Trigger>
          <Tooltip.Content placement="topStart" tone="brand">
            Description
          </Tooltip.Content>
        </Tooltip>
      </div>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'small');
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-tone', 'brand');
    expect(tooltip.querySelector('[data-slot="arrow"]')).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('dir', 'rtl');
    expect(tooltip).toHaveAttribute('data-theme', 'dark');
    await act(async () => {
      container.firstElementChild?.setAttribute('data-theme', 'light');
    });
    expect(tooltip).toHaveAttribute('data-theme', 'light');
    rerender(
      <Tooltip defaultOpen>
        <Tooltip.Trigger>Details</Tooltip.Trigger>
        <Tooltip.Content arrow={false}>Description</Tooltip.Content>
      </Tooltip>,
    );
    expect(
      screen.getByRole('tooltip').querySelector('[data-slot="arrow"]'),
    ).not.toBeInTheDocument();
  });
  it('allows an unstyled custom trigger and preserves an existing accessible description', async () => {
    const user = userEvent.setup();
    render(
      <>
        <span id="hint">Existing hint</span>
        <Tooltip>
          <Tooltip.Trigger
            className="custom-trigger"
            aria-describedby="hint"
            render={(props) => <button {...props} />}
          >
            Custom
          </Tooltip.Trigger>
          <Tooltip.Content>More details</Tooltip.Content>
        </Tooltip>
      </>,
    );
    await user.tab();
    expect(screen.getByRole('button')).toHaveAttribute('class', 'custom-trigger');
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Existing hint More details');
  });
});
