import { Button, Cursor } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CursorScopeExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.regions}>
      <Cursor.Provider className={styles.stage}>
        <p className={styles.note}>{t('examples.cursor.copy.virgoCursorWithinThisScope')}</p>
        <Button variant="outline">{t('examples.cursor.copy.outerScope')}</Button>
        <Cursor.Provider disabled className={styles.native}>
          <Button variant="text">{t('examples.cursor.copy.nativeCursorInThisNestedRegion')}</Button>
        </Cursor.Provider>
      </Cursor.Provider>
      <Button variant="outline">{t('examples.cursor.copy.outsideAllProviders')}</Button>
    </div>
  );
}
