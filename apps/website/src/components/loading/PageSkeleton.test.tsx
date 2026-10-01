import '@/i18n/runtime';

import { act, render, screen } from '@testing-library/react';
import { lazy, type ReactNode, Suspense } from 'react';
import { describe, expect, it } from 'vitest';

import { PageSkeleton } from './PageSkeleton';

describe('Website loading feedback', () => {
  it('keeps one announcement outside the busy, decorative placeholder and clears it on resolution', async () => {
    let resolve!: (module: { default: () => ReactNode }) => void;
    const Content = lazy(
      () =>
        new Promise<{ default: () => ReactNode }>((done) => {
          resolve = done;
        }),
    );
    const { container } = render(
      <Suspense fallback={<PageSkeleton variant="document" />}>
        <Content />
      </Suspense>,
    );
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('Loading page…');
    expect(status.closest('[aria-busy]')).toBeNull();
    const visual = container.querySelector('[aria-busy="true"]');
    expect(visual).toHaveAttribute('aria-hidden', 'true');
    expect(visual?.querySelectorAll('[data-variant]').length).toBeGreaterThan(0);
    expect(screen.queryByRole('button')).toBeNull();
    await act(async () => resolve({ default: () => <h1>Ready</h1> }));
    expect(screen.getByRole('heading', { name: 'Ready' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).toBeNull();
    expect(container.querySelector('[data-page-skeleton]')).toBeNull();
  });
});
