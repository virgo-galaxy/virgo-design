import { LanguageIcon } from '@virgo-design/icons';
import { Dropdown, Tooltip } from '@virgo-design/ui';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { setAppLocalePreference, useAppLocalePreference } from '@/i18n';

export function LanguageControl() {
  const { t } = useTranslation();
  const preference = useAppLocalePreference();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipSuppressed = useRef(false);

  return (
    <Dropdown
      trigger="click"
      open={menuOpen}
      onOpenChange={(open) => {
        tooltipSuppressed.current = true;
        setTooltipOpen(false);
        setMenuOpen(open);
      }}
    >
      <Tooltip
        open={!menuOpen && tooltipOpen}
        onOpenChange={(open) => setTooltipOpen(open && !menuOpen && !tooltipSuppressed.current)}
      >
        <Tooltip.Trigger
          onPointerEnter={() => {
            if (!menuOpen) tooltipSuppressed.current = false;
          }}
          onBlur={() => {
            if (!menuOpen) tooltipSuppressed.current = false;
            setTooltipOpen(false);
          }}
          render={(triggerProps) => (
            <Dropdown.Trigger
              {...triggerProps}
              iconOnly
              variant="text"
              aria-label={t('languageControl.label')}
            >
              <LanguageIcon />
            </Dropdown.Trigger>
          )}
        />
        <Tooltip.Content placement="bottom">{t('languageControl.label')}</Tooltip.Content>
      </Tooltip>
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
    </Dropdown>
  );
}
