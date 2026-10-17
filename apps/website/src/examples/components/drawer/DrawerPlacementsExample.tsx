import { Button, Drawer, type DrawerPlacement, type DrawerSize } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './DrawerPlacementsExample.module.scss';

function DrawerFrame({
  placement = 'right',
  size = 'md',
  title,
}: {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title: string;
}) {
  const { t } = useTranslation();

  return (
    <Drawer.Root>
      <Drawer.Trigger size="small">
        {t('examples.drawer.copy.open')} {title}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content placement={placement} size={size}>
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Description>
              {t('examples.drawer.copy.a')} {size} {t('examples.drawer.copy.panelEnteringFromThe')}{' '}
              {placement} {t('examples.drawer.copy.edge')}
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            {t('examples.drawer.copy.drawerBehaviorFocusAndDismissalComeDirectlyFromTheDialog')}
          </Drawer.Body>
          <Button.Group layout="custom" render={(groupProps) => <Drawer.Footer {...groupProps} />}>
            <Drawer.Close>{t('examples.drawer.copy.cancel')}</Drawer.Close>
            <Drawer.Close variant="primary">{t('examples.drawer.copy.done')}</Drawer.Close>
          </Button.Group>
          <Drawer.Close aria-label={t('examples.drawer.copy.closeDrawer')} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['left', 'right', 'top', 'bottom'] as const).map((placement) => (
        <DrawerFrame
          key={placement}
          placement={placement}
          title={t('examples.drawer.details.valueDrawer', {
            v0: translateExampleText(t, 'drawer', String(placement)),
          })}
        />
      ))}
    </div>
  );
}
