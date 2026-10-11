import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckIcon } from '@virgo-design/icons';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Menu } from './index';

describe('Menu UI', () => {
  it('uses themed classes, size, custom classes and theme through a portal', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLDivElement>();
    render(
      <div data-theme="dark">
        <Menu size="small">
          <Menu.Trigger>Actions</Menu.Trigger>
          <Menu.Content ref={ref} className="consumer-menu">
            <Menu.Item className="consumer-item" icon={<CheckIcon />} shortcut="⌘S" danger>
              Save
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    const content = screen.getByRole('menu');
    expect(content).toBe(ref.current);
    expect(content).toHaveClass('consumer-menu');
    expect(content.className).toMatch(/content/);
    expect(content).toHaveAttribute('data-size', 'small');
    expect(content).toHaveAttribute('data-theme', 'dark');
    const item = screen.getByRole('menuitem', { name: 'Save' });
    expect(item).toHaveClass('consumer-item');
    expect(item.className).toMatch(/danger/);
    expect(item.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('⌘S')).toHaveAttribute('aria-hidden', 'true');
  });
  it('keeps shortcut display inert and typeahead independent of the shortcut', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Menu defaultOpen>
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Rename</Menu.Item>
          <Menu.Item shortcut="⌘S" onSelect={onSelect}>
            Save
          </Menu.Item>
        </Menu.Content>
      </Menu>,
    );
    await user.keyboard('{Meta>}s{/Meta}');
    expect(onSelect).not.toHaveBeenCalled();
    await user.keyboard('s');
    expect(screen.getByRole('menuitem', { name: 'Save' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
  });
  it('renders group labels, persistent checks and submenu indicators using shared behavior', async () => {
    const user = userEvent.setup();
    render(
      <Menu defaultOpen>
        <Menu.Trigger>View</Menu.Trigger>
        <Menu.Content>
          <Menu.Group label="Preferences">
            <Menu.CheckboxItem defaultChecked>Grid</Menu.CheckboxItem>
          </Menu.Group>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>Export</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item>PDF</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.Content>
      </Menu>,
    );
    expect(screen.getByRole('group', { name: 'Preferences' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Grid' }));
    expect(screen.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'false');
    const trigger = screen.getByRole('menuitem', { name: 'Export' });
    expect(trigger.querySelector('svg')).toBeInTheDocument();
    await user.hover(trigger);
    expect(screen.getByRole('menuitem', { name: 'PDF' })).toBeVisible();
  });
  it('retains render(props) and forwards trigger refs', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    render(
      <Menu>
        <Menu.Trigger
          ref={ref}
          render={(props) => <button {...props} className="custom-trigger" />}
        >
          Custom
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item disabled>Unavailable</Menu.Item>
        </Menu.Content>
      </Menu>,
    );
    expect(ref.current).toHaveClass('custom-trigger');
    await user.click(ref.current!);
    await user.keyboard('{Enter}');
    expect(screen.getByRole('menu')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(ref.current).toHaveFocus();
  });
});
