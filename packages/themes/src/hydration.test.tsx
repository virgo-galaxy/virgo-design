import { getDefaultThemeTokens } from '@virgo-design/tokens';
import { act, useSyncExternalStore } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, it, vi } from 'vitest';

import { getInitialThemeScript } from './bootstrap';
import { createThemeRegistry } from './registry';
import { getThemeAttributes, resolveTheme } from './resolution';
import { createThemeRuntime, type ThemeRuntime } from './runtime';

function Consumer({ runtime }: { runtime: ThemeRuntime }) {
  const theme = useSyncExternalStore(
    runtime.subscribeTheme,
    runtime.getTheme,
    runtime.getServerTheme,
  );
  return <span data-theme-id={theme}>{theme}</span>;
}
it('renders isolated SSR preferences and hydrates the same snapshot without a mismatch', async () => {
  const a = createThemeRuntime({ initialTheme: 'glass' });
  const b = createThemeRuntime({ initialTheme: 'contrast' });
  const [htmlA, htmlB] = await Promise.all([
    Promise.resolve(renderToString(<Consumer runtime={a} />)),
    Promise.resolve(renderToString(<Consumer runtime={b} />)),
  ]);
  expect(htmlA).toContain('glass');
  expect(htmlA).not.toContain('contrast');
  expect(htmlB).toContain('contrast');
  expect(htmlB).not.toContain('glass');
  const container = document.createElement('div');
  container.innerHTML = htmlA;
  document.body.append(container);
  const client = createThemeRuntime({ initialTheme: 'glass', window });
  client.hydrateTheme({ theme: 'glass', appearance: 'dark' });
  const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
  let root: Root | undefined;
  try {
    await act(async () => {
      root = hydrateRoot(container, <Consumer runtime={client} />);
    });
    expect(container.textContent).toBe('glass');
    expect(errors).not.toHaveBeenCalled();
    await act(async () => client.setTheme('soft'));
    expect(container.textContent).toBe('soft');
    expect(client.getServerTheme()).toBe('glass');
  } finally {
    await act(async () => root?.unmount());
    client.dispose();
    container.remove();
    errors.mockRestore();
  }
});

it.each(['light', 'dark'] as const)(
  'bootstraps and hydrates a third-party SSR %s snapshot using identical registry definitions',
  async (appearance) => {
    const createRegistry = () => {
      const registry = createThemeRegistry();
      registry.registerTheme(
        { id: 'studio', name: 'Studio', contractVersion: 1, appearances: ['light', 'dark'] },
        getDefaultThemeTokens(),
      );
      return registry;
    };
    const serverRegistry = createRegistry();
    const state = resolveTheme({ theme: 'studio', appearance }, serverRegistry);
    const server = createThemeRuntime({ registry: serverRegistry, initialTheme: state.theme });
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Consumer runtime={server} />);
    document.body.append(container);
    const original = {
      theme: document.documentElement.getAttribute('data-virgo-theme'),
      appearance: document.documentElement.getAttribute('data-theme'),
      colorScheme: document.documentElement.style.colorScheme,
    };
    for (const [name, value] of Object.entries(getThemeAttributes(state, serverRegistry)))
      document.documentElement.setAttribute(name, value);
    window.eval(getInitialThemeScript({ registry: serverRegistry, respectServerAttributes: true }));
    expect(document.documentElement.dataset).toMatchObject({
      virgoTheme: 'studio',
      theme: appearance,
    });
    expect(container.textContent).toBe('studio');
    const client = createThemeRuntime({
      registry: createRegistry(),
      initialTheme: state.theme,
      window,
    });
    client.hydrateTheme(state);
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
    let root: Root | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, <Consumer runtime={client} />);
      });
      expect(container.textContent).toBe('studio');
      expect(client.getServerTheme()).toBe('studio');
      expect(errors).not.toHaveBeenCalled();
      await act(async () => client.setTheme('soft'));
      expect(container.textContent).toBe('soft');
      expect(client.getServerTheme()).toBe('studio');
    } finally {
      await act(async () => root?.unmount());
      client.dispose();
      container.remove();
      errors.mockRestore();
      for (const [name, value] of Object.entries({
        'data-virgo-theme': original.theme,
        'data-theme': original.appearance,
      })) {
        if (value === null) document.documentElement.removeAttribute(name);
        else document.documentElement.setAttribute(name, value);
      }
      document.documentElement.style.colorScheme = original.colorScheme;
    }
  },
);
