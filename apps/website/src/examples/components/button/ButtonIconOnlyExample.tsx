import { PlusIcon, SettingsIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ButtonIconOnlyExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Button iconOnly aria-label={t('examples.button.copy.addItem')}>
        <PlusIcon />
      </Button>
      <Button iconOnly shape="circle" aria-label={t('examples.button.copy.settings')}>
        <SettingsIcon />
      </Button>
      <Button iconOnly variant="secondary" aria-label={t('examples.button.copy.secondarySettings')}>
        <SettingsIcon />
      </Button>
      <Button iconOnly variant="outline" aria-label={t('examples.button.copy.outlinedSettings')}>
        <SettingsIcon />
      </Button>
    </div>
  );
}
