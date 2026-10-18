import { Button, Separator, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useAppearance } from '@/shared/theme/use-appearance';

import { AppearanceControl } from './AppearanceControl';
import { LanguageControl } from './LanguageControl';
import { ThemeStyleControl } from './ThemeStyleControl';

import styles from './global-controls.module.scss';

export function GlobalControls() {
  const { t } = useTranslation();
  const { appearance, setAppearance } = useAppearance();

  return (
    <Button.Group
      layout="custom"
      size="small"
      render={(groupProps) => (
        <Surface {...groupProps} material="glass" tone="elevated" elevation={2} radius={12} />
      )}
      className={styles.controls}
      data-theme={appearance}
      role="group"
      aria-label={t('app.controls.globalControls')}
    >
      <LanguageControl />
      <Separator className={styles.separator} decorative orientation="vertical" />
      <AppearanceControl value={appearance} onChange={setAppearance} />
      <Separator className={styles.separator} decorative orientation="vertical" />
      <ThemeStyleControl />
    </Button.Group>
  );
}
