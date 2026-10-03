import { describe, expect, it } from 'vitest';

import { enUS, zhCN } from './registry';

function leaves(resource: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(
    Object.entries(resource).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === 'string' ? [[path, value]] : Object.entries(leaves(value, path));
    }),
  );
}

describe('pro translation resources', () => {
  it('provides every English key and interpolation in Chinese', () => {
    const english = leaves(enUS);
    const chinese = leaves(zhCN);
    expect(Object.keys(chinese).sort()).toEqual(Object.keys(english).sort());
    for (const [key, text] of Object.entries(english)) {
      expect(chinese[key]?.trim(), key).toBeTruthy();
      const variables = (value: string) => value.match(/\{\{[^}]+\}\}/g)?.sort() ?? [];
      expect(variables(chinese[key]!), key).toEqual(variables(text));
    }
  });
});
