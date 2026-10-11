import { getDefaultThemeTokens, type ThemeTokens } from '@virgo-design/tokens';
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { getInitialThemeScript } from './bootstrap';
import { createThemeRegistry, registerTheme, type ThemePreset, themePresets } from './registry';
import { getThemeAttributes, resolveTheme } from './resolution';
import { createThemeRuntime, getTheme, initializeTheme, setTheme } from './runtime';
import { getThemeCss } from './theme-css';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.removeAttribute('data-virgo-theme');
  document.documentElement.removeAttribute('dir');
});

describe('request isolation and hydration', () => {
  it('isolates concurrent request snapshots, state and third-party registration', async () => {
    const storageRead = vi.spyOn(Storage.prototype, 'getItem');
    const storageWrite = vi.spyOn(Storage.prototype, 'setItem');
    const aRegistry = createThemeRegistry(),
      bRegistry = createThemeRegistry();
    aRegistry.registerTheme({ ...themePresets[0], id: 'request-theme' }, getDefaultThemeTokens());
    const a = createThemeRuntime({ registry: aRegistry, initialTheme: 'request-theme' });
    const b = createThemeRuntime({ registry: bRegistry, initialTheme: 'contrast' });
    await Promise.all([
      Promise.resolve().then(() => a.setTheme('soft')),
      Promise.resolve().then(() => b.setTheme('glass')),
    ]);
    expect(a.getTheme()).toBe('soft');
    expect(a.getServerTheme()).toBe('request-theme');
    expect(b.getTheme()).toBe('glass');
    expect(b.getServerTheme()).toBe('contrast');
    expect(bRegistry.getThemePreset('request-theme')).toBeUndefined();
    expect(document.documentElement.dataset.virgoTheme).toBeUndefined();
    expect(storageRead).not.toHaveBeenCalled();
    expect(storageWrite).not.toHaveBeenCalled();
  });
  it('does not retain request preferences through legacy server convenience functions', () => {
    vi.stubGlobal('window', undefined);
    expect(initializeTheme({ defaultTheme: 'glass' })).toBe('glass');
    expect(initializeTheme({ defaultTheme: 'soft' })).toBe('soft');
    expect(getTheme()).toBe('virgo');
    expect(() => setTheme('retro')).toThrow('request-owned');
  });
  it('hydrates the server snapshot without replacing it with a contradictory storage preference', () => {
    localStorage.setItem('virgo-design.theme-style.v1', 'minimal');
    const runtime = createThemeRuntime({ window });
    runtime.hydrateTheme({ theme: 'glass', appearance: 'dark' });
    expect(runtime.getTheme()).toBe('glass');
    expect(runtime.getServerTheme()).toBe('glass');
    expect(document.documentElement.dataset.theme).toBe('dark');
    runtime.setTheme('soft');
    expect(runtime.getServerTheme()).toBe('glass');
    runtime.dispose();
  });
  it('observes externally changed root attributes and releases its browser listeners', async () => {
    const runtime = createThemeRuntime({ window });
    const listener = vi.fn(),
      stop = runtime.subscribeTheme(listener);
    document.documentElement.dataset.virgoTheme = 'retro';
    await Promise.resolve();
    expect(runtime.getTheme()).toBe('retro');
    expect(listener).toHaveBeenCalledOnce();
    stop();
    document.documentElement.dataset.virgoTheme = 'glass';
    await Promise.resolve();
    expect(runtime.getTheme()).toBe('retro');
    runtime.dispose();
  });
});

describe('registry and scoped theme CSS', () => {
  it('requires token implementations in both registration APIs and keeps metadata consumer-neutral', () => {
    const registry = createThemeRegistry();
    expectTypeOf<typeof registerTheme>().parameters.toEqualTypeOf<[ThemePreset, ThemeTokens]>();
    expectTypeOf<typeof registry.registerTheme>().parameters.toEqualTypeOf<
      [ThemePreset, ThemeTokens]
    >();
    const preset: ThemePreset = {
      id: 'plain',
      name: 'Plain',
      contractVersion: 1,
      appearances: ['light', 'dark'],
    };
    registry.registerTheme(preset, getDefaultThemeTokens());
    expect(registry.getThemePreset('plain')).toEqual(preset);
    expect(registry.listThemes().at(-1)).toEqual(preset);
    expect(themePresets.every((theme) => !Object.hasOwn(theme, 'descriptionKey'))).toBe(true);
    // JavaScript callers still receive a diagnostic if they omit the implementation.
    expect(() => {
      // @ts-expect-error Token implementations are mandatory in the public TypeScript API.
      registry.registerTheme({ ...preset, id: 'missing-tokens' });
    }).toThrow('missingRequiredRoles');
  });
  it('enumerates registered themes while preserving immutable official selectors', () => {
    const registry = createThemeRegistry();
    const tokens = getDefaultThemeTokens();
    registry.registerTheme({ ...themePresets[0], id: 'studio' }, tokens);
    expect(registry.listThemes().map(({ id }) => id)).toEqual([
      ...themePresets.map(({ id }) => id),
      'studio',
    ]);
    expect(themePresets).toHaveLength(6);
    expect(() => registry.registerTheme({ ...themePresets[0], id: 'studio' }, tokens)).toThrow(
      'already registered',
    );
    expect(() =>
      registry.registerTheme({ ...themePresets[0], id: 'incomplete' }, { light: {}, dark: {} }),
    ).toThrow('missingRequiredRoles');
    const css = getThemeCss('studio', {
      light: { ...tokens.light, '--vd-control-shadow': 'none' },
      dark: { ...tokens.dark, '--vd-control-shadow': '0 1px 3px #000' },
    });
    expect(css).toContain('--vd-theme-dark-data-sequential-10:');
    expect(css).toContain("[data-virgo-theme='studio'][data-theme='dark']");
  });
  it('resolves saved IDs and explicit appearance without reading browser storage', () => {
    expect(
      resolveTheme({ theme: 'utility', appearance: 'system', systemAppearance: 'dark' }),
    ).toEqual({ theme: 'retro', appearance: 'dark' });
    expect(getThemeAttributes({ theme: 'glass', appearance: 'dark' })).toEqual({
      'data-virgo-theme': 'glass',
      'data-theme': 'dark',
    });
  });
});

describe('synchronous initial theme bootstrap', () => {
  const execute = (script: string) => window.eval(script);
  it.each(
    themePresets.flatMap(({ id }) =>
      (['light', 'dark'] as const).map((appearance) => [id, appearance]),
    ),
  )('restores %s/%s before any application render', (theme, appearance) => {
    localStorage.setItem('virgo-design.theme-style.v1', theme!);
    localStorage.setItem('appearance', appearance!);
    execute(getInitialThemeScript({ appearanceStorageKey: 'appearance' }));
    expect(document.documentElement.dataset).toMatchObject({
      virgoTheme: theme,
      theme: appearance,
    });
    expect(document.documentElement.style.colorScheme).toBe(appearance);
  });
  it.each([
    ['saved', 'light'],
    ['saved', 'dark'],
    ['initial', 'light'],
    ['initial', 'dark'],
  ] as const)(
    'restores a custom %s/%s theme on the first write and hydrates the same registry',
    (source, appearance) => {
      const registry = createThemeRegistry();
      registry.registerTheme(
        { id: 'studio', name: 'Studio', contractVersion: 1, appearances: ['light', 'dark'] },
        getDefaultThemeTokens(),
      );
      if (source === 'saved') {
        localStorage.setItem('custom-theme', 'studio');
        localStorage.setItem('custom-appearance', appearance);
      }
      document.documentElement.dir = 'rtl';
      const write = vi.spyOn(document.documentElement, 'setAttribute');
      execute(
        getInitialThemeScript({
          registry,
          defaultTheme: source === 'initial' ? 'studio' : 'virgo',
          defaultAppearance: appearance,
          storage: { key: 'custom-theme' },
          appearanceStorageKey: 'custom-appearance',
        }),
      );
      expect(write.mock.calls.filter(([name]) => name === 'data-virgo-theme')).toEqual([
        ['data-virgo-theme', 'studio'],
      ]);
      expect(document.documentElement.dataset).toMatchObject({
        virgoTheme: 'studio',
        theme: appearance,
      });
      expect(document.documentElement.dir).toBe('rtl');
      expect(document.documentElement.style.colorScheme).toBe(appearance);
      const state = resolveTheme(
        {
          theme: document.documentElement.dataset.virgoTheme,
          appearance: document.documentElement.dataset.theme,
        },
        registry,
      );
      const runtime = createThemeRuntime({ registry, window, initialTheme: state.theme });
      runtime.hydrateTheme(state);
      expect(runtime.getTheme()).toBe('studio');
      expect(runtime.getServerTheme()).toBe('studio');
      expect(runtime.registry.getThemePreset('studio')?.name).toBe('Studio');
      runtime.dispose();
    },
  );
  it('restores Pro JSON and legacy IDs without destroying unrelated settings', () => {
    const raw = JSON.stringify({
      version: 1,
      theme: 'bold',
      appearance: 'dark',
      sidebarWidth: 256,
    });
    localStorage.setItem('pro', raw);
    execute(
      getInitialThemeScript({
        storage: { key: 'pro', version: 1, themeField: 'theme', appearanceField: 'appearance' },
      }),
    );
    expect(document.documentElement.dataset).toMatchObject({
      virgoTheme: 'contrast',
      theme: 'dark',
    });
    expect(localStorage.getItem('pro')).toBe(raw);
  });
  it('handles malformed records, denied storage, system mode and authoritative SSR attributes', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    execute(getInitialThemeScript({ defaultTheme: 'soft', defaultAppearance: 'system' }));
    expect(document.documentElement.dataset).toMatchObject({ virgoTheme: 'soft', theme: 'dark' });
    document.documentElement.dataset.virgoTheme = 'glass';
    document.documentElement.dataset.theme = 'light';
    execute(getInitialThemeScript({ defaultTheme: 'contrast', respectServerAttributes: true }));
    expect(document.documentElement.dataset).toMatchObject({ virgoTheme: 'glass', theme: 'light' });
  });
  it('escapes script-boundary characters in configuration', () => {
    expect(
      getInitialThemeScript({ storage: { key: '</script><script>bad</script>' } }),
    ).not.toContain('</script>');
  });
});

it('generates reverse aliases without cycles for canonical defaults and explicit new values', () => {
  const defaults = getDefaultThemeTokens();
  const css = getThemeCss('studio', {
    light: { ...defaults.light, '--vd-motion-interaction-duration': '32ms' },
    dark: defaults.dark,
  });
  expect(css).toContain('--vd-motion-duration-120: 32ms');
  expect(css).toContain('--vd-motion-duration-120: 120ms');
  expect(css).not.toContain('--vd-motion-duration-120: var(--vd-motion-duration-120');
});

it('rejects an alias cycle introduced by compatibility normalization', () => {
  const defaults = getDefaultThemeTokens();
  const { '--vd-motion-interaction-duration': omitted, ...light } = defaults.light;
  expect(omitted).toBeDefined();
  expect(() =>
    getThemeCss('studio', {
      light: {
        ...light,
        '--vd-motion-duration-120': 'var(--vd-motion-interaction-duration)',
      },
      dark: defaults.dark,
    }),
  ).toThrow('Invalid theme aliases');
});
