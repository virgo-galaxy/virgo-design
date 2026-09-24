import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ContextMenuPage, MenubarPage, MenuPage } from './MenuSystemPages';

describe('Menu System Playground', () => {
  it('shows action feedback and persistent preference changes', async () => {
    const user = userEvent.setup();
    render(<MenuPage />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Rename' }));
    expect(screen.getByRole('status')).toHaveTextContent('Rename');
    await user.click(screen.getByRole('button', { name: 'View options' }));
    await user.click(screen.getByRole('menuitemradio', { name: '200%' }));
    expect(screen.getByText('Grid on · Zoom 200%')).toBeInTheDocument();
  });
  it('provides a real context target and shared nested menu actions', async () => {
    const user = userEvent.setup();
    render(<ContextMenuPage />);
    fireEvent.contextMenu(screen.getByLabelText('Document context'), {
      clientX: 100,
      clientY: 100,
    });
    await user.click(screen.getByRole('menuitem', { name: 'New' }));
    expect(screen.getByRole('status')).toHaveTextContent('New');
  });
  it('demonstrates keyboard switching between application menus', async () => {
    const user = userEvent.setup();
    render(<MenubarPage />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.keyboard('{ArrowRight}');
    await user.click(screen.getByRole('menuitem', { name: 'Undo' }));
    expect(screen.getByRole('status')).toHaveTextContent('Undo');
  });
});
