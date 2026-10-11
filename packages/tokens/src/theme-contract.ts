import { radius } from './foundations/radius.js';
import { legacyPresentation } from './presentation/compatibility.js';
import { componentPresentation } from './presentation/components.js';
import { semanticPresentation } from './presentation/semantic.js';

/** Breaking CSS contract major. Additive/optional roles do not increment this number. */
export const THEME_CONTRACT_VERSION = 1;

export { deprecatedThemeRoles } from './presentation/compatibility.js';
export const semanticThemeContract = {
  ...(Object.fromEntries(
    Object.entries(radius).map(([step, value]) => [`--vd-shape-radius-${step}`, String(value)]),
  ) as { [Key in keyof typeof radius as `--vd-shape-radius-${Key}`]: string }),
  ...semanticPresentation,
} as const;
export const componentThemeContract = componentPresentation;
/** Canonical roles. `initial` is an intentional component fallback, not a missing required color. */
export const presentationContract = {
  ...semanticThemeContract,
  ...componentThemeContract,
} as const;
/** Includes compatibility aliases for existing consumers through contract major 1. */
export const themeContract = { ...presentationContract, ...legacyPresentation } as const;
export type ThemeContractVariable = keyof typeof themeContract;
export type PresentationVariable = keyof typeof presentationContract;
