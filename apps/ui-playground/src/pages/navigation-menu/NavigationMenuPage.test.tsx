import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { NavigationMenuPage } from './NavigationMenuPage';

describe('NavigationMenuPage', () => {
  it('shows horizontal, vertical, nested, and disabled examples', async () => {
    const user = userEvent.setup();
    render(<NavigationMenuPage />);

    expect(screen.getByRole('heading', { name: 'NavigationMenu', level: 1 })).toBeInTheDocument();

    const headerNavigation = screen.getByRole('navigation', { name: 'Header navigation' });
    const headerProducts = within(headerNavigation).getByRole('button', { name: 'Products' });
    await user.hover(headerProducts);
    expect(screen.getByRole('dialog', { name: 'Products' })).toBeInTheDocument();
    await user.click(
      within(screen.getByRole('dialog', { name: 'Products' })).getByRole('link', {
        name: 'Cloud',
      }),
    );
    expect(screen.queryByRole('dialog', { name: 'Products' })).not.toBeInTheDocument();

    const hoverNavigation = screen.getByRole('navigation', { name: 'Hover submenu navigation' });
    const navigationOne = within(hoverNavigation).getByRole('button', {
      name: 'Navigation One',
    });
    await user.hover(navigationOne);
    const hoverSubmenu = screen.getByRole('dialog', { name: 'Navigation One' });
    expect(hoverSubmenu).toHaveAttribute('data-placement', 'rightTop');
    expect(within(hoverSubmenu).getByRole('link', { name: 'Option 1' })).toBeVisible();
    await user.click(within(hoverSubmenu).getByRole('link', { name: 'Option 1' }));
    expect(screen.queryByRole('dialog', { name: 'Navigation One' })).not.toBeInTheDocument();

    await user.hover(within(hoverNavigation).getByRole('button', { name: 'Navigation Two' }));
    await user.hover(screen.getByRole('button', { name: 'Submenu' }));
    const nestedPopup = screen.getByRole('dialog', { name: 'Submenu' });
    expect(screen.getByRole('dialog', { name: 'Navigation Two' })).toBeVisible();
    expect(nestedPopup).toHaveAttribute('data-placement', 'rightTop');
    await user.click(within(nestedPopup).getByRole('link', { name: 'Option 7' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const topNavigation = screen.getAllByRole('navigation', { name: 'Top navigation' })[0]!;
    const home = within(topNavigation).getByRole('link', { name: 'Home' });
    const docs = within(topNavigation).getByRole('link', { name: 'Docs' });
    expect(home).toHaveAttribute('aria-current', 'page');

    await user.click(docs);
    expect(docs).toHaveAttribute('aria-current', 'page');
    expect(home).not.toHaveAttribute('aria-current');

    const productNavigation = screen.getByRole('navigation', { name: 'Product navigation' });
    const products = within(productNavigation).getByRole('button', { name: 'Products' });
    expect(products).toHaveAttribute('aria-expanded', 'true');
    expect(within(productNavigation).getByRole('link', { name: 'Cloud' })).toBeVisible();

    await user.click(products);
    expect(products).toHaveAttribute('aria-expanded', 'false');
    expect(
      within(productNavigation).queryByRole('link', { name: 'Cloud' }),
    ).not.toBeInTheDocument();

    const leftNavigation = screen.getByRole('navigation', { name: 'Left navigation' });
    expect(within(leftNavigation).getByRole('link', { name: 'Billing' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });
});
