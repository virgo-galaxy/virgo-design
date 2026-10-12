import './RadioVerticalExample.module.scss';

import { Radio } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Radio.Group
      defaultValue="option-b"
      orientation="vertical"
      aria-label={t('examples.radio.copy.verticalOptions')}
    >
      <Radio value="option-a">{t('examples.radio.copy.optionA')}</Radio>
      <Radio value="option-b">{t('examples.radio.copy.optionB')}</Radio>
      <Radio value="option-c">{t('examples.radio.copy.optionC')}</Radio>
    </Radio.Group>
  );
}
