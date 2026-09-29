import type { TFunction } from 'i18next';

export function translateApiDescription(t: TFunction, translationKey: string, fallback: string) {
  return t(translationKey as never, { defaultValue: fallback }) || fallback;
}
