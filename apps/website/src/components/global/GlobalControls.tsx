import type { Appearance } from '@/features/color-studio/model/types';

import { AppearanceControl } from './AppearanceControl';
import styles from './global-controls.module.scss';
import { LanguageControl } from './LanguageControl';

interface GlobalControlsProps {
  appearance: Appearance;
  onAppearanceChange: (appearance: Appearance) => void;
}

export function GlobalControls({ appearance, onAppearanceChange }: GlobalControlsProps) {
  return (
    <div className={styles.globalControls} data-theme={appearance}>
      <LanguageControl />

      <div className={styles.divider} aria-hidden="true" />

      <AppearanceControl value={appearance} onChange={onAppearanceChange} />
    </div>
  );
}
