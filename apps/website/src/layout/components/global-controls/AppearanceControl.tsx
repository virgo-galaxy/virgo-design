import { MoonIcon, SunIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { Appearance } from '@/shared/theme/types';

import styles from './global-controls.module.scss';

export interface AppearanceControlProps {
  value: Appearance;
  onChange: (value: Appearance) => void;
}

export function AppearanceControl({ value, onChange }: AppearanceControlProps) {
  const { t } = useTranslation();
  const nextAppearance: Appearance = value === 'light' ? 'dark' : 'light';
  const actionLabel = t(
    value === 'light' ? 'app.controls.switchToDarkMode' : 'app.controls.switchToLightMode',
  );
  const AppearanceIcon = value === 'light' ? MoonIcon : SunIcon;

  return (
    <Tooltip className={styles.control} closeOnClick={false} smoothTransition>
      <Tooltip.Trigger
        aria-label={actionLabel}
        onClick={() => onChange(nextAppearance)}
        render={(triggerProps) => (
          <Button
            {...triggerProps}
            iconOnly
            aria-label={actionLabel}
            className={styles.button}
            size="medium"
            variant="text"
          >
            <AppearanceIcon aria-hidden="true" />
          </Button>
        )}
      />
      <Tooltip.Content arrow={false} placement="bottom" size="small">
        {actionLabel}
      </Tooltip.Content>
    </Tooltip>
  );
}
