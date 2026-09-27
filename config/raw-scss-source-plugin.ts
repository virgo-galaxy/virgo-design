import { readFile } from 'node:fs/promises';

import type { Plugin } from 'vite';

const virtualPrefix = '\0virgo-raw-scss:';
const virtualSuffix = ':source';

function rawScssRequest(source: string) {
  const queryIndex = source.indexOf('?');
  if (queryIndex === -1) return null;

  const file = source.slice(0, queryIndex);
  const query = new URLSearchParams(source.slice(queryIndex + 1));
  return file.endsWith('.module.scss') && query.has('virgo-raw') ? file : null;
}

export function rawScssSourcePlugin(): Plugin {
  return {
    name: 'virgo-raw-scss-source',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      const request = rawScssRequest(source);
      if (!request) return null;

      const resolved = await this.resolve(request, importer, { ...options, skipSelf: true });
      if (!resolved) return null;

      return `${virtualPrefix}${encodeURIComponent(resolved.id)}${virtualSuffix}`;
    },
    async load(id) {
      if (!id.startsWith(virtualPrefix) || !id.endsWith(virtualSuffix)) return null;

      const encodedFile = id.slice(virtualPrefix.length, -virtualSuffix.length);
      const file = decodeURIComponent(encodedFile);
      const source = await readFile(file, 'utf8');

      return {
        code: `export default ${JSON.stringify(source)};`,
        map: null,
      };
    },
  };
}
