import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Dock } from './index';

describe('Dock UI', () => {
  it('includes working lock and pin controls without consumer-owned actions or state', () => {
    render(
      <Dock data-testid="dock">
        <Dock.Handle />
        <Dock.Content>Tools</Dock.Content>
      </Dock>,
    );
    expect(
      within(screen.getByRole('group', { name: 'Dock controls' })).getAllByRole('button'),
    ).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Lock dock' }));
    expect(screen.getByRole('button', { name: 'Move dock' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Pin dock' }));
    expect(screen.getByTestId('dock')).toHaveAttribute('data-pinned');
    fireEvent.click(screen.getByRole('button', { name: 'Unlock dock' }));
    expect(screen.getByRole('button', { name: 'Move dock' })).toBeEnabled();
    expect(screen.getByTestId('dock')).toHaveAttribute('data-pinned');
  });

  it.each([
    ['Lock dock', 'Lock movement', 'Unlock movement'],
    ['Pin dock', 'Pin to viewport', 'Unpin from viewport'],
  ])(
    'explains the %s action in an English tooltip and updates it after activation',
    async (label, before, after) => {
      const user = userEvent.setup();
      render(
        <Dock>
          <Dock.Content>Tools</Dock.Content>
        </Dock>,
      );
      const button = screen.getByRole('button', { name: label });
      await user.hover(button);
      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toHaveTextContent(before);
      expect(button).toHaveAccessibleDescription(before);
      await user.click(button);
      expect(screen.getByRole('tooltip')).toBe(tooltip);
      expect(tooltip).toHaveTextContent(after);
      expect(button).toHaveAccessibleDescription(after);
    },
  );

  it('keeps controlled state and render children compatible with the built-in actions', () => {
    const onLockedChange = vi.fn();
    const onPinnedChange = vi.fn();
    render(
      <Dock
        locked={false}
        pinned={false}
        onLockedChange={onLockedChange}
        onPinnedChange={onPinnedChange}
      >
        {({ locked, pinned }) => <Dock.Content>{`${locked}:${pinned}`}</Dock.Content>}
      </Dock>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Lock dock' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pin dock' }));
    expect(onLockedChange).toHaveBeenCalledWith(true);
    expect(onPinnedChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('false:false')).toBeInTheDocument();
  });

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('styles the boundary, root, handle, and content while preserving the primitive contract', () => {
    render(
      <Dock.Boundary data-testid="boundary" className="consumer-boundary">
        <Dock.Root
          data-testid="dock"
          className="consumer-root"
          defaultPlacement={{ edge: 'bottom', position: 0.5 }}
        >
          <Dock.Handle className="consumer-handle" />
          <Dock.Content data-testid="content" className="consumer-content">
            Navigation
          </Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('boundary')).toHaveClass('consumer-boundary');
    expect(screen.getByTestId('dock')).toHaveClass('consumer-root');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-chrome-visibility', 'interaction');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'bottom');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.getByRole('button', { name: 'Move dock' })).toHaveClass('consumer-handle');
    expect(screen.getByRole('button', { name: 'Move dock' }).querySelector('span')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(screen.getByTestId('content')).toHaveClass('consumer-content');
  });

  it('supports logical start and end handle placement while keeping start as the default', () => {
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

  it('forwards free positioning to the primitive state layer', () => {
    render(
      <Dock.Boundary>
        <Dock.Root
          defaultPlacement={{ edge: 'top', position: 0.37 }}
          snapDivisions={false}
          data-testid="dock"
        >
          <Dock.Handle />
          <Dock.Content>Tools</Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-positioning', 'free');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.37');
    expect(screen.getByTestId('dock')).not.toHaveAttribute('data-snap-divisions');
  });

  it('supports persistent chrome when a product needs an always-visible movement affordance', () => {
    render(
      <Dock.Boundary>
        <Dock.Root chromeVisibility="always" data-testid="dock">
          <Dock.Handle />
          <Dock.Content>Tools</Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-chrome-visibility', 'always');
  });

  it('forwards uncontrolled persistence to the primitive state layer', () => {
    localStorage.setItem(
      'vd:dock:ui-persistence:v1',
      JSON.stringify({ edge: 'left', position: 0.25 }),
    );

    render(
      <Dock.Boundary>
        <Dock.Root
          defaultPlacement={{ edge: 'top', position: 0 }}
          persist={{ storage: 'local', key: 'ui-persistence' }}
          data-testid="dock"
        >
          <Dock.Handle />
          <Dock.Content>Tools</Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(screen.getByTestId('dock')).toHaveAttribute('data-edge', 'left');
    expect(screen.getByTestId('dock')).toHaveAttribute('data-position', '0.25');
  });

  it('forwards refs for every public part', () => {
    const boundaryRef = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLDivElement>();
    const handleRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Dock.Boundary ref={boundaryRef}>
        <Dock.Root ref={rootRef}>
          <Dock.Handle ref={handleRef} />
          <Dock.Content ref={contentRef}>Content</Dock.Content>
        </Dock.Root>
      </Dock.Boundary>,
    );

    expect(boundaryRef.current).toBeInstanceOf(HTMLDivElement);
    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(handleRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
