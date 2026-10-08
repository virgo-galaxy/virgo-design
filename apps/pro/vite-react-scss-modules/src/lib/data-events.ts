export const tasksChangedEvent = 'virgo-pro:tasks-changed';
export const demoDataStorageKey = 'virgo-pro.demo-data.v1';
export function announceTaskChange() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(tasksChangedEvent));
}
