import { useTranslation } from 'react-i18next';

import styles from '../../styles/color-studio.module.scss';
import { HexColorField } from './HexColorField';

interface PaletteAnchorControlProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaletteAnchorControl({ value, onChange }: PaletteAnchorControlProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.controlGroup}>
      <HexColorField label={t('settings.paletteAnchor')} value={value} onChange={onChange} />
      <p className={styles.controlHint}>{t('settings.paletteAnchorHint')}</p>
    </section>
  );
}
