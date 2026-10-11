import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

import {
  getDefaultThemeTokens,
  optionalThemeRoles,
  requiredThemeRoles,
  themeContractRoles,
  validateThemeContract,
} from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { themePresets } from './registry';

const execFileAsync = promisify(execFile);
const declaredOptionalRoleCounts = {
  virgo: 38,
  minimal: 45,
  soft: 88,
  glass: 121,
  retro: 79,
  contrast: 101,
} as const;
function scopedRules(css: string, id: string) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
  const records: {
    selector: string;
    conditions: { type: number; condition: string }[];
    declarations: string;
    variables: Record<string, string>;
    chromeFilter: string;
  }[] = [];
  const visit = (rules: CSSRuleList, conditions: (typeof records)[number]['conditions']) => {
    for (const rule of Array.from(rules)) {
      if ('selectorText' in rule) {
        const scoped = rule as CSSStyleRule;
        if (scoped.selectorText.includes(`[data-virgo-theme=${id}]`))
          records.push({
            selector: scoped.selectorText,
            conditions,
            declarations: scoped.style.cssText,
            variables: Object.fromEntries(
              Array.from({ length: scoped.style.length }, (_, index) => {
                const name = scoped.style[index]!;
                return [name, scoped.style.getPropertyValue(name)];
              }),
            ),
            chromeFilter: scoped.style.getPropertyValue('--vd-chrome-backdrop-filter'),
          });
      } else if ('cssRules' in rule) {
        const group = rule as CSSConditionRule;
        visit(group.cssRules, [...conditions, { type: rule.type, condition: group.conditionText }]);
      }
    }
  };
  try {
    expect(style.sheet).not.toBeNull();
    visit(style.sheet!.cssRules, []);
    return records;
  } finally {
    style.remove();
  }
}
describe('built theme consumption', () => {
  it('imports the public JS entry in Node without DOM or CSS loaders', async () => {
    const url = new URL(`file://${resolve('packages/themes/dist/index.js')}`).href;
    const result = await execFileAsync(process.execPath, [
      '--input-type=module',
      '-e',
      `const themes=await import(${JSON.stringify(url)}); console.log(themes.getTheme()); console.log(themes.resolveTheme({theme:'glass',appearance:'dark'}).theme); console.log(Object.keys(themes.themePresets[0]).sort().join(','));`,
    ]);
    expect(result.stdout.trim()).toBe('virgo\nglass\nappearances,contractVersion,id,name');
  });
  it.each(themePresets)(
    '$id exports only its own CSS while styles.css retains all six',
    async ({ id }) => {
      const manifest = JSON.parse(await readFile('packages/themes/package.json', 'utf8')) as {
        exports: Record<string, string>;
      };
      expect(manifest.exports[`./${id}.css`]).toBe(`./dist/${id}.css`);
      const single = await readFile(`packages/themes/dist/${id}.css`, 'utf8');
      expect(single).toContain(`[data-virgo-theme=${id}]`);
      for (const theme of themePresets)
        if (theme.id !== id) expect(single).not.toContain(`[data-virgo-theme=${theme.id}]`);
      const all = await readFile('packages/themes/dist/styles.css', 'utf8');
      for (const theme of themePresets) expect(all).toContain(`[data-virgo-theme=${theme.id}]`);
      // Compare the parsed rule tree, including conditions and declaration order.
      // Each single-theme entry must behave exactly like its scopes in the aggregate.
      const singleRules = scopedRules(single, id);
      expect(singleRules.length).toBeGreaterThan(0);
      expect(singleRules).toEqual(scopedRules(all, id));
    },
  );
  it('keeps Glass compatibility fallback inside supports/media and the normal blur unconditional', async () => {
    const rules = scopedRules(await readFile('packages/themes/dist/glass.css', 'utf8'), 'glass');
    const fallback = rules.filter(({ chromeFilter }) => chromeFilter === 'none');
    expect(fallback).toHaveLength(2);
    expect(fallback.map(({ conditions }) => conditions.map(({ type }) => type))).toEqual([
      [CSSRule.SUPPORTS_RULE],
      [CSSRule.MEDIA_RULE],
    ]);
    expect(fallback[0]!.conditions[0]!.condition).toContain('backdrop-filter');
    expect(fallback[1]!.conditions[0]!.condition).toContain('prefers-reduced-transparency');
    expect(
      rules.filter(({ conditions, chromeFilter }) => !conditions.length && chromeFilter),
    ).toMatchObject([{ chromeFilter: 'blur(4px) saturate(1.04)' }]);
  });
  it.each(themePresets)(
    '$id reports its declared optional coverage over the shared required baseline',
    async ({ id, contractVersion }) => {
      const base = getDefaultThemeTokens();
      const tokens = {
        light: Object.fromEntries(requiredThemeRoles.map((name) => [name, base.light[name]!])),
        dark: Object.fromEntries(requiredThemeRoles.map((name) => [name, base.dark[name]!])),
      };
      const directOptional = new Set<string>();
      const directData = { light: new Set<string>(), dark: new Set<string>() };
      for (const rule of scopedRules(
        await readFile(`packages/themes/dist/${id}.css`, 'utf8'),
        id,
      )) {
        if (rule.conditions.length) continue;
        for (const [name, value] of Object.entries(rule.variables)) {
          for (const appearance of ['light', 'dark'] as const) {
            const prefix = `--vd-theme-${appearance}-`;
            if (name.startsWith(prefix)) {
              const role = name.replace(prefix, '--vd-');
              tokens[appearance][role] = value;
              if (role.startsWith('--vd-data-')) directData[appearance].add(role);
            } else if (Object.hasOwn(themeContractRoles, name)) {
              tokens[appearance][name] = value;
              if (optionalThemeRoles.includes(name as (typeof optionalThemeRoles)[number]))
                directOptional.add(name);
            }
          }
        }
      }
      const result = validateThemeContract({ contractVersion, tokens });
      expect(result.valid).toBe(true);
      expect(directOptional.size).toBe(declaredOptionalRoleCounts[id]);
      expect(result.completeness.required).toEqual({
        implemented: 200,
        total: 200,
        percentage: 100,
      });
      expect(result.completeness.optional.implemented).toBe(directOptional.size * 2);
      for (const appearance of ['light', 'dark'] as const) {
        expect(result.missingOptionalRoles[appearance]).toEqual(
          optionalThemeRoles.filter((name) => !directOptional.has(name)),
        );
        // Non-Virgo palettes must explicitly supply all 29 data slots, rather than
        // accidentally obtaining them from the shared stable status/default baseline.
        if (id !== 'virgo') expect(directData[appearance].size).toBe(29);
      }
    },
  );
});
