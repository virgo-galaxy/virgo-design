import { afterEach, describe, expect, it } from 'vitest';

import { componentApiReference, primitiveApiReference } from '@/generated/api-reference.generated';

import { i18nInstance, setAppLocale } from './runtime';
import { translateApiDescription } from './translate-api-description';

const entries = [componentApiReference, primitiveApiReference]
  .flatMap((registry) =>
    Object.values(registry).flatMap((doc) =>
      doc.declarations.flatMap((declaration) => [declaration, ...declaration.properties]),
    ),
  )
  .filter((entry) => entry.description.trim());

afterEach(async () => {
  await setAppLocale('en-US');
});

describe('API description translations', () => {
  it('resolves every description to canonical JSDoc in English and an override in Chinese', async () => {
    expect(entries).toHaveLength(520);
    await setAppLocale('en-US');
    for (const entry of entries)
      expect(
        translateApiDescription(i18nInstance.t, entry.descriptionTranslationKey, entry.description),
      ).toBe(entry.description);
    await setAppLocale('zh-CN');
    for (const entry of entries) {
      const description = translateApiDescription(
        i18nInstance.t,
        entry.descriptionTranslationKey,
        entry.description,
      );
      expect(description, entry.descriptionTranslationKey).not.toBe(entry.description);
      expect(description.trim(), entry.descriptionTranslationKey).not.toBe('');
      expect(description, entry.descriptionTranslationKey).not.toBe(
        entry.descriptionTranslationKey,
      );
    }
  });
});
