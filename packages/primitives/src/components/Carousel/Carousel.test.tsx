import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { CarouselProps } from './index';
import { Carousel, useCarouselState } from './index';

let reduced = false;
beforeEach(() => {
  reduced = false;
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
function Controls() {
  const state = useCarouselState();
  return (
    <>
      <button onClick={state.previous} disabled={!state.canPrevious}>
        Previous
      </button>
      <button onClick={state.next} disabled={!state.canNext}>
        Next
      </button>
      <button onClick={() => state.setPaused(!state.paused)}>Pause</button>
    </>
  );
}
function Example(props: Partial<CarouselProps>) {
  return (
    <Carousel count={3} aria-label="Examples" {...props}>
      <Carousel.Viewport data-testid="viewport">
        <Carousel.Track>
          {[0, 1, 2].map((index) => (
            <Carousel.Item index={index} key={index} data-testid={`slide-${index}`}>
              <input aria-label={`Draft ${index}`} defaultValue="Keep me" />
              <p>Slide {index}</p>
            </Carousel.Item>
          ))}
        </Carousel.Track>
      </Carousel.Viewport>
      <Controls />
    </Carousel>
  );
}
const root = () => screen.getByRole('region', { name: 'Examples' });
it('preserves drafts and makes inactive slides inert; keyboard does not take over inputs', () => {
  render(<Example />);
  const input = screen.getByRole('textbox', { name: 'Draft 0' });
  fireEvent.change(input, { target: { value: 'Edited draft' } });
  fireEvent.keyDown(input, { key: 'ArrowRight' });
  expect(root()).toHaveAttribute('data-index', '0');
  fireEvent.keyDown(screen.getByTestId('viewport'), { key: 'ArrowRight' });
  expect(screen.getByTestId('slide-0')).toHaveAttribute('inert');
  expect(screen.queryByRole('textbox', { name: 'Draft 0' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
  expect(screen.getByRole('textbox', { name: 'Draft 0' })).toBe(input);
  expect(input).toHaveValue('Edited draft');
});
it('requests controlled changes without overriding the controlled index, and clamps contracted ranges', () => {
  const onIndexChange = vi.fn();
  const { rerender } = render(<Example index={1} onIndexChange={onIndexChange} />);
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  expect(onIndexChange).toHaveBeenCalledWith(2);
  expect(root()).toHaveAttribute('data-index', '1');
  rerender(<Example index={2} count={1} />);
  expect(root()).toHaveAttribute('data-index', '0');
  expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
});
it('persists an uncontrolled clamp when slide count shrinks and grows', () => {
  const { rerender } = render(<Example defaultIndex={2} />);
  rerender(<Example defaultIndex={2} count={1} />);
  rerender(<Example defaultIndex={2} count={3} />);
  expect(root()).toHaveAttribute('data-index', '0');
});
it('loops in either direction', () => {
  render(<Example loop />);
  fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
  expect(root()).toHaveAttribute('data-index', '2');
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  expect(root()).toHaveAttribute('data-index', '0');
});
it('accumulates horizontal wheel intent, locks momentum, supports Shift-wheel and preserves vertical scroll', () => {
  vi.useFakeTimers();
  render(<Example wheel />);
  const viewport = screen.getByTestId('viewport');
  const vertical = new WheelEvent('wheel', { deltaY: 200, bubbles: true, cancelable: true });
  fireEvent(viewport, vertical);
  expect(vertical.defaultPrevented).toBe(false);
  fireEvent.wheel(viewport, { deltaX: 71 });
  expect(root()).toHaveAttribute('data-index', '0');
  fireEvent.wheel(viewport, { deltaX: 4 });
  expect(root()).toHaveAttribute('data-index', '1');
  fireEvent.wheel(viewport, { deltaX: -100 });
  expect(root()).toHaveAttribute('data-index', '1');
  act(() => vi.advanceTimersByTime(300));
  fireEvent.wheel(viewport, { deltaY: 100, shiftKey: true });
  expect(root()).toHaveAttribute('data-index', '2');
});
it('pauses autoplay for hover, focus and explicit pause, then resumes; reduced motion blocks playback', () => {
  vi.useFakeTimers();
  const { unmount } = render(<Example loop autoPlay interval={1000} />);
  act(() => vi.advanceTimersByTime(1000));
  expect(root()).toHaveAttribute('data-index', '1');
  fireEvent.mouseEnter(root());
  act(() => vi.advanceTimersByTime(3000));
  expect(root()).toHaveAttribute('data-index', '1');
  fireEvent.mouseLeave(root());
  act(() => vi.advanceTimersByTime(1000));
  expect(root()).toHaveAttribute('data-index', '2');
  fireEvent.focus(screen.getByTestId('viewport'));
  act(() => vi.advanceTimersByTime(2000));
  expect(root()).toHaveAttribute('data-index', '2');
  fireEvent.blur(screen.getByTestId('viewport'), { relatedTarget: document.body });
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  act(() => vi.advanceTimersByTime(2000));
  expect(root()).toHaveAttribute('data-index', '2');
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  act(() => vi.advanceTimersByTime(1000));
  expect(root()).toHaveAttribute('data-index', '0');
  unmount();
  reduced = true;
  render(<Example loop autoPlay interval={1000} />);
  act(() => vi.advanceTimersByTime(2000));
  expect(root()).toHaveAttribute('data-index', '0');
});
it('exposes every page in stacked mode and suppresses navigation and playback', () => {
  vi.useFakeTimers();
  render(<Example layout="stacked" autoPlay loop wheel />);
  expect(screen.getAllByRole('textbox')).toHaveLength(3);
  expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  fireEvent.keyDown(screen.getByTestId('viewport'), { key: 'End' });
  fireEvent.wheel(screen.getByTestId('viewport'), { deltaX: 100 });
  act(() => vi.advanceTimersByTime(10000));
  expect(root()).toHaveAttribute('data-index', '0');
});
describe('pointer gestures', () => {
  beforeEach(() => vi.stubGlobal('PointerEvent', MouseEvent));
  it('drags horizontally, cancels vertical intent and resets cancelled gestures', () => {
    render(<Example />);
    const viewport = screen.getByTestId('viewport');
    fireEvent.pointerDown(viewport, { clientX: 200, clientY: 50, button: 0 });
    fireEvent.pointerMove(viewport, { clientX: 100, clientY: 55 });
    fireEvent.pointerUp(viewport);
    expect(root()).toHaveAttribute('data-index', '1');
    fireEvent.pointerDown(viewport, { clientX: 200, clientY: 50, button: 0 });
    fireEvent.pointerMove(viewport, { clientX: 195, clientY: 150 });
    fireEvent.pointerUp(viewport);
    expect(root()).toHaveAttribute('data-index', '1');
    fireEvent.pointerDown(viewport, { clientX: 200, clientY: 50, button: 0 });
    fireEvent.pointerMove(viewport, { clientX: 100, clientY: 55 });
    fireEvent.pointerCancel(viewport);
    expect(root()).toHaveAttribute('data-index', '1');
    expect(viewport.style.getPropertyValue('--carousel-drag-offset')).toBe('');
  });
});
