import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ButtonGroupsExample.module.scss';

export default function ButtonGroupsExample() {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <Button.Group aria-label={t('components.button.groups.title')} align="between">
        <Button variant="outline">{t('components.button.groups.reset')}</Button>
        <Button>{t('components.button.groups.done')}</Button>
      </Button.Group>
      <Button.Group
        aria-label={t('components.button.groups.editing')}
        variant="attached"
        size="small"
      >
        <Button variant="outline">{t('components.button.groups.copy')}</Button>
        <Button variant="outline">{t('components.button.groups.paste')}</Button>
      </Button.Group>
    </div>
  );
}
