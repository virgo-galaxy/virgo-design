import { Button, Cursor } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CursorCustomExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Cursor.Provider
      cursor={<span className={styles.crosshair} />}
      hotspot={{ x: 12, y: 12 }}
      className={styles.stage}
    >
      <p className={styles.note}>
        {t('examples.cursor.copy.yourOwnVisualTheSamePointerInfrastructure')}
      </p>
      <Button variant="outline">{t('examples.cursor.copy.customCrosshair')}</Button>
    </Cursor.Provider>
  );
}
