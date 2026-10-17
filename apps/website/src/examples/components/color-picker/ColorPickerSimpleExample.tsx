import { ColorPicker } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ColorPickerSimpleExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <ColorPicker defaultValue="#549c89">
        <ColorPicker.Trigger variant="value" aria-label={t('examples.colorPicker.copy.simple')} />
        <ColorPicker.Panel variant="simple" aria-label={t('examples.colorPicker.copy.panel')} />
      </ColorPicker>
    </div>
  );
}
