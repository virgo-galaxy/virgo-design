import { LanguageIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { MenuControl } from '@/components/menu-control/MenuControl';
import { setAppLocalePreference, useAppLocalePreference } from '@/i18n';

export function LanguageControl() {
  const { t } = useTranslation();
  const preference = useAppLocalePreference();

  return (
    <MenuControl label={t('languageControl.label')} icon={<LanguageIcon />}>
      <Dropdown.Content placement="bottomRight">
        <Dropdown.Item
          checked={preference === 'auto'}
          onSelect={() => void setAppLocalePreference('auto')}
        >
          {t('languageControl.auto')}
        </Dropdown.Item>
        <Dropdown.Item
          checked={preference === 'en-US'}
          lang="en-US"
          onSelect={() => void setAppLocalePreference('en-US')}
        >
          {t('languageControl.english')}
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item
          checked={preference === 'zh-CN'}
          lang="zh-CN"
          onSelect={() => void setAppLocalePreference('zh-CN')}
        >
          {t('languageControl.chinese')}
        </Dropdown.Item>
      </Dropdown.Content>
    </MenuControl>
  );
}
