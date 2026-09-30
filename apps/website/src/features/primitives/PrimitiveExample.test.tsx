import '@/i18n/runtime';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PrimitiveSpecimen } from '@/components/docs/PrimitiveSpecimen/PrimitiveSpecimen';

import { primitiveDocs, type PrimitiveSlug } from './primitiveDocs';
import { PrimitiveExample } from './PrimitiveExample';

describe('Primitive examples', () => {
  it.each(primitiveDocs)('renders a live, direct $exportName example', ({ slug }) => {
    const { container } = render(
      <PrimitiveSpecimen>
        <PrimitiveExample slug={slug} />
      </PrimitiveSpecimen>,
    );

    expect(container.querySelector(`[data-docs-primitive="${slug}"]`)).toBeInTheDocument();
    expect(container.querySelector('[data-primitive-specimen]')).toBeInTheDocument();
  });

  it('keeps the primitive target headless while the documentation shell uses Virgo UI', () => {
    render(
      <PrimitiveSpecimen>
        <PrimitiveExample slug="button" />
      </PrimitiveSpecimen>,
    );

    expect(screen.getByRole('button', { name: 'Native button' })).not.toHaveAttribute('class');
    expect(screen.getByTestId('primitive-specimen-shell')).toHaveAttribute('class');
    expect(screen.queryByRole('button', { name: /light|dark/i })).not.toBeInTheDocument();
  });

  it.each([
    ['dialog', 'Edit profile', 'dialog', 'button', 'Done'],
    ['menu', 'Open menu', 'menu', 'menuitem', 'Copy'],
  ] as const)(
    'opens and closes the %s example',
    async (slug, triggerName, role, actionRole, closeName) => {
      const user = userEvent.setup();
      render(<PrimitiveExample slug={slug satisfies PrimitiveSlug} />);

      await user.click(screen.getByRole('button', { name: triggerName }));
      expect(screen.getByRole(role)).toBeInTheDocument();
      await user.click(screen.getByRole(actionRole, { name: closeName }));
      await waitFor(() => expect(screen.queryByRole(role)).not.toBeInTheDocument());
    },
  );

  it('discloses navigation menu content', async () => {
    const user = userEvent.setup();
    render(<PrimitiveExample slug="navigation-menu" />);

    await user.click(screen.getByRole('button', { name: 'Learn' }));
    expect(screen.getByRole('link', { name: 'Guides' })).toBeVisible();
  });

  it('shows and dismisses a toast', async () => {
    const user = userEvent.setup();
    render(<PrimitiveExample slug="toast" />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    expect(screen.getByRole('status', { name: 'Saved' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() =>
      expect(screen.queryByRole('status', { name: 'Saved' })).not.toBeInTheDocument(),
    );
  });

  it('opens the context menu from the native context gesture', () => {
    render(<PrimitiveExample slug="context-menu" />);

    fireEvent.contextMenu(screen.getByText('Right-click this file'), {
      clientX: 20,
      clientY: 20,
    });
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
