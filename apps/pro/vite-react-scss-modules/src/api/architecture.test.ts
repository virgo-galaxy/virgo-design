import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, it } from 'vitest';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sources(join(dir, entry.name))
      : /\.tsx?$/.test(entry.name) && !/\.test(?:-helper)?\./.test(entry.name)
        ? [join(dir, entry.name)]
        : [],
  );
}
it('keeps API, HTTP, Mock and consumer dependencies directed', () => {
  for (const file of sources(join(root, 'api')))
    expect(readFileSync(file, 'utf8'), file).not.toMatch(
      /from ['"](?:axios|msw(?:\/[^'"]*)?|@\/(?:mock|pages|application|data)(?:\/[^'"]*)?)['"]/,
    );
  for (const file of sources(join(root, 'mock')))
    expect(readFileSync(file, 'utf8'), file).not.toMatch(
      /from ['"]@\/(?:pages|data|application|app)(?:\/[^'"]*)?['"]/,
    );
  for (const folder of ['pages', 'data', 'app'])
    for (const file of sources(join(root, folder)))
      expect(readFileSync(file, 'utf8'), file).not.toMatch(
        /from ['"](?:axios|msw(?:\/[^'"]*)?|@\/mock(?:\/[^'"]*)?)['"]/,
      );
});
