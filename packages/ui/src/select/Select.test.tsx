import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';
import type { SelectSize } from './Select.types';

const options = [
  { value: 'design', label: 'Virgo Design' },
  { value: 'docs', label: 'Virgo Cloud Docs' },
  { value: 'retro', label: 'Virgo Retro', disabled: true },
] as const;

describe('Select', () => {
  it('uses the default medium size and placeholder', () => {
    render(<Select aria-label="Project" options={options} placeholder="Choose a project" />);

    const trigger = screen.getByRole('button', { name: 'Project' });

    expect(trigger.parentElement).toHaveAttribute('data-size', 'medium');
    expect(trigger).toHaveTextContent('Choose a project');
  });

  it.each<SelectSize>(['mini', 'small', 'medium', 'large'])('supports the %s size', (size) => {
    render(<Select aria-label={`${size} project`} options={options} size={size} />);

    expect(screen.getByRole('button', { name: `${size} project` }).parentElement).toHaveAttribute(
      'data-size',
      size,
    );
  });

  it('shows the selected option and changes value through the primitive', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        aria-label="Project"
        defaultValue="design"
        onValueChange={onValueChange}
        options={options}
      />,
    );

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

      return (
        <Select
          aria-label="Controlled project"
          onValueChange={setValue}
          options={options}
          value={value}
        />
      );
    }

    render(<ControlledSelect />);

    const trigger = screen.getByRole('button', { name: 'Controlled project' });
    expect(trigger).toHaveTextContent('Virgo Design');

    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Virgo Cloud Docs' }));

    expect(trigger).toHaveTextContent('Virgo Cloud Docs');
  });

  it('preserves disabled and invalid states', () => {
    const { rerender } = render(<Select disabled aria-label="Project" options={options} />);

    let trigger = screen.getByRole('button', { name: 'Project' });
    expect(trigger).toBeDisabled();
    expect(trigger.parentElement).toHaveAttribute('data-disabled', 'true');

    rerender(<Select invalid aria-label="Project" options={options} />);

    trigger = screen.getByRole('button', { name: 'Project' });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger.parentElement).toHaveAttribute('data-invalid', 'true');
  });

  it('renders disabled options and does not let them change the value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        aria-label="Project"
        defaultValue="design"
        onValueChange={onValueChange}
        options={options}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));

    const disabledOption = screen.getByRole('option', { name: 'Virgo Retro' });
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');

    await user.click(disabledOption);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('supports open state, keyboard navigation, and selected check semantics', async () => {
    const user = userEvent.setup();

    render(<Select aria-label="Project" defaultValue="design" options={options} />);

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

  it('forwards the trigger ref, root className, and form name', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <Select
        ref={ref}
        aria-label="Project"
        className="consumer-select"
        defaultValue="design"
        name="project"
        options={options}
      />,
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Project' }));
    expect(ref.current?.parentElement).toHaveClass('consumer-select');
    expect(container.querySelector('input[name="project"]')).toHaveValue('design');
  });
});
