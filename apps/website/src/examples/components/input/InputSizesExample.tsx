import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './InputSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Input
          key={size}
          aria-label={t('examples.input.details.valueInput', {
            v0: translateExampleText(t, 'input', String(size)),
          })}
          placeholder={t('examples.input.details.valueInput', {
            v0: translateExampleText(t, 'input', String(size)),
          })}
          size={size}
        />
      ))}
    </div>
  );
}
