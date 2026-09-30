import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DocumentationNavigationDock } from './DocumentationNavigationDock';

function TestLayout() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/tokens/colors')}>Tokens route</button>
      <button onClick={() => navigate('/foundations/layout')}>Long foundation route</button>
      <DocumentationNavigationDock />
    </>
  );
}

beforeEach(() => {
  sessionStorage.clear();
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    if (this.hasAttribute('data-documentation-navigation')) return new DOMRect(20, 96, 1000, 600);
    if (this.hasAttribute('data-vd-dock-root')) {
      const token =
        this.textContent?.includes('Typography') && !this.textContent?.includes('Layout');
      const vertical = this.getAttribute('data-orientation') === 'vertical';
      return new DOMRect(
        20,
        96,
        vertical ? 120 : token ? 240 : 600,
        vertical ? (token ? 120 : 300) : 40,
      );
    }
    return new DOMRect();
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  sessionStorage.clear();
});

function setup() {
  return render(
    <MemoryRouter initialEntries={['/foundations/colors']}>
      <TestLayout />
    </MemoryRouter>,
  );
}

describe('shared documentation navigation placement', () => {
  it('preserves the leading coordinate and unlocked state when switching short and long menus', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: 'Unlock dock' }));
    const handle = screen.getByRole('button', { name: 'Move foundation navigation' });
    fireEvent.keyDown(handle, { key: 'ArrowLeft', altKey: true });
    const dock = document.querySelector('[data-vd-dock-root]')!;
    const offset = Number(dock.getAttribute('data-position')) * (600 - 300);
    await userEvent.click(screen.getByRole('button', { name: 'Tokens route' }));
    expect(document.querySelector('[data-vd-dock-root]')).toBe(dock);
    expect(dock).not.toHaveAttribute('data-locked');
    expect(dock).toHaveAttribute('data-edge', 'left');
    expect(Number(dock.getAttribute('data-position')) * (600 - 120)).toBeCloseTo(offset);
    await userEvent.click(screen.getByRole('button', { name: 'Long foundation route' }));
    expect(Number(dock.getAttribute('data-position')) * (600 - 300)).toBeCloseTo(offset);
  });

  it('restores the same physical offset after remount on the other navigation group', () => {
    sessionStorage.setItem(
      'virgo-design:documentation-navigation',
      JSON.stringify({ edge: 'left', position: 0.5, offset: 150 }),
    );
    const view = setup();
    expect(document.querySelector('[data-vd-dock-root]')).toHaveAttribute('data-position', '0.5');
    view.unmount();
    render(
      <MemoryRouter initialEntries={['/tokens/colors']}>
        <DocumentationNavigationDock />
      </MemoryRouter>,
    );
    expect(
      Number(document.querySelector('[data-vd-dock-root]')!.getAttribute('data-position')) * 480,
    ).toBeCloseTo(150);
  });
});
