import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { generateIcons } from './generate';

const svg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z" /></svg>';
describe('generator validation and freshness', () => {
  it('checks every committed output, including metadata, registry, assets, and exports', async () => {
    await expect(generateIcons({ check: true })).resolves.toBeUndefined();
  });
  it('fails before changing existing output and detects stale output', async () => {
    const root = await mkdtemp(join(tmpdir(), 'virgo-icons-'));
    try {
      await mkdir(join(root, 'icons'));
      await mkdir(join(root, 'src', 'generated'), { recursive: true });
      await writeFile(join(root, 'icons', 'sample.svg'), svg);
      await writeFile(
        join(root, 'metadata.json'),
        JSON.stringify([
          {
            id: 'sample',
            family: 'sample',
            variant: 'outline',
            category: 'system',
            tags: ['test'],
            aliases: [],
            status: 'stable',
            description: 'A test icon.',
            animated: false,
          },
        ]),
      );
      await generateIcons({ root });
      await generateIcons({ root, check: true });
      const index = await readFile(join(root, 'src', 'index.ts'), 'utf8');
      const metadataPath = join(root, 'metadata.json');
      const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
      await writeFile(metadataPath, JSON.stringify([{ ...metadata[0], animated: true }]));
      await expect(generateIcons({ root })).rejects.toThrow('does not match implementation');
      expect(await readFile(join(root, 'src', 'index.ts'), 'utf8')).toBe(index);
      await writeFile(metadataPath, JSON.stringify(metadata));
      await writeFile(join(root, 'icons', 'sample.svg'), svg.replace('currentColor', '#fff'));
      await expect(generateIcons({ root })).rejects.toThrow('currentColor');
      expect(await readFile(join(root, 'src', 'index.ts'), 'utf8')).toBe(index);
      await writeFile(join(root, 'icons', 'sample.svg'), svg);
      await writeFile(join(root, 'src', 'generated', 'SampleIcon.tsx'), 'stale');
      await expect(generateIcons({ root, check: true })).rejects.toThrow('stale');
      await writeFile(join(root, 'metadata.json'), '[]');
      await expect(generateIcons({ root })).rejects.toThrow('Missing metadata');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
