import { CheckIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './TagIconsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Tag icon={<LayoutIcon />} intent="info">
        {t('examples.tag.copy.workspace')}
      </Tag>
      <Tag icon={<CheckIcon />} intent="success" variant="outline">
        {t('examples.tag.copy.stable')}
      </Tag>
      <Tag icon={<SettingsIcon />} intent="warning">
        {t('examples.tag.copy.configuration')}
      </Tag>
    </div>
  );
}
