import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SurfaceElevationExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {([0, 1, 2, 3, 4, 5] as const).map((elevation) => (
        <Surface
          key={elevation}
          tone="elevated"
          elevation={elevation}
          radius={12}
          className={styles.surface!}
        >
          {t('examples.surface.copy.level')} {elevation}
        </Surface>
      ))}
    </div>
  );
}
