import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

import { format } from 'prettier';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = await readFile(resolve(root, 'artwork/grok-bot.svg'), 'utf8');
const viewBox = source.match(/viewBox="([^"]+)"/)[1];
// This trusted package artwork retains its original gradients and proportions.
// Canonical currentColor icons continue to use the separate strict validator.
const body = source
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/\b(stroke-width|stroke-opacity|stroke-linecap|stop-color)\b/g, (attribute) =>
    attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
  )
  .replace(/id="(cap|shell|eye)"/g, (_, name) => `id={${name}}`)
  .replace(/fill="url\(#(cap|shell|eye)\)"/g, (_, name) => 'fill={`url(#${' + name + '})`}');
const outputs = {
  'src/artwork/GrokBotIcon.tsx': `/* Generated from artwork/grok-bot.svg. Do not edit. */
import { forwardRef, useId } from 'react';

import type { IconProps } from '../icon-props.js';
export type GrokBotIconProps = IconProps;
export const GrokBotIcon = forwardRef<SVGSVGElement, GrokBotIconProps>(function GrokBotIcon({ size = 24, ...props }, ref) {
  const id = useId();
  const cap = id + '-cap';
  const shell = id + '-shell';
  const eye = id + '-eye';
  return <svg {...props} ref={ref} viewBox="${viewBox}" width={size} height={size} preserveAspectRatio="xMidYMid meet" aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true} focusable="false">${body}</svg>;
});
GrokBotIcon.displayName = 'GrokBotIcon';`,
  'src/artwork/assets.ts': `/* Generated from artwork/grok-bot.svg. Do not edit. */
export const artworkIconSvgSources = ${JSON.stringify({ 'grok-bot': source })} as const;`,
};
for (const [file, content] of Object.entries(outputs)) {
  const output = await format(content, {
    parser: 'typescript',
    singleQuote: true,
    printWidth: 100,
    trailingComma: 'all',
  });
  const target = resolve(root, file);
  if (process.argv.includes('--check')) {
    if ((await readFile(target, 'utf8')) !== output)
      throw new Error('Artwork assets are stale; run pnpm gen:icons.');
  } else {
    await writeFile(target, output);
  }
}
