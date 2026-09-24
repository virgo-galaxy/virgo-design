import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Menu } from '../Menu';
import { Menubar } from './index';

describe('Menubar UI', () => {
  it('styles the bar and triggers while reusing item visuals and keyboard behavior', async () => {
    const user = userEvent.setup();
    render(
      <div data-theme="dark">
        <Menubar size="small" className="app-bar" aria-label="App">
          <Menubar.Menu>
            <Menubar.Trigger className="file-trigger">File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item shortcut="⌘N">New</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>Undo</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar>
      </div>,
    );
    expect(Menubar.Item).toBe(Menu.Item);
    expect(screen.getByRole('menubar')).toHaveClass('app-bar');
    expect(screen.getByRole('menuitem', { name: 'File' })).toHaveClass('file-trigger');
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'New' })).toHaveFocus();
    expect(screen.getByRole('menu')).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('menu')).toHaveAttribute('data-size', 'small');
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('menuitem', { name: 'Undo' })).toHaveFocus();
  });
});
