import './SegmentedDisabledExample.module.scss';

import { SegmentedControl } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <SegmentedControl
      defaultValue="code"
      aria-label={t('examples.segmentedControl.copy.availableViews')}
    >
      <SegmentedControl.Item value="code">
        {t('examples.segmentedControl.copy.code')}
      </SegmentedControl.Item>
      <SegmentedControl.Item value="preview">
        {t('examples.segmentedControl.copy.preview')}
      </SegmentedControl.Item>
      <SegmentedControl.Item value="deploy" disabled>
        {t('examples.segmentedControl.copy.deploy')}
      </SegmentedControl.Item>
    </SegmentedControl>
  );
}
