import type { PaginationLabels } from '../../components/Pagination/Pagination.types';

export interface UILocale {
  locale: string;
  pagination: Required<PaginationLabels>;
  colorPicker: {
    chooseColor: string;
    saturation: string;
    brightness: string;
    hue: string;
    opacity: string;
    format: string;
    hex: string;
    red: string;
    green: string;
    blue: string;
  };
  drawer: { close: string };
  alert: { close: string };
  breadcrumb: { navigation: string };
  command: { dialog: string };
  popover: { close: string };
  tabs: { add: string; close: string };
  tag: { remove: string };
  toast: { dismiss: string; notifications: string };
  input: {
    clearInput: string;
    increaseValue: string;
    decreaseValue: string;
    hidePassword: string;
    showPassword: string;
  };
  select: {
    placeholder: string;
    removeSelection: (value: string) => string;
  };
  table: {
    filter: string;
    search: string;
    searchColumn: (column: string) => string;
    selectPageRows: string;
    selectionActions: string;
    selectAllRows: string;
    invertPageSelection: string;
    clearAllSelection: string;
    filterColumn: (column: string) => string;
    resizeColumn: (column: string) => string;
    resetFilter: string;
    confirmFilter: string;
    sortAscending: string;
    sortDescending: string;
    clearSorting: string;
  };
  carousel: {
    previousSlide: string;
    nextSlide: string;
    goToSlide: (slide: number) => string;
    playSlideshow: string;
    pauseSlideshow: string;
  };
  calendar: {
    previousMonth: string;
    nextMonth: string;
    previousYear: string;
    nextYear: string;
    chooseYear: string;
    chooseMonth: string;
    calendarView: string;
    calendarMonth: string;
    calendarYear: string;
  };
  datePicker: {
    chooseDate: string;
  };
  timePicker: {
    chooseTime: string;
    timeHours: string;
    timeMinutes: string;
    timeSeconds: string;
    confirmTime: string;
  };
  layout: {
    expandSidebar: string;
    collapseSidebar: string;
    hideSidebar: string;
    resizeSidebar: string;
  };
  dock: {
    moveDock: string;
    dockControls: string;
    unlockDock: string;
    lockDock: string;
    unlockMovement: string;
    lockMovement: string;
    unpinDock: string;
    pinDock: string;
    unpinViewport: string;
    pinViewport: string;
  };
}
