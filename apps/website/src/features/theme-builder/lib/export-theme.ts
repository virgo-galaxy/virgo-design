import {
  COLOR_FAMILIES,
  type ColorScale,
  type ColorScaleStep,
  type GeneratedColorPalette,
} from '@virgo-design/colors';

import type {
  ScaleNaming,
  SemanticAssignments,
  SemanticFamily,
  SemanticRole,
  ThemeBuilderState,
  ThemeMode,
} from '../model/types';

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly ColorScaleStep[];
const CONVENTIONAL_STEPS: Readonly<Record<ColorScaleStep, string>> = {
  1: '50',
  2: '100',
  3: '200',
  4: '300',
  5: '400',
  6: '500',
  7: '600',
  8: '700',
  9: '800',
  10: '900',
};
const SEMANTIC_ROLES = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly SemanticRole[];
const THEME_MODES = ['light', 'dark'] as const satisfies readonly ThemeMode[];

function sanitizePrefix(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'theme';
}

function sanitizeComment(value: string): string {
  return value.replace(/\*\//g, '* /').trim() || 'Generated Theme';
}

function getScaleLabel(step: ColorScaleStep, naming: ScaleNaming): string {
  return naming === 'virgo' ? String(step) : CONVENTIONAL_STEPS[step];
}

function clampStep(step: number): ColorScaleStep {
  return Math.min(10, Math.max(1, step)) as ColorScaleStep;
}

function getRecipeSteps(baseStep: ColorScaleStep, theme: ThemeMode) {
  if (theme === 'dark') {
    return {
      soft: clampStep(baseStep + 5),
      border: clampStep(baseStep + 3),
      default: baseStep,
      hover: clampStep(baseStep - 1),
      active: clampStep(baseStep - 2),
    };
  }

  return {
    soft: clampStep(baseStep - 5),
    border: clampStep(baseStep - 3),
    default: baseStep,
    hover: clampStep(baseStep + 1),
    active: clampStep(baseStep + 2),
  };
}

function cssFoundationVar(prefix: string, family: string, scaleLabel: string) {
  return `--${prefix}-${family}-${scaleLabel}`;
}

function scssFoundationVar(prefix: string, family: string, scaleLabel: string) {
  return `$${prefix}-${family}-${scaleLabel}`;
}

function tailwindFoundationVar(prefix: string, family: string, scaleLabel: string) {
  return `--color-${prefix}-${family}-${scaleLabel}`;
}

function cssFoundationReference(
  prefix: string,
  family: SemanticFamily,
  step: ColorScaleStep,
  naming: ScaleNaming,
) {
  return `var(${cssFoundationVar(prefix, family, getScaleLabel(step, naming))})`;
}

function scssFoundationReference(
  prefix: string,
  family: SemanticFamily,
  step: ColorScaleStep,
  naming: ScaleNaming,
) {
  return scssFoundationVar(prefix, family, getScaleLabel(step, naming));
}

function buildCssSemanticLines(
  prefix: string,
  assignments: SemanticAssignments,
  naming: ScaleNaming,
  theme: ThemeMode,
): string[] {
  const lines: string[] = [];

  for (const role of SEMANTIC_ROLES) {
    const assignment = assignments[role];
    const recipe = getRecipeSteps(assignment.step, theme);

    for (const [state, step] of Object.entries(recipe) as Array<
      [keyof typeof recipe, ColorScaleStep]
    >) {
      const suffix = state === 'default' ? '' : `-${state}`;
      lines.push(
        `  --${prefix}-semantic-${role}${suffix}: ${cssFoundationReference(
          prefix,
          assignment.family,
          step,
          naming,
        )};`,
      );
    }
  }

  lines.push(`  --${prefix}-semantic-link: var(--${prefix}-semantic-primary);`);
  lines.push(`  --${prefix}-semantic-focus: var(--${prefix}-semantic-primary);`);

  return lines;
}

function buildScssSemanticLines(
  prefix: string,
  assignments: SemanticAssignments,
  naming: ScaleNaming,
  theme: ThemeMode,
): string[] {
  const lines: string[] = [`@mixin ${prefix}-${theme}-theme {`];

  for (const role of SEMANTIC_ROLES) {
    const assignment = assignments[role];
    const recipe = getRecipeSteps(assignment.step, theme);

    for (const [state, step] of Object.entries(recipe) as Array<
      [keyof typeof recipe, ColorScaleStep]
    >) {
      const suffix = state === 'default' ? '' : `-${state}`;
      lines.push(
        `  --${prefix}-semantic-${role}${suffix}: #{${scssFoundationReference(
          prefix,
          assignment.family,
          step,
          naming,
        )}};`,
      );
    }
  }

  lines.push(`  --${prefix}-semantic-link: var(--${prefix}-semantic-primary);`);
  lines.push(`  --${prefix}-semantic-focus: var(--${prefix}-semantic-primary);`);
  lines.push('}');

  return lines;
}

function buildTailwindThemeValueLines(
  prefix: string,
  assignments: SemanticAssignments,
  naming: ScaleNaming,
  theme: ThemeMode,
): string[] {
  const lines: string[] = [];

  for (const role of SEMANTIC_ROLES) {
    const assignment = assignments[role];
    const recipe = getRecipeSteps(assignment.step, theme);

    for (const [state, step] of Object.entries(recipe) as Array<
      [keyof typeof recipe, ColorScaleStep]
    >) {
      const suffix = state === 'default' ? '' : `-${state}`;
      const foundation = tailwindFoundationVar(
        prefix,
        assignment.family,
        getScaleLabel(step, naming),
      );
      lines.push(`  --${prefix}-semantic-${role}${suffix}: var(${foundation});`);
    }
  }

  lines.push(`  --${prefix}-semantic-link: var(--${prefix}-semantic-primary);`);
  lines.push(`  --${prefix}-semantic-focus: var(--${prefix}-semantic-primary);`);

  return lines;
}

function buildTailwindSemanticDefinitions(prefix: string): string[] {
  const lines: string[] = [];

  for (const role of SEMANTIC_ROLES) {
    for (const state of ['', '-soft', '-border', '-hover', '-active']) {
      lines.push(`  --color-${prefix}-${role}${state}: var(--${prefix}-semantic-${role}${state});`);
    }
  }

  lines.push(`  --color-${prefix}-link: var(--${prefix}-semantic-link);`);
  lines.push(`  --color-${prefix}-focus: var(--${prefix}-semantic-focus);`);

  return lines;
}

function appendCssFoundation(
  lines: string[],
  prefix: string,
  family: string,
  scale: ColorScale,
  naming: ScaleNaming,
) {
  for (const step of STEPS) {
    const label = getScaleLabel(step, naming);
    lines.push(`  ${cssFoundationVar(prefix, family, label)}: ${scale[step].toUpperCase()};`);
  }
}

function appendScssFoundation(
  lines: string[],
  prefix: string,
  family: string,
  scale: ColorScale,
  naming: ScaleNaming,
) {
  for (const step of STEPS) {
    const label = getScaleLabel(step, naming);
    lines.push(`${scssFoundationVar(prefix, family, label)}: ${scale[step].toUpperCase()};`);
  }
}

function appendTailwindFoundation(
  lines: string[],
  prefix: string,
  family: string,
  scale: ColorScale,
  naming: ScaleNaming,
) {
  for (const step of STEPS) {
    const label = getScaleLabel(step, naming);
    lines.push(`  ${tailwindFoundationVar(prefix, family, label)}: ${scale[step].toUpperCase()};`);
  }
}

export function generateCssTheme(
  palette: GeneratedColorPalette,
  brandScale: ColorScale,
  neutralScale: ColorScale,
  state: ThemeBuilderState,
): string {
  const prefix = sanitizePrefix(state.prefix);
  const themeName = sanitizeComment(state.themeName);
  const lines = [
    `/* ${themeName} · generated by Virgo Design */`,
    '/* 140 foundation colors: 12 chromatic × 10 + brand × 10 + neutral × 10 */',
    ':root {',
  ];

  for (const family of COLOR_FAMILIES) {
    appendCssFoundation(lines, prefix, family, palette.scales[family], state.scaleNaming);
  }

  appendCssFoundation(lines, prefix, 'brand', brandScale, state.scaleNaming);
  appendCssFoundation(lines, prefix, 'neutral', neutralScale, state.scaleNaming);
  lines.push('}');

  for (const theme of THEME_MODES) {
    lines.push('', theme === 'light' ? ':root, [data-theme="light"] {' : '[data-theme="dark"] {');
    lines.push(`  /* ${theme === 'light' ? 'Light' : 'Dark'} semantic colors */`);
    lines.push(...buildCssSemanticLines(prefix, state.semantics[theme], state.scaleNaming, theme));
    lines.push('}');
  }

  return lines.join('\n');
}

export function generateScssTheme(
  palette: GeneratedColorPalette,
  brandScale: ColorScale,
  neutralScale: ColorScale,
  state: ThemeBuilderState,
): string {
  const prefix = sanitizePrefix(state.prefix);
  const themeName = sanitizeComment(state.themeName);
  const lines = [`// ${themeName} · generated by Virgo Design`, '// 140 foundation colors'];

  for (const family of COLOR_FAMILIES) {
    appendScssFoundation(lines, prefix, family, palette.scales[family], state.scaleNaming);
  }

  appendScssFoundation(lines, prefix, 'brand', brandScale, state.scaleNaming);
  appendScssFoundation(lines, prefix, 'neutral', neutralScale, state.scaleNaming);

  for (const theme of THEME_MODES) {
    lines.push(
      '',
      ...buildScssSemanticLines(prefix, state.semantics[theme], state.scaleNaming, theme),
    );
  }

  lines.push('', ':root,');
  lines.push('[data-theme="light"] {');
  lines.push(`  @include ${prefix}-light-theme;`);
  lines.push('}');
  lines.push('');
  lines.push('[data-theme="dark"] {');
  lines.push(`  @include ${prefix}-dark-theme;`);
  lines.push('}');

  return lines.join('\n');
}

export function generateTailwindTheme(
  palette: GeneratedColorPalette,
  brandScale: ColorScale,
  neutralScale: ColorScale,
  state: ThemeBuilderState,
): string {
  const prefix = sanitizePrefix(state.prefix);
  const themeName = sanitizeComment(state.themeName);
  const lines = [
    `/* ${themeName} · Tailwind CSS v4 · generated by Virgo Design */`,
    '@theme {',
    '  /* 140 foundation colors */',
  ];

  for (const family of COLOR_FAMILIES) {
    appendTailwindFoundation(lines, prefix, family, palette.scales[family], state.scaleNaming);
  }

  appendTailwindFoundation(lines, prefix, 'brand', brandScale, state.scaleNaming);
  appendTailwindFoundation(lines, prefix, 'neutral', neutralScale, state.scaleNaming);
  lines.push('}', '', '@theme inline {', '  /* Runtime semantic aliases */');
  lines.push(...buildTailwindSemanticDefinitions(prefix));
  lines.push('}');

  for (const theme of THEME_MODES) {
    lines.push('', theme === 'light' ? ':root, [data-theme="light"] {' : '[data-theme="dark"] {');
    lines.push(`  /* ${theme === 'light' ? 'Light' : 'Dark'} semantic values */`);
    lines.push(
      ...buildTailwindThemeValueLines(prefix, state.semantics[theme], state.scaleNaming, theme),
    );
    lines.push('}');
  }

  return lines.join('\n');
}

export function generateThemeCode(
  palette: GeneratedColorPalette,
  brandScale: ColorScale,
  neutralScale: ColorScale,
  state: ThemeBuilderState,
): string {
  switch (state.exportFormat) {
    case 'scss':
      return generateScssTheme(palette, brandScale, neutralScale, state);
    case 'tailwind':
      return generateTailwindTheme(palette, brandScale, neutralScale, state);
    case 'css':
    default:
      return generateCssTheme(palette, brandScale, neutralScale, state);
  }
}
