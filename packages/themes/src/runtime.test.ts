import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultTheme, getThemePreset, registerTheme, themePresets } from './registry';
import { getTheme, initializeTheme, setTheme, subscribeTheme, themeStorageKey } from './runtime';

beforeEach(() => {
  localStorage.removeItem(themeStorageKey);
  initializeTheme();
});
afterEach(() => {
  vi.restoreAllMocks();
  localStorage.removeItem(themeStorageKey);
  initializeTheme();
});

describe('theme runtime', () => {
  it.each([
    ['utility', 'retro'],
    ['high-contrast', 'bold'],
  ])('upgrades saved %s to %s and rejects new selections with the old ID', (oldId, newId) => {
    localStorage.setItem(themeStorageKey, oldId!);
    expect(initializeTheme()).toBe(newId);
    expect(localStorage.getItem(themeStorageKey)).toBe(newId);
    expect(() => setTheme(oldId!)).toThrow(RangeError);
  });
  it('restores a valid preference before rendering and preserves appearance', () => {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem(themeStorageKey, 'soft');
    expect(initializeTheme()).toBe('soft');
    expect(document.documentElement.dataset.virgoTheme).toBe('soft');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
  it('persists and notifies all consumers without emitting redundant changes', () => {
    const header = vi.fn(),
      settings = vi.fn();
    const stopHeader = subscribeTheme(header),
      stopSettings = subscribeTheme(settings);
    setTheme('glass');
    setTheme('glass');
    expect(header).toHaveBeenCalledOnce();
    expect(settings).toHaveBeenCalledOnce();
    expect(getTheme()).toBe('glass');
    expect(localStorage.getItem(themeStorageKey)).toBe('glass');
    stopHeader();
    setTheme('retro');
    expect(header).toHaveBeenCalledOnce();
    expect(settings).toHaveBeenCalledTimes(2);
    stopSettings();
  });
  it('synchronizes other tabs and reset events, then removes the storage listener', () => {
    const changed = vi.fn();
    const stop = subscribeTheme(changed);
    window.dispatchEvent(new StorageEvent('storage', { key: themeStorageKey, newValue: 'bold' }));
    expect(getTheme()).toBe('bold');
    window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated', newValue: 'minimal' }));
    expect(getTheme()).toBe('bold');
    window.dispatchEvent(new StorageEvent('storage', { key: null }));
    expect(getTheme()).toBe(defaultTheme);
    stop();
    window.dispatchEvent(
      new StorageEvent('storage', { key: themeStorageKey, newValue: 'minimal' }),
    );
    expect(getTheme()).toBe(defaultTheme);
    expect(changed).toHaveBeenCalledTimes(2);
  });
  it('rejects unknown presets and recovers malformed or unavailable storage', () => {
    localStorage.setItem(themeStorageKey, 'not-a-theme');
    expect(initializeTheme()).toBe(defaultTheme);
    expect(() => setTheme('not-a-theme')).toThrow(RangeError);
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied');
    });
    expect(initializeTheme()).toBe(defaultTheme);
    expect(() => setTheme('minimal')).not.toThrow();
    expect(document.documentElement.dataset.virgoTheme).toBe('minimal');
  });
  it('supports third-party presets without replacing the six official IDs', () => {
    expect(themePresets.map((preset) => preset.id)).toEqual([
      'virgo',
      'minimal',
      'soft',
      'glass',
      'retro',
      'bold',
    ]);
    registerTheme({
      id: 'studio-test',
      name: 'Studio',
      descriptionKey: 'studio',
      contractVersion: 1,
      appearances: ['light', 'dark'],
    });
    setTheme('studio-test');
    expect(getThemePreset(getTheme())?.name).toBe('Studio');
    expect(() => registerTheme(themePresets[0])).toThrow('already registered');
  });
});
