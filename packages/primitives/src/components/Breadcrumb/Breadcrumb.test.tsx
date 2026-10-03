import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from './index';

function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/applications">Application Center</Breadcrumb.Item>
      <Breadcrumb.Item href="/applications/list">Application List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}

describe('Breadcrumb primitive', () => {
  it('renders a named breadcrumb navigation with an ordered list', () => {
    render(<BasicBreadcrumb />);

    const navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(navigation.querySelector('ol')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('uses native links for previous items and marks the current page', () => {
    render(<BasicBreadcrumb />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Application Center' })).toHaveAttribute(
      'href',
      '/applications',
    );
    expect(screen.getByText('An Application')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: 'An Application' })).not.toBeInTheDocument();
  });

  it('renders the default separator as accessibility-hidden content', () => {
    render(<BasicBreadcrumb />);

    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(3);
    separators.forEach((separator) => expect(separator).toHaveAttribute('aria-hidden', 'true'));
  });

  it('supports an accessibility-hidden ReactNode separator', () => {
    render(
      <Breadcrumb separator={<span data-testid="custom-separator">&gt;</span>}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
      </Breadcrumb>,
    );

    const separator = screen.getByTestId('custom-separator');
    expect(separator.parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders dynamic ReactNode item content', () => {
    const userId = 1;

    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
        <Breadcrumb.Item>{userId}</Breadcrumb.Item>
      </Breadcrumb>,
    );

    expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
  });

  it('forwards native props and refs', () => {
    const navRef = createRef<HTMLElement>();
    const itemRef = createRef<HTMLAnchorElement | HTMLSpanElement>();

    render(
      <Breadcrumb ref={navRef} aria-label="Page path" data-testid="breadcrumb">
        <Breadcrumb.Item ref={itemRef} href="/users" rel="home" data-testid="breadcrumb-link">
          Users
        </Breadcrumb.Item>
        <Breadcrumb.Item>Current user</Breadcrumb.Item>
      </Breadcrumb>,
    );

    const navigation = screen.getByRole('navigation', { name: 'Page path' });
    const link = screen.getByRole('link', { name: 'Users' });

    expect(navRef.current).toBe(navigation);
    expect(itemRef.current).toBe(link);
    expect(navigation).toHaveAttribute('data-testid', 'breadcrumb');
    expect(link).toHaveAttribute('rel', 'home');
    expect(link).toHaveAttribute('data-testid', 'breadcrumb-link');
  });
});

it('forwards native link attributes and ref through a router adapter', () => {
  const ref = createRef<HTMLAnchorElement>();
  render(
    <Breadcrumb>
      <Breadcrumb.Item
        href="/projects"
        ref={ref}
        className="link"
        render={(props) => <a {...props} data-router="true" />}
      >
        Projects
      </Breadcrumb.Item>
      <Breadcrumb.Item>Detail</Breadcrumb.Item>
    </Breadcrumb>,
  );
  expect(ref.current).toBe(screen.getByRole('link', { name: 'Projects' }));
  expect(ref.current).toHaveAttribute('href', '/projects');
  expect(ref.current).toHaveAttribute('data-router', 'true');
  expect(ref.current).toHaveClass('link');
});
