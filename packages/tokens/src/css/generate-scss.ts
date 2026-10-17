import { tokenVars } from '../catalog.js';

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
