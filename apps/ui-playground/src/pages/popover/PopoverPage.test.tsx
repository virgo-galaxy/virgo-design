import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { App } from '../../App';
import { componentGroups, componentRoutes } from '../../app/componentRoutes';

afterEach(() => vi.restoreAllMocks());
describe('Popover Playground', () => {
  it('opens the custom avatar trigger without Virgo Button styling and returns focus on close', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/popover']}>
        <App />
      </MemoryRouter>,
    );
    const trigger = screen.getByRole('button', { name: 'Workspace profile' });
    expect(trigger).not.toHaveAttribute('data-variant');
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Workspace profile' })).toHaveTextContent(
      'A custom avatar trigger rendered without Virgo Button.',
    );
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });
  it('edits a workspace, supports nested menus, and follows the global theme', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={['/components/popover']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Popover', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Popover/ })).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('button', { name: 'Edit workspace' }));
    const name = screen.getByRole('textbox', { name: 'Workspace name' });
    await user.clear(name);
    await user.type(name, 'Updated workspace');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.getByRole('status')).toHaveTextContent('Workspace: Updated workspace');
    expect(screen.getByRole('button', { name: 'Edit workspace' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Sharing settings' }));
    await user.click(screen.getByRole('button', { name: 'Change visibility' }));
    await user.click(screen.getByRole('menuitemradio', { name: 'Public' }));
    expect(within(screen.getByRole('dialog')).getByText('Visibility: Public')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Done' }));
    await user.click(screen.getByRole('button', { name: 'dark' }));
    await user.click(screen.getByRole('button', { name: 'Workspace details' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-theme', 'dark');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'light' }));
    await user.click(screen.getByRole('button', { name: 'Workspace details' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-theme', 'light');
    expect(
      screen.queryByRole('heading', { name: 'Local theme & direction' }),
    ).not.toBeInTheDocument();
  });
  it('preserves alphabetic grouping and consecutive numbering when registering Popover', () => {
    expect(componentRoutes.map((route) => route.index)).toEqual(
      componentRoutes.map((_, index) => String(index + 1).padStart(2, '0')),
    );
    for (const group of componentGroups) {
      const names = componentRoutes
        .filter((route) => route.group === group.id)
        .map((route) => route.name);
      expect(names).toEqual([...names].sort((left, right) => left.localeCompare(right)));
    }
  });
});
