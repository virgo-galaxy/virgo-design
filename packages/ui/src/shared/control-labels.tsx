import { createContext, type ReactNode, useContext } from 'react';

const defaultLabels = {
  filter: 'Filter',
  search: 'Search',
  searchColumn: 'Search {{column}}',
  selectPageRows: 'Select current page',
  selectionActions: 'Selection actions',
  selectAllRows: 'Select all',
  invertPageSelection: 'Invert current page',
  clearAllSelection: 'Clear all',

  filterColumn: 'Filter {{column}}',
  resizeColumn: 'Resize {{column}} column',
  resetFilter: 'Reset',
  confirmFilter: 'Confirm',
  sortAscending: 'Click to sort ascending',
  sortDescending: 'Click to sort descending',
  clearSorting: 'Click to cancel sorting',
  previousSlide: 'Previous slide',
  nextSlide: 'Next slide',
  goToSlide: 'Go to slide',
  playSlideshow: 'Resume slideshow',
  pauseSlideshow: 'Pause slideshow',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  previousYear: 'Previous year',
  nextYear: 'Next year',
  chooseYear: 'Choose year',
  chooseMonth: 'Choose month',
  calendarView: 'Calendar view',
  calendarMonth: 'Month',
  calendarYear: 'Year',
  chooseDate: 'Choose date',
  expandSidebar: 'Expand sidebar',
  collapseSidebar: 'Collapse sidebar',
  hideSidebar: 'Hide sidebar',
  clearInput: 'Clear input',
  removeSelection: 'Remove {{value}}',
  increaseValue: 'Increase value',
  decreaseValue: 'Decrease value',
  hidePassword: 'Hide password',
  showPassword: 'Show password',
  resizeSidebar: 'Resize sidebar',
  dockControls: 'Dock controls',
  unlockDock: 'Unlock dock',
  lockDock: 'Lock dock',
  unlockMovement: 'Unlock movement',
  lockMovement: 'Lock movement',
  unpinDock: 'Unpin dock',
  pinDock: 'Pin dock',
  unpinViewport: 'Unpin from viewport',
  pinViewport: 'Pin to viewport',
};

type ControlLabels = typeof defaultLabels;
const ControlLabelsContext = createContext(defaultLabels);

export function UIControlLabelsProvider({
  labels,
  children,
}: {
  labels: Partial<ControlLabels>;
  children: ReactNode;
}) {
  return (
    <ControlLabelsContext.Provider value={{ ...defaultLabels, ...labels }}>
      {children}
    </ControlLabelsContext.Provider>
  );
}

export function useControlLabels() {
  return useContext(ControlLabelsContext);
}
