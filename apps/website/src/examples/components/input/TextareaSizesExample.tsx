import { Textarea } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './TextareaSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Textarea
          key={size}
          aria-label={t('examples.input.details.valueTextarea', {
            v0: translateExampleText(t, 'input', String(size)),
          })}
          placeholder={t('examples.input.details.valueMultilineInput', {
            v0: translateExampleText(t, 'input', String(size)),
          })}
          rows={3}
          size={size}
        />
      ))}
    </div>
  );
}
