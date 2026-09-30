import { Cursor } from '@virgo-design/ui';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CursorFeedbackExample.module.scss';

function Coordinates() {
  const pointer = Cursor.usePointer();
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!pointer) return;
    const update = () => {
      const { x, y } = pointer.getSnapshot();
      if (label.current) label.current.textContent = `${Math.round(x)}, ${Math.round(y)}`;
    };
    update();
    return pointer.subscribe(update);
  }, [pointer]);
  return (
    <Cursor.Follower className={styles.coordinates}>
      <span ref={label} />
    </Cursor.Follower>
  );
}

export default function App() {
  const { t } = useTranslation();

  return (
    <Cursor.Provider className={styles.stage}>
      <p className={styles.note}>
        {t('examples.cursor.copy.viewportCoordinatesUpdateWithoutRenderingThisTree')}
      </p>
      <Coordinates />
    </Cursor.Provider>
  );
}
