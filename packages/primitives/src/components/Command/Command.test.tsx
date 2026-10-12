import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Command } from './index';

function Example() {
  return (
    <Command.Root>
      <Command.Input aria-label="Search commands" />
      <Command.List aria-label="Commands">
        <Command.Empty>No commands found.</Command.Empty>
        <Command.Group heading="Example">
          <Command.Item value="new" keywords={['create']}>
            New item
          </Command.Item>
          <Command.Item value="open">Open item</Command.Item>
          <Command.Item value="disabled" disabled>
            Disabled action
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Item value="settings">Settings</Command.Item>
      </Command.List>
    </Command.Root>
  );
}

describe('Command primitive', () => {
  it('filters values, labels and keywords and exposes the empty state', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('combobox', { name: 'Search commands' });

    await user.type(input, 'create');
    expect(screen.getByRole('option', { name: 'New item' })).toBeVisible();
    expect(screen.queryByRole('option', { name: 'Open item' })).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'missing');
    expect(screen.getByText('No commands found.')).toBeVisible();
    expect(screen.queryByRole('group', { name: 'Example' })).not.toBeInTheDocument();
  });

  it('keeps focus in the input while arrows wrap over enabled visible items', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('combobox');
    input.focus();

    await user.keyboard('{End}');
    expect(input).toHaveFocus();
    expect(screen.getByRole('option', { name: 'Settings' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'New item' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('option', { name: 'Settings' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Settings' }).id,
    );
  });

  it('selects the active item with Enter and supports controlled search and value', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onSearchChange = vi.fn();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Command.Root
        search=""
        value="two"
        onSearchChange={onSearchChange}
        onValueChange={onValueChange}
      >
        <Command.Input aria-label="Search" />
        <Command.List>
          <Command.Item value="one">One</Command.Item>
          <Command.Item value="two" onSelect={onSelect}>
            Two
          </Command.Item>
        </Command.List>
      </Command.Root>,
    );

    await user.type(screen.getByRole('combobox'), 'o');
    expect(onSearchChange).toHaveBeenCalledWith('o');
    expect(screen.getByRole('combobox')).toHaveValue('');
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledExactlyOnceWith('two');

    rerender(
      <Command.Root
        search="one"
        value="one"
        onSearchChange={onSearchChange}
        onValueChange={onValueChange}
      >
        <Command.Input aria-label="Search" />
        <Command.List>
          <Command.Item value="one">One</Command.Item>
          <Command.Item value="two">Two</Command.Item>
        </Command.List>
      </Command.Root>,
    );
    expect(screen.getByRole('combobox')).toHaveValue('one');
    expect(screen.getByRole('option', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });

  it('supports custom filtering and dynamic item registration', async () => {
    const user = userEvent.setup();
    function Dynamic() {
      const [show, setShow] = useState(true);
      return (
        <>
          <button onClick={() => setShow(false)}>Remove</button>
          <Command.Root filter={(value, search) => value.startsWith(search)}>
            <Command.Input aria-label="Filter" />
            <Command.List>
              {show ? <Command.Item value="alpha">Alpha</Command.Item> : null}
              <Command.Item value="beta">Beta</Command.Item>
            </Command.List>
          </Command.Root>
        </>
      );
    }
    render(<Dynamic />);
    await user.type(screen.getByRole('combobox'), 'b');
    expect(screen.getByRole('option', { name: 'Beta' })).toBeVisible();
    await user.clear(screen.getByRole('combobox'));
    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.queryByRole('option', { name: 'Alpha' })).not.toBeInTheDocument();
  });
});
