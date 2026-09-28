import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { SectionNavigation } from './SectionNavigation';

const items = [
  { path: '/first', label: 'First', icon: <svg data-testid="first-icon" /> },
  { path: '/second', label: 'Second' },
] as const;

function Example() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <SectionNavigation ariaLabel="Example sections" items={items} />
      <output data-testid="current-path">{location.pathname}</output>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <button type="button" onClick={() => navigate(1)}>
        Forward
      </button>
    </>
  );
}

describe('SectionNavigation', () => {
  it('composes the segmented NavigationMenu with optional icons and separators', () => {
    render(
      <MemoryRouter initialEntries={['/first']}>
        <Example />
      </MemoryRouter>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Example sections' });
    expect(navigation).toHaveAttribute('data-variant', 'segmented');
    expect(navigation).toHaveAttribute('data-orientation', 'horizontal');
    expect(navigation.querySelectorAll('[data-slot="separator"]')).toHaveLength(1);
    expect(navigation.querySelectorAll('[data-slot="icon"]')).toHaveLength(1);
    expect(screen.getByTestId('first-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(within(navigation).getByRole('link', { name: 'First' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('supports a vertical orientation for edge-docked navigation', () => {
    render(
      <MemoryRouter initialEntries={['/first']}>
        <SectionNavigation ariaLabel="Example sections" items={items} orientation="vertical" />
      </MemoryRouter>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Example sections' });
    expect(navigation).toHaveAttribute('data-orientation', 'vertical');
    expect(navigation.querySelector('[data-slot="separator"]')).toHaveAttribute(
      'data-orientation',
      'horizontal',
    );
  });

  it('keeps active state synchronized through navigation, back, and forward', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/first']}>
        <Example />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: 'Second' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/second');
    expect(screen.getByRole('link', { name: 'Second' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/first');
    expect(screen.getByRole('link', { name: 'First' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: 'Forward' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/second');
    expect(screen.getByRole('link', { name: 'Second' })).toHaveAttribute('aria-current', 'page');
  });
});
