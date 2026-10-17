import avatarFixturesSource from '@/examples/components/avatar/fixtures.ts?raw';
import surfaceFixturesSource from '@/examples/components/surface/fixtures.ts?raw';
import { enUS } from '@/i18n/registry';

function canonicalValue(key: string): unknown {
  let value: unknown = enUS;

  for (const part of key.split('.')) {
    if (!value || typeof value !== 'object') return undefined;
    value = (value as Record<string, unknown>)[part];
  }

  return value;
}

function canonicalMessage(key: string): string {
  const value = canonicalValue(key);

  if (typeof value !== 'string') throw new Error(`Missing canonical example message: ${key}`);

  return value;
}

function remainingMessages(source: string): Record<string, string> {
  const messages: Record<string, string> = {};
  const keys = source.matchAll(/(['"])((?:examples|components)\.[\w.-]+)\1/g);

  for (const [, , key] of keys) {
    messages[key!] = canonicalMessage(key!);
  }

  const prefixes = source.matchAll(/`((?:examples|components)\.[\w.-]*)\$\{/g);

  for (const [, prefix] of prefixes) {
    const parentKey = prefix!.slice(0, prefix!.lastIndexOf('.'));
    const values = canonicalValue(parentKey);

    if (!values || typeof values !== 'object') continue;

    for (const [name, value] of Object.entries(values)) {
      const key = `${parentKey}.${name}`;

      if (key.startsWith(prefix!) && typeof value === 'string') messages[key] = value;
    }
  }

  return messages;
}

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
  let result = source.replace(
    /^import[^;]+from ['"](?:react-i18next|@\/i18n\/translate-example-text)['"];?\s*\n/gm,
    '',
  );

  result = result.replace(/\bt\(['"]([^'"]+)['"]\)/g, (_, key: string) =>
    JSON.stringify(canonicalMessage(key)),
  );
  result = result.replace(/^\s*const \{ t \} = useTranslation\(\);\n/gm, '\n');

  const needsTranslation = /\bt\(/.test(result) || result.includes('translateExampleText(');
  let helpers = '';

  if (needsTranslation) {
    const messages = remainingMessages(result);

    helpers += `const messages: Record<string, string> = ${JSON.stringify(messages, null, 2)};\n
function t(key: string, values: Record<string, unknown> = {}): string {
  return (messages[key] ?? key).replace(
    /\\{\\{(\\w+)\\}\\}/g,
    (_, name: string) => String(values[name] ?? ''),
  );
}\n`;
  }

  if (result.includes('translateExampleText(')) {
    helpers +=
      '\nfunction translateExampleText(_translate: unknown, _group: string, text: string): string { return text; }\n';
  }

  return result.trimEnd() + '\n' + helpers;
}
