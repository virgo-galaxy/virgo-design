import { UIControlLabelsProvider } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export function ProControlLabels({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <UIControlLabelsProvider
      labels={{
        filter: t('shared.controls.filter'),
        search: t('shared.controls.search'),
        searchColumn: t('shared.controls.searchColumn'),
        selectPageRows: t('shared.controls.selectPageRows'),
        selectionActions: t('shared.controls.selectionActions'),
        selectAllRows: t('shared.controls.selectAllRows'),
        invertPageSelection: t('shared.controls.invertPageSelection'),
        clearAllSelection: t('shared.controls.clearAllSelection'),

        filterColumn: t('shared.controls.filterColumn'),
        resizeColumn: t('shared.controls.resizeColumn'),
        resetFilter: t('shared.controls.resetFilter'),
        confirmFilter: t('shared.controls.confirmFilter'),
        sortAscending: t('shared.controls.sortAscending'),
        sortDescending: t('shared.controls.sortDescending'),
        clearSorting: t('shared.controls.clearSorting'),
        previousSlide: t('shared.controls.previousSlide'),
        nextSlide: t('shared.controls.nextSlide'),
        goToSlide: t('shared.controls.goToSlide'),
        playSlideshow: t('shared.controls.playSlideshow'),
        pauseSlideshow: t('shared.controls.pauseSlideshow'),
        previousMonth: t('shared.controls.previousMonth'),
        nextMonth: t('shared.controls.nextMonth'),
        previousYear: t('shared.controls.previousYear'),
        nextYear: t('shared.controls.nextYear'),
        chooseYear: t('shared.controls.chooseYear'),
        chooseMonth: t('shared.controls.chooseMonth'),
        calendarView: t('shared.controls.calendarView'),
        calendarMonth: t('shared.controls.calendarMonth'),
        calendarYear: t('shared.controls.calendarYear'),
        chooseDate: t('shared.controls.chooseDate'),
        expandSidebar: t('shared.controls.expandSidebar'),
        collapseSidebar: t('shared.controls.collapseSidebar'),
        hideSidebar: t('shared.controls.hideSidebar'),
        clearInput: t('shared.controls.clearInput'),
        removeSelection: t('shared.controls.removeSelection'),
        increaseValue: t('shared.controls.increaseValue'),
        decreaseValue: t('shared.controls.decreaseValue'),
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
