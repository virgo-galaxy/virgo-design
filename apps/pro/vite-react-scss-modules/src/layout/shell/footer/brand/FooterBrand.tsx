import { VirgoDesignIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

import styles from './FooterBrand.module.scss';

export function FooterBrand() {
  const { t } = useTranslation();

  return (
    <span className={styles.footerBrand}>
      <VirgoDesignIcon size={16} />
      <span>{t('app.virgoDesignPro')}</span>
    </span>
  );
}
