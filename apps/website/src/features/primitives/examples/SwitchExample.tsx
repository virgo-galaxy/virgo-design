import { Switch } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function SwitchExample() {
  const { t } = useTranslation();

  return (
    <label>
      <Switch data-docs-primitive="switch" defaultChecked />{' '}
      {t('primitives.examples.notifications')}
    </label>
  );
}
