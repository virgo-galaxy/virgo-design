import { Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SeparatorVerticalExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <span>{t('examples.separator.copy.overview')}</span>
      <Separator orientation="vertical" />
      <span>{t('examples.separator.copy.activity')}</span>
      <Separator orientation="vertical" />
      <span>{t('examples.separator.copy.settings')}</span>
    </div>
  );
}
