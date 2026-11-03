import { MoonFilledIcon, SunFilledIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { MenuControl } from '@/components/MenuControl';
import { type AppearanceMode, appearanceModes } from '@/preferences/appearance';

export function AppearanceControl({
  appearance,
  mode,
  onChange,
}: {
  appearance: 'light' | 'dark';
  mode: AppearanceMode;
  onChange: (mode: AppearanceMode) => void;
}) {
  const { t } = useTranslation();

  return (
    <MenuControl
      label={t('appearanceControl.label')}
      icon={appearance === 'dark' ? <MoonFilledIcon /> : <SunFilledIcon />}
    >
      <Dropdown.Content placement="bottomRight">
        {appearanceModes.map((value) => (
          <Dropdown.Item key={value} checked={mode === value} onSelect={() => onChange(value)}>
            {t(`appearanceControl.${value}`)}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </MenuControl>
  );
}
