import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Result } from './index';
describe('Result', () => {
  it.each(['success', 'error', 'warning', 'info', '403', '404', '500'] as const)(
    'names the %s outcome and exposes recovery actions',
    (status) => {
      const { container } = render(
        <Result
          status={status}
          headingLevel={1}
          title="Outcome"
          description="Details"
          primaryAction={<button>Retry</button>}
          secondaryAction={<a href="/">Home</a>}
          extra="Reference"
        />,
      );
      const heading = screen.getByRole('heading', { level: 1, name: 'Outcome' });
      expect(container.firstChild).toHaveAttribute('aria-labelledby', heading.id);
      expect(container.firstChild).toHaveAttribute('data-status', status);
      expect(container.querySelector('[data-slot=icon]')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    },
  );
  it('replaces default artwork and composes custom content without duplicate headings', () => {
    const { container } = render(
      <Result.Root status="403">
        <Result.Icon>Art</Result.Icon>
        <Result.Title as="h1">Denied</Result.Title>
        <Result.Extra>Reference</Result.Extra>
      </Result.Root>,
    );
    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(container.querySelectorAll('svg')).toHaveLength(0);
  });
});
