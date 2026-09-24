import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Accordion } from './index';

function Items() {
  return (
    <>
      <Accordion.Item value="one">
        <Accordion.Trigger>One</Accordion.Trigger>
        <Accordion.Content>First content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Two</Accordion.Trigger>
        <Accordion.Content>Second content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item disabled value="disabled">
        <Accordion.Trigger>Disabled</Accordion.Trigger>
        <Accordion.Content>Disabled content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="three">
        <Accordion.Trigger>Three</Accordion.Trigger>
        <Accordion.Content>Third content</Accordion.Content>
      </Accordion.Item>
    </>
  );
}

describe('Accordion primitive', () => {
  it('opens one item at a time in single mode and allows it to close', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Accordion.Root type="single" defaultValue="one" onValueChange={onValueChange}>
        <Items />
      </Accordion.Root>,
    );

    const one = screen.getByRole('button', { name: 'One' });
    const two = screen.getByRole('button', { name: 'Two' });
    expect(one).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First content')).not.toHaveAttribute('hidden');

    await user.click(two);
    expect(one).toHaveAttribute('aria-expanded', 'false');
    expect(two).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First content')).toHaveAttribute('hidden');
    expect(screen.getByText('Second content')).not.toHaveAttribute('hidden');

    await user.click(two);
    expect(two).toHaveAttribute('aria-expanded', 'false');
    expect(onValueChange.mock.calls).toEqual([['two'], ['']]);
  });

  it('opens independent items in multiple mode', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Accordion.Root type="multiple" defaultValue={['one']} onValueChange={onValueChange}>
        <Items />
      </Accordion.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Two' }));

    expect(screen.getByRole('button', { name: 'One' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Two' })).toHaveAttribute('aria-expanded', 'true');
    expect(onValueChange).toHaveBeenLastCalledWith(['one', 'two']);
  });

  it('keeps controlled state as the source of truth', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Accordion.Root type="single" value="one" onValueChange={onValueChange}>
        <Items />
      </Accordion.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Two' }));
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('two');
    expect(screen.getByRole('button', { name: 'One' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Two' })).toHaveAttribute('aria-expanded', 'false');

    rerender(
      <Accordion.Root type="single" value="two" onValueChange={onValueChange}>
        <Items />
      </Accordion.Root>,
    );
    expect(screen.getByRole('button', { name: 'Two' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('connects each button and region through accessible ids and headings', () => {
    render(
      <Accordion.Root type="single" headingLevel={2} defaultValue="one">
        <Items />
      </Accordion.Root>,
    );

    const trigger = screen.getByRole('button', { name: 'One' });
    const content = screen.getByText('First content');
    const heading = trigger.parentElement;

    expect(trigger).toHaveAttribute('aria-controls', content.id);
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
    expect(content).toHaveAttribute('role', 'region');
    expect(heading).toHaveAttribute('role', 'heading');
    expect(heading).toHaveAttribute('aria-level', '2');
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('moves focus with arrows, Home, and End while skipping disabled items', async () => {
    const user = userEvent.setup();
    render(
      <Accordion.Root type="single">
        <Items />
      </Accordion.Root>,
    );

    const one = screen.getByRole('button', { name: 'One' });
    const two = screen.getByRole('button', { name: 'Two' });
    const three = screen.getByRole('button', { name: 'Three' });

    one.focus();
    await user.keyboard('{ArrowDown}');
    expect(two).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(three).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(one).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(three).toHaveFocus();
    await user.keyboard('{Home}');
    expect(one).toHaveFocus();
    await user.keyboard('{End}');
    expect(three).toHaveFocus();
  });
});
