import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateTailwindCss } from '../tailwind.js';
import {
  generateFoundationsCss,
  generateSemanticTypographyCss,
  generateStylesCss,
  generateThemesCss,
} from './generate-css.js';
import { generateScss } from './generate-scss.js';

export const cssOutputFiles = {
  'foundations.css': generateFoundationsCss,
  'semantic-typography.css': generateSemanticTypographyCss,
  'themes.css': generateThemesCss,
  'styles.css': generateStylesCss,
  'tailwind.css': generateTailwindCss,
} as const;

export async function writeCssFiles(directory: string | URL) {
  const outputDirectory =
    typeof directory === 'string' ? resolve(directory) : fileURLToPath(directory);

  await mkdir(outputDirectory, { recursive: true });

  const entries = await readdir(outputDirectory, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.css'))
      .map((entry) => unlink(resolve(outputDirectory, entry.name))),
  );

  await writeFile(resolve(outputDirectory, 'tokens.scss'), generateScss(), 'utf8');

  await Promise.all(
    Object.entries(cssOutputFiles).map(([fileName, generate]) =>
      writeFile(resolve(outputDirectory, fileName), generate(), 'utf8'),
    ),
  );
}
