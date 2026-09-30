import { Popover } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './PopoverCustomTriggerExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Popover>
      <Popover.Trigger
        aria-label={t('examples.popover.copy.workspaceProfile')}
        render={(props) => (
          <button {...props} className={styles.root!}>
            <span aria-hidden="true">{t('examples.popover.copy.vd')}</span>
          </button>
        )}
      />
      <Popover.Content arrow>
        <div className={styles.stage!}>
          <strong>{t('examples.popover.copy.workspaceProfile')}</strong>
          <p className={styles.text!}>
            {t('examples.popover.copy.aCustomAvatarTriggerRenderedWithoutVirgoButton')}
          </p>
          <Popover.Close>{t('examples.popover.copy.done')}</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}
