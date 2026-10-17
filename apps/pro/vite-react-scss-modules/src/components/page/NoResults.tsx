import { SearchIcon } from '@virgo-design/icons';
import { Button, Empty } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export function NoResults({ onReset, title }: { onReset: () => void; title?: string }) {
  const { t } = useTranslation();

  return (
    <Empty size="md">
      <Empty.Icon>
        <SearchIcon />
      </Empty.Icon>
      <Empty.Title>{title ?? t('shared.noResults')}</Empty.Title>
      <Empty.Description>{t('shared.tryABroaderSearchOrResetTheFilters')}</Empty.Description>
      <Empty.Action>
        <Button size="medium" variant="outline" onClick={onReset}>
          {t('shared.resetFilters')}
        </Button>
      </Empty.Action>
    </Empty>
  );
}
