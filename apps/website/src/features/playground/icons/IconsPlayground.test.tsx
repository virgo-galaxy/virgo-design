import '../../../i18n';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { IconsPlayground } from './IconsPlayground';

function renderIcons(appearance: 'light' | 'dark' = 'light') {
  return render(
    <AppearanceContext.Provider value={{ appearance, setAppearance: () => {} }}>
      <MemoryRouter initialEntries={['/foundations/icons']}>
        <IconsPlayground />
      </MemoryRouter>
    </AppearanceContext.Provider>,
  );
}

describe('Icons foundation', () => {
  it('defaults the canonical review board to Plus', () => {
    renderIcons();

    expect(screen.getByRole('heading', { level: 1, name: 'Icons' })).toBeInTheDocument();
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
    renderIcons();

    await user.click(screen.getByRole('button', { name: 'Icon Plus' }));

    expect(screen.getAllByRole('option')).toHaveLength(35);
    expect(screen.getByRole('option', { name: 'Check' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Circle Info' })).toBeInTheDocument();
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
    ['Circle Check', 'circle-check'],
    ['Circle Info', 'circle-info'],
    ['Triangle Alert', 'triangle-alert'],
    ['Circle X', 'circle-x'],
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
    ['Moon', 'moon'],
    ['Sun', 'sun'],
  ])('reviews %s at every canonical size', async (label, id) => {
    const user = userEvent.setup();
    renderIcons();
    await user.click(screen.getByRole('button', { name: 'Icon Plus' }));
    await user.click(screen.getByRole('option', { name: label }));

    expect(screen.getByRole('heading', { name: label })).toBeInTheDocument();
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-icon', id);
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-grid', 'true');

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
  });

  it('applies the optional grid to the design canvas', async () => {
    const user = userEvent.setup();
    renderIcons();

    const canvas = screen.getByTestId('icon-canvas');
    expect(canvas).toHaveAttribute('data-grid', 'true');

    await user.click(screen.getByLabelText('Toggle grid'));

    expect(canvas).toHaveAttribute('data-grid', 'false');
    expect(screen.queryByTestId('grid-coordinates')).not.toBeInTheDocument();
  });

  it('follows Website appearance without exposing or mutating a second theme', async () => {
    const user = userEvent.setup();
    document.documentElement.dataset.theme = 'light';

    function AppearanceHarness() {
      const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

      const setWebsiteDark = () => {
        document.documentElement.dataset.theme = 'dark';
        setAppearance('dark');
      };

      return (
        <AppearanceContext.Provider value={{ appearance, setAppearance }}>
          <button type="button" onClick={setWebsiteDark}>
            Set Website dark
          </button>
          <MemoryRouter initialEntries={['/foundations/icons']}>
            <IconsPlayground />
          </MemoryRouter>
        </AppearanceContext.Provider>
      );
    }

    render(<AppearanceHarness />);

    expect(document.querySelector('.icons-playground')).toHaveAttribute('data-theme', 'light');
    expect(screen.queryByRole('button', { name: 'Theme light' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Theme dark' })).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Toggle grid'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    await user.click(screen.getByRole('button', { name: 'Set Website dark' }));
    expect(document.querySelector('.icons-playground')).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
