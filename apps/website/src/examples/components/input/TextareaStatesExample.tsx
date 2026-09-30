import { Textarea } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TextareaStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Textarea
        aria-label={t('examples.input.copy.defaultTextarea')}
        placeholder={t('examples.input.copy.describeTheProject')}
        rows={4}
      />
      <Textarea
        disabled
        aria-label={t('examples.input.copy.disabledTextarea')}
        defaultValue="This content is unavailable."
        rows={4}
      />
      <Textarea
        readOnly
        aria-label={t('examples.input.copy.readOnlyTextarea')}
        defaultValue="Virgo Design keeps UI assets close to their source of truth."
        rows={4}
      />
      <Textarea
        invalid
        aria-label={t('examples.input.copy.invalidTextarea')}
        defaultValue="Needs revision"
        rows={4}
      />
    </div>
  );
}
