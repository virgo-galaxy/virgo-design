import { createContext, useContext } from 'react';
export const NotificationRevisionContext = createContext(0);
export const useNotificationRevision = () => useContext(NotificationRevisionContext);
