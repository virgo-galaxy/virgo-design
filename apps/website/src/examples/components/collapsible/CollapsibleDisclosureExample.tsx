import { Collapsible } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CollapsibleDisclosureExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Collapsible className={styles.root}>
      <Collapsible.Trigger>{t('examples.collapsible.copy.trigger')}</Collapsible.Trigger>
      <Collapsible.Content motion="collapse">
        {t('examples.collapsible.copy.content')}
      </Collapsible.Content>
    </Collapsible>
  );
}
