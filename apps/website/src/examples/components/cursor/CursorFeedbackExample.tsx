import { Cursor } from '@virgo-design/ui';
import { useEffect, useRef } from 'react';

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
  return (
    <Cursor.Provider className={styles.stage}>
      <p className={styles.note}>Viewport coordinates update without rendering this tree.</p>
      <Coordinates />
    </Cursor.Provider>
  );
}
