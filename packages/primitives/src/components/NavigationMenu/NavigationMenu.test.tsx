import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NavigationMenu } from './index';
import type { NavigationMenuItemProps, NavigationMenuProps } from './NavigationMenu.types';

function Example({
  productsProps,
  ...props
}: Partial<NavigationMenuProps> & {
  productsProps?: Partial<Omit<NavigationMenuItemProps, 'value'>>;
} = {}) {
  return (
    <NavigationMenu.Root aria-label="Primary" defaultValue="home" {...props}>
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="#home">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="products" {...productsProps}>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud">
              <NavigationMenu.Link href="#cloud">Cloud</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="storage">
              <NavigationMenu.Link href="#storage">Storage</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item disabled value="disabled">
          <NavigationMenu.Link href="#disabled">Disabled</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#docs">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

describe('NavigationMenu primitive', () => {
  it('manages active links in uncontrolled mode', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');

    await user.click(screen.getByRole('link', { name: 'Docs' }));

    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('docs');
  });

  it('uses controlled active state as the source of truth', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(<Example value="home" onValueChange={onValueChange} />);

    await user.click(screen.getByRole('link', { name: 'Docs' }));
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('docs');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

    rerender(<Example value="docs" onValueChange={onValueChange} />);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
  });

  it('supports controlled expanded state', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    const { rerender } = render(<Example productsProps={{ expanded: false, onExpandedChange }} />);

    const trigger = screen.getByRole('button', { name: 'Products' });
    await user.click(trigger);
    expect(onExpandedChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    rerender(<Example productsProps={{ expanded: true, onExpandedChange }} />);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('exposes orientation and moves focus through enabled top-level controls', async () => {
    const user = userEvent.setup();
    render(<Example />);

    const navigation = screen.getByRole('navigation', { name: 'Primary' });
    const list = navigation.querySelector('[data-slot="list"]');
    const home = screen.getByRole('link', { name: 'Home' });
    const products = screen.getByRole('button', { name: 'Products' });
    const docs = screen.getByRole('link', { name: 'Docs' });

    expect(navigation).toHaveAttribute('data-orientation', 'horizontal');
    expect(list).toHaveAttribute('data-orientation', 'horizontal');

    home.focus();
    await user.keyboard('{ArrowRight}');
    expect(products).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(docs).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(home).toHaveFocus();
    await user.keyboard('{End}');
    expect(docs).toHaveFocus();
    await user.keyboard('{Home}');
    expect(home).toHaveFocus();
  });

  it('uses vertical arrow navigation when requested', async () => {
    const user = userEvent.setup();
    render(<Example orientation="vertical" />);

    const home = screen.getByRole('link', { name: 'Home' });
    const products = screen.getByRole('button', { name: 'Products' });

    home.focus();
    await user.keyboard('{ArrowDown}');
    expect(products).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(home).toHaveFocus();
  });

  it('opens nested content, moves focus into it, and returns focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole('button', { name: 'Products' });
    const content = screen.getByText('Cloud').closest('[data-slot="content"]');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls', content?.id);
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
    expect(content).toHaveAttribute('hidden');

    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(content).not.toHaveAttribute('hidden');
    expect(screen.getByRole('link', { name: 'Cloud' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(content).toHaveAttribute('hidden');
    expect(trigger).toHaveFocus();
  });

  it('prevents disabled links from activating', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);

    const disabled = screen.getByRole('link', { name: 'Disabled' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(disabled).toHaveAttribute('tabindex', '-1');

    await user.click(disabled);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(disabled).not.toHaveAttribute('aria-current');
  });
});
