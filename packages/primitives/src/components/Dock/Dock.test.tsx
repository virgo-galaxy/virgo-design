import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  Dock,
  type DockEdge,
  type DockPlacement,
  type DockRootProps,
  type DockSnapDivisions,
} from './index';

function LockPinExample(props: DockRootProps) {
  return (
    <Dock.Boundary data-testid="boundary">
      <Dock.Root {...props} data-testid="dock">
        {({ locked, pinned, setLocked, setPinned }) => (
          <>
            <Dock.Handle />
            <button onClick={() => setLocked(!locked)}>Toggle lock</button>
            <button onClick={() => setPinned(!pinned)}>Toggle pin</button>
          </>
        )}
      </Dock.Root>
    </Dock.Boundary>
  );
}

function rect(width = 600, height = 400): DOMRect {
  return {
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRect;
}

function Example({
  onPlacementChange,
  allowedEdges,
  snapDivisions = 4,
}: {
  onPlacementChange?: (placement: DockPlacement) => void;
  allowedEdges?: readonly DockEdge[];
  snapDivisions?: DockSnapDivisions;
}) {
  return (
    <Dock.Boundary data-testid="boundary">
      <Dock.Root
        defaultPlacement={{ edge: 'top', position: 0 }}
        allowedEdges={allowedEdges}
        snapDivisions={snapDivisions}
        onPlacementChange={onPlacementChange}
        data-testid="dock"
      >
        {({ orientation }) => (
          <>
            <Dock.Handle />
            <Dock.Content data-testid="content">{orientation}</Dock.Content>
          </>
        )}
      </Dock.Root>
    </Dock.Boundary>
  );
}

describe('Dock primitive', () => {
  it.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])('keeps movement locking (%s) independent from fixed pinning (%s)', (locked, pinned) => {
    render(<LockPinExample defaultLocked={locked} defaultPinned={pinned} />);
    const dock = screen.getByTestId('dock');
    const handle = screen.getByRole('button', { name: 'Move dock' });
    expect(handle.hasAttribute('disabled')).toBe(locked);
    expect(dock.hasAttribute('data-pinned')).toBe(pinned);
    fireEvent.keyDown(handle, { key: 'End' });
    expect(dock).toHaveAttribute('data-position', locked ? '0' : '1');
    fireEvent.pointerDown(handle, { button: 0 });
    expect(dock.hasAttribute('data-dragging')).toBe(!locked);
    fireEvent.pointerUp(window);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle pin' }));
    expect(dock.hasAttribute('data-pinned')).toBe(!pinned);
    expect(handle.hasAttribute('disabled')).toBe(locked);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle lock' }));
    expect(handle.hasAttribute('disabled')).toBe(!locked);
    expect(dock.hasAttribute('data-pinned')).toBe(!pinned);
  });

  it('reports controlled lock and pin changes without overriding their owner', () => {
    const onLockedChange = vi.fn();
    const onPinnedChange = vi.fn();
    const { rerender } = render(
      <LockPinExample
        locked={false}
        pinned={false}
        onLockedChange={onLockedChange}
        onPinnedChange={onPinnedChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle lock' }));
    fireEvent.click(screen.getByRole('button', { name: 'Toggle pin' }));
    expect(onLockedChange).toHaveBeenCalledWith(true);
    expect(onPinnedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Move dock' })).toBeEnabled();
    expect(screen.getByTestId('dock')).not.toHaveAttribute('data-pinned');
    rerender(<LockPinExample locked pinned />);
    expect(screen.getByRole('button', { name: 'Move dock' })).toBeDisabled();
    expect(screen.getByTestId('dock')).toHaveAttribute('data-pinned');
  });

  it('stops an active drag immediately when locked and resumes only with a new drag', () => {
    render(<LockPinExample />);
    screen.getByTestId('boundary').getBoundingClientRect = () => rect();
    const handle = screen.getByRole('button', { name: 'Move dock' });
    const dock = screen.getByTestId('dock');
    fireEvent.pointerDown(handle, { button: 0 });
    fireEvent.click(screen.getByRole('button', { name: 'Toggle lock' }));
    fireEvent.pointerMove(window, { clientX: 600, clientY: 200 });
    expect(dock).not.toHaveAttribute('data-dragging');
    expect(dock).toHaveAttribute('data-edge', 'top');
    expect(dock).toHaveAttribute('data-position', '0');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle lock' }));
    fireEvent.pointerMove(window, { clientX: 600, clientY: 200 });
    expect(dock).toHaveAttribute('data-edge', 'top');
    fireEvent.pointerDown(handle, { button: 0 });
    fireEvent.pointerMove(window, { clientX: 600, clientY: 200 });
    expect(dock).toHaveAttribute('data-edge', 'right');
    fireEvent.pointerUp(window);
  });

  it('preserves the local docking frame when pinned below a page header', () => {
    render(<LockPinExample snapDivisions={false} />);
    const boundary = screen.getByTestId('boundary');
    boundary.getBoundingClientRect = () => new DOMRect(20, 96, 600, 1200);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle pin' }));
    const dock = screen.getByTestId('dock');
    expect(dock.style.getPropertyValue('--vd-dock-fixed-top')).toBe('96px');
    expect(dock.style.getPropertyValue('--vd-dock-fixed-left')).toBe('20px');

    // The document scrolls, but both rendered positioning and pointer mapping retain
    // the frame captured when pinning rather than snapping beneath the header.
    boundary.getBoundingClientRect = () => new DOMRect(20, -104, 600, 1200);
    fireEvent.scroll(window);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Move dock' }), { button: 0 });
    fireEvent.pointerMove(window, { clientX: 620, clientY: 396 });
    expect(dock).toHaveAttribute('data-edge', 'right');
    expect(dock).toHaveAttribute('data-position', '0.25');
    expect(dock.style.getPropertyValue('--vd-dock-fixed-top')).toBe('96px');
    fireEvent.pointerUp(window);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle pin' }));
    expect(dock.style.getPropertyValue('--vd-dock-fixed-top')).toBe('');
    boundary.getBoundingClientRect = () => new DOMRect(20, 48, 600, 1200);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle pin' }));
    expect(dock.style.getPropertyValue('--vd-dock-fixed-top')).toBe('48px');
  });

  it('captures the frame when pinning is changed by a controlled owner', () => {
    const { rerender } = render(<LockPinExample pinned={false} />);
    screen.getByTestId('boundary').getBoundingClientRect = () => new DOMRect(24, 96, 600, 400);
    rerender(<LockPinExample pinned />);
    expect(screen.getByTestId('dock').style.getPropertyValue('--vd-dock-fixed-top')).toBe('96px');
  });

  it('falls back to viewport coordinates when no boundary dimensions are available', () => {
    render(<LockPinExample defaultPinned />);
    screen.getByTestId('boundary').getBoundingClientRect = () => rect(100, 100);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Move dock' }), { button: 0 });
    fireEvent.pointerMove(window, { clientX: window.innerWidth / 2, clientY: 0 });
    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'top');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');
    fireEvent.pointerUp(window);
  });

  it('maps pinned dragging to a transformed containing block in embedded previews', () => {
    render(
      <div data-testid="viewport" style={{ transform: 'translateZ(0)' }}>
        <LockPinExample defaultPinned />
      </div>,
    );
    const viewport = screen.getByTestId('viewport');
    viewport.getBoundingClientRect = () => rect(800, 400);
    Object.defineProperties(viewport, {
      clientWidth: { value: 800 },
      clientHeight: { value: 400 },
    });
    screen.getByTestId('boundary').getBoundingClientRect = () => rect(100, 100);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Move dock' }), { button: 0 });
    fireEvent.pointerMove(window, { clientX: 400, clientY: 0 });
    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'top');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');
    fireEvent.pointerUp(window);
  });

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('exposes normalized placement and orientation to compound parts', () => {
    render(
      <Dock.Boundary>
        <Dock.Root defaultPlacement={{ edge: 'right', position: 1.5 }} data-testid="dock">
          {({ orientation }) => (
            <>
              <Dock.Handle />
              <Dock.Content data-testid="content">{orientation}</Dock.Content>
            </>
          )}
        </Dock.Root>
      </Dock.Boundary>,
    );

    const dock = screen.getByTestId('dock');
    expect(dock).toHaveAttribute('data-edge', 'right');
    expect(dock).toHaveAttribute('data-position', '1');
    expect(dock).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByTestId('content')).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByRole('button', { name: 'Move dock' })).toHaveAttribute(
      'data-orientation',
      'vertical',
    );
  });

  it('places the movement handle at the logical start by default and supports logical end placement', () => {
    const { rerender } = render(
      <Dock.Boundary>
        <Dock.Root>
          <Dock.Handle />
          <Dock.Content>Tools</Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByRole('button', { name: 'Move dock' })).toHaveAttribute(
      'data-position',
      'start',
    );

    rerender(
      <Dock.Boundary>
        <Dock.Root>
          <Dock.Handle position="end" />
          <Dock.Content>Tools</Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByRole('button', { name: 'Move dock' })).toHaveAttribute(
      'data-position',
      'end',
    );
  });

  it('drags across all four boundary edges and snaps to the grid', () => {
    const onPlacementChange = vi.fn();
    render(<Example onPlacementChange={onPlacementChange} />);
    const boundary = screen.getByTestId('boundary');
    boundary.getBoundingClientRect = () => rect();

    const handle = screen.getByRole('button', { name: 'Move dock' });
    fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
    expect(screen.getByTestId('dock')).toHaveAttribute('data-dragging', 'true');

    fireEvent.pointerMove(window, { clientX: 595, clientY: 210 });
    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'right');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');
    expect(screen.getByTestId('content')).toHaveTextContent('vertical');

    fireEvent.pointerMove(window, { clientX: 305, clientY: 395 });
    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'bottom');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');
    expect(screen.getByTestId('content')).toHaveTextContent('horizontal');

    fireEvent.pointerUp(window);
    expect(screen.getByTestId('dock')).not.toHaveAttribute('data-dragging');
    expect(onPlacementChange).toHaveBeenCalledWith({ edge: 'right', position: 0.5 });
    expect(onPlacementChange).toHaveBeenCalledWith({ edge: 'bottom', position: 0.5 });
  });

  it('supports continuous free positioning without grid quantization', () => {
    render(<Example snapDivisions={false} />);
    const boundary = screen.getByTestId('boundary');
    boundary.getBoundingClientRect = () => rect();

    const dock = screen.getByTestId('dock');
    const handle = screen.getByRole('button', { name: 'Move dock' });
    expect(dock).toHaveAttribute('data-positioning', 'free');
    expect(dock).not.toHaveAttribute('data-snap-divisions');

    fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { clientX: 222, clientY: 4 });
    expect(dock).toHaveAttribute('data-edge', 'top');
    expect(dock).toHaveAttribute('data-position', '0.37');
    fireEvent.pointerUp(window);

    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(dock).toHaveAttribute('data-position', '0.38');
  });

  it('provides a keyboard alternative for snap movement and edge changes', () => {
    render(<Example />);
    const handle = screen.getByRole('button', { name: 'Move dock' });
    const dock = screen.getByTestId('dock');

    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(dock).toHaveAttribute('data-edge', 'top');
    expect(dock).toHaveAttribute('data-position', '0.25');

    fireEvent.keyDown(handle, { key: 'ArrowLeft', altKey: true });
    expect(dock).toHaveAttribute('data-edge', 'left');
    expect(dock).toHaveAttribute('data-orientation', 'vertical');

    fireEvent.keyDown(handle, { key: 'ArrowDown' });
    expect(dock).toHaveAttribute('data-position', '0.5');

    fireEvent.keyDown(handle, { key: 'ArrowDown', altKey: true });
    expect(dock).toHaveAttribute('data-edge', 'bottom');
    expect(dock).toHaveAttribute('data-orientation', 'horizontal');

    fireEvent.keyDown(handle, { key: 'End' });
    expect(dock).toHaveAttribute('data-position', '1');
  });

  it('constrains an unavailable initial edge to the first allowed edge', () => {
    render(
      <Dock.Boundary>
        <Dock.Root
          allowedEdges={['left', 'right']}
          defaultPlacement={{ edge: 'bottom', position: 0.5 }}
          data-testid="dock"
        >
          <Dock.Handle />
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'left');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');
  });

  it('restricts pointer and keyboard edge changes to allowed edges', () => {
    render(<Example allowedEdges={['top', 'left', 'right']} />);
    const boundary = screen.getByTestId('boundary');
    boundary.getBoundingClientRect = () => rect();

    const dock = screen.getByTestId('dock');
    const handle = screen.getByRole('button', { name: 'Move dock' });
    expect(dock).toHaveAttribute('data-allowed-edges', 'top left right');
    expect(handle.getAttribute('aria-keyshortcuts')).not.toContain('Alt+ArrowDown');

    fireEvent.pointerDown(handle, { button: 0, clientX: 0, clientY: 0 });
    fireEvent.pointerMove(window, { clientX: 305, clientY: 395 });
    expect(dock).toHaveAttribute('data-edge', 'right');
    expect(dock).not.toHaveAttribute('data-edge', 'bottom');
    fireEvent.pointerUp(window);

    fireEvent.keyDown(handle, { key: 'ArrowDown', altKey: true });
    expect(dock).toHaveAttribute('data-edge', 'right');

    fireEvent.keyDown(handle, { key: 'ArrowLeft', altKey: true });
    expect(dock).toHaveAttribute('data-edge', 'left');
  });

  it('persists and restores uncontrolled placement from local storage', () => {
    const storageKey = 'vd:dock:test-local:v1';
    localStorage.setItem(storageKey, JSON.stringify({ edge: 'right', position: 0.5 }));

    const { unmount } = render(
      <Dock.Boundary>
        <Dock.Root
          defaultPlacement={{ edge: 'top', position: 0 }}
          persist={{ storage: 'local', key: 'test-local' }}
          snapDivisions={4}
          data-testid="dock"
        >
          <Dock.Handle />
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'right');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');

    fireEvent.keyDown(screen.getByRole('button', { name: 'Move dock' }), { key: 'End' });
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}')).toEqual({
      edge: 'right',
      position: 1,
    });

    unmount();
    render(
      <Dock.Boundary>
        <Dock.Root
          defaultPlacement={{ edge: 'top', position: 0 }}
          persist={{ storage: 'local', key: 'test-local' }}
          data-testid="restored-dock"
        >
          <Dock.Handle />
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('restored-dock')).toHaveAttribute('data-edge', 'right');
    expect(screen.getByTestId('restored-dock')).toHaveAttribute('data-position', '1');
  });

  it('supports session storage independently from local storage', () => {
    localStorage.setItem(
      'vd:dock:test-session:v1',
      JSON.stringify({ edge: 'left', position: 0.25 }),
    );
    sessionStorage.setItem(
      'vd:dock:test-session:v1',
      JSON.stringify({ edge: 'right', position: 0.75 }),
    );

    render(
      <Dock.Boundary>
        <Dock.Root persist={{ storage: 'session', key: 'test-session' }} data-testid="dock">
          <Dock.Handle />
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'right');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.75');
  });

  it('keeps allowed edges authoritative over persisted placement', () => {
    const storageKey = 'vd:dock:test-restricted:v1';
    localStorage.setItem(storageKey, JSON.stringify({ edge: 'bottom', position: 0.5 }));

    render(
      <Dock.Boundary>
        <Dock.Root
          allowedEdges={['top', 'left', 'right']}
          defaultPlacement={{ edge: 'top', position: 0 }}
          persist={{ storage: 'local', key: 'test-restricted' }}
          data-testid="dock"
        >
          <Dock.Handle />
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'top');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.5');
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}')).toEqual({
      edge: 'top',
      position: 0.5,
    });
  });

  it('disables pointer and keyboard repositioning from the root', () => {
    render(
      <Dock.Boundary>
        <Dock.Root disabled defaultPlacement={{ edge: 'top', position: 0 }} data-testid="dock">
          <Dock.Handle />
        </Dock.Root>
      </Dock.Boundary>,
    );

    const handle = screen.getByRole('button', { name: 'Move dock' });
    expect(handle).toBeDisabled();
    fireEvent.keyDown(handle, { key: 'End' });
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0');
  });
});
