import { Cursor, Tooltip } from '@virgo-design/ui';

import styles from './CursorSizesExample.module.scss';

const sizes = [
  { size: 'sm', pixels: 16 },
  { size: 'md', pixels: 20 },
  { size: 'lg', pixels: 24 },
] as const;

export default function App() {
  return (
    <div className={styles.sizes}>
      {sizes.map(({ size, pixels }) => (
        <Cursor.Provider key={size} size={size} follow={{ tooltip: true }} className={styles.stage}>
          <Cursor.Visual size={size} />
          <Tooltip>
            <Tooltip.Trigger>
              {size.toUpperCase()} · {pixels}px{size === 'md' ? ' · Default' : ''}
            </Tooltip.Trigger>
            <Tooltip.Content>A {pixels}px cursor, with context close behind.</Tooltip.Content>
          </Tooltip>
        </Cursor.Provider>
      ))}
    </div>
  );
}
