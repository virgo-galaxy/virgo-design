import '@/i18n';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AppearanceContext } from '@/shared/theme/appearance-context';

import { IconsExplorer } from './IconsExplorer';

function renderIcons(appearance: 'light' | 'dark' = 'light') {
  return render(
    <AppearanceContext.Provider value={{ appearance, setAppearance: () => {} }}>
      <MemoryRouter initialEntries={['/foundations/icons']}>
        <IconsExplorer />
      </MemoryRouter>
    </AppearanceContext.Provider>,
  );
}

describe('Icons foundation', () => {
  it('defaults the canonical review board to Plus', () => {
    renderIcons();

    expect(screen.getByRole('heading', { name: 'Plus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Icon Plus' })).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.getByTestId('large-icon-glyph')).toHaveAttribute('viewBox', '0 0 24 24');
    expect(screen.getByTestId('large-icon-glyph')).toHaveAttribute('fill', 'currentColor');
    expect(screen.getByTestId('large-icon-glyph')).not.toHaveAttribute('stroke-width');
    expect(screen.getByText('Actual sizes')).toBeInTheDocument();
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

    expect(screen.getAllByRole('option')).toHaveLength(63);
    expect(screen.queryByRole('option', { name: 'Workspace' })).not.toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Check' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Circle Info' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'External Link' })).toBeInTheDocument();
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
    ['GitHub', 'github'],
    ['Code', 'code'],
    ['Copy', 'copy'],
    ['Lock', 'lock'],
    ['Unlock', 'unlock'],
    ['Pin', 'pin'],
    ['Unpin', 'unpin'],
    ['Circle Check', 'circle-check'],
    ['Circle Info', 'circle-info'],
    ['Triangle Alert', 'triangle-alert'],
    ['Circle X', 'circle-x'],
    ['Sidebar Collapse', 'sidebar-collapse'],
    ['Sidebar Expand', 'sidebar-expand'],
    ['Ellipsis', 'ellipsis'],
    ['Ellipsis Vertical', 'ellipsis-vertical'],
    ['External Link', 'external-link'],
    ['Layout', 'layout'],
    ['Palette', 'palette'],
    ['Type', 'type'],
    ['Layers', 'layers'],
    ['Spline', 'spline'],
    ['Shapes', 'shapes'],
    ['Home', 'home'],
    ['Eye', 'eye'],
    ['Eye Closed', 'eye-closed'],
    ['Dashboard', 'dashboard'],
    ['Gauge', 'gauge'],
    ['Globe', 'globe'],
    ['Bot', 'bot'],
    ['Arrow Left', 'arrow-left'],
    ['Arrow Right', 'arrow-right'],
    ['Arrow Up', 'arrow-up'],
    ['Arrow Down', 'arrow-down'],
    ['Arrow Return', 'arrow-return'],
    ['Studio Tools', 'studio-tools'],
    ['Chevrons Left', 'chevrons-left'],
    ['Chevrons Right', 'chevrons-right'],
    ['Chevrons Up', 'chevrons-up'],
    ['Chevrons Down', 'chevrons-down'],
    ['Moon', 'moon'],
    ['Sun', 'sun'],
    ['Language EN', 'language-en'],
    ['Language ZH', 'language-zh'],
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

    const toggle = screen.getByRole('switch', { name: 'Toggle grid' });
    expect(toggle).toBeChecked();
    expect(screen.getByText('Grid (On)')).toBeInTheDocument();
    expect(toggle.closest('label')).toHaveAttribute('data-appearance', 'fader');
    await user.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(screen.getByText('Grid (Off)')).toBeInTheDocument();

    expect(canvas).toHaveAttribute('data-grid', 'false');
    expect(screen.queryByTestId('grid-coordinates')).not.toBeInTheDocument();
  });

  it('follows Website appearance without exposing or mutating a second theme', async () => {
    const user = userEvent.setup();
    document.documentElement.dataset.theme = 'light';

    function AppearanceHarness() {
      const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

      const setWebsiteAppearance = (next: 'light' | 'dark') => {
        document.documentElement.dataset.theme = next;
        setAppearance(next);
      };

      return (
        <AppearanceContext.Provider value={{ appearance, setAppearance }}>
          <button type="button" onClick={() => setWebsiteAppearance('dark')}>
            Set Website dark
          </button>
          <button type="button" onClick={() => setWebsiteAppearance('light')}>
            Set Website light
          </button>
          <MemoryRouter initialEntries={['/foundations/icons']}>
            <IconsExplorer />
          </MemoryRouter>
        </AppearanceContext.Provider>
      );
    }

    render(<AppearanceHarness />);

    expect(document.querySelector('.icons-explorer')).toHaveAttribute('data-appearance', 'light');
    expect(screen.getByLabelText('Current background')).toHaveTextContent('Light');
    expect(screen.getByLabelText('Current background')).toHaveAttribute('data-variant', 'soft');
    expect(screen.queryByRole('button', { name: 'Light' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Dark' })).not.toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: 'Color / currentColor' }), '#7060ff');
    fireEvent.change(screen.getByRole('slider', { name: 'Size' }), { target: { value: '40' } });
    await user.click(screen.getByLabelText('Toggle grid'));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    await user.click(screen.getByRole('button', { name: 'Set Website dark' }));
    expect(document.querySelector('.icons-explorer')).toHaveAttribute('data-appearance', 'dark');
    expect(screen.getByLabelText('Current background')).toHaveTextContent('Dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await user.click(screen.getByRole('button', { name: 'Set Website light' }));
    expect(document.querySelector('.icons-explorer')).toHaveAttribute('data-appearance', 'light');
    expect(screen.getByLabelText('Current background')).toHaveTextContent('Light');
    expect(screen.getByLabelText('Current background')).toHaveAttribute('data-variant', 'soft');
    expect(screen.getByTestId('icon-canvas')).toHaveAttribute('data-grid', 'false');
    expect(screen.getByRole('textbox', { name: 'Color / currentColor' })).toHaveValue('#7060ff');
    expect(screen.getByRole('slider', { name: 'Size' })).toHaveValue('40');
  });
});
