import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const iconsDirectory = join(packageRoot, 'icons');
const generatedDirectory = join(packageRoot, 'src', 'generated');
const indexFile = join(packageRoot, 'src', 'index.ts');

function getAttribute(attributes, name) {
  const value = getOptionalAttribute(attributes, name);

  if (!value) {
    throw new Error(`Missing required SVG attribute: ${name}`);
  }

  return value;
}

function getOptionalAttribute(attributes, name) {
  const match = attributes.match(new RegExp(`\\b${name}="([^"]+)"`));

  return match?.[1];
}

function toComponentName(fileName) {
  return `${parse(fileName).name.replace(/(^|[-_])(\w)/g, (_, _separator, character) =>
    character.toUpperCase(),
  )}Icon`;
}

function toTypeScriptStringLiteral(value) {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\n', '\\n')}'`;
}

function readSvgDefinition(source) {
  const svgMatch = source.match(/^\s*<svg\s+([^>]*)>([\s\S]*?)<\/svg>\s*$/);

  if (!svgMatch?.[1] || svgMatch[2] === undefined) {
    throw new Error('Expected one root <svg> element.');
  }

  const attributes = svgMatch[1];
  const svgBody = svgMatch[2].replace(/<!--[\s\S]*?-->/g, '');
  const paths = [...svgBody.matchAll(/<path\s+([^>]*)\/>/g)].map((pathMatch) => {
    const pathAttributes = pathMatch[1];

    if (!pathAttributes) {
      throw new Error('Expected path attributes.');
    }

    return {
      d: getAttribute(pathAttributes, 'd'),
      fillRule: getOptionalAttribute(pathAttributes, 'fill-rule'),
    };
  });
  const remainingMarkup = svgBody.replace(/<path\s+[^>]*\/>/g, '').trim();

  if (paths.length === 0 || remainingMarkup) {
    throw new Error(
      'Only self-closing <path> geometry is supported by the current icon generator.',
    );
  }

  const strokeWidth = getOptionalAttribute(attributes, 'stroke-width');

  if (strokeWidth !== undefined && !Number.isFinite(Number(strokeWidth))) {
    throw new Error('Expected stroke-width to be numeric when it is provided.');
  }

  return {
    fill: getAttribute(attributes, 'fill'),
    paths,
    stroke: getOptionalAttribute(attributes, 'stroke'),
    strokeLinecap: getOptionalAttribute(attributes, 'stroke-linecap'),
    strokeLinejoin: getOptionalAttribute(attributes, 'stroke-linejoin'),
    strokeWidth: strokeWidth === undefined ? undefined : Number(strokeWidth),
    viewBox: getAttribute(attributes, 'viewBox'),
  };
}

export function generateIconComponent(fileName, source) {
  const componentName = toComponentName(fileName);
  const definition = readSvgDefinition(source);

  const usesStroke = definition.stroke !== undefined && definition.stroke !== 'none';
  const supportsStrokeWidth = usesStroke && definition.strokeWidth !== undefined;
  const propsType = supportsStrokeWidth
    ? `Omit<SVGProps<SVGSVGElement>, 'strokeWidth'> & {
  size?: number;
  strokeWidth?: number;
}`
    : `Omit<
  SVGProps<SVGSVGElement>,
  'stroke' | 'strokeLinecap' | 'strokeLinejoin' | 'strokeWidth'
> & {
  size?: number;
}`;
  const functionArguments = supportsStrokeWidth
    ? `{ size = 24, strokeWidth = ${definition.strokeWidth}, ...props }: ${componentName}Props`
    : `{ size = 24, ...props }: ${componentName}Props`;
  const svgAttributeValues = [
    `fill=${JSON.stringify(definition.fill)}`,
    'height={size}',
    definition.stroke === undefined ? undefined : `stroke=${JSON.stringify(definition.stroke)}`,
    usesStroke && definition.strokeLinecap !== undefined
      ? `strokeLinecap=${JSON.stringify(definition.strokeLinecap)}`
      : undefined,
    usesStroke && definition.strokeLinejoin !== undefined
      ? `strokeLinejoin=${JSON.stringify(definition.strokeLinejoin)}`
      : undefined,
    supportsStrokeWidth ? 'strokeWidth={strokeWidth}' : undefined,
    `viewBox=${JSON.stringify(definition.viewBox)}`,
    'width={size}',
    '{...props}',
  ].filter((attribute): attribute is string => attribute !== undefined);
  const inlineSvgOpeningTag = `    <svg ${svgAttributeValues.join(' ')}>`;
  const svgOpeningTag =
    inlineSvgOpeningTag.length <= 100
      ? inlineSvgOpeningTag
      : `    <svg\n${svgAttributeValues.map((attribute) => `      ${attribute}`).join('\n')}\n    >`;

  const paths = definition.paths
    .map((path) => {
      const value = toTypeScriptStringLiteral(path.d);
      const fillRule =
        path.fillRule === undefined ? undefined : `fillRule=${JSON.stringify(path.fillRule)}`;
      const inlinePath = `      <path d={${value}}${fillRule === undefined ? '' : ` ${fillRule}`} />`;
      const requiresMultilineValue = path.d.includes('\n') || `        d={${value}}`.length > 100;

      if (requiresMultilineValue) {
        return `      <path\n        d={\n          ${value}\n        }${fillRule === undefined ? '' : `\n        ${fillRule}`}\n      />`;
      }

      return inlinePath.length > 100
        ? `      <path\n        d={${value}}${fillRule === undefined ? '' : `\n        ${fillRule}`}\n      />`
        : inlinePath;
    })
    .join('\n');

  return `/* This file is generated from icons/${fileName} by scripts/generate.ts. Do not edit. */
import type { SVGProps } from 'react';

export type ${componentName}Props = ${propsType};

export function ${componentName}(${functionArguments}) {
  return (
${svgOpeningTag}
${paths}
    </svg>
  );
}
`;
}

export async function generateIcons() {
  const iconFiles = (await readdir(iconsDirectory))
    .filter((fileName) => extname(fileName) === '.svg')
    .sort();

  await rm(generatedDirectory, { force: true, recursive: true });
  await mkdir(generatedDirectory, { recursive: true });

  const generatedIcons = await Promise.all(
    iconFiles.map(async (fileName) => {
      const source = await readFile(join(iconsDirectory, fileName), 'utf8');
      const componentName = toComponentName(fileName);
      const output = generateIconComponent(fileName, source);

      await writeFile(join(generatedDirectory, `${componentName}.tsx`), output);

      return componentName;
    }),
  );

  const exports = generatedIcons
    .map(
      (componentName) =>
        `export { ${componentName}, type ${componentName}Props } from './generated/${componentName}.js';`,
    )
    .join('\n');

  await writeFile(
    indexFile,
    `/* This file is generated by scripts/generate.ts. Do not edit. */\n${exports}\n`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateIcons();
}
