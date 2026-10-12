import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Surface } from '../Surface';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('uses one Tab stop, skips disabled controls and remembers focus on reentry', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Before</button>
        <Toolbar aria-label="Actions">
          <Button>Save</Button>
          <Button disabled>Delete</Button>
          <Button>Export</Button>
        </Toolbar>
        <button>After</button>
      </>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Export' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Export' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('button', { name: 'Export' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
  });

  it('updates the tab stop when the previous control becomes disabled or is removed', async () => {
    const view = render(
      <Toolbar aria-label="Actions">
        <Button>A</Button>
        <Button>B</Button>
      </Toolbar>,
    );
    const a = screen.getByRole('button', { name: 'A' });
    a.focus();
    view.rerender(
      <Toolbar aria-label="Actions">
        <Button disabled>A</Button>
        <Button>B</Button>
      </Toolbar>,
    );
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('tabindex', '0'),
    );
    view.rerender(
      <Toolbar aria-label="Actions">
        <Button>C</Button>
        <Button disabled>B</Button>
      </Toolbar>,
    );
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'C' })).toHaveAttribute('tabindex', '0'),
    );
  });

  it('supports vertical navigation and a non-looping boundary', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions" orientation="vertical" loop={false}>
        <Button>A</Button>
        <Button>B</Button>
        <Button>C</Button>
      </Toolbar>,
    );
    await user.tab();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('button', { name: 'A' })).toHaveFocus();
    await user.keyboard('{ArrowDown}{End}{ArrowDown}');
    expect(screen.getByRole('button', { name: 'C' })).toHaveFocus();
  });

  it('preserves editable controls and consumer keyboard handlers', () => {
    const handled = vi.fn((event) => event.preventDefault());
    render(
      <Toolbar aria-label="Actions">
        <Button onKeyDown={handled}>A</Button>
        <input aria-label="Search" />
        <Button>C</Button>
      </Toolbar>,
    );
    const input = screen.getByRole('textbox', { name: 'Search' }),
      a = screen.getByRole('button', { name: 'A' });
    input.focus();
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(input).toHaveFocus();
    a.focus();
    fireEvent.keyDown(a, { key: 'End' });
    expect(a).toHaveFocus();
    expect(handled).toHaveBeenCalled();
  });

  it('keeps dropdown keyboard navigation and focus restoration working', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions">
        <Button>Save</Button>
        <Dropdown>
          <Dropdown.Trigger render={(props) => <Button {...props}>More</Button>} />
          <Dropdown.Content>
            <Dropdown.Item>Details</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <Button>Export</Button>
      </Toolbar>,
    );
    await user.tab();
    await user.keyboard('{ArrowRight}{ArrowDown}');
    expect(await screen.findByRole('menuitem', { name: 'Details' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toHaveFocus();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.getByRole('button', { name: 'More' })).toHaveFocus());
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Export' })).toHaveFocus();
  });

  it('reuses a Surface root without adding a wrapper or changing custom layout styles', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <Toolbar
        aria-label="Actions"
        ref={ref}
        layout="custom"
        className="existing"
        style={{ padding: 4 }}
        render={(props) => <Surface {...props} radius={12} />}
      >
        <Button>A</Button>
        <Button>B</Button>
        <Button>C</Button>
      </Toolbar>,
    );
    expect(container.children).toHaveLength(1);
    expect(ref.current).toBe(screen.getByRole('toolbar'));
    expect(ref.current).toHaveClass('existing');
    expect(ref.current?.style.getPropertyValue('--action-group-gap')).toBe('');
    expect(ref.current?.style.padding).toBe('4px');
  });

  it('does not own theme state or prevent an action changing its icon and label', async () => {
    const user = userEvent.setup();
    function Example() {
      const [dark, setDark] = useState(false);
      return (
        <Toolbar aria-label="Actions">
          <Button onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'}</Button>
          <Button>B</Button>
          <Button>C</Button>
        </Toolbar>
      );
    }
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Dark' }));
    expect(screen.getByRole('button', { name: 'Light' })).toHaveFocus();
  });
});
