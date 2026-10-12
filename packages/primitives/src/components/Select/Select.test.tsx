import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './index';

function PrimitiveSelectExample({ onValueChange }: { onValueChange?: (value: string) => void }) {
  return (
    <Select defaultValue="design" onValueChange={onValueChange}>
      <Select.Trigger aria-label="Item">Choose item</Select.Trigger>
      <Select.Content>
        <Select.Option value="design">Item A</Select.Option>
        <Select.Option value="docs">Item B</Select.Option>
        <Select.Option disabled value="retro">
          Item C
        </Select.Option>
      </Select.Content>
    </Select>
  );
}

describe('Select primitive', () => {
  it('toggles multiple options with the keyboard, keeps the list open and submits repeated form values', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <form aria-label="Filters">
        <Select.Multiple name="status" onValueChange={change}>
          <Select.Trigger aria-label="Status">All</Select.Trigger>
          <Select.Content>
            <Select.Option value="todo">Todo</Select.Option>
            <Select.Option value="done">Done</Select.Option>
            <Select.Option disabled value="hidden">
              Hidden
            </Select.Option>
          </Select.Content>
        </Select.Multiple>
      </form>,
    );
    const trigger = screen.getByRole('button', { name: 'Status' });
    trigger.focus();
    await user.keyboard('{ArrowDown} {ArrowDown}{Enter}');
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    expect(change).toHaveBeenLastCalledWith(['todo', 'done']);
    expect(screen.getByRole('option', { name: 'Done' })).toHaveFocus();
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).getAll('status')).toEqual([
      'todo',
      'done',
    ]);
    await user.keyboard(' ');
    expect(change).toHaveBeenLastCalledWith(['todo']);
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  it('opens a listbox from the native button trigger and selects an option', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PrimitiveSelectExample onValueChange={onValueChange} />);

    const trigger = screen.getByRole('button', { name: 'Item' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Item A' })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('option', { name: 'Item B' }));

    expect(onValueChange).toHaveBeenCalledWith('docs');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports ArrowDown, ArrowUp, Home, End, Enter, and Escape navigation', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PrimitiveSelectExample onValueChange={onValueChange} />);

    const trigger = screen.getByRole('button', { name: 'Item' });
    trigger.focus();

    await user.keyboard('{ArrowDown}');

    const design = screen.getByRole('option', { name: 'Item A' });
    const docs = screen.getByRole('option', { name: 'Item B' });

    expect(design).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(docs).toHaveFocus();

    await user.keyboard('{Home}');
    expect(design).toHaveFocus();

    await user.keyboard('{End}');
    expect(docs).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith('docs');
    expect(trigger).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('option', { name: 'Item B' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports character typeahead across enabled options', async () => {
    const user = userEvent.setup();

    render(<PrimitiveSelectExample />);

    const trigger = screen.getByRole('button', { name: 'Item' });
    trigger.focus();

    await user.keyboard('{ArrowDown}');
    await user.keyboard('i');

    expect(screen.getByRole('option', { name: 'Item B' })).toHaveFocus();
  });

  it('does not select disabled options', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PrimitiveSelectExample onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Item' }));

    const disabledOption = screen.getByRole('option', { name: 'Item C' });
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabledOption);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('supports controlled value and open state', async () => {
    const user = userEvent.setup();

    function ControlledSelect() {
      const [value, setValue] = useState('design');
      const [open, setOpen] = useState(false);

      return (
        <Select value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}>
          <Select.Trigger aria-label="Controlled item">{value}</Select.Trigger>
          <Select.Content>
            <Select.Option value="design">Item A</Select.Option>
            <Select.Option value="docs">Item B</Select.Option>
          </Select.Content>
        </Select>
      );
    }

    render(<ControlledSelect />);

    const trigger = screen.getByRole('button', { name: 'Controlled item' });
    expect(trigger).toHaveTextContent('design');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Item B' }));

    expect(trigger).toHaveTextContent('docs');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('disables the trigger and can submit the selected value through a hidden input', () => {
    const { container } = render(
      <Select disabled defaultValue="design" name="item">
        <Select.Trigger aria-label="Disabled item">Choose item</Select.Trigger>
        <Select.Content>
          <Select.Option value="design">Item A</Select.Option>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('button', { name: 'Disabled item' })).toBeDisabled();
    expect(container.querySelector('input[name="item"]')).toHaveValue('design');
  });
});

it('portals, inherits theme and flips near the bottom viewport boundary', async () => {
  const original = HTMLElement.prototype.getBoundingClientRect;
  const rect = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute('role') === 'listbox')
        return {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          right: 200,
          bottom: 160,
          width: 200,
          height: 160,
          toJSON: () => {},
        };
      if (this.tagName === 'BUTTON')
        return {
          x: 30,
          y: 740,
          top: 740,
          left: 30,
          right: 230,
          bottom: 768,
          width: 200,
          height: 28,
          toJSON: () => {},
        };
      return original.call(this);
    });
  try {
    const { container } = render(
      <div data-theme="dark">
        <PrimitiveSelectExample />
      </div>,
    );
    await userEvent.setup().click(screen.getByRole('button', { name: 'Item' }));
    const content = screen.getByRole('listbox');
    expect(container).not.toContainElement(content);
    expect(content).toHaveAttribute('data-theme', 'dark');
    expect(content).toHaveAttribute('data-side', 'top');
    expect(content.style.position).toBe('fixed');
  } finally {
    rect.mockRestore();
  }
});
