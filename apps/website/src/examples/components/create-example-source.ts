import { enUS } from '@/i18n/registry';

import paginationLabelsSource from './pagination/use-pagination-labels.ts?raw';

// Copied examples use canonical English and carry no website-only imports.
export function createExampleSource(source: string): string {
  const pagination = source.includes('@/examples/components/pagination/use-pagination-labels');
  let result = source.replace(
    /^import[^;]+from ['"](?:react-i18next|@\/i18n\/translate-example-text|@\/examples\/components\/pagination\/use-pagination-labels)['"];?\s*\n/gm,
    '',
  );
  if (pagination) {
    result +=
      '\n' +
      paginationLabelsSource
        .replace(/^import[^;]+;\s*\n/gm, '')
        .replace(
          'export function usePaginationLabels(): PaginationLabels',
          'function usePaginationLabels()',
        );
  }
  const keys = [...result.matchAll(/\bt\(['"]([^'"]+)['"]/g)].map((match) => match[1]!);
  const resolve = (key: string): string => {
    let value: unknown = enUS;
    for (const part of key.split('.')) value = (value as Record<string, unknown>)[part];
    if (typeof value !== 'string') throw new Error(`Missing canonical example message: ${key}`);
    return value;
  };
  result = result.replace(/\bt\(['"]([^'"]+)['"]\)/g, (_, key: string) =>
    JSON.stringify(resolve(key)),
  );
  result = result.replace(/const \{ t \} = useTranslation\(\);/g, '');
  const needsTranslation = /\bt\(/.test(result) || result.includes('translateExampleText(');
  let helpers = '';
  if (needsTranslation) {
    const messages = Object.fromEntries(
      keys
        .filter((key) => result.includes(`t('${key}',`) || result.includes(`t("${key}",`))
        .map((key) => [key, resolve(key)]),
    );
    helpers += `const messages: Record<string, string> = ${JSON.stringify(messages, null, 2)};\n
function t(key: string, values: Record<string, unknown> = {}): string {
  return (messages[key] ?? key).replace(/\\{\\{(\\w+)\\}\\}/g, (_, name: string) => String(values[name] ?? ''));
}\n`;
  }
  if (result.includes('translateExampleText(')) {
    helpers +=
      '\nfunction translateExampleText(_translate: unknown, _group: string, text: string): string { return text; }\n';
  }
  return result.trimEnd() + '\n' + helpers;
}
