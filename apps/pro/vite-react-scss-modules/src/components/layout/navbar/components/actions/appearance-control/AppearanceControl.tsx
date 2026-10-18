import { MoonFilledIcon, SunFilledIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export function AppearanceControl({
  appearance,
  onAppearanceChange,
}: {
  appearance: 'light' | 'dark';
  onAppearanceChange: (appearance: 'light' | 'dark') => void;
}) {
  const { t } = useTranslation();
  const label = t(appearance === 'light' ? 'app.darkMode' : 'app.lightMode');

  return (
    <Tooltip>
      <Tooltip.Trigger
        render={(props) => (
          <Button
            {...props}
            iconOnly
            variant="text"
            aria-label={label}
            onClick={(event) => {
              props.onClick?.(event);

              if (!event.defaultPrevented) {
                onAppearanceChange(appearance === 'light' ? 'dark' : 'light');
              }
            }}
          >
            {appearance === 'light' ? <MoonFilledIcon /> : <SunFilledIcon />}
          </Button>
        )}
      />
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
}
