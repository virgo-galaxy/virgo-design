import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './index';
import type { SelectProps, SelectSize } from './Select.types';

const options: ReadonlyArray<{ value: string; label: string; disabled?: boolean }> = [
  { value: 'design', label: 'Virgo Design' },
  { value: 'docs', label: 'Virgo Cloud Docs' },
  { value: 'retro', label: 'Virgo Retro', disabled: true },
];

type SelectExampleProps = Omit<SelectProps, 'children'> & {
  label: string;
  placeholder?: string;
};

function SelectExample({ label, placeholder, ...props }: SelectExampleProps) {
  return (
    <Select {...props}>
      <Select.Trigger aria-label={label} placeholder={placeholder} />
      <Select.Content>
        {options.map((option) => (
          <Select.Option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
  );
}

describe('Select', () => {
  it('uses the default medium size and placeholder', () => {
    render(<SelectExample label="Project" placeholder="Choose a project" />);

    const trigger = screen.getByRole('button', { name: 'Project' });

    expect(trigger.parentElement).toHaveAttribute('data-size', 'medium');
    expect(trigger).toHaveTextContent('Choose a project');
  });

  it.each<SelectSize>(['mini', 'small', 'medium', 'large'])('supports the %s size', (size) => {
    render(<SelectExample label={`${size} project`} size={size} />);

    expect(screen.getByRole('button', { name: `${size} project` }).parentElement).toHaveAttribute(
      'data-size',
      size,
    );
  });

  it('shows the selected option and changes value through the primitive', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<SelectExample label="Project" defaultValue="design" onValueChange={onValueChange} />);

    const trigger = screen.getByRole('button', { name: 'Project' });
    expect(trigger).toHaveTextContent('Virgo Design');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Virgo Cloud Docs' }));

    expect(onValueChange).toHaveBeenCalledWith('docs');
    expect(trigger).toHaveTextContent('Virgo Cloud Docs');
  });

  it('supports controlled values', async () => {
    const user = userEvent.setup();

    function ControlledSelect() {
      const [value, setValue] = useState('design');

      return <SelectExample label="Controlled project" onValueChange={setValue} value={value} />;
    }

    render(<ControlledSelect />);

    const trigger = screen.getByRole('button', { name: 'Controlled project' });
    expect(trigger).toHaveTextContent('Virgo Design');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Virgo Cloud Docs' }));

    expect(trigger).toHaveTextContent('Virgo Cloud Docs');
  });

  it('preserves disabled and invalid states', () => {
    const { rerender } = render(<SelectExample disabled label="Project" />);

    let trigger = screen.getByRole('button', { name: 'Project' });
    expect(trigger).toBeDisabled();
    expect(trigger.parentElement).toHaveAttribute('data-disabled', 'true');

    rerender(<SelectExample invalid label="Project" />);

    trigger = screen.getByRole('button', { name: 'Project' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger.parentElement).toHaveAttribute('data-invalid', 'true');
  });

  it('renders disabled options and does not let them change the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(<SelectExample label="Project" defaultValue="design" onValueChange={onValueChange} />);

    await user.click(screen.getByRole('button', { name: 'Project' }));

    const disabledOption = screen.getByRole('option', { name: 'Virgo Retro' });
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabledOption);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('supports open state, keyboard navigation, and selected check semantics', async () => {
    const user = userEvent.setup();

    render(<SelectExample label="Project" defaultValue="design" />);

    const trigger = screen.getByRole('button', { name: 'Project' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('option', { name: 'Virgo Design' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    await user.keyboard('{ArrowDown}{Enter}');

    expect(trigger).toHaveTextContent('Virgo Cloud Docs');
    expect(trigger).toHaveFocus();
  });

  it('forwards root and trigger refs, root className, and form name', () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const { container } = render(
      <Select ref={rootRef} className="consumer-select" defaultValue="design" name="project">
        <Select.Trigger ref={triggerRef} aria-label="Project" />
        <Select.Content>
          {options.map((option) => (
            <Select.Option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>,
    );

    expect(rootRef.current).toHaveClass('consumer-select');
    expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Project' }));
    expect(container.querySelector('input[name="project"]')).toHaveValue('design');
  });
});
