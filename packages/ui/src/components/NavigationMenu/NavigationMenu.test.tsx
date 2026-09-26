import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { NavigationMenu } from './index';
import type { NavigationMenuOrientation } from './NavigationMenu.types';

function Example({ orientation = 'horizontal' }: { orientation?: NavigationMenuOrientation }) {
  return (
    <NavigationMenu.Root
      aria-label="Primary"
      defaultValue="home"
      orientation={orientation}
      data-testid="navigation-menu"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="home" icon={<svg data-testid="home-icon" />}>
          <NavigationMenu.Link href="#home">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud">
              <NavigationMenu.Link href="#cloud">Cloud</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item disabled value="settings">
          <NavigationMenu.Link href="#settings">Settings</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function PopoverExample({
  expanded,
  defaultExpanded,
  onExpandedChange,
  orientation = 'horizontal',
}: {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  orientation?: NavigationMenuOrientation;
}) {
  return (
    <NavigationMenu.Root aria-label="Header" submenu="popover" orientation={orientation}>
      <NavigationMenu.List>
        <NavigationMenu.Item
          value="products"
          {...(expanded === undefined ? {} : { expanded })}
          {...(defaultExpanded === undefined ? {} : { defaultExpanded })}
          {...(onExpandedChange === undefined ? {} : { onExpandedChange })}
        >
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud">
              <NavigationMenu.Link href="#cloud">Cloud</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="platform">
              <NavigationMenu.Trigger>Platform</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Item value="api">
                  <NavigationMenu.Link href="#api">API</NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function SeparatorExample({ orientation }: { orientation: NavigationMenuOrientation }) {
  return (
    <NavigationMenu.Root
      aria-label={`${orientation} sections`}
      defaultValue="first"
      orientation={orientation}
      variant="segmented"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="first" icon={<svg data-testid="segmented-icon" />}>
          <NavigationMenu.Link href="#first">First</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator data-testid="navigation-separator" />
        <NavigationMenu.Item value="second">
          <NavigationMenu.Link href="#second">Second</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

afterEach(() => vi.useRealTimers());

describe('NavigationMenu UI', () => {
  it('uses the default Classic variant', () => {
    render(<Example />);

    expect(screen.getByTestId('navigation-menu')).toHaveAttribute('data-variant', 'default');
    expect(screen.getByTestId('navigation-menu')).toHaveAttribute('data-submenu', 'inline');
  });

  it.each(['light', 'dark'] as const)('supports the segmented variant in %s theme', (theme) => {
    render(
      <div data-theme={theme}>
        <SeparatorExample orientation="horizontal" />
      </div>,
    );

    const navigation = screen.getByRole('navigation', { name: 'horizontal sections' });
    expect(navigation).toHaveAttribute('data-variant', 'segmented');
    expect(navigation.closest(`[data-theme="${theme}"]`)).toBeInTheDocument();
    expect(navigation).not.toHaveAttribute('data-theme');
    expect(screen.getByTestId('segmented-icon').parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it.each([
    ['horizontal', 'vertical'],
    ['vertical', 'horizontal'],
  ] as const)('uses a decorative %s rule in a %s menu', (orientation, separatorOrientation) => {
    render(<SeparatorExample orientation={orientation} />);

    const separator = screen.getByTestId('navigation-separator');
    const rule = separator.firstElementChild;
    expect(separator).toHaveAttribute('role', 'presentation');
    expect(separator).toHaveAttribute('aria-hidden', 'true');
    expect(separator).toHaveAttribute('data-orientation', separatorOrientation);
    expect(rule).toHaveAttribute('data-orientation', separatorOrientation);
    expect(rule).not.toHaveAttribute('role');
    expect(rule).not.toHaveAttribute('aria-orientation');
  });

  it('preserves visual anatomy when a custom link renderer is used', () => {
    render(
      <NavigationMenu.Root aria-label="Custom link" defaultValue="home" variant="segmented">
        <NavigationMenu.List>
          <NavigationMenu.Item value="home" icon={<svg data-testid="custom-link-icon" />}>
            <NavigationMenu.Link
              href="#home"
              render={(props) => <a {...props} data-custom-link="" />}
            >
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    );

    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('data-custom-link');
    expect(link).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('custom-link-icon').parentElement).toHaveAttribute(
      'data-slot',
      'icon',
    );
  });

  it.each(['horizontal', 'vertical'] as const)('supports %s orientation', (orientation) => {
    render(<Example orientation={orientation} />);

    expect(screen.getByRole('navigation', { name: 'Primary' })).toHaveAttribute(
      'data-orientation',
      orientation,
    );
  });

  it('renders item icons as decorative content', () => {
    render(<Example />);

    expect(screen.getByTestId('home-icon').parentElement).toHaveAttribute('data-slot', 'icon');
    expect(screen.getByTestId('home-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('inherits the Virgo dark theme without replacing it', () => {
    render(
      <div data-theme="dark">
        <Example />
      </div>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Primary' });
    expect(navigation.closest('[data-theme="dark"]')).toBeInTheDocument();
    expect(navigation).not.toHaveAttribute('data-theme');
  });

  it('preserves disabled behavior and styling hooks', async () => {
    const user = userEvent.setup();
    render(<Example />);

    const settings = screen.getByRole('link', { name: 'Settings' });
    await user.click(settings);

    expect(settings).toHaveAttribute('aria-disabled', 'true');
    expect(settings).not.toHaveAttribute('aria-current');
    expect(settings.closest('[data-slot="item"]')).toHaveAttribute('data-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('can hide a trigger disclosure indicator', () => {
    render(
      <NavigationMenu.Root aria-label="Compact navigation" submenu="popover" orientation="vertical">
        <NavigationMenu.List>
          <NavigationMenu.Item value="projects">
            <NavigationMenu.Trigger indicator={false}>Projects</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Item value="cloud">
                <NavigationMenu.Link href="#cloud">Cloud</NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    );

    expect(screen.getByRole('button', { name: 'Projects' })).not.toContainElement(
      document.querySelector('[data-slot="indicator"]'),
    );
  });

  it('styles and preserves nested disclosure behavior', async () => {
    const user = userEvent.setup();
    render(<Example />);

    const trigger = screen.getByRole('button', { name: 'Products' });
    const content = screen.getByText('Cloud').closest('[data-slot="content"]');
    expect(trigger.querySelector('[data-slot="indicator"]')).toHaveAttribute('aria-hidden', 'true');
    expect(content).not.toBeVisible();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Cloud' })).toBeVisible();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(content).not.toBeVisible();
  });

  it('opens popover submenus on keyboard focus and closes after navigation', async () => {
    const user = userEvent.setup();
    render(<PopoverExample />);

    const navigation = screen.getByRole('navigation', { name: 'Header' });
    const trigger = screen.getByRole('button', { name: 'Products' });
    expect(navigation).toHaveAttribute('data-submenu', 'popover');

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Products' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Cloud' }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog', { name: 'Products' })).not.toBeInTheDocument();
  });

  it('moves focus into a popover submenu and restores it on Escape', async () => {
    const user = userEvent.setup();
    render(<PopoverExample />);

    const trigger = screen.getByRole('button', { name: 'Products' });
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('link', { name: 'Cloud' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('keeps controlled expanded state as the source of truth in popover mode', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    const { rerender } = render(
      <PopoverExample expanded={false} onExpandedChange={onExpandedChange} />,
    );

    await user.click(screen.getByRole('button', { name: 'Products' }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<PopoverExample expanded onExpandedChange={onExpandedChange} />);
    expect(screen.getByRole('dialog', { name: 'Products' })).toBeInTheDocument();
  });

  it('carries the active theme into portalled submenu content', () => {
    render(
      <div data-theme="dark">
        <PopoverExample defaultExpanded />
      </div>,
    );

    expect(screen.getByRole('dialog', { name: 'Products' })).toHaveAttribute('data-theme', 'dark');
  });

  it('keeps the disclosure indicator mounted while its direction changes and side arrows stay right', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Example />);
    const trigger = screen.getByRole('button', { name: 'Products' });
    const disclosureIndicator = trigger.querySelector('[data-slot="indicator"]');
    expect(disclosureIndicator).toHaveAttribute('data-direction', 'down');
    await user.click(trigger);
    expect(trigger.querySelector('[data-slot="indicator"]')).toBe(disclosureIndicator);
    expect(disclosureIndicator).toHaveAttribute('data-direction', 'up');
    await user.click(trigger);
    expect(disclosureIndicator).toHaveAttribute('data-direction', 'down');
    unmount();

    render(<PopoverExample orientation="vertical" />);
    const popoverTrigger = screen.getByRole('button', { name: 'Products' });
    const indicator = popoverTrigger.querySelector('[data-slot="indicator"]');
    expect(indicator).toHaveAttribute('data-direction', 'right');
    await user.hover(popoverTrigger);
    expect(indicator).toHaveAttribute('data-direction', 'right');
  });

  it.each(['horizontal', 'vertical'] as const)(
    'opens cascading popovers for %s navigation and closes the whole path on selection',
    async (orientation) => {
      const user = userEvent.setup();
      render(
        <div data-theme="dark">
          <PopoverExample orientation={orientation} />
        </div>,
      );
      await user.hover(screen.getByRole('button', { name: 'Products' }));
      const parentPanel = screen.getByRole('dialog', { name: 'Products' });
      expect(parentPanel).toHaveAttribute(
        'data-placement',
        orientation === 'horizontal' ? 'bottomLeft' : 'rightTop',
      );
      const nestedTrigger = screen.getByRole('button', { name: 'Platform' });
      await user.hover(nestedTrigger);
      const childPanel = screen.getByRole('dialog', { name: 'Platform' });
      expect(parentPanel).not.toContainElement(childPanel);
      expect(childPanel).toHaveAttribute('data-placement', 'rightTop');
      expect(childPanel).toHaveAttribute('data-theme', 'dark');
      expect(nestedTrigger).toHaveAttribute('aria-controls', childPanel.id);
      await user.hover(childPanel);
      expect(parentPanel).toBeVisible();
      await user.click(screen.getByRole('link', { name: 'API' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      await user.hover(screen.getByRole('button', { name: 'Products' }));
      await user.hover(screen.getByRole('button', { name: 'Platform' }));
      expect(screen.getByRole('link', { name: 'API' })).toHaveAttribute('aria-current', 'page');
    },
  );

  it.each(['Escape', 'ArrowLeft'])('returns one submenu level with %s', async (key) => {
    const user = userEvent.setup();
    render(<PopoverExample orientation="vertical" />);
    await user.tab();
    await user.keyboard('{ArrowRight}{ArrowDown}{ArrowRight}');
    expect(screen.getByRole('link', { name: 'API' })).toHaveFocus();
    await user.keyboard(`{${key}}`);
    expect(screen.queryByRole('dialog', { name: 'Platform' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Platform' })).toHaveFocus();
  });

  it('keeps every ancestor open while hovering a child portal and closes after leaving the tree', () => {
    vi.useFakeTimers();
    render(<PopoverExample orientation="vertical" />);
    const trigger = screen.getByRole('button', { name: 'Products' });
    fireEvent.pointerEnter(trigger);
    fireEvent.pointerLeave(trigger);
    const parentPanel = screen.getByRole('dialog', { name: 'Products' });
    fireEvent.pointerEnter(parentPanel);
    const childTrigger = screen.getByRole('button', { name: 'Platform' });
    fireEvent.pointerEnter(childTrigger);
    fireEvent.pointerLeave(childTrigger);
    fireEvent.pointerLeave(parentPanel);
    act(() => vi.advanceTimersByTime(100));
    const childPanel = screen.getByRole('dialog', { name: 'Platform' });
    fireEvent.pointerEnter(childPanel);
    act(() => vi.advanceTimersByTime(200));
    expect(parentPanel).toBeVisible();
    expect(childPanel).toBeVisible();
    expect(trigger).not.toHaveFocus();
    fireEvent.pointerLeave(childPanel);
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('replaces sibling popovers immediately during rapid pointer movement', () => {
    vi.useFakeTimers();
    const onExpandedChange = vi.fn();
    render(
      <NavigationMenu.Root submenu="popover" orientation="vertical">
        <NavigationMenu.List>
          {['First', 'Second', 'Third'].map((name) => (
            <NavigationMenu.Item key={name} value={name} onExpandedChange={onExpandedChange}>
              <NavigationMenu.Trigger>{name}</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Item value={`${name}-link`}>
                  <NavigationMenu.Link href={`#${name}`}>{name} link</NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ))}
          <NavigationMenu.Item value="about">
            <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    );
    let previous: HTMLElement | undefined;
    for (const name of Array.from({ length: 8 }, () => [
      'First',
      'Second',
      'Third',
      'Second',
    ]).flat()) {
      if (previous) fireEvent.pointerLeave(previous);
      const current = screen.getByRole('button', { name });
      fireEvent.pointerEnter(current);
      expect(screen.getAllByRole('dialog')).toHaveLength(1);
      expect(screen.getByRole('dialog', { name })).toBeVisible();
      expect(document.querySelectorAll('[data-navigation-menu-popover-content]')).toHaveLength(1);
      if (previous) expect(previous).toHaveAttribute('aria-expanded', 'false');
      previous = current;
    }
    // A stale timer from an earlier visit must not dismiss the current popup.
    const changeCount = onExpandedChange.mock.calls.length;
    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole('dialog', { name: 'Second' })).toBeVisible();
    expect(onExpandedChange).toHaveBeenCalledTimes(changeCount);
    expect(onExpandedChange).toHaveBeenCalledWith(false);
    fireEvent.pointerEnter(screen.getByRole('link', { name: 'About' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('switches nested siblings without closing the parent popup', () => {
    render(
      <NavigationMenu.Root submenu="popover" orientation="vertical">
        <NavigationMenu.List>
          <NavigationMenu.Item value="parent">
            <NavigationMenu.Trigger>Parent</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              {['Child one', 'Child two'].map((name) => (
                <NavigationMenu.Item key={name} value={name}>
                  <NavigationMenu.Trigger>{name}</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Item value={`${name}-link`}>
                      <NavigationMenu.Link href={`#${name}`}>{name} link</NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    );
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Parent' }));
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Child one' }));
    fireEvent.pointerEnter(screen.getByRole('button', { name: 'Child two' }));
    expect(screen.getByRole('dialog', { name: 'Parent' })).toBeVisible();
    expect(screen.queryByRole('dialog', { name: 'Child one' })).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Child two' })).toBeVisible();
    expect(screen.getAllByRole('dialog')).toHaveLength(2);
  });

  it('merges consumer classes and forwards refs', () => {
    const rootRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const linkRef = createRef<HTMLAnchorElement>();

    render(
      <NavigationMenu.Root ref={rootRef} aria-label="Primary" className="consumer-root">
        <NavigationMenu.List ref={listRef} className="consumer-list">
          <NavigationMenu.Item ref={itemRef} className="consumer-item" value="home">
            <NavigationMenu.Link ref={linkRef} className="consumer-link" href="#home">
              Home
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>,
    );

    expect(rootRef.current).toBe(screen.getByRole('navigation', { name: 'Primary' }));
    expect(rootRef.current).toHaveClass('consumer-root');
    expect(listRef.current).toHaveClass('consumer-list');
    expect(itemRef.current).toHaveClass('consumer-item');
    expect(linkRef.current).toHaveClass('consumer-link');
  });
});
