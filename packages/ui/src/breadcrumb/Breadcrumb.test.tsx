import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';

describe('Breadcrumb', () => {
  it('renders native link and current-page semantics with the default separator', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/applications">Applications</BreadcrumbItem>
        <BreadcrumbItem>Current application</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Current application').parentElement).toHaveAttribute(
      'aria-current',
      'page',
    );
    screen
      .getAllByText('/')
      .forEach((separator) => expect(separator).toHaveAttribute('aria-hidden', 'true'));
  });

  it('renders a custom ReactNode separator as decorative content', () => {
    render(
      <Breadcrumb separator={<span data-testid="chevron">&gt;</span>}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Application</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByTestId('chevron').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders item icons as decorative content before dynamic labels', () => {
    const userId = 1;

    render(
      <Breadcrumb>
        <BreadcrumbItem icon={<svg data-testid="users-icon" />} href="/users">
          Users
        </BreadcrumbItem>
        <BreadcrumbItem>{userId}</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByTestId('users-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByText('1').parentElement).toHaveAttribute('aria-current', 'page');
  });

  it('forwards consumer classes, native props, and refs', () => {
    const navRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLAnchorElement | HTMLSpanElement>();

    render(
      <Breadcrumb ref={navRef} className="consumer-breadcrumb" aria-label="Location">
        <BreadcrumbItem ref={itemRef} className="consumer-item" href="/home" target="_self">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Location' });
    const link = screen.getByRole('link', { name: 'Home' });

    expect(navRef.current).toBe(navigation);
    expect(itemRef.current).toBe(link);
    expect(navigation).toHaveClass('consumer-breadcrumb');
    expect(link).toHaveClass('consumer-item');
    expect(link).toHaveAttribute('target', '_self');
  });
});
