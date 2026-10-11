import { act, fireEvent, render, screen } from '@testing-library/react';
import { StrictMode, useEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Tooltip } from '../Tooltip';
import { Cursor, type CursorPointer, type CursorProviderProps } from './index';

let pointer: CursorPointer | null;
let renders = 0;
function Probe() {
  pointer = Cursor.usePointer();
  renders++;
  useEffect(() => pointer?.subscribe(() => {}), []);
  return <button>Target</button>;
}
function move(target: Element, x = 100, y = 120, type = 'mouse', buttons = 0) {
  fireEvent.pointerMove(target, { clientX: x, clientY: y, pointerType: type, buttons });
}
function frame() {
  act(() => vi.advanceTimersByTime(20));
}
function visual() {
  return document.querySelector<HTMLElement>('[data-cursor-visual]')!;
}
function Fixture(props: CursorProviderProps) {
  return (
    <Cursor.Provider {...props}>
      <Tooltip openDelay={0}>
        <Tooltip.Trigger>Copy</Tooltip.Trigger>
        <Tooltip.Content>Copy link</Tooltip.Content>
      </Tooltip>
    </Cursor.Provider>
  );
}
function hover(x = 100, y = 120) {
  const target = screen.getByRole('button', { name: 'Copy' });
  move(target, x, y);
  fireEvent.pointerEnter(target, { pointerType: 'mouse', clientX: x, clientY: y });
  frame();
  return target;
}

beforeEach(() => {
  vi.useFakeTimers();
  // jsdom has no native PointerEvent; preserve actual mouse coordinates and input type.
  vi.stubGlobal(
    'PointerEvent',
    class extends MouseEvent {
      pointerType: string;
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerType = init.pointerType ?? 'mouse';
      }
    },
  );
  pointer = null;
  renders = 0;
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Cursor', () => {
  it.each([
    ['sm', 16],
    ['md', 20],
    ['lg', 24],
  ] as const)('sizes the %s visual and scales the hotspot to %ipx', (size, pixels) => {
    render(
      <Cursor.Provider size={size}>
        <Probe />
      </Cursor.Provider>,
    );
    move(screen.getByRole('button'));
    frame();
    expect(visual().querySelector('svg')).toHaveAttribute('width', String(pixels));
    expect(visual().querySelector('svg')).toHaveAttribute('height', String(pixels));
    expect(visual().style.transform).toBe(
      `translate3d(${100 - (5 * pixels) / 24}px, ${120 - (3 * pixels) / 24}px, 0)`,
    );
  });
  it('defaults to the smaller 20px medium visual', () => {
    render(
      <Cursor.Provider>
        <Probe />
      </Cursor.Provider>,
    );
    expect(visual().querySelector('svg')).toHaveAttribute('width', '20');
    expect(visual().querySelector('svg')).toHaveAttribute('data-size', 'md');
  });
  it('leaves custom dimensions intact and gives an unspecified custom hotspot the origin', () => {
    render(
      <Cursor.Provider size="sm" cursor={<svg data-testid="custom-sized" width={32} height={32} />}>
        <Probe />
      </Cursor.Provider>,
    );
    move(screen.getByRole('button'));
    frame();
    expect(screen.getByTestId('custom-sized')).toHaveAttribute('width', '32');
    expect(visual().style.transform).toBe('translate3d(100px, 120px, 0)');
  });

  it('inherits Virgo Appearance and updates its portal while the pointer is stationary', async () => {
    const previousTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.dataset.theme = 'light';
    try {
      render(
        <Cursor.Provider>
          <Probe />
          <Cursor.Follower data-testid="themed-feedback">Feedback</Cursor.Follower>
        </Cursor.Provider>,
      );
      move(screen.getByRole('button'));
      frame();
      expect(visual()).toHaveAttribute('data-theme', 'light');
      expect(screen.getByTestId('themed-feedback')).toHaveAttribute('data-theme', 'light');
      await act(async () => {
        document.documentElement.dataset.theme = 'dark';
      });
      expect(visual()).toHaveAttribute('data-theme', 'dark');
      expect(screen.getByTestId('themed-feedback')).toHaveAttribute('data-theme', 'dark');
      await act(async () => {
        document.documentElement.dataset.theme = 'light';
      });
      expect(visual()).toHaveAttribute('data-theme', 'light');
    } finally {
      if (previousTheme === null) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', previousTheme);
    }
  });
  it('inherits the nearest local theme instead of assuming the document theme', () => {
    render(
      <div data-theme="dark">
        <Cursor.Provider>
          <div data-theme="light">
            <Probe />
          </div>
        </Cursor.Provider>
      </div>,
    );
    move(screen.getByRole('button'));
    frame();
    expect(visual()).toHaveAttribute('data-theme', 'light');
  });

  it('coalesces coordinates/buttons once per frame without re-rendering children', () => {
    render(
      <Cursor.Provider>
        <Probe />
      </Cursor.Provider>,
    );
    const listener = vi.fn();
    const unsubscribe = pointer!.subscribe(listener);
    const initialRenders = renders;
    const target = screen.getByRole('button');
    move(target, 40, 50);
    move(target, 60, 70, 'mouse', 1);
    move(target, 80, 90, 'mouse', 1);
    expect(listener).not.toHaveBeenCalled();
    frame();
    expect(listener).toHaveBeenCalledOnce();
    expect(pointer!.getSnapshot()).toMatchObject({
      x: 80,
      y: 90,
      buttons: 1,
      active: true,
      visible: true,
      pointerType: 'mouse',
    });
    expect(visual().style.transform).toBe(`translate3d(${80 - (5 * 20) / 24}px, 87.5px, 0)`);
    expect(visual()).toHaveAttribute('aria-hidden', 'true');
    expect(visual()).toHaveAttribute('inert');
    expect(renders).toBe(initialRenders);
    unsubscribe();
    move(target);
    frame();
    expect(listener).toHaveBeenCalledOnce();
  });
  it('replaces the default geometry and aligns the custom hotspot', () => {
    render(
      <Cursor.Provider cursor={<span data-testid="custom">Custom</span>} hotspot={{ x: 10, y: 8 }}>
        <Probe />
      </Cursor.Provider>,
    );
    move(screen.getByRole('button'));
    frame();
    expect(visual()).toContainElement(screen.getByTestId('custom'));
    expect(visual().querySelector('svg')).toBeNull();
    expect(visual().style.transform).toBe('translate3d(90px, 112px, 0)');
    expect(visual()).toHaveStyle({ pointerEvents: 'none', visibility: 'visible' });
  });
  it.each(['touch', 'pen'])('keeps %s native and hides an existing mouse visual', (type) => {
    render(
      <Cursor.Provider>
        <Probe />
      </Cursor.Provider>,
    );
    move(screen.getByRole('button'));
    frame();
    move(screen.getByRole('button'), 40, 50, type);
    frame();
    expect(pointer!.getSnapshot()).toMatchObject({
      active: false,
      visible: false,
      pointerType: type,
    });
    expect(visual()).toHaveStyle({ visibility: 'hidden' });
  });
  it.each(['blur', 'visibilitychange', 'pointercancel', 'scroll', 'popstate', 'hashchange'])(
    'resets on %s and cancels pending frames',
    (event) => {
      render(
        <Cursor.Provider>
          <Probe />
        </Cursor.Provider>,
      );
      const target = screen.getByRole('button');
      move(target);
      frame();
      move(target, 300, 400);
      fireEvent(
        ['blur', 'popstate', 'hashchange'].includes(event) ? window : document,
        new Event(event),
      );
      frame();
      expect(pointer!.getSnapshot()).toMatchObject({ active: false, visible: false });
      expect(visual()).toHaveStyle({ visibility: 'hidden' });
    },
  );
  it('resets on leaving scope, route key changes, disabled, and target removal', async () => {
    const { rerender } = render(
      <Cursor.Provider resetKey="first">
        <Probe />
      </Cursor.Provider>,
    );
    const target = screen.getByRole('button');
    move(target);
    frame();
    fireEvent.pointerOut(target, { relatedTarget: document.body });
    expect(pointer!.getSnapshot().visible).toBe(false);
    move(target);
    frame();
    rerender(
      <Cursor.Provider resetKey="second">
        <Probe />
      </Cursor.Provider>,
    );
    expect(pointer!.getSnapshot().visible).toBe(false);
    move(target);
    frame();
    rerender(
      <Cursor.Provider disabled>
        <Probe />
      </Cursor.Provider>,
    );
    expect(pointer!.getSnapshot().visible).toBe(false);
    rerender(
      <Cursor.Provider>
        <Probe />
      </Cursor.Provider>,
    );
    move(target);
    frame();
    await act(async () => {
      rerender(
        <Cursor.Provider>
          <span>New route</span>
        </Cursor.Provider>,
      );
    });
    expect(pointer!.getSnapshot().visible).toBe(false);
  });
  it('gives nested scopes exclusive ownership and restores outer ownership on return', () => {
    render(
      <Cursor.Provider data-testid="outer">
        <button>Outer</button>
        <Cursor.Provider data-testid="inner">
          <button>Inner</button>
        </Cursor.Provider>
      </Cursor.Provider>,
    );
    move(screen.getByRole('button', { name: 'Outer' }));
    frame();
    expect(screen.getByTestId('outer')).toHaveAttribute('data-cursor-active', 'true');
    move(screen.getByRole('button', { name: 'Inner' }));
    frame();
    expect(screen.getByTestId('inner')).toHaveAttribute('data-cursor-active', 'true');
    expect(screen.getByTestId('outer')).toHaveAttribute('data-cursor-active', 'false');
    move(screen.getByRole('button', { name: 'Outer' }));
    frame();
    expect(screen.getByTestId('inner')).toHaveAttribute('data-cursor-active', 'false');
    expect(screen.getByTestId('outer')).toHaveAttribute('data-cursor-active', 'true');
  });
  it('cleans up in StrictMode and after unmount, with no retained tracking', () => {
    const { unmount } = render(
      <StrictMode>
        <Cursor.Provider>
          <Probe />
          <Cursor.Follower>Coordinates</Cursor.Follower>
        </Cursor.Provider>
      </StrictMode>,
    );
    move(screen.getByRole('button'));
    frame();
    const store = pointer!;
    const listener = vi.fn();
    store.subscribe(listener);
    move(screen.getByRole('button'), 200, 200);
    unmount();
    expect(store.getSnapshot().active).toBe(false);
    const calls = listener.mock.calls.length;
    move(document.body);
    frame();
    expect(listener).toHaveBeenCalledTimes(calls);
    expect(document.querySelector('[data-cursor-visual]')).toBeNull();
    expect(document.querySelector('[data-cursor-follower]')).toBeNull();
  });
  it('provides generic followers while retaining the native cursor with cursor=null', () => {
    render(
      <Cursor.Provider cursor={null}>
        <Probe />
        <Cursor.Follower data-testid="feedback">Coordinates</Cursor.Follower>
      </Cursor.Provider>,
    );
    move(screen.getByRole('button'));
    frame();
    expect(document.querySelector('[data-cursor-visual]')).toBeNull();
    expect(screen.getByTestId('feedback').style.translate).toBe('112px 138px');
    expect(screen.getByTestId('feedback')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('feedback')).toHaveAttribute('inert');
  });
});

describe('Cursor + Tooltip', () => {
  it('keeps the local preset, appearance and direction on stationary pointer portals', async () => {
    const fixture = () => (
      <section data-virgo-theme="virgo" data-theme="light" dir="ltr">
        <div data-testid="local-scope" data-virgo-theme="glass" data-theme="dark" dir="rtl">
          <Fixture follow={{ tooltip: true }} />
        </div>
      </section>
    );
    const { rerender, unmount } = render(fixture());
    hover();
    const panel = screen.getByRole('tooltip');
    const scope = screen.getByTestId('local-scope');
    const expectEnvironment = (theme: string, appearance: string, direction: string) => {
      for (const element of [panel, visual()]) {
        expect(element).toHaveAttribute('data-virgo-theme', theme);
        expect(element).toHaveAttribute('data-theme', appearance);
        expect(element).toHaveAttribute('dir', direction);
      }
      expect(panel).toHaveAttribute('data-pointer-follow', 'true');
      expect(panel).toHaveStyle({ visibility: 'visible' });
    };
    expectEnvironment('glass', 'dark', 'rtl');
    for (const theme of ['soft', 'contrast']) {
      await act(async () => {
        scope.dataset.virgoTheme = theme;
        scope.dataset.theme = 'light';
        scope.dir = 'ltr';
      });
      expectEnvironment(theme, 'light', 'ltr');
    }
    rerender(fixture());
    expectEnvironment('contrast', 'light', 'ltr');
    await act(async () => {
      scope.removeAttribute('data-virgo-theme');
      scope.removeAttribute('data-theme');
      scope.removeAttribute('dir');
    });
    expectEnvironment('virgo', 'light', 'ltr');
    unmount();
    expect(panel).not.toBeInTheDocument();
    expect(document.querySelector('[data-cursor-visual]')).toBeNull();
  });
  it('does not change ordinary Tooltip lifetime when a Provider has follow disabled', () => {
    render(<Fixture follow={{ tooltip: false }} />);
    hover();
    fireEvent.scroll(document);
    expect(screen.getByRole('tooltip')).toBeVisible();
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-pointer-follow');
  });
  it('keeps element anchored hover in a disabled Provider', () => {
    render(<Fixture disabled follow={{ tooltip: true }} />);
    hover();
    expect(screen.getByRole('tooltip')).toBeVisible();
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-pointer-follow');
    expect(visual()).toHaveStyle({ visibility: 'hidden' });
  });
  it('cancels pending hover delay when the pointer leaves the scope', () => {
    render(
      <Cursor.Provider follow={{ tooltip: true }}>
        <Tooltip openDelay={500}>
          <Tooltip.Trigger>Copy</Tooltip.Trigger>
          <Tooltip.Content>Delayed</Tooltip.Content>
        </Tooltip>
      </Cursor.Provider>,
    );
    const target = hover();
    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.pointerOut(target, { relatedTarget: document.body });
    act(() => vi.advanceTimersByTime(600));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('follows hover automatically and updates positions without re-rendering content', () => {
    let contentRenders = 0;
    function Content() {
      contentRenders++;
      return <>Copy link</>;
    }
    render(
      <Cursor.Provider follow={{ tooltip: true }}>
        <Tooltip openDelay={0}>
          <Tooltip.Trigger>Copy</Tooltip.Trigger>
          <Tooltip.Content>
            <Content />
          </Tooltip.Content>
        </Tooltip>
      </Cursor.Provider>,
    );
    const target = hover();
    const panel = screen.getByRole('tooltip');
    const initialRenders = contentRenders;
    expect(panel).toHaveAttribute('data-pointer-follow', 'true');
    expect(panel.style.translate).toBe('112px 138px');
    expect(target).toHaveAccessibleDescription('Copy link');
    move(target, 240, 260);
    frame();
    expect(panel.style.translate).toBe('252px 278px');
    expect(panel).toHaveStyle({ pointerEvents: 'none' });
    expect(contentRenders).toBe(initialRenders);
  });
  it.each([false, undefined])('keeps element anchoring when follow is %s', (enabled) => {
    render(<Fixture follow={enabled === undefined ? {} : { tooltip: enabled }} />);
    hover();
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-pointer-follow');
    expect(screen.getByRole('tooltip').style.translate).toBe('');
  });
  it('keeps ordinary Tooltip behavior without a Provider', () => {
    render(
      <Tooltip openDelay={0}>
        <Tooltip.Trigger>Copy</Tooltip.Trigger>
        <Tooltip.Content>Copy link</Tooltip.Content>
      </Tooltip>,
    );
    hover();
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-pointer-follow');
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Copy link');
  });
  it('returns to the element anchor for keyboard focus and preserves Escape dismissal', () => {
    render(<Fixture follow={{ tooltip: true }} />);
    const target = hover();
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.focus(target);
    const panel = screen.getByRole('tooltip');
    expect(panel).not.toHaveAttribute('data-pointer-follow');
    expect(panel.style.translate).toBe('');
    expect(visual()).toHaveStyle({ visibility: 'hidden' });
    expect(target).toHaveAccessibleDescription('Copy link');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
  it('composes a custom cursor with the same follow tooltip and can toggle follow at runtime', () => {
    const { rerender } = render(
      <Fixture cursor={<span data-testid="custom">Custom</span>} follow={{ tooltip: true }} />,
    );
    hover();
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-pointer-follow', 'true');
    expect(visual()).toContainElement(screen.getByTestId('custom'));
    rerender(
      <Fixture cursor={<span data-testid="custom">Custom</span>} follow={{ tooltip: false }} />,
    );
    expect(screen.getByRole('tooltip')).not.toHaveAttribute('data-pointer-follow');
    expect(screen.getByRole('tooltip').style.translate).toBe('');
  });
  it('flips and shifts at viewport edges while keeping the panel away from the pointer', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(180);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(40);
    render(<Fixture follow={{ tooltip: true }} />);
    hover(window.innerWidth - 4, window.innerHeight - 4);
    const panel = screen.getByRole('tooltip');
    expect(panel).toHaveAttribute('data-side', 'top');
    const [x, y] = panel.style.translate.split(' ').map(parseFloat);
    expect(x! + 180).toBeLessThanOrEqual(window.innerWidth - 8);
    expect(y! + 40).toBeLessThan(window.innerHeight - 4);
  });
  it('closes hover feedback and cancels a delayed tooltip after leaving the scope', () => {
    render(<Fixture follow={{ tooltip: true }} />);
    const target = hover();
    fireEvent.pointerOut(target, { relatedTarget: document.body });
    frame();
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(visual()).toHaveStyle({ visibility: 'hidden' });
  });
});
