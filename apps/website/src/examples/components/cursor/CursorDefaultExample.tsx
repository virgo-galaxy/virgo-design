import { Button, Cursor } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CursorDefaultExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Cursor.Provider className={styles.stage}>
      <p className={styles.note}>{t('examples.cursor.copy.moveYourMouseThroughThisSurface')}</p>
      <Button variant="outline">{t('examples.cursor.copy.aPreciseLittlePointer')}</Button>
    </Cursor.Provider>
  );
}
