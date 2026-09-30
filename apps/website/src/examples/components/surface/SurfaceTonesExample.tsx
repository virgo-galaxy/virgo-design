import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SurfaceTonesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['default', 'secondary', 'strong', 'elevated'] as const).map((tone) => (
        <Surface key={tone} tone={tone} border="subtle" radius={12} className={styles.surface!}>
          <strong>{tone}</strong>
          <p className={styles.text!}>
            {t('examples.surface.copy.themeAwareContentAndContainerColor')}
          </p>
        </Surface>
      ))}
    </div>
  );
}
