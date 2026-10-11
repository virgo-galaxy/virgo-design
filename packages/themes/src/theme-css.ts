import {
  deprecatedThemeRoles,
  requiredThemeRoles,
  THEME_CONTRACT_VERSION,
  themeContract,
  type ThemeTokens,
  validateThemeContract,
} from '@virgo-design/tokens';

/** Generate scoped CSS from the exact declarations validated at registration. */
export function getThemeCss(id: string, tokens: ThemeTokens): string {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) throw new TypeError('Invalid theme ID.');
  const validation = validateThemeContract({ contractVersion: THEME_CONTRACT_VERSION, tokens });
  if (!validation.valid)
    throw new TypeError(`Invalid theme contract: ${JSON.stringify(validation)}`);
  const normalized = { light: { ...tokens.light }, dark: { ...tokens.dark } };
  for (const appearance of ['light', 'dark'] as const) {
    for (const [old, { replacement }] of Object.entries(deprecatedThemeRoles)) {
      if (!replacement) continue;
      const values = normalized[appearance];
      if (Object.hasOwn(values, old) && !Object.hasOwn(values, replacement))
        values[replacement] = values[old]!;
      if (Object.hasOwn(values, replacement) && !Object.hasOwn(values, old)) {
        const canonical = values[replacement]!;
        // Canonical defaults can reference the old writer slot. Copy its concrete
        // baseline when generating the reverse alias, avoiding a self-reference.
        values[old] = canonical.includes(`var(${old}`)
          ? themeContract[old as keyof typeof themeContract]
          : canonical;
      }
    }
  }
  const normalizedValidation = validateThemeContract({
    contractVersion: THEME_CONTRACT_VERSION,
    tokens: normalized,
  });
  if (!normalizedValidation.valid)
    throw new TypeError(`Invalid theme aliases: ${JSON.stringify(normalizedValidation)}`);
  tokens = normalized;
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
