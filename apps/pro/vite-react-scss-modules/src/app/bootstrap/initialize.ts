import '@/styles/global.scss';

import { initializeAppLocale } from '@/i18n/bootstrap';
import { disposeAppStores, initializeAppStores } from '@/store/bootstrap';

void initializeAppLocale();
initializeAppStores();

import.meta.hot?.dispose(disposeAppStores);
