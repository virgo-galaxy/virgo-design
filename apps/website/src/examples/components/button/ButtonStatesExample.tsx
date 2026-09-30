import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ButtonStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Button>{t('examples.button.copy.default')}</Button>
      <Button disabled>{t('examples.button.copy.disabled')}</Button>
      <Button variant="secondary">{t('examples.button.copy.secondary')}</Button>
      <Button variant="secondary" disabled>
        {t('examples.button.copy.secondaryDisabled')}
      </Button>
    </div>
  );
}
