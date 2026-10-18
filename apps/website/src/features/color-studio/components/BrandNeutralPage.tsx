import type { ColorScale } from '@virgo-design/colors';
import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { HexColorField } from './controls/HexColorField';
import { FoundationScale } from './FoundationScale';

import styles from '../styles/foundation-extensions.module.scss';

interface BrandNeutralPageProps {
  brandBase: string;
  brandScale: ColorScale;
  neutralBase: string;
  neutralScale: ColorScale;
  onBrandBaseChange: (value: string) => void;
  onNeutralBaseChange: (value: string) => void;
  onBrandReset: () => void;
  onNeutralReset: () => void;
  onBrandSelect: () => void;
  onNeutralSelect: () => void;
  disabled?: boolean;
}

export function BrandNeutralPage({
  brandBase,
  brandScale,
  neutralBase,
  neutralScale,
  onBrandBaseChange,
  onNeutralBaseChange,
  onBrandReset,
  onNeutralReset,
  onBrandSelect,
  onNeutralSelect,
  disabled = false,
}: BrandNeutralPageProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <section
        className={`${styles.foundationPanel} ${disabled ? styles.foundationPanelDisabled : ''}`}
        onPointerDown={onBrandSelect}
        onFocusCapture={onBrandSelect}
      >
        <header className={styles.panelHeader}>
          <div>
            <span className={styles.eyebrow}>
              {t('foundations.colorStudio.extensions.brand.eyebrow')}
            </span>
            <h2>{t('foundations.colorStudio.extensions.brand.title')}</h2>
            <p>{t('foundations.colorStudio.extensions.brand.description')}</p>
          </div>

          <Button
            variant="text"
            className={styles.resetButton}
            type="button"
            disabled={disabled}
            onClick={onBrandReset}
          >
            {t('foundations.colorStudio.actions.reset')}
          </Button>
        </header>

        <div className={styles.controlRow}>
          <HexColorField
            label={t('foundations.colorStudio.extensions.brand.base')}
            value={brandBase}
            onChange={onBrandBaseChange}
            disabled={disabled}
          />

          <div className={styles.foundationMeta}>
            <span>{t('foundations.colorStudio.extensions.algorithm')}</span>
            <strong>OKLCH · 10</strong>
          </div>
        </div>

        <FoundationScale scale={brandScale} tokenPrefix="brand" />
      </section>

      <section
        className={`${styles.foundationPanel} ${disabled ? styles.foundationPanelDisabled : ''}`}
        onPointerDown={onNeutralSelect}
        onFocusCapture={onNeutralSelect}
      >
        <header className={styles.panelHeader}>
          <div>
            <span className={styles.eyebrow}>
              {t('foundations.colorStudio.extensions.neutral.eyebrow')}
            </span>
            <h2>{t('foundations.colorStudio.extensions.neutral.title')}</h2>
            <p>{t('foundations.colorStudio.extensions.neutral.description')}</p>
          </div>

          <Button
            variant="text"
            className={styles.resetButton}
            type="button"
            disabled={disabled}
            onClick={onNeutralReset}
          >
            {t('foundations.colorStudio.actions.reset')}
          </Button>
        </header>

        <div className={styles.controlRow}>
          <HexColorField
            label={t('foundations.colorStudio.extensions.neutral.base')}
            value={neutralBase}
            onChange={onNeutralBaseChange}
            disabled={disabled}
          />

          <div className={styles.foundationMeta}>
            <span>{t('foundations.colorStudio.extensions.algorithm')}</span>
            <strong>OKLCH · 10</strong>
          </div>
        </div>

        <FoundationScale scale={neutralScale} tokenPrefix="neutral" />
      </section>
    </div>
  );
}
