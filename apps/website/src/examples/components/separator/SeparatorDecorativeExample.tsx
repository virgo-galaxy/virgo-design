import { Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SeparatorDecorativeExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <article>
        <h3 className={styles.h3!}>{t('examples.separator.copy.designSystems')}</h3>
        <p className={styles.text!}>
          {t('examples.separator.copy.sharedTokensAndComponentsKeepProductSurfacesCoherent')}
        </p>
      </article>
      <Separator decorative />
      <article>
        <h3 className={styles.h3!}>{t('examples.separator.copy.coveragePass')}</h3>
        <p className={styles.text!}>
          {t('examples.separator.copy.smallStableApisCompleteTheComponentMap')}
        </p>
      </article>
    </div>
  );
}
