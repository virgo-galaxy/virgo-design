import { VirgoDesignIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

import * as styles from './FooterBrand.css';

export function FooterBrand() {
  const { t } = useTranslation();

  return (
    <span className={styles.footerBrand}>
      <VirgoDesignIcon size={16} />
      <span>{t('app.virgoDesignPro')}</span>
    </span>
  );
}
