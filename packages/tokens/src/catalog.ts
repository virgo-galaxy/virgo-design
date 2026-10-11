import type { FoundationVariable, SemanticColorVariable, TypographyVariable } from './source.js';
import { foundationDeclarations, semanticDeclarations, typographyDeclarations } from './source.js';
import type { PresentationVariable } from './theme-contract.js';
import {
  componentThemeContract,
  deprecatedThemeRoles,
  presentationContract,
  semanticThemeContract,
} from './theme-contract.js';

export type TokenLayer = 'foundation' | 'semantic' | 'component';
export type TokenVariable =
  FoundationVariable | SemanticColorVariable | TypographyVariable | PresentationVariable;
export interface TokenDefinition {
  readonly name: TokenVariable;
  readonly layer: TokenLayer;
  readonly required: boolean;
  readonly fallback: Readonly<{ light: string; dark: string }>;
}

const dark = new Map(semanticDeclarations('dark').map(({ name, value }) => [name, String(value)]));
function definitions(
  layer: TokenLayer,
  entries: { name: string; value: string | number }[],
  required = false,
): TokenDefinition[] {
  return entries.map(({ name, value }) =>
    Object.freeze({
      name: name as TokenVariable,
      layer,
      required,
      fallback: Object.freeze({
        light: String(value),
        dark: required ? dark.get(name)! : String(value),
      }),
    }),
  );
}

/** Canonical public tokens only. CSS appearance bridge slots and deprecated aliases are adapters. */
export const tokenCatalog: readonly TokenDefinition[] = Object.freeze([
  ...definitions('foundation', foundationDeclarations()),
  ...definitions('semantic', semanticDeclarations('light'), true),
  ...definitions('semantic', typographyDeclarations()),
  ...definitions(
    'semantic',
    Object.entries(semanticThemeContract).map(([name, value]) => ({ name, value })),
  ),
  ...definitions(
    'component',
    Object.entries(componentThemeContract).map(([name, value]) => ({ name, value })),
  ),
]);
export const tokenVars = Object.freeze(
  Object.fromEntries(tokenCatalog.map(({ name }) => [name, `var(${name})`])),
) as { readonly [Name in TokenVariable]: `var(${Name})` };
export const tokenValues = Object.freeze(
  Object.fromEntries(
    (['light', 'dark'] as const).map((appearance) => [
      appearance,
      Object.freeze(
        Object.fromEntries(tokenCatalog.map(({ name, fallback }) => [name, fallback[appearance]])),
      ),
    ]),
  ),
) as Readonly<Record<'light' | 'dark', Readonly<Record<TokenVariable, string>>>>;
export const themeContractRoles = Object.freeze(
  Object.fromEntries(
    tokenCatalog.filter(({ layer }) => layer !== 'foundation').map((role) => [role.name, role]),
  ),
) as Readonly<Record<Exclude<TokenVariable, FoundationVariable>, TokenDefinition>>;
export const requiredThemeRoles = Object.freeze(
  tokenCatalog.filter(({ required }) => required).map(({ name }) => name),
);
export const optionalThemeRoles = Object.freeze(
  tokenCatalog
    .filter(({ layer, required }) => layer !== 'foundation' && !required)
    .map(({ name }) => name),
);
export { deprecatedThemeRoles, presentationContract };
