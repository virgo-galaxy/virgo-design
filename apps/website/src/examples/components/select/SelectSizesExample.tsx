import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './SelectSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Select key={size} defaultValue="design" size={size}>
          <Select.Trigger
            aria-label={t('examples.select.details.valueProject', {
              v0: translateExampleText(t, 'select', String(size)),
            })}
          />
          <Select.Content>
            <Select.Option value="design">Virgo Design</Select.Option>
            <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
            <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
          </Select.Content>
        </Select>
      ))}
    </div>
  );
}
