import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { ComboboxProps } from './Combobox.types';
import { Combobox } from './index';
function Fixture(props: ComboboxProps) {
  return (
    <Combobox {...props}>
      <Combobox.Input aria-label="Item" />
      <Combobox.Clear aria-label="Clear" />
      <Combobox.Content>
        <Combobox.Option value="alpha" textValue="Alpha">
          Alpha
        </Combobox.Option>
        <Combobox.Option value="beta" textValue="Beta" disabled>
          Beta
        </Combobox.Option>
        <Combobox.Option value="gamma" textValue="Gamma">
          Gamma
        </Combobox.Option>
        <Combobox.Empty>No results</Combobox.Empty>
      </Combobox.Content>
    </Combobox>
  );
}
describe('Combobox interaction', () => {
  it('filters, highlights enabled options, selects and keeps DOM focus on input', async () => {
    const user = userEvent.setup();
    const selected = vi.fn();
    render(<Fixture onValueChange={selected} name="item" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveFocus();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    const alpha = screen.getByRole('option', { name: 'Alpha' });
    expect(input).toHaveAttribute('aria-activedescendant', alpha.id);
    await user.keyboard('{ArrowDown}');
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Gamma' }).id,
    );
    await user.keyboard('{Enter}');
    expect(input).toHaveValue('Gamma');
    expect(input).toHaveFocus();
    expect(selected).toHaveBeenCalledWith('gamma');
    expect(document.querySelector('input[name="item"]')).toHaveValue('gamma');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).not.toHaveAttribute('aria-activedescendant');
    await user.type(input, 'zz');
    expect(screen.getByText('No results')).toBeVisible();
    expect(input).not.toHaveAttribute('aria-activedescendant');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
    expect(selected).toHaveBeenLastCalledWith('');
  });
  it('handles default selected labels and external controlled values', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Fixture defaultValue="alpha" />);
    expect(screen.getByRole('combobox')).toHaveValue('Alpha');
    rerender(<Fixture value="gamma" />);
    expect(screen.getByRole('combobox')).toHaveValue('Gamma');
    rerender(<Fixture value="" />);
    expect(screen.getByRole('combobox')).toHaveValue('');
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByRole('combobox'), 'al');
    expect(screen.getAllByRole('option')).toHaveLength(1);
  });
  it('does not consume IME Enter, arrows or Escape until composition ends', () => {
    const selected = vi.fn();
    render(<Fixture onValueChange={selected} defaultOpen />);
    const input = screen.getByRole('combobox');
    fireEvent.compositionStart(input);
    expect(fireEvent.keyDown(input, { key: 'Enter', keyCode: 229 })).toBe(true);
    expect(fireEvent.keyDown(input, { key: 'Escape' })).toBe(true);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(selected).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(selected).toHaveBeenCalledWith('alpha');
  });
  it('preserves native text editing, Escape closes, Tab exits without committing', async () => {
    const user = userEvent.setup();
    const selected = vi.fn();
    render(
      <>
        <Fixture onValueChange={selected} />
        <button>After</button>
      </>,
    );
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(fireEvent.keyDown(input, { key: 'Home' })).toBe(true);
    expect(fireEvent.keyDown(input, { key: 'End' })).toBe(true);
    await user.keyboard('{Escape}');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{ArrowUp}');
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Gamma' }).id,
    );
    await user.tab();
    expect(selected).not.toHaveBeenCalled();
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
  it('respects controlled input, selection and open states', async () => {
    const user = userEvent.setup();
    const value = vi.fn();
    const input = vi.fn();
    const open = vi.fn();
    render(
      <Fixture
        value="alpha"
        inputValue="A"
        open
        onValueChange={value}
        onInputValueChange={input}
        onOpenChange={open}
      />,
    );
    const control = screen.getByRole('combobox');
    await user.click(control);
    await user.keyboard('{ArrowDown}{Enter}');
    expect(value).toHaveBeenCalledWith('gamma');
    expect(input).toHaveBeenCalledWith('Gamma');
    expect(open).toHaveBeenCalledWith(false);
    expect(control).toHaveValue('A');
    expect(control).toHaveAttribute('aria-expanded', 'true');
  });
  it('dismisses on outside focus and pointer, with cleanup', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <>
        <Fixture />
        <button>Outside</button>
      </>,
    );
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(input).toHaveAttribute('aria-expanded', 'false');
    unmount();
    expect(document.querySelector('[role="listbox"]')).toBeNull();
  });
  it('does not choose disabled options and masks disabled/readonly popup requests', async () => {
    const user = userEvent.setup();
    const value = vi.fn();
    const { rerender } = render(<Fixture onValueChange={value} defaultOpen />);
    await user.click(screen.getByRole('option', { name: 'Beta' }));
    expect(value).not.toHaveBeenCalled();
    rerender(<Fixture disabled open />);
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.queryByRole('listbox')).toBeNull();
    rerender(<Fixture readOnly open />);
    expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.queryByRole('listbox')).toBeNull();
  });
  it('honors input-local read-only state and custom option IDs, and hides empty groups', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Combobox>
        <Combobox.Input aria-label="Item" readOnly />
        <Combobox.Content>
          <Combobox.Option value="a" textValue="Alpha">
            Alpha
          </Combobox.Option>
        </Combobox.Content>
      </Combobox>,
    );
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}{Enter}');
    expect(screen.queryByRole('listbox')).toBeNull();
    rerender(
      <Combobox>
        <Combobox.Input aria-label="Item" />
        <Combobox.Content>
          <Combobox.Group label="Items">
            <Combobox.Option id="custom-option" value="a" textValue="Alpha">
              Alpha
            </Combobox.Option>
          </Combobox.Group>
          <Combobox.Empty>None</Combobox.Empty>
        </Combobox.Content>
      </Combobox>,
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', 'custom-option');
    await user.type(screen.getByRole('combobox'), 'zz');
    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.getByText('None')).toBeVisible();
  });
  it('can use consumer-owned filtering and clears stale active descendants', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Fixture shouldFilter={false} />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'zzz');
    expect(screen.getAllByRole('option')).toHaveLength(3);
    rerender(
      <Combobox defaultOpen>
        <Combobox.Input aria-label="Item" />
        <Combobox.Content>
          <Combobox.Empty>None</Combobox.Empty>
        </Combobox.Content>
      </Combobox>,
    );
    await waitFor(() =>
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-activedescendant'),
    );
  });
});
