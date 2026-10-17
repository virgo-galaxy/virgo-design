import {
  optionalThemeRoles,
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
export interface ThemeRoleCoverage {
  readonly implemented: number;
  readonly total: number;
  /** Percentage rounded to two decimal places; each appearance is one implementation slot. */
  readonly percentage: number;
}
export interface ThemeCompleteness {
  readonly required: ThemeRoleCoverage;
  readonly optional: ThemeRoleCoverage;
  readonly overall: ThemeRoleCoverage;
}
export interface ThemeValidationResult {
  readonly valid: boolean;
  readonly expectedVersion: number;
  readonly receivedVersion: number;
  readonly missingRequiredRoles: Readonly<Record<'light' | 'dark', readonly string[]>>;
  readonly missingOptionalRoles: Readonly<Record<'light' | 'dark', readonly string[]>>;
  readonly completeness: ThemeCompleteness;
  readonly unknownRoles: Readonly<Record<'light' | 'dark', readonly string[]>>;
  readonly invalidValues: Readonly<Record<'light' | 'dark', readonly string[]>>;
}

/** Validate declarations, never computed CSS that might have silently inherited Virgo. */
export function validateThemeContract(input: ThemeContractInput): ThemeValidationResult {
  const missingRequiredRoles = { light: [] as string[], dark: [] as string[] };
  const missingOptionalRoles = { light: [] as string[], dark: [] as string[] };
  const unknownRoles = { light: [] as string[], dark: [] as string[] };
  const invalidValues = { light: [] as string[], dark: [] as string[] };
  for (const appearance of ['light', 'dark'] as const) {
    const values = input.tokens?.[appearance] ?? {};
    for (const name of requiredThemeRoles) {
      if (!Object.hasOwn(values, name)) missingRequiredRoles[appearance].push(name);
    }
    for (const name of optionalThemeRoles) {
      if (!Object.hasOwn(values, name)) missingOptionalRoles[appearance].push(name);
    }
    for (const [name, value] of Object.entries(values)) {
      if (!Object.hasOwn(themeContractRoles, name)) unknownRoles[appearance].push(name);
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
  const coverage = (roles: readonly string[]): ThemeRoleCoverage => {
    const implemented = (['light', 'dark'] as const).reduce(
      (count, appearance) =>
        count +
        roles.filter(
          (name) =>
            Object.hasOwn(input.tokens?.[appearance] ?? {}, name) &&
            !invalidValues[appearance].includes(name),
        ).length,
      0,
    );
    const total = roles.length * 2;
    return Object.freeze({
      implemented,
      total,
      percentage: total ? Math.round((implemented / total) * 10000) / 100 : 100,
    });
  };
  return Object.freeze({
    valid:
      input.contractVersion === THEME_CONTRACT_VERSION &&
      !Object.values(missingRequiredRoles).some((roles) => roles.length) &&
      !Object.values(unknownRoles).some((roles) => roles.length) &&
      !Object.values(invalidValues).some((roles) => roles.length),
    expectedVersion: THEME_CONTRACT_VERSION,
    receivedVersion: input.contractVersion,
    missingRequiredRoles,
    missingOptionalRoles,
    completeness: Object.freeze({
      required: coverage(requiredThemeRoles),
      optional: coverage(optionalThemeRoles),
      overall: coverage([...requiredThemeRoles, ...optionalThemeRoles]),
    }),
    unknownRoles,
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
