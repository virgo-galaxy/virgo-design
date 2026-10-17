import {
  requiredThemeRoles,
  THEME_CONTRACT_VERSION,
  type ThemeTokens,
  validateThemeContract,
} from '@virgo-design/tokens';

/** Generate scoped CSS from the exact declarations validated at registration. */
export function getThemeCss(id: string, tokens: ThemeTokens): string {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) throw new TypeError('Invalid theme ID.');
  const validation = validateThemeContract({ contractVersion: THEME_CONTRACT_VERSION, tokens });
  if (!validation.valid)
    throw new TypeError(`Invalid theme contract: ${JSON.stringify(validation)}`);
  const required = new Set<string>(requiredThemeRoles);
  const common = Object.entries(tokens.light).filter(
    ([name, value]) => !required.has(name) && tokens.dark[name] === value,
  );
  const declarations = (['light', 'dark'] as const).flatMap((appearance) =>
    Object.entries(tokens[appearance])
      .filter(([name]) => required.has(name))
      .map(([name, value]) => `  ${name.replace('--vd-', `--vd-theme-${appearance}-`)}: ${value};`),
  );
  const base = `[data-virgo-theme='${id}'] {\n${[...declarations, ...common.map(([name, value]) => `  ${name}: ${value};`)].join('\n')}\n}\n`;
  // Scope roots carry both attributes (getThemeAttributes). No ancestor selectors
  // are emitted: their specificity could repaint a nested different theme.
  return (
    base +
    (['light', 'dark'] as const)
      .map((appearance) => {
        const different = Object.entries(tokens[appearance]).filter(
          ([name, value]) =>
            !required.has(name) &&
            tokens[appearance === 'light' ? 'dark' : 'light'][name] !== value,
        );
        return different.length
          ? `[data-virgo-theme='${id}'][data-theme='${appearance}'] {\n${different.map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}\n`
          : '';
      })
      .join('\n')
  );
}
