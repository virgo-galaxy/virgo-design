import { afterEach, expect, it, vi } from 'vitest';

import { initializeThemeOptics } from './optics';

afterEach(() => {
  vi.unstubAllGlobals();
  document.getElementById('vd-theme-optics')?.remove();
  document.documentElement.style.removeProperty('--vd-optical-refraction');
});

it('installs one shared backdrop lens without changing theme or appearance', () => {
  vi.stubGlobal('chrome', {});
  vi.stubGlobal('CSS', { supports: () => true });
  document.documentElement.dataset.virgoTheme = 'soft';
  document.documentElement.dataset.theme = 'dark';
  initializeThemeOptics();
  initializeThemeOptics();
  expect(document.querySelectorAll('#vd-theme-optics')).toHaveLength(1);
  expect(document.querySelector('#vd-glass-lens feDisplacementMap')).not.toBeNull();
  expect(document.documentElement.style.getPropertyValue('--vd-optical-refraction')).toBe(
    'url("#vd-glass-lens")',
  );
  expect(document.documentElement.dataset.virgoTheme).toBe('soft');
  expect(document.documentElement.dataset.theme).toBe('dark');
});

it('leaves CSS blur fallback active when SVG backdrop filters are unavailable', () => {
  vi.stubGlobal('chrome', {});
  vi.stubGlobal('CSS', { supports: () => false });
  initializeThemeOptics();
  expect(document.getElementById('vd-theme-optics')).toBeNull();
  expect(document.documentElement.style.getPropertyValue('--vd-optical-refraction')).toBe('');
});

it('is safe during server rendering', () => {
  vi.stubGlobal('document', undefined);
  expect(() => initializeThemeOptics()).not.toThrow();
});
