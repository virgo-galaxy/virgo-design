import { MoonIcon, SunIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

import type { Appearance } from '@/shared/theme/types';

import styles from './global-controls.module.scss';

export interface AppearanceControlProps {
  value: Appearance;
  onChange: (value: Appearance) => void;
}

export function AppearanceControl({ value, onChange }: AppearanceControlProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.group} aria-label="Appearance">
      <button
        className={`${styles.button} ${styles.appearanceButton} ${
          value === 'light' ? styles.buttonActive : ''
        }`}
        type="button"
        aria-label={t('common.lightMode')}
        onClick={() => onChange('light')}
      >
        <SunIcon aria-hidden="true" size={16} />
      </button>

      <button
        className={`${styles.button} ${styles.appearanceButton} ${
          value === 'dark' ? styles.buttonActive : ''
        }`}
        type="button"
        aria-label={t('common.darkMode')}
        onClick={() => onChange('dark')}
      >
        <MoonIcon aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
