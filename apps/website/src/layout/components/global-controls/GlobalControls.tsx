import { useAppearance } from '@/shared/theme/use-appearance';

import { AppearanceControl } from './AppearanceControl';
import styles from './global-controls.module.scss';
import { LanguageControl } from './LanguageControl';

export function GlobalControls() {
  const { appearance, setAppearance } = useAppearance();

  return (
    <div className={styles.controls} data-theme={appearance} aria-label="Global controls">
      <LanguageControl />

      <div className={styles.divider} aria-hidden="true" />

      <AppearanceControl value={appearance} onChange={setAppearance} />
    </div>
  );
}
