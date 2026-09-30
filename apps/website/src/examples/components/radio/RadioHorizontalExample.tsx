import './RadioHorizontalExample.module.scss';

import { Radio } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Radio.Group
      defaultValue="pear"
      orientation="horizontal"
      aria-label={t('examples.radio.copy.horizontalFruit')}
    >
      <Radio value="apple">{t('examples.radio.copy.apple')}</Radio>
      <Radio value="pear">{t('examples.radio.copy.pear')}</Radio>
      <Radio value="orange">{t('examples.radio.copy.orange')}</Radio>
    </Radio.Group>
  );
}
