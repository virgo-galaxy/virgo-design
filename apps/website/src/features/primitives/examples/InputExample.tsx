import { Input } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function InputExample() {
  const { t } = useTranslation();

  return (
    <label>
      {t('primitives.examples.projectName')}
      <Input data-docs-primitive="input" defaultValue="Item A" />
    </label>
  );
}
