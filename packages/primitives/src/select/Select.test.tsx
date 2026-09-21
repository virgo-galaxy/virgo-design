import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './index';

function PrimitiveSelectExample({ onValueChange }: { onValueChange?: (value: string) => void }) {
  return (
    <Select defaultValue="design" onValueChange={onValueChange}>
      <Select.Trigger aria-label="Project">Choose project</Select.Trigger>
      <Select.Content>
        <Select.Option value="design">Virgo Design</Select.Option>
        <Select.Option value="docs">Virgo Cloud Docs</Select.Option>
        <Select.Option disabled value="retro">
          Virgo Retro
        </Select.Option>
      </Select.Content>
    </Select>
  );
}

describe('Select primitive', () => {
  it('opens a listbox from the native button trigger and selects an option', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PrimitiveSelectExample onValueChange={onValueChange} />);

    const trigger = screen.getByRole('button', { name: 'Project' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Virgo Design' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    await user.click(screen.getByRole('option', { name: 'Virgo Cloud Docs' }));

    expect(onValueChange).toHaveBeenCalledWith('docs');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports ArrowDown, ArrowUp, Home, End, Enter, and Escape navigation', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PrimitiveSelectExample onValueChange={onValueChange} />);

    const trigger = screen.getByRole('button', { name: 'Project' });
    trigger.focus();

    await user.keyboard('{ArrowDown}');

    const design = screen.getByRole('option', { name: 'Virgo Design' });
    const docs = screen.getByRole('option', { name: 'Virgo Cloud Docs' });

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
    expect(screen.getByRole('option', { name: 'Virgo Cloud Docs' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports character typeahead across enabled options', async () => {
    const user = userEvent.setup();

    render(<PrimitiveSelectExample />);

    const trigger = screen.getByRole('button', { name: 'Project' });
    trigger.focus();

    await user.keyboard('{ArrowDown}');
    await user.keyboard('v');

    expect(screen.getByRole('option', { name: 'Virgo Cloud Docs' })).toHaveFocus();
  });

  it('does not select disabled options', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<PrimitiveSelectExample onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Project' }));

    const disabledOption = screen.getByRole('option', { name: 'Virgo Retro' });
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
          <Select.Trigger aria-label="Controlled project">{value}</Select.Trigger>
          <Select.Content>
            <Select.Option value="design">Virgo Design</Select.Option>
            <Select.Option value="docs">Virgo Cloud Docs</Select.Option>
          </Select.Content>
        </Select>
      );
    }

    render(<ControlledSelect />);

    const trigger = screen.getByRole('button', { name: 'Controlled project' });
    expect(trigger).toHaveTextContent('design');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Virgo Cloud Docs' }));

    expect(trigger).toHaveTextContent('docs');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('disables the trigger and can submit the selected value through a hidden input', () => {
    const { container } = render(
      <Select disabled defaultValue="design" name="project">
        <Select.Trigger aria-label="Disabled project">Choose project</Select.Trigger>
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
        </Select.Content>
      </Select>,
    );

    expect(screen.getByRole('button', { name: 'Disabled project' })).toBeDisabled();
    expect(container.querySelector('input[name="project"]')).toHaveValue('design');
  });
});
