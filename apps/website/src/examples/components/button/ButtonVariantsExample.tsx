import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ButtonVariantsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Button variant="primary">{t('examples.button.copy.primaryButton')}</Button>
      <Button variant="secondary">{t('examples.button.copy.secondaryButton')}</Button>
      <Button variant="outline">{t('examples.button.copy.outlineButton')}</Button>
      <Button variant="text">{t('examples.button.copy.textButton')}</Button>
    </div>
  );
}
