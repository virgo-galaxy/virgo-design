import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './InputStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Input
        aria-label={t('examples.input.copy.defaultInput')}
        placeholder={t('examples.input.copy.typeSomething')}
      />
      <Input
        disabled
        aria-label={t('examples.input.copy.disabledInput')}
        defaultValue="Unavailable"
      />
      <Input
        readOnly
        aria-label={t('examples.input.copy.readOnlyInput')}
        defaultValue="virgo-galaxy"
      />
      <Input
        invalid
        aria-label={t('examples.input.copy.invalidInput')}
        defaultValue="virgo design"
      />
    </div>
  );
}
