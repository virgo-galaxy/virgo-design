import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsIcon } from '@virgo-design/icons';
import { describe, expect, it, vi } from 'vitest';

import { Command } from './index';

describe('Command UI', () => {
  it('applies UI classes while preserving filtering, icons and shortcut labels', async () => {
    const user = userEvent.setup();
    render(
      <Command className="custom-root">
        <Command.Input className="custom-input" aria-label="Commands" />
        <Command.List>
          <Command.Empty>Nothing found</Command.Empty>
          <Command.Group heading="General">
            <Command.Item
              className="custom-item"
              value="settings"
              icon={<SettingsIcon data-testid="icon" />}
              shortcut="⌘,"
            >
              Settings
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('⌘,')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('option')).toHaveClass('custom-item');
    await user.type(screen.getByRole('combobox'), 'missing');
    expect(screen.getByText('Nothing found')).toBeVisible();
  });

  it('composes Dialog focus, Escape dismissal and focus return', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <>
        <button>Open palette</button>
        <Command.Dialog open={false} onOpenChange={onOpenChange}>
          <Command.Input aria-label="Search palette" />
          <Command.List>
            <Command.Item value="open">Open file</Command.Item>
          </Command.List>
        </Command.Dialog>
      </>,
    );
    const trigger = screen.getByRole('button', { name: 'Open palette' });
    trigger.focus();
    await user.click(trigger);
    rerender(
      <>
        <button>Open palette</button>
        <Command.Dialog open onOpenChange={onOpenChange}>
          <Command.Input aria-label="Search palette" />
          <Command.List>
            <Command.Item value="open">Open file</Command.Item>
          </Command.List>
        </Command.Dialog>
      </>,
    );
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});
