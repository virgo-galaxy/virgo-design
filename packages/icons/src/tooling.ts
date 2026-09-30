/** Browser-safe canonical SVG tooling. No DOM parser or React dependency. */
export type IconPath = { d: string; fillRule?: 'evenodd' | 'nonzero' };
export type IconDefinition = {
  viewBox: '0 0 24 24';
  fill: 'currentColor';
  stroke?: 'none';
  paths: IconPath[];
};
export type IconValidationCode =
  'structure' | 'viewBox' | 'color' | 'attribute' | 'geometry' | 'name';
export class IconValidationError extends Error {
  code: IconValidationCode;
  constructor(code: IconValidationCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'IconValidationError';
  }
}
function fail(code: IconValidationCode, message: string): never {
  throw new IconValidationError(code, message);
}
export function iconComponentName(id: string): string {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id))
    fail('name', 'Icon names must use lowercase kebab-case.');
  return `${id.replace(/(^|-)(\w)/g, (_match, _separator, character: string) => character.toUpperCase())}Icon`;
}
function attributes(source: string, allowed: readonly string[]): Record<string, string> {
  const result: Record<string, string> = {};
  let rest = source.trim();
  while (rest) {
    const match = rest.match(/^([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2(?:\s+|$)/);
    if (!match) fail('structure', 'Malformed SVG attributes.');
    const [, name, , value] = match;
    if (!name || value === undefined) fail('structure', 'Malformed SVG attributes.');
    if ((name === 'fill' && value !== 'currentColor') || (name === 'stroke' && value !== 'none'))
      fail('color', 'Only currentColor fill and optional stroke="none" are supported.');
    if (!allowed.includes(name) || name in result)
      fail('attribute', `Unsupported or duplicate SVG attribute: ${name}.`);
    if (/[<>&]/.test(value))
      fail('structure', 'Entities and markup in attribute values are unsupported.');
    result[name] = value;
    rest = rest.slice(match[0].length).trim();
  }
  return result;
}
function validateGeometry(d: string) {
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) ?? [];
  if (
    d.replace(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?|[\s,]/g, '') ||
    !/^[mM]$/.test(tokens[0] ?? '')
  )
    fail('geometry', 'Paths must begin with a valid move command.');
  const arities: Record<string, number> = {
    M: 2,
    L: 2,
    H: 1,
    V: 1,
    C: 6,
    S: 4,
    Q: 4,
    T: 2,
    A: 7,
    Z: 0,
  };
  let i = 0;
  while (i < tokens.length) {
    const command = tokens[i++]!.toUpperCase();
    const arity = arities[command];
    if (arity === undefined) fail('geometry', `Unsupported path command: ${command}.`);
    const values: number[] = [];
    while (i < tokens.length && !/^[a-zA-Z]$/.test(tokens[i]!)) {
      const value = Number(tokens[i++]);
      if (!Number.isFinite(value) || Math.abs(value) > 10000)
        fail('geometry', 'Path coordinates must be finite and within reasonable bounds.');
      values.push(value);
    }
    if (arity === 0 ? values.length !== 0 : values.length === 0 || values.length % arity !== 0)
      fail('geometry', 'Invalid number of path command arguments.');
    if (command === 'A')
      for (let offset = 0; offset < values.length; offset += 7) {
        if (
          values[offset]! < 0 ||
          values[offset + 1]! < 0 ||
          ![0, 1].includes(values[offset + 3]!) ||
          ![0, 1].includes(values[offset + 4]!)
        )
          fail('geometry', 'Invalid arc radius or flags.');
      }
  }
}
export function validateIconSvg(source: string): IconDefinition {
  if (source.length > 100000) fail('structure', 'SVG exceeds the 100 KB canonical source limit.');
  const cleaned = source.replace(/<!--[\s\S]*?-->/g, '').trim();
  const root = cleaned.match(/^<svg\s+([^>]+)>([\s\S]*)<\/svg>$/);
  if (!root) fail('structure', 'Expected one root <svg> element.');
  const attrs = attributes(root[1]!, ['xmlns', 'viewBox', 'fill', 'stroke']);
  if (attrs.xmlns !== undefined && attrs.xmlns !== 'http://www.w3.org/2000/svg')
    fail('structure', 'Invalid SVG namespace.');
  if (attrs.viewBox !== '0 0 24 24') fail('viewBox', 'viewBox must be exactly 0 0 24 24.');
  if (attrs.fill !== 'currentColor') fail('color', 'SVG must use currentColor fill.');
  const body = root[2]!;
  const paths: IconPath[] = [];
  const remaining = body
    .replace(/<path\s+([^>]+)\/>/g, (_markup, sourceAttributes: string) => {
      const path = attributes(sourceAttributes, ['d', 'fill-rule']);
      if (!path.d) fail('geometry', 'Missing path geometry.');
      validateGeometry(path.d);
      if (path['fill-rule'] !== undefined && !['evenodd', 'nonzero'].includes(path['fill-rule']))
        fail('attribute', 'Invalid fill-rule.');
      paths.push({
        d: path.d,
        ...(path['fill-rule']
          ? { fillRule: path['fill-rule'] as IconPath['fillRule'] & string }
          : {}),
      });
      return '';
    })
    .trim();
  if (!paths.length || remaining)
    fail(
      'structure',
      'Only self-closing <path> geometry is supported; convert other shapes to paths.',
    );
  return {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    ...(attrs.stroke ? { stroke: 'none' as const } : {}),
    paths,
  };
}
export function serializeIconSvg(definition: IconDefinition): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">\n${definition.paths.map((path) => `  <path d="${path.d}"${path.fillRule ? ` fill-rule="${path.fillRule}"` : ''} />`).join('\n')}\n</svg>\n`;
}
/** Standalone React source for custom icons; input is validated again before export. */
export function createIconSource(id: string, source: string): string {
  const name = iconComponentName(id);
  const definition = validateIconSvg(source);
  return `import { forwardRef } from 'react';\nimport type { IconProps } from '@virgo-design/icons';\n\nexport type ${name}Props = IconProps;\n\nexport const ${name} = /* @__PURE__ */ forwardRef<SVGSVGElement, ${name}Props>(function ${name}({ size = 24, ...props }, ref) {\n  return (\n    <svg ref={ref} aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true} {...props} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">\n${definition.paths.map((path) => `      <path d={${JSON.stringify(path.d)}}${path.fillRule ? ` fillRule="${path.fillRule}"` : ''} />`).join('\n')}\n    </svg>\n  );\n});\n${name}.displayName = '${name}';\n`;
}
