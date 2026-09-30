import { CheckIcon, SearchIcon, UserIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './InputDecorationsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Input
        aria-label={t('examples.input.copy.search')}
        prefix={<SearchIcon />}
        placeholder={t('examples.input.copy.searchComponents')}
      />
      <Input
        aria-label={t('examples.input.copy.approvedName')}
        defaultValue="Virgo"
        suffix={<CheckIcon />}
      />
      <Input
        aria-label={t('examples.input.copy.account')}
        defaultValue="mystic"
        prefix={<UserIcon />}
        suffix={<CheckIcon />}
      />
    </div>
  );
}
