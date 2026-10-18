import { VirgoDesignIcon } from '@virgo-design/icons';
import { useTranslation } from 'react-i18next';

export function FooterBrand() {
  const { t } = useTranslation();

  return (
    <span className="inline-flex items-center gap-4">
      <VirgoDesignIcon size={16} />
      <span>{t('app.virgoDesignPro')}</span>
    </span>
  );
}
