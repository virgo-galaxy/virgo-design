import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './FloatingActionPlacementExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
        <div key={placement} className={styles.stage!}>
          <FloatingAction.Group>
            <FloatingAction.Trigger
              aria-label={t('examples.floatingAction.details.toggleValueActions', {
                v0: translateExampleText(t, 'floatingAction', String(placement)),
              })}
            />
            <FloatingAction.Content
              placement={placement}
              aria-label={t('examples.floatingAction.details.valueActions', {
                v0: translateExampleText(t, 'floatingAction', String(placement)),
              })}
            >
              <FloatingAction
                aria-label={t('examples.floatingAction.details.valueSettings', {
                  v0: translateExampleText(t, 'floatingAction', String(placement)),
                })}
              >
                <SettingsIcon />
              </FloatingAction>
            </FloatingAction.Content>
          </FloatingAction.Group>
          <span>{placement}</span>
        </div>
      ))}
    </div>
  );
}
