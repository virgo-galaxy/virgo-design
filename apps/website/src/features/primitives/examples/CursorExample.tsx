import { Cursor } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function CursorExample() {
  const { t } = useTranslation();

  return (
    <Cursor.Provider data-docs-primitive="cursor">
      <button type="button">{t('primitives.examples.moveYourMouseHere')}</button>
      <Cursor.Follower {...portalProps}>
        {t('primitives.examples.pointerFeedback')}
      </Cursor.Follower>
    </Cursor.Provider>
  );
}
