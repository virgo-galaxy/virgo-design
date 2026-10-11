import { tokenVars } from '../catalog.js';
import { deprecatedThemeRoles } from '../theme-contract.js';

export function generateScss(): string {
  return [
    '// Generated from the canonical Tokens catalog. Do not edit.',
    "@use 'sass:map';",
    '$tokens: (',
    ...Object.entries(tokenVars).map(([name, value]) => `  '${name}': ${value},`),
    ');',
    '@function token($name) {',
    '  @if not map.has-key($tokens, $name) {',
    '    @error "Unknown Virgo token: #{$name}";',
    '  }',
    '  @return map.get($tokens, $name);',
    '}',
    '',
  ].join('\n');
}

/** Compile-time aliases copy one value; they never create circular CSS var references. */
export function generateCompatibilityScss(): string {
  const aliases = Object.entries(deprecatedThemeRoles).filter(
    ([, role]) => role.replacement !== null,
  );
  return [
    '// Generated contract-major-1 writer compatibility.',
    "@use 'sass:map';",
    '$aliases: (',
    ...aliases.map(([old, role]) => `  '${role.replacement}': '${old}',`),
    ');',
    '@mixin role($name, $value) {',
    '  #{$name}: #{$value};',
    '  @if map.has-key($aliases, $name) {',
    '    #{map.get($aliases, $name)}: #{$value};',
    '  }',
    '}',
    '',
  ].join('\n');
}
