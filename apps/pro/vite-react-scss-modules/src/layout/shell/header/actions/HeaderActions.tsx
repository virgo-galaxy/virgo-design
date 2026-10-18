import { MoonFilledIcon, SunFilledIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageControl } from '@/components/language-control/LanguageControl';
import { ThemeStyleControl } from '@/components/theme-style-control/ThemeStyleControl';

export function HeaderActions({
  theme,
  onAppearanceChange,
  children,
}: {
  theme: 'light' | 'dark';
  onAppearanceChange: (appearance: 'light' | 'dark') => void;
  children?: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <>
      <LanguageControl />
      <Tooltip>
        <Tooltip.Trigger
          render={(props) => (
            <Button
              {...props}
              iconOnly
              variant="text"
              aria-label={theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
              onClick={(event) => {
                props.onClick?.(event);

                if (!event.defaultPrevented) {
                  onAppearanceChange(theme === 'light' ? 'dark' : 'light');
                }
              }}
            >
              {theme === 'light' ? <MoonFilledIcon /> : <SunFilledIcon />}
            </Button>
          )}
        />
        <Tooltip.Content>
          {theme === 'light' ? t('app.darkMode') : t('app.lightMode')}
        </Tooltip.Content>
      </Tooltip>
      <ThemeStyleControl />
      {children}
    </>
  );
}
