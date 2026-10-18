// @vitest-environment node
import { runInNewContext } from 'node:vm';

import { expect, it } from 'vitest';

import { defaultPreferences, preferencesStorageKey, serializePreferences } from '@/preferences';

import type { themeBootstrapPlugin } from '../../../../../../config/theme-bootstrap-plugin';
import config from '../../../vite.config';

it.each([
  ['minimal', 'dark'],
  ['glass', 'light'],
] as const)('restores saved %s/%s before application modules run', (theme, appearance) => {
  const saved = serializePreferences({ ...defaultPreferences, theme, appearance });
  const attributes = new Map<string, string>();
  const plugin = config.plugins?.[0] as ReturnType<typeof themeBootstrapPlugin>;
  const html = plugin.transformIndexHtml.handler(
    '<html><head><meta charset="utf-8"></head><body></body></html>',
  );
  const script = html.match(/<script data-virgo-bootstrap>([\s\S]*?)<\/script>/)?.[1];
  expect(script).toBeTruthy();
  runInNewContext(script!, {
    document: {
      documentElement: {
        setAttribute: (name: string, value: string) => attributes.set(name, value),
        getAttribute: (name: string) => attributes.get(name),
        style: {},
      },
    },
    window: {
      localStorage: { getItem: (key: string) => (key === preferencesStorageKey ? saved : null) },
      matchMedia: () => ({ matches: false }),
    },
  });
  expect(attributes.get('data-virgo-theme')).toBe(theme);
  expect(attributes.get('data-theme')).toBe(appearance);
});
