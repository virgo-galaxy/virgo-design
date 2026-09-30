import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SurfaceColorBackgroundExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Surface
        background={{ type: 'color', value: '#243852' }}
        radius={12}
        className={styles.surface!}
      >
        <strong>{t('examples.surface.copy.customColor')}</strong>
        <p>{t('examples.surface.copy.aFlatDecorativeBackgroundBelowNormalContent')}</p>
      </Surface>
      <Surface
        background={{
          type: 'gradient',
          value: 'linear-gradient(125deg, #263c60, #5e448e 55%, #8b506d)',
        }}
        radius={12}
        className={styles.surface!}
      >
        <strong>{t('examples.surface.copy.customGradient')}</strong>
        <p>{t('examples.surface.copy.consumersOwnTheForegroundContrast')}</p>
      </Surface>
    </div>
  );
}
