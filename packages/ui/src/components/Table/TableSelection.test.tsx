import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Table } from './index';

describe('Table.Selection', () => {
  it.each([undefined, false, []])('omits the optional menu for %s', (selections) => {
    render(<Table.Selection rowKeys={['a']} selections={selections} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('derives mixed and full states while preserving selection from other pages', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    function Example() {
      const [value, setValue] = useState(['outside', 'a']);
      return (
        <Table.Selection
          rowKeys={['a', 'b']}
          value={value}
          onValueChange={(next) => {
            change(next);
            setValue(next);
          }}
        />
      );
    }
    render(<Example />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBePartiallyChecked();
    await user.click(checkbox);
    expect(change).toHaveBeenLastCalledWith(['outside', 'a', 'b']);
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('data-checked', 'true');
    expect(checkbox).not.toBePartiallyChecked();
    await user.click(checkbox);
    expect(change).toHaveBeenLastCalledWith(['outside']);
    expect(checkbox).not.toBeChecked();
  });

  it('opens on hover and applies built-in and custom actions exactly once', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Table.Selection
        rowKeys={['a', 'b', 'c']}
        defaultValue={['outside', 'a']}
        onValueChange={change}
        selections={[
          'all',
          'invert',
          'none',
          {
            key: 'odd',
            label: 'Odd rows',
            onSelect: (keys) => [keys[0]!, keys[2]!, keys[0]!],
          },
        ]}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Selection actions' });
    const act = async (name: string) => {
      await user.hover(trigger);
      await user.click(await screen.findByRole('menuitem', { name }));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      await user.unhover(trigger);
    };
    await act('Invert current page');
    expect(change).toHaveBeenLastCalledWith(['outside', 'b', 'c']);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
    await act('Select all');
    expect(change).toHaveBeenLastCalledWith(['outside', 'b', 'c', 'a']);
    expect(screen.getByRole('checkbox')).toBeChecked();
    await act('Clear all');
    expect(change).toHaveBeenLastCalledWith([]);
    await act('Odd rows');
    expect(change).toHaveBeenLastCalledWith(['a', 'c']);
    expect(change).toHaveBeenCalledTimes(4);
  });

  it('supports keyboard opening, Escape and focus return', async () => {
    const user = userEvent.setup();
    render(<Table.Selection rowKeys={['a']} selections />);
    const trigger = screen.getByRole('button');
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Select all' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it.each([true, false])('disables empty or explicitly disabled selections (%s)', (disabled) => {
    render(<Table.Selection rowKeys={disabled ? ['a'] : []} disabled={disabled} selections />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
    fireEvent.pointerEnter(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
