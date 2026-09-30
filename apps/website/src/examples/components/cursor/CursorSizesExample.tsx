import { Cursor, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CursorSizesExample.module.scss';

const sizes = [
  { size: 'sm', pixels: 16 },
  { size: 'md', pixels: 20 },
  { size: 'lg', pixels: 24 },
] as const;

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.sizes}>
      {sizes.map(({ size, pixels }) => (
        <Cursor.Provider key={size} size={size} follow={{ tooltip: true }} className={styles.stage}>
          <Cursor.Visual size={size} />
          <Tooltip>
            <Tooltip.Trigger>
              {size.toUpperCase()} · {pixels}
              {t('examples.cursor.copy.px')}
              {size === 'md' ? t('examples.cursor.details.default') : ''}
            </Tooltip.Trigger>
            <Tooltip.Content>
              {t('examples.cursor.copy.a')} {pixels}
              {t('examples.cursor.copy.pxCursorWithContextCloseBehind')}
            </Tooltip.Content>
          </Tooltip>
        </Cursor.Provider>
      ))}
    </div>
  );
}
