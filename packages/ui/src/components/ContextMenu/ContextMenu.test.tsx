import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Menu } from '../Menu';
import { ContextMenu } from './index';

describe('ContextMenu UI', () => {
  it('uses the Menu visual parts and opens a themed context panel', async () => {
    const user = userEvent.setup();
    render(
      <div data-theme="dark">
        <ContextMenu size="large">
          <ContextMenu.Trigger className="file">File</ContextMenu.Trigger>
          <ContextMenu.Content className="context-panel">
            <ContextMenu.Item shortcut="F2">Rename</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      </div>,
    );
    expect(ContextMenu.Item).toBe(Menu.Item);
    fireEvent.contextMenu(screen.getByText('File'), { clientX: 64, clientY: 96 });
    const panel = screen.getByRole('menu');
    expect(panel).toHaveAttribute('data-theme', 'dark');
    expect(panel).toHaveAttribute('data-size', 'large');
    expect(panel).toHaveClass('context-panel');
    expect(panel).toHaveStyle({ left: '64px', top: '96px' });
    await user.click(screen.getByRole('menuitem', { name: 'Rename' }));
    expect(screen.getByText('File')).toHaveFocus();
  });
  it('permits custom target rendering with keyboard behavior', async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenu.Trigger render={(props) => <div {...props} data-custom="" />}>
          Canvas
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Inspect</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>,
    );
    await user.tab();
    await user.keyboard('{Shift>}{F10}{/Shift}');
    expect(screen.getByRole('menuitem', { name: 'Inspect' })).toHaveFocus();
  });
});
