import {
  deprecatedThemeRoles,
  requiredThemeRoles,
  themeContractRoles,
  tokenValues,
} from './catalog.js';
import { THEME_CONTRACT_VERSION } from './theme-contract.js';

export type ThemeTokenValues = Readonly<Record<string, string>>;
export type ThemeTokens = Readonly<Record<'light' | 'dark', ThemeTokenValues>>;
export interface ThemeContractInput {
  readonly contractVersion: number;
  readonly tokens?: ThemeTokens;
}
export interface ThemeValidationResult {
  readonly valid: boolean;
  readonly expectedVersion: number;
  readonly receivedVersion: number;
  readonly missingRequiredRoles: Readonly<Record<'light' | 'dark', readonly string[]>>;
  readonly unknownRoles: Readonly<Record<'light' | 'dark', readonly string[]>>;
  readonly deprecatedRoles: Readonly<Record<'light' | 'dark', readonly string[]>>;
  readonly invalidValues: Readonly<Record<'light' | 'dark', readonly string[]>>;
}

/** Validate declarations, never computed CSS that might have silently inherited Virgo. */
export function validateThemeContract(input: ThemeContractInput): ThemeValidationResult {
  const missingRequiredRoles = { light: [] as string[], dark: [] as string[] };
  const unknownRoles = { light: [] as string[], dark: [] as string[] };
  const deprecatedRoles = { light: [] as string[], dark: [] as string[] };
  const invalidValues = { light: [] as string[], dark: [] as string[] };
  for (const appearance of ['light', 'dark'] as const) {
    const values = input.tokens?.[appearance] ?? {};
    for (const name of requiredThemeRoles) {
      if (!Object.hasOwn(values, name)) missingRequiredRoles[appearance].push(name);
    }
    for (const [name, value] of Object.entries(values)) {
      if (Object.hasOwn(deprecatedThemeRoles, name)) deprecatedRoles[appearance].push(name);
      else if (!Object.hasOwn(themeContractRoles, name)) unknownRoles[appearance].push(name);
      if (
        typeof value !== 'string' ||
        !value.trim() ||
        /[;{}]|<\/style/i.test(value) ||
        (requiredThemeRoles.includes(name as (typeof requiredThemeRoles)[number]) &&
          /^(initial|inherit|unset|revert(?:-layer)?)$/.test(value.trim()))
      )
        invalidValues[appearance].push(name);
    }
    const graph = new Map(
      Object.entries(values).map(([name, value]) => [
        name,
        typeof value === 'string'
          ? [...value.matchAll(/var\(\s*(--[\w-]+)/g)].map((match) => match[1]!)
          : [],
      ]),
    );
    const reaches = (name: string, target: string, seen: Set<string>): boolean => {
      if (seen.has(name)) return false;
      seen.add(name);
      return (graph.get(name) ?? []).some((next) => next === target || reaches(next, target, seen));
    };
    for (const name of graph.keys())
      if (reaches(name, name, new Set()) && !invalidValues[appearance].includes(name))
        invalidValues[appearance].push(name);
  }
  return Object.freeze({
    valid:
      input.contractVersion === THEME_CONTRACT_VERSION &&
      !Object.values(missingRequiredRoles).some((roles) => roles.length) &&
      !Object.values(unknownRoles).some((roles) => roles.length) &&
      !Object.values(invalidValues).some((roles) => roles.length),
    expectedVersion: THEME_CONTRACT_VERSION,
    receivedVersion: input.contractVersion,
    missingRequiredRoles,
    unknownRoles,
    deprecatedRoles,
    invalidValues,
  });
}

/** Explicit Virgo defaults for a theme author to customize; no implicit palette inheritance. */
export function getDefaultThemeTokens(): ThemeTokens {
  return Object.fromEntries(
    (['light', 'dark'] as const).map((appearance) => [
      appearance,
      Object.fromEntries(
        Object.keys(themeContractRoles).map((name) => [
          name,
          tokenValues[appearance][name as keyof typeof tokenValues.light],
        ]),
      ),
    ]),
  ) as unknown as ThemeTokens;
}
