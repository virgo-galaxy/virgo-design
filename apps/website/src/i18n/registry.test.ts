import { describe, expect, it } from 'vitest';

import { enUS, zhCN } from './registry';

function leafKeys(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    return typeof entry === 'string' ? [path] : leafKeys(entry as object, path);
  });
}

describe('locale registry', () => {
  it('assembles one default translation tree with complete locale parity', () => {
    const enUSKeys = leafKeys(enUS).sort();
    const zhCNKeys = leafKeys(zhCN).sort();

    expect(enUSKeys.length).toBeGreaterThan(0);
    expect(zhCNKeys.length).toBeGreaterThan(0);
    expect(zhCNKeys).toEqual(enUSKeys);

    expect(enUS).toHaveProperty('app');
    expect(enUS).toHaveProperty('foundations');
    expect(enUS).toHaveProperty('tokens');
  });
});
