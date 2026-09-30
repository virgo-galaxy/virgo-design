import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './InputPasswordExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Input.Password
        aria-label={t('examples.input.copy.currentPassword')}
        autoComplete="current-password"
        defaultValue="virgo-password"
      />
    </div>
  );
}
