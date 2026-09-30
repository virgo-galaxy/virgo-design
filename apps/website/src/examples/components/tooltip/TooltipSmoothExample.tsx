import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './TooltipSmoothExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div
      className={styles.root!}
      role="group"
      aria-label={t('examples.tooltip.copy.smoothTransition')}
    >
      {[
        t('examples.tooltip.details.overview'),
        t('examples.tooltip.details.members'),
        t('examples.tooltip.details.activity'),
        t('examples.tooltip.details.settings'),
      ].map((label) => (
        <Tooltip key={label} smoothTransition>
          <Tooltip.Trigger variant="primary" className={styles.trigger!}>
            {translateExampleText(t, 'tooltip', label)}
          </Tooltip.Trigger>
          <Tooltip.Content>{t('examples.tooltip.copy.exploreYourWorkspace')}</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
