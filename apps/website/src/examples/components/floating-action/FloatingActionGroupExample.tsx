import { CircleInfoIcon, DashboardIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './FloatingActionGroupExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Choose an action.');
  const select = (action: string) => {
    setStatus(action);
    setOpen(false);
  };
  return (
    <div className={styles.root!}>
      <FloatingAction.Group open={open} onOpenChange={setOpen}>
        <FloatingAction.Trigger aria-label={t('examples.floatingAction.copy.quickActions')} />
        <FloatingAction.Content aria-label={t('examples.floatingAction.copy.quickActions')}>
          <FloatingAction
            aria-label={t('examples.floatingAction.copy.openDashboard')}
            onClick={() => select('View A')}
          >
            <DashboardIcon />
          </FloatingAction>
          <FloatingAction
            aria-label={t('examples.floatingAction.copy.showHelp')}
            onClick={() => select('Help')}
          >
            <CircleInfoIcon />
          </FloatingAction>
        </FloatingAction.Content>
      </FloatingAction.Group>
      <span role="status">{translateExampleText(t, 'floatingAction', status)}</span>
    </div>
  );
}
