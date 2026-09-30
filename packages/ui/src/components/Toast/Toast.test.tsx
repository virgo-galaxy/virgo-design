import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  TriangleAlertIcon,
} from '@virgo-design/icons';
import { describe, expect, it, vi } from 'vitest';

import { Toast } from './index';

describe('Toast UI', () => {
  it.each([
    ['success', CircleCheckIcon],
    ['info', CircleInfoIcon],
    ['warning', TriangleAlertIcon],
    ['error', CircleXIcon],
  ] as const)('uses the canonical status icon for %s', (intent, Icon) => {
    render(
      <Toast.Provider>
        <Icon data-testid="canonical-icon" />
        <Toast intent={intent} duration={0}>
          <Toast.Title>{intent}</Toast.Title>
          <Toast.Close />
        </Toast>
        <Toast.Viewport />
      </Toast.Provider>,
    );
    const glyph = screen.getByRole('status').querySelector('svg');
    expect(glyph?.innerHTML).toBe(screen.getByTestId('canonical-icon').innerHTML);
    expect(glyph?.parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBeInTheDocument();
  });

  it.each(['default', 'success', 'warning', 'error', 'info'] as const)(
    'renders the %s intent',
    (intent) => {
      render(
        <Toast.Provider>
          <Toast intent={intent} duration={0} className="custom-toast">
            <Toast.Title>{intent}</Toast.Title>
            <Toast.Close />
          </Toast>
          <Toast.Viewport />
        </Toast.Provider>,
      );
      expect(screen.getByRole('status')).toHaveAttribute('data-intent', intent);
      expect(screen.getByRole('status')).toHaveClass('custom-toast');
    },
  );

  it('supports placement, action and close behavior', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Toast.Provider>
        <Toast duration={0} onOpenChange={onOpenChange}>
          <Toast.Title>Archived</Toast.Title>
          <Toast.Description>The file moved to archive.</Toast.Description>
          <Toast.Action>Undo</Toast.Action>
          <Toast.Close />
        </Toast>
        <Toast.Viewport placement="top-start" className="custom-viewport" />
      </Toast.Provider>,
    );
    expect(screen.getByRole('region')).toHaveAttribute('data-placement', 'top-start');
    expect(screen.getByRole('region')).toHaveClass('custom-viewport');
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('supports compact feedback at top center without changing panel defaults', () => {
    render(
      <Toast.Provider>
        <Toast appearance="compact" intent="success" duration={0}>
          <Toast.Title>Copied</Toast.Title>
        </Toast>
        <Toast duration={0}>
          <Toast.Title>Panel</Toast.Title>
        </Toast>
        <Toast.Viewport placement="top-center" />
      </Toast.Provider>,
    );
    expect(screen.getByRole('status', { name: 'Copied' })).toHaveAttribute(
      'data-appearance',
      'compact',
    );
    expect(screen.getByRole('status', { name: 'Panel' })).toHaveAttribute(
      'data-appearance',
      'panel',
    );
    expect(screen.getByRole('region')).toHaveAttribute('data-placement', 'top-center');
  });

  it('allows a custom icon or no icon', () => {
    render(
      <Toast.Provider>
        <Toast duration={0} icon={<span data-testid="custom-icon">!</span>}>
          <Toast.Title>Custom</Toast.Title>
        </Toast>
        <Toast icon={false} duration={0}>
          <Toast.Title>Plain</Toast.Title>
        </Toast>
        <Toast.Viewport />
      </Toast.Provider>,
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getAllByRole('status')).toHaveLength(2);
  });
});
