import { CheckIcon, ChevronDownIcon, PlusIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ButtonIconsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Button leadingIcon={<PlusIcon />}>{t('examples.button.copy.create')}</Button>
      <Button variant="secondary" trailingIcon={<ChevronDownIcon />}>
        {t('examples.button.copy.options')}
      </Button>
      <Button variant="outline" leadingIcon={<CheckIcon />} trailingIcon={<ChevronDownIcon />}>
        {t('examples.button.copy.approved')}
      </Button>
    </div>
  );
}
