import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ButtonSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Button size="mini">{t('examples.button.copy.mini')}</Button>
      <Button size="small">{t('examples.button.copy.small')}</Button>
      <Button size="medium">{t('examples.button.copy.medium')}</Button>
      <Button size="large">{t('examples.button.copy.large')}</Button>
    </div>
  );
}
