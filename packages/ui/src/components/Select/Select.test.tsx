import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, forwardRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './index';
import type { SelectOptionProps, SelectProps, SelectSize } from './Select.types';

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
  it.each(['controlled', 'uncontrolled'] as const)(
    'keeps %s selection labels when options retain their pre-refresh component identity',
    async (mode) => {
      const user = userEvent.setup();
      const PreviousOption = forwardRef<HTMLDivElement, SelectOptionProps>((props, ref) => (
        <Select.Option {...props} ref={ref} />
      ));
      PreviousOption.displayName = 'Select.Option';

      function Example() {
        const [value, setValue] = useState('design');
        return (
          <Select
            value={mode === 'controlled' ? value : undefined}
            defaultValue={mode === 'uncontrolled' ? 'design' : undefined}
            onValueChange={setValue}
          >
            <Select.Trigger aria-label="Project" />
            <Select.Content>
              <>
                <PreviousOption value="design" intent="success">
                  Virgo Design
                </PreviousOption>
                <PreviousOption value="docs">Virgo Cloud Docs</PreviousOption>
              </>
            </Select.Content>
          </Select>
        );
      }

      render(<Example />);
      const trigger = screen.getByRole('button', { name: 'Project' });
      expect(trigger).toHaveTextContent('Virgo Design');
      expect(trigger.querySelector('[data-slot="value"]')).not.toHaveAttribute('data-placeholder');
      expect(trigger.querySelector('[data-slot="value"]')).toHaveAttribute(
        'data-intent',
        'success',
      );
      await user.click(trigger);
      expect(screen.getByRole('option', { name: 'Virgo Design' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      await user.click(screen.getByRole('option', { name: 'Virgo Cloud Docs' }));
      expect(trigger).toHaveTextContent('Virgo Cloud Docs');
      expect(trigger.querySelector('[data-slot="value"]')).not.toHaveAttribute('data-placeholder');
    },
  );

  it('keeps multi-value labels and removal names for pre-refresh option identities', () => {
    const PreviousOption = forwardRef<HTMLDivElement, SelectOptionProps>((props, ref) => (
      <Select.Option {...props} ref={ref} />
    ));
    PreviousOption.displayName = 'Select.Option';
    render(
      <Select.Multiple defaultValue={['design']}>
        <Select.Trigger aria-label="Projects" />
        <Select.Content>
          <PreviousOption value="design" intent="success">
            Virgo Design
          </PreviousOption>
        </Select.Content>
      </Select.Multiple>,
    );
    expect(document.querySelector('[data-slot="selected-tag"]')).toHaveTextContent('Virgo Design');
    expect(document.querySelector('[data-slot="selected-tag"]')).toHaveAttribute(
      'data-intent',
      'success',
    );
    expect(screen.getByRole('button', { name: 'Remove Virgo Design' })).toBeInTheDocument();
  });

  it('shares option intent with removable tags and updates it without changing selection', async () => {
    const user = userEvent.setup();
    const fixture = (intent: 'success' | 'warning' | 'accent') => (
      <Select.Multiple defaultValue={['done']}>
        <Select.Trigger aria-label="Status" />
        <Select.Content>
          <Select.Option value="done" intent={intent}>
            Done
          </Select.Option>
          <Select.Option value="todo">To do</Select.Option>
        </Select.Content>
      </Select.Multiple>
    );
    const { rerender } = render(fixture('success'));
    await user.click(screen.getByRole('button', { name: 'Status' }));
    const option = screen.getByRole('option', { name: 'Done' });
    expect(option).toHaveAttribute('data-intent', 'success');
    expect(document.querySelector('[data-slot="selected-tag"]')).toHaveAttribute(
      'data-intent',
      'success',
    );
    expect(screen.getByRole('option', { name: 'To do' })).not.toHaveAttribute('data-intent');
    rerender(fixture('warning'));
    expect(option).toHaveAttribute('data-intent', 'warning');
    expect(document.querySelector('[data-slot="selected-tag"]')).toHaveAttribute(
      'data-intent',
      'warning',
    );
    expect(option).toHaveAttribute('aria-selected', 'true');
    rerender(fixture('accent'));
    expect(option).toHaveAttribute('data-intent', 'accent');
    expect(document.querySelector('[data-slot="selected-tag"]')).toHaveAttribute(
      'data-intent',
      'accent',
    );
    expect(option).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Remove Done' }));
    expect(document.querySelector('[data-slot="selected-tag"]')).toBeNull();
  });

  it('shares option intent with the single selected value without leaking intent to the DOM', () => {
    render(
      <Select defaultValue="done">
        <Select.Trigger aria-label="Status" />
        <Select.Content>
          <Select.Option value="done" intent="success">
            Done
          </Select.Option>
        </Select.Content>
      </Select>,
    );
    expect(document.querySelector('[data-slot="value"]')).toHaveAttribute('data-intent', 'success');
    expect(document.querySelector('[intent]')).toBeNull();
  });
  it('shows removable multi-value tags without nested buttons and restores the placeholder after clearing', async () => {
    const user = userEvent.setup();
    render(
      <Select.Multiple>
        <Select.Trigger aria-label="Projects" placeholder="All projects" />
        <Select.Content>
          <Select.Option value="design">Design</Select.Option>
          <Select.Option value="docs">Docs</Select.Option>
        </Select.Content>
      </Select.Multiple>,
    );
    const trigger = screen.getByRole('button', { name: 'Projects' });
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Design' }));
    await user.click(screen.getByRole('option', { name: 'Docs' }));
    expect(
      screen
        .getAllByRole('option')
        .every((option) => option.getAttribute('aria-selected') === 'true'),
    ).toBe(true);
    expect(document.querySelectorAll('[data-slot="selected-tag"]')).toHaveLength(2);
    expect(trigger.querySelector('button')).toBeNull();
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Remove Design' }));
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Remove Design' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Remove Docs' }));
    expect(trigger).toHaveTextContent('All projects');
  });

  it('supports controlled multi-values and disables removal when read-only or disabled', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const fixture = (props: { disabled?: boolean; readOnly?: boolean }) => (
      <Select.Multiple {...props} value={['design']} onValueChange={change}>
        <Select.Trigger aria-label="Projects" />
        <Select.Content>
          <Select.Option value="design">Design</Select.Option>
          <Select.Option value="docs">Docs</Select.Option>
        </Select.Content>
      </Select.Multiple>
    );
    const { rerender } = render(fixture({}));
    await user.click(screen.getByRole('button', { name: 'Remove Design' }));
    expect(change).toHaveBeenLastCalledWith([]);
    expect(screen.getByRole('button', { name: 'Remove Design' })).toBeInTheDocument();
    rerender(fixture({ readOnly: true }));
    expect(screen.getByRole('button', { name: 'Remove Design' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Projects' }));
    expect(screen.queryByRole('listbox')).toBeNull();
    rerender(fixture({ disabled: true }));
    expect(screen.getByRole('button', { name: 'Projects' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove Design' })).toBeDisabled();
  });
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

it('customizes selected rendering and indicator slots without changing option navigation', async () => {
  const user = userEvent.setup();
  render(
    <Select defaultValue="design">
      <Select.Trigger
        aria-label="Project"
        indicator={<span>+</span>}
        renderValue={(value, label) => (
          <span data-testid="selection">
            {value}: {label}
          </span>
        )}
      />
      <Select.Content>
        <Select.Option value="design">Design</Select.Option>
        <Select.Option value="docs">Docs</Select.Option>
      </Select.Content>
    </Select>,
  );
  expect(screen.getByTestId('selection')).toHaveTextContent('design: Design');
  await user.click(screen.getByRole('button', { name: 'Project' }));
  await user.keyboard('{ArrowDown}{Enter}');
  expect(screen.getByTestId('selection')).toHaveTextContent('docs: Docs');
  expect(screen.getByRole('button', { name: 'Project' })).toHaveFocus();
});
