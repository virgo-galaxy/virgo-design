import { SearchIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export function HeaderSearch() {
  const { t } = useTranslation();

  return (
    <Input
      rootClassName={
        '[width:var(--pro-search-width,_280px)] ms-auto data-[size=medium]:[--input-padding-inline:var(--vd-spacing-12)] data-[size=medium]:[--input-background:var(--vd-surface-secondary)] data-[size=medium]:[--input-border:transparent] data-[size=medium]:[--input-border-hover:transparent] viewport-max-900:[width:230px] viewport-max-640:w-full'
      }
      suffix={<SearchIcon />}
      aria-label={t('app.searchPlaceholder')}
      placeholder={t('app.searchPlaceholder')}
      size="medium"
    />
  );
}
