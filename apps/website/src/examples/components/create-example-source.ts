import { enUS } from '@/i18n/registry';

import avatarFixturesSource from './avatar/fixtures.ts?raw';
import paginationLabelsSource from './pagination/use-pagination-labels.ts?raw';
import surfaceFixturesSource from './surface/fixtures.ts?raw';

// Copied examples use canonical English and carry no website-only imports.
export function createExampleSource(source: string): string {
  // Flatten these local image fixtures only at the copy boundary.
  for (const [name, fixtureSource] of [
    ['avatarImageFixture', avatarFixturesSource],
    ['surfaceImageFixture', surfaceFixturesSource],
  ] as const) {
    source = source.replace(
      `import { ${name} } from './fixtures';`,
      fixtureSource.replace(/^export /gm, ''),
    );
  }
  source = source
    .replace(/^import[^;]+from ['"]@\/i18n['"];?\s*\n/gm, '')
    .replace(/useAppLocale\(\)/g, "'en-US'");
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
