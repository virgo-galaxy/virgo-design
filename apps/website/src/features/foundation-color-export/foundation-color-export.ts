import {
  CHROMATIC_FAMILIES,
  type ColorScale,
  type ColorScaleStep,
  type GeneratedColorPalette,
} from '@virgo-design/colors';

export type FoundationExportFormat = 'css' | 'scss' | 'tailwind';
export type FoundationScaleNaming = 'virgo' | 'conventional';

export interface FoundationColorScales {
  palette: GeneratedColorPalette;
  brandScale: ColorScale;
  neutralScale: ColorScale;
}

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

function scaleLabel(step: ColorScaleStep, naming: FoundationScaleNaming) {
  return naming === 'virgo' ? String(step) : CONVENTIONAL_STEPS[step];
}

function foundationEntries(
  { palette, brandScale, neutralScale }: FoundationColorScales,
  naming: FoundationScaleNaming,
) {
  const scales = [
    ...CHROMATIC_FAMILIES.map((family) => [family, palette.scales[family]] as const),
    ['brand', brandScale] as const,
    ['neutral', neutralScale] as const,
  ];

  return scales.flatMap(([family, scale]) =>
    STEPS.map(
      (step) => [`${family}-${scaleLabel(step, naming)}`, scale[step].toUpperCase()] as const,
    ),
  );
}

export function generateFoundationColorCode(
  scales: FoundationColorScales,
  format: FoundationExportFormat = 'css',
  naming: FoundationScaleNaming = 'conventional',
) {
  const entries = foundationEntries(scales, naming);

  switch (format) {
    case 'scss':
      return [
        '// Virgo Design Foundation Colors',
        ...entries.map(([name, value]) => `$vd-${name}: ${value};`),
      ].join('\n');
    case 'tailwind':
      return [
        '/* Virgo Design Foundation Colors */',
        '@theme {',
        ...entries.map(([name, value]) => `  --color-vd-${name}: ${value};`),
        '}',
      ].join('\n');
    case 'css':
    default:
      return [
        '/* Virgo Design Foundation Colors */',
        ':root {',
        ...entries.map(([name, value]) => `  --vd-${name}: ${value};`),
        '}',
      ].join('\n');
  }
}
