import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { format } from 'prettier';

import { type IconMetadata, validateIconMetadata } from '../src/contract.ts';
import { iconComponentName, validateIconSvg } from '../src/tooling.ts';
import { createIconAnimation } from './animations.ts';
import { createAnimatedSvg } from './svg-animation.ts';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function toComponentName(fileName: string) {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*\.svg$/.test(fileName))
    throw new Error('SVG filenames must use kebab-case.');
  return iconComponentName(parse(fileName).name);
}
function toTypeScriptStringLiteral(value: string) {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n')}'`;
}

export function generateIconComponent(fileName: string, source: string) {
  const componentName = toComponentName(fileName);
  const definition = validateIconSvg(source);
  const animation = createIconAnimation(parse(fileName).name, definition);

  const isSort = fileName === 'sort.svg';
  const propsType = isSort
    ? "IconProps & { direction?: 'none' | 'ascending' | 'descending'; activeColor?: string }"
    : animation
      ? 'IconProps & { animated?: IconAnimation }'
      : 'IconProps';
  const functionArguments = `{ size = 24, ${isSort ? "direction = 'none', activeColor = 'currentColor', " : ''}${animation ? 'animated, ' : ''}...props }: ${componentName}Props`;
  const svgAttributeValues = [
    'ref={ref}',
    "aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}",
    '{...props}',
    'fill="currentColor"',
    'height={size}',
    definition.stroke === undefined ? undefined : 'stroke="none"',
    'viewBox="0 0 24 24"',
    'width={size}',
  ].filter((attribute): attribute is string => attribute !== undefined);
  const inlineSvgOpeningTag = `    <svg ${svgAttributeValues.join(' ')}>`;
  const svgOpeningTag =
    inlineSvgOpeningTag.length <= 100
      ? inlineSvgOpeningTag
      : `    <svg\n${svgAttributeValues.map((attribute) => `      ${attribute}`).join('\n')}\n    >`;

  const paths = definition.paths
    .map((path, index) => {
      const value = toTypeScriptStringLiteral(path.d);
      const fillRule =
        path.fillRule === undefined ? undefined : `fillRule=${JSON.stringify(path.fillRule)}`;
      const sortAttributes = isSort
        ? ` data-slot="sort-${index === 0 ? 'ascending' : 'descending'}" fill={direction === '${index === 0 ? 'ascending' : 'descending'}' ? activeColor : 'currentColor'} opacity={direction === '${index === 0 ? 'ascending' : 'descending'}' ? 1 : ${index === 0 ? '0.65' : '0.45'}}`
        : '';
      const inlinePath = `      <path d={${value}}${fillRule === undefined ? '' : ` ${fillRule}`}${sortAttributes} />`;
      const requiresMultilineValue = path.d.includes('\n') || `        d={${value}}`.length > 100;

      if (requiresMultilineValue) {
        return `      <path\n        d={\n          ${value}\n        }${fillRule === undefined ? '' : `\n        ${fillRule}`}${sortAttributes}\n      />`;
      }

      return inlinePath.length > 100
        ? `      <path\n        d={${value}}${fillRule === undefined ? '' : `\n        ${fillRule}`}${sortAttributes}\n      />`
        : inlinePath;
    })
    .join('\n');

  return `/* This file is generated from icons/${fileName} by scripts/generate.ts. Do not edit. */
import { forwardRef } from 'react';

${animation ? "import { AnimatedPaths, iconAnimationCount } from '../AnimatedPaths.js';\nimport type { IconAnimation } from '../animation-contract.js';\n" : ''}import type { IconProps } from '../icon-props.js';
${animation ? '\nconst animation = ' + JSON.stringify(animation) + ' as const;\nconst animationPaths = ' + JSON.stringify(definition.paths) + ' as const;\n' : ''}

export type ${componentName}Props = ${propsType};

export const ${componentName} = /* @__PURE__ */ forwardRef<SVGSVGElement, ${componentName}Props>(function ${componentName}(${functionArguments}, ref) {
  return (
${svgOpeningTag}
${animation ? '      {iconAnimationCount(animated) ? <AnimatedPaths key={String(animated)} paths={animationPaths} animation={animation} animated={animated!} /> : <>\n' : ''}
${paths}
${animation ? '      </>}\n' : ''}
    </svg>
  );
});
${componentName}.displayName = '${componentName}';
`;
}

export async function generateIcons(options: { check?: boolean; root?: string } = {}) {
  const root = options.root ?? packageRoot;
  const sourceDirectory = join(root, 'icons');
  const outputDirectory = join(root, 'src', 'generated');
  const files = (await readdir(sourceDirectory)).filter((name) => /\.svg$/i.test(name)).sort();
  const metadata = JSON.parse(
    await readFile(join(root, 'metadata.json'), 'utf8'),
  ) as IconMetadata[];
  validateIconMetadata(
    metadata,
    files.map((file) => parse(file).name),
  );
  // Validate every source before touching existing output.
  const icons = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(join(sourceDirectory, file), 'utf8');
      const definition = validateIconSvg(source);
      const animation = createIconAnimation(parse(file).name, definition);
      const animated = Boolean(animation);
      if (metadata.find((record) => record.id === parse(file).name)!.animated !== animated)
        throw new Error(`Animation metadata does not match implementation: ${file}.`);
      return {
        id: parse(file).name,
        name: toComponentName(file),
        source,
        animatedSource: animation ? createAnimatedSvg(definition, animation) : undefined,
        output: generateIconComponent(file, source),
      };
    }),
  );
  icons.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true }));
  if (new Set(icons.map((icon) => icon.name)).size !== icons.length)
    throw new Error('Duplicate React component name.');
  const outputs = new Map<string, string>();
  for (const icon of icons) outputs.set(`generated/${icon.name}.tsx`, icon.output);
  outputs.set(
    'index.ts',
    `/* Generated by scripts/generate.ts. Do not edit. */\nexport type { IconAnimation } from './animation-contract.js';\n${icons.map((icon) => `export { ${icon.name}, type ${icon.name}Props } from './generated/${icon.name}.js';`).join('\n')}\nexport type { IconProps } from './icon-props.js';\n`,
  );
  const entries = metadata.map((record) => ({
    ...record,
    componentName: iconComponentName(record.id),
  }));
  outputs.set(
    'generated/manifest.ts',
    `/* Generated from metadata.json. Do not edit. */\nimport type { IconManifestEntry } from '../contract.js';\nexport const iconManifest = ${JSON.stringify(entries)} as const satisfies readonly IconManifestEntry[];\nexport type IconId = (typeof iconManifest)[number]['id'];\n`,
  );
  outputs.set(
    'generated/assets.ts',
    `/* Generated from canonical SVG. Do not edit. */\nexport const iconSvgSources = ${JSON.stringify(Object.fromEntries(icons.map((icon) => [icon.id, icon.source])))} as const;\nexport const iconAnimatedSvgSources = ${JSON.stringify(Object.fromEntries(icons.filter((icon) => icon.animatedSource).map((icon) => [icon.id, icon.animatedSource])))} as const;\n`,
  );
  outputs.set(
    'generated/registry.ts',
    `/* Generated opt-in React registry. Do not edit. */\n${icons.map((icon) => `import { ${icon.name} } from './${icon.name}.js';`).join('\n')}\nexport const iconComponents = {${icons.map((icon) => `'${icon.id}': ${icon.name}`).join(',')}} as const;\n`,
  );
  for (const [file, source] of outputs)
    outputs.set(
      file,
      await format(source, {
        parser: 'typescript',
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'all',
      }),
    );
  if (options.check) {
    const expected = [...outputs.keys()]
      .filter((file) => file.startsWith('generated/'))
      .map((file) => file.slice('generated/'.length))
      .sort();
    const actual = (await readdir(outputDirectory)).sort();
    if (JSON.stringify(expected) !== JSON.stringify(actual))
      throw new Error('Generated icon file list is stale; run pnpm gen:icons.');
    for (const [file, source] of outputs)
      if ((await readFile(join(root, 'src', file), 'utf8')) !== source)
        throw new Error(`Generated icon output is stale: ${file}; run pnpm gen:icons.`);
    return;
  }
  await rm(outputDirectory, { force: true, recursive: true });
  await mkdir(outputDirectory, { recursive: true });
  for (const [file, source] of outputs) await writeFile(join(root, 'src', file), source);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateIcons({ check: process.argv.includes('--check') });
}
