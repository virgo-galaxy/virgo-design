import { useTranslation } from 'react-i18next';

import { HexColorField } from './HexColorField';

import styles from '../../styles/color-studio.module.scss';

interface PaletteAnchorControlProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaletteAnchorControl({ value, onChange }: PaletteAnchorControlProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.controlGroup}>
      <HexColorField
        label={t('foundations.colorStudio.settings.paletteAnchor')}
        value={value}
        onChange={onChange}
      />
      <p className={styles.controlHint}>
        {t('foundations.colorStudio.settings.paletteAnchorHint')}
      </p>
    </section>
  );
}
