import type { ColorScale } from '@virgo-design/colors';
import { useTranslation } from 'react-i18next';

import styles from '../styles/foundation-extensions.module.scss';
import { HexColorField } from './controls/HexColorField';
import { FoundationScale } from './FoundationScale';

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
      >
        <header className={styles.panelHeader}>
          <div>
            <span className={styles.eyebrow}>{t('extensions.brand.eyebrow')}</span>
            <h2>{t('extensions.brand.title')}</h2>
            <p>{t('extensions.brand.description')}</p>
          </div>

          <button
            className={styles.resetButton}
            type="button"
            disabled={disabled}
            onClick={onBrandReset}
          >
            {t('common.reset')}
          </button>
        </header>

        <div className={styles.controlRow}>
          <HexColorField
            label={t('extensions.brand.base')}
            value={brandBase}
            onChange={onBrandBaseChange}
            disabled={disabled}
          />

          <div className={styles.foundationMeta}>
            <span>{t('extensions.algorithm')}</span>
            <strong>OKLCH · 10</strong>
          </div>
        </div>

        <FoundationScale scale={brandScale} tokenPrefix="brand" />
      </section>

      <section
        className={`${styles.foundationPanel} ${disabled ? styles.foundationPanelDisabled : ''}`}
        onPointerDown={onNeutralSelect}
      >
        <header className={styles.panelHeader}>
          <div>
            <span className={styles.eyebrow}>{t('extensions.neutral.eyebrow')}</span>
            <h2>{t('extensions.neutral.title')}</h2>
            <p>{t('extensions.neutral.description')}</p>
          </div>

          <button
            className={styles.resetButton}
            type="button"
            disabled={disabled}
            onClick={onNeutralReset}
          >
            {t('common.reset')}
          </button>
        </header>

        <div className={styles.controlRow}>
          <HexColorField
            label={t('extensions.neutral.base')}
            value={neutralBase}
            onChange={onNeutralBaseChange}
            disabled={disabled}
          />

          <div className={styles.foundationMeta}>
            <span>{t('extensions.algorithm')}</span>
            <strong>OKLCH · 10</strong>
          </div>
        </div>

        <FoundationScale scale={neutralScale} tokenPrefix="neutral" />
      </section>
    </div>
  );
}
