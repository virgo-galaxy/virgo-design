import './DropdownDisabledExample.module.scss';

import { Dropdown } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Dropdown disabled>
      <Dropdown.Trigger>{t('examples.dropdown.copy.disabledMenu')}</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>{t('examples.dropdown.copy.unavailableAction')}</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
