import { Separator, Surface } from '@virgo-design/ui';

import { useAppearance } from '@/shared/theme/use-appearance';

import { AppearanceControl } from './AppearanceControl';
import styles from './global-controls.module.scss';
import { LanguageControl } from './LanguageControl';

export function GlobalControls() {
  const { appearance, setAppearance } = useAppearance();

  return (
    <Surface
      className={styles.controls}
      data-theme={appearance}
      aria-label="Global controls"
      material="glass"
      tone="elevated"
      elevation={2}
      radius={12}
    >
      <LanguageControl />
      <Separator className={styles.separator} decorative orientation="vertical" />
      <AppearanceControl value={appearance} onChange={setAppearance} />
    </Surface>
  );
}
