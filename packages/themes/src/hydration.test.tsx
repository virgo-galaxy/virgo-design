import { act, useSyncExternalStore } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, it, vi } from 'vitest';

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
