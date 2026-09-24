import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('Icons Playground', () => {
  it('defaults the canonical review board to Plus', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Plus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Icon Plus' })).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.getByTestId('large-icon-glyph')).toHaveAttribute('viewBox', '0 0 24 24');
    expect(screen.getByTestId('large-icon-glyph')).toHaveAttribute('fill', 'currentColor');
    expect(screen.getByTestId('large-icon-glyph')).not.toHaveAttribute('stroke-width');
    expect(screen.getByText('Actual 24px')).toBeInTheDocument();
    expect(screen.getByTestId('actual-icon-glyph')).toHaveAttribute('width', '24');
    expect(screen.getByText('Button icons render at 20 × 20px.')).toBeInTheDocument();
    expect(screen.getByTestId('icon-button-preview').querySelector('svg')).toHaveAttribute(
      'width',
      '20',
    );
    expect(screen.getByTestId('text-button-preview')).toHaveTextContent('Icon');
    expect(screen.queryByText('Variant A')).not.toBeInTheDocument();
    expect(screen.queryByText('Diagnostics')).not.toBeInTheDocument();
    expect(screen.getByTestId('grid-coordinates').querySelectorAll('span')).toHaveLength(50);
  });

  it('updates every preview from the selected canonical icon export', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Icon Plus' }));

    expect(screen.getAllByRole('option')).toHaveLength(30);
    expect(screen.getByRole('option', { name: 'Check' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Info' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cybertruck' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Chevron Left' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Settings' })).toHaveAttribute(
      'aria-selected',
      'false',
    );

    await user.click(screen.getByRole('option', { name: 'Settings' }));

    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', 'settings');
    expect(screen.getByTestId('actual-icon-glyph').querySelector('path')).toHaveAttribute(
      'fill-rule',
      'evenodd',
    );
    expect(screen.getByTestId('icon-button-preview').querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 24 24',
    );
    expect(screen.getByTestId('text-button-preview').querySelector('svg')).toHaveAttribute(
      'width',
      '20',
    );
  });

  it.each([
    ['Sidebar Collapse', 'sidebar-collapse'],
    ['Sidebar Expand', 'sidebar-expand'],
    ['Ellipsis', 'ellipsis'],
    ['Ellipsis Vertical', 'ellipsis-vertical'],
    ['Workspace', 'workspace'],
    ['Home', 'home'],
    ['Eye', 'eye'],
    ['Eye Closed', 'eye-closed'],
    ['Dashboard', 'dashboard'],
    ['Gauge', 'gauge'],
    ['Globe', 'globe'],
    ['Bot', 'bot'],
    ['Chevrons Left', 'chevrons-left'],
    ['Chevrons Right', 'chevrons-right'],
    ['Chevrons Up', 'chevrons-up'],
    ['Chevrons Down', 'chevrons-down'],
  ])('reviews %s at every size in both themes', async (label, id) => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Icon Plus' }));
    await user.click(screen.getByRole('option', { name: label }));

    expect(screen.getByRole('heading', { name: label })).toBeInTheDocument();
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', id);
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-grid', 'true');

    for (const theme of ['light', 'dark']) {
      await user.click(screen.getByRole('button', { name: `Theme ${theme}` }));
      expect(document.documentElement).toHaveAttribute('data-theme', theme);
      const large = screen.getByTestId('large-icon-glyph');
      const actual = screen.getByTestId('actual-icon-glyph');
      const button = screen.getByTestId('icon-button-preview').querySelector('svg');
      const textButton = screen.getByTestId('text-button-preview').querySelector('svg');
      expect(large).toHaveAttribute('width', '288');
      expect(actual).toHaveAttribute('width', '24');
      expect(button).toHaveAttribute('width', '20');
      expect(textButton).toHaveAttribute('width', '20');
      for (const glyph of [large, actual, button, textButton]) {
        expect(glyph).toHaveAttribute('viewBox', '0 0 24 24');
        expect(glyph).toHaveAttribute('fill', 'currentColor');
        expect(glyph).not.toHaveAttribute('stroke');
        expect(glyph).not.toHaveAttribute('stroke-width');
        expect(glyph?.innerHTML).toBe(large.innerHTML);
      }
    }
  });

  it('applies the optional grid to the design canvas', async () => {
    const user = userEvent.setup();
    render(<App />);

    const canvas = screen.getByTestId('icon-canvas');
    expect(canvas).toHaveAttribute('data-grid', 'true');

    await user.click(screen.getByLabelText('Toggle grid'));

    expect(canvas).toHaveAttribute('data-grid', 'false');
    expect(screen.queryByTestId('grid-coordinates')).not.toBeInTheDocument();
  });

  it('switches the light and dark review canvas together', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Theme dark' }));

    expect(
      screen.getByRole('heading', { name: 'Icons Playground' }).closest('.icons-playground'),
    ).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
