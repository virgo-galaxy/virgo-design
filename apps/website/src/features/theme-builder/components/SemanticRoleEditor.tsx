import {
  COLOR_FAMILIES,
  type ColorScale,
  type ColorScaleStep,
  type GeneratedColorPalette,
} from '@virgo-design/colors';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { SemanticAssignment, SemanticFamily, SemanticRole } from '../model/types';
import styles from '../theme-builder.module.scss';
import { ThemeSelect, type ThemeSelectOption } from './ThemeSelect';

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly ColorScaleStep[];

interface SemanticRoleEditorProps {
  role: SemanticRole;
  assignment: SemanticAssignment;
  palette: GeneratedColorPalette;
  brandScale: ColorScale;
  onFamilyChange: (family: SemanticFamily) => void;
  onStepChange: (step: ColorScaleStep) => void;
}

export function SemanticRoleEditor({
  role,
  assignment,
  palette,
  brandScale,
  onFamilyChange,
  onStepChange,
}: SemanticRoleEditorProps) {
  const { t } = useTranslation();

  const selectedScale =
    assignment.family === 'brand' ? brandScale : palette.scales[assignment.family];
  const color = selectedScale[assignment.step];

  const familyOptions = useMemo<readonly ThemeSelectOption<SemanticFamily>[]>(
    () => [
      {
        value: 'brand',
        label: t('foundations.brand'),
        color: brandScale[6],
      },
      ...COLOR_FAMILIES.map((family) => ({
        value: family,
        label: t(`families.${family}`),
        color: palette.bases[family],
      })),
    ],
    [brandScale, palette.bases, t],
  );

  const stepOptions = useMemo<readonly ThemeSelectOption<ColorScaleStep>[]>(
    () =>
      STEPS.map((step) => ({
        value: step,
        label: String(step),
        color: selectedScale[step],
      })),
    [selectedScale],
  );

  return (
    <div className={styles.semanticRow}>
      <div className={styles.semanticIdentity}>
        <span
          className={styles.semanticSwatch}
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />

        <div>
          <strong>{t(`themeBuilder.roles.${role}`)}</strong>
          <code>{color.toUpperCase()}</code>
        </div>
      </div>

      <ThemeSelect
        value={assignment.family}
        options={familyOptions}
        ariaLabel={t('themeBuilder.family')}
        onChange={onFamilyChange}
      />

      <ThemeSelect
        compact
        value={assignment.step}
        options={stepOptions}
        ariaLabel={t('themeBuilder.step')}
        onChange={onStepChange}
      />
    </div>
  );
}
