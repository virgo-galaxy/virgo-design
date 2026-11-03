import { VirgoDesignIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

import * as classes from '@/styles/classes';

export function FooterBrand() {
  const { t } = useTranslation();

  return (
    <span className={classes.footerBrand}>
      <VirgoDesignIcon size={16} />
      <span>{t('app.virgoDesignPro')}</span>
    </span>
  );
}
