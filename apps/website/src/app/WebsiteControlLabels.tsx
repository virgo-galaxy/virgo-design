import { UIControlLabelsProvider } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export function WebsiteControlLabels({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <UIControlLabelsProvider
      labels={{
        previousMonth: t('shared.controls.previousMonth'),
        nextMonth: t('shared.controls.nextMonth'),
        chooseDate: t('shared.controls.chooseDate'),
        expandSidebar: t('shared.controls.expandSidebar'),
        collapseSidebar: t('shared.controls.collapseSidebar'),
        clearInput: t('shared.controls.clearInput'),
        hidePassword: t('shared.controls.hidePassword'),
        showPassword: t('shared.controls.showPassword'),
        resizeSidebar: t('shared.controls.resizeSidebar'),
        dockControls: t('shared.controls.dockControls'),
        unlockDock: t('shared.controls.unlockDock'),
        lockDock: t('shared.controls.lockDock'),
        unlockMovement: t('shared.controls.unlockMovement'),
        lockMovement: t('shared.controls.lockMovement'),
        unpinDock: t('shared.controls.unpinDock'),
        pinDock: t('shared.controls.pinDock'),
        unpinViewport: t('shared.controls.unpinViewport'),
        pinViewport: t('shared.controls.pinViewport'),
      }}
    >
      {children}
    </UIControlLabelsProvider>
  );
}
