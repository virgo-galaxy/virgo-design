import { useEffect, useRef, useState } from 'react';

import { demoResetEvent } from '@/lib/demo/reset';
import { localStorageAccess } from '@/lib/storage';

import { defaultTableSettings } from '../config/table-settings';
import {
  parseTaskTableSettings,
  taskColumnWidthsVersion,
  taskHeaderControlsVersion,
  taskTableStorageKey,
} from '../model/table-preferences';

export function useTaskTableSettings(canPersist = true) {
  const resetting = useRef(false);
  useEffect(() => {
    const stopSaving = () => {
      resetting.current = true;
    };
    window.addEventListener(demoResetEvent, stopSaving);
    return () => window.removeEventListener(demoResetEvent, stopSaving);
  }, []);
  const [settings, setSettings] = useState(() => {
    try {
      return parseTaskTableSettings(localStorageAccess.get(taskTableStorageKey).value);
    } catch {
      return defaultTableSettings();
    }
  });
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    const save = () => {
      if (resetting.current || !canPersist) return;
      try {
        const persisted = localStorageAccess.set(
          taskTableStorageKey,
          JSON.stringify({
            version: 1,
            columnWidthsVersion: taskColumnWidthsVersion,
            headerControlsVersion: taskHeaderControlsVersion,
            settings,
          }),
        );
        setStorageAvailable(persisted);
      } catch {
        setStorageAvailable(false);
      }
    };
    const timer = window.setTimeout(save, 150);
    window.addEventListener('pagehide', save);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pagehide', save);
    };
  }, [settings, canPersist]);
  return { settings, setSettings, storageAvailable };
}
