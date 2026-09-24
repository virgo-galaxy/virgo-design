import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { LayoutPage } from './LayoutPage';

describe('Layout Playground', () => {
  it('retains the blue structural specimens before the composed examples', () => {
    render(<LayoutPage />);
    const exampleHeading = screen.getByRole('heading', { name: 'Typical examples' });
    for (const name of ['Basic', 'Left Sidebar', 'Right Sidebar', 'Full-height Sidebar']) {
      const heading = screen.getByRole('heading', { name });
      expect(
        heading.compareDocumentPosition(exampleHeading) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      const specimen = heading.closest('section')?.querySelector('.layout-demo');
      expect(specimen?.querySelector('.layout-demo-header')).toHaveTextContent('Header');
      expect(specimen?.querySelector('.layout-demo-content')).toHaveTextContent('Content');
    }
    expect(document.querySelectorAll('.layout-structure-grid > .layout-review-card')).toHaveLength(
      4,
    );
    expect(document.querySelectorAll('.layout-demo')).toHaveLength(4);
  });

  it('opens subnavigation from the collapsed floating sidebar', async () => {
    const user = userEvent.setup();
    render(<LayoutPage />);
    const sidebar = screen.getByRole('complementary', { name: 'Floating sidebar' });
    await user.click(within(sidebar).getByRole('button', { name: 'Collapse sidebar' }));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    await user.hover(within(sidebar).getByRole('button', { name: 'Projects' }));
    expect(screen.getByRole('dialog', { name: 'Projects' })).toBeVisible();
    await user.click(screen.getByRole('link', { name: 'Cloud' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
  });

  it('shows a functional standalone action and expandable action stack', async () => {
    const user = userEvent.setup();
    render(<LayoutPage />);
    await user.click(screen.getByRole('button', { name: 'Help' }));
    expect(screen.getByRole('status')).toHaveTextContent('Help selected.');
    const trigger = screen.getByRole('button', { name: 'Quick actions' });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Show tips' }));
    expect(screen.getByRole('status')).toHaveTextContent('Tips enabled');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it('keeps navigation labels and selected state when collapsing to an icon rail', async () => {
    const user = userEvent.setup();
    render(<LayoutPage />);
    const sidebar = screen.getByRole('complementary', { name: 'Sidebar region' });
    const projects = within(sidebar).getByRole('link', { name: 'Projects' });
    await user.click(projects);
    expect(projects).toHaveAttribute('aria-current', 'page');
    await user.click(within(sidebar).getByRole('button', { name: 'Collapse sidebar' }));
    expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    expect(projects).toHaveAccessibleName('Projects');
    expect(projects).toHaveAttribute('aria-current', 'page');
    await user.click(within(sidebar).getByRole('button', { name: 'Expand sidebar' }));
    expect(sidebar).toHaveAttribute('data-state', 'expanded');
  });

  it('controls Sidebar from Header and keeps a zero-width overlay trigger available', async () => {
    const user = userEvent.setup();
    render(<LayoutPage />);
    await user.click(screen.getByRole('button', { name: 'Collapse controlled sidebar' }));
    expect(screen.getByRole('complementary', { name: 'Controlled region' })).toHaveAttribute(
      'data-state',
      'collapsed',
    );
    const overlay = screen.getByRole('complementary', { name: 'Overlay region' });
    expect(within(overlay).queryByRole('navigation')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Expand overlay sidebar' }));
    expect(within(overlay).getByRole('navigation')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Collapse overlay sidebar' }));
    expect(within(overlay).queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Expand overlay sidebar' })).toHaveFocus();
  });
});
